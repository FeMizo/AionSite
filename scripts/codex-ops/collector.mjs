import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { readFile,readdir } from 'node:fs/promises';
import { createHash,randomUUID } from 'node:crypto';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';
import { collectExecutionSnapshots,executionTargets } from './execution-reader.mjs';
export function scalar(text,key){const line=text.split(/\r?\n/).find(l=>l.startsWith(key+' = '));if(!line)return '';const raw=line.slice(key.length+3);try{return JSON.parse(raw);}catch{throw Error('Formato TOML no soportado para '+key);}}
export function codeFor(id){return /acciones-pendientes|actions-executor/.test(id)?'08':/outreach/.test(id)?'07':/blog/.test(id)?'06':/remote-jobs|empleos/.test(id)?'02':/buffer/.test(id)?'03':/^leads/.test(id)?'04':/multi-shop/.test(id)?'05':/crawl/.test(id)?'09':/multisite/.test(id)?'10':/theme/.test(id)?'11':/aionsite/.test(id)?'01':'00';}
export async function schedules(home){const root=path.join(home,'automations');const out=[];for(const entry of await readdir(root,{withFileTypes:true})){if(!entry.isDirectory())continue;const file=path.join(root,entry.name,'automation.toml');let text;try{text=await readFile(file,'utf8');}catch(e){if(e.code==='ENOENT')continue;throw e;}const id=scalar(text,'id');const timestamps={};for(const [key,field] of [['created_at','createdAt'],['updated_at','updatedAt']]){const value=scalar(text,key);if(Number.isFinite(value)&&value>0)timestamps[field]=new Date(value).toISOString();}out.push({...timestamps,...(scalar(text,'target_thread_id')?{targetThreadId:scalar(text,'target_thread_id')}:{}),id,name:scalar(text,'name'),code:codeFor(id),version:createHash('sha256').update(text).digest('hex'),rrule:scalar(text,'rrule'),status:scalar(text,'status'),project:scalar(text,'project_id')||scalar(text,'target_thread_id')||'local',zone:scalar(text,'timezone')||'America/Mexico_City'});}return out;}
export function normalize(result){const buckets=result.rateLimitsByLimitId??(result.rateLimits?{[result.rateLimits.limitId??'codex']:result.rateLimits}:{});const limits={};for(const [id,b]of Object.entries(buckets)){const windows={};for(const kind of ['primary','secondary']){const q=b?.[kind];if(q&&Number.isFinite(q.usedPercent)&&Number.isFinite(q.windowDurationMins)&&Number.isFinite(q.resetsAt))windows[kind]={usedPercent:q.usedPercent,windowDurationMins:q.windowDurationMins,resetsAt:q.resetsAt};}if(Object.keys(windows).length)limits[id]=windows;}return limits;}
export function connect(executable){const child=spawn(executable,['app-server','--listen','stdio://'],{stdio:['pipe','pipe','ignore'],windowsHide:true});let sequence=0;const pending=new Map();let listener=()=>{};
 const send=x=>child.stdin.write(JSON.stringify(x)+'\n');
 const request=(method,params={})=>new Promise((resolve,reject)=>{const id=++sequence;const timer=setTimeout(()=>{pending.delete(id);reject(Error('App Server: tiempo agotado'));},20000);pending.set(id,{resolve,reject,timer});send({id,method,params});});
 createInterface({input:child.stdout}).on('line',line=>{let m;try{m=JSON.parse(line);}catch{return;}if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);clearTimeout(p.timer);m.error?p.reject(Error('App Server rechazó la lectura')):p.resolve(m.result);}else if(m.method==='account/rateLimits/updated')listener(m.params);});
 child.on('error',()=>{for(const p of pending.values()){clearTimeout(p.timer);p.reject(Error('No se pudo iniciar App Server'));}pending.clear();});
 return {request,send,onUpdate:fn=>{listener=fn;},close:()=>child.kill()};}
export async function main(){const url=new URL(process.env.CODEX_OPS_URL??'http://127.0.0.1:2677');if(!['127.0.0.1','localhost','[::1]'].includes(url.hostname)||url.protocol!=='http:')throw Error('Solo conexión HTTP local');const token=process.env.CODEX_OPS_COLLECTOR_TOKEN;if(!token)throw Error('Falta token del recolector');const executable=process.env.CODEX_OPS_EXECUTABLE;if(!executable||!path.isAbsolute(executable))throw Error('Falta ruta absoluta de Codex');const home=process.env.CODEX_HOME||path.join(os.homedir(),'.codex');
 const post=async body=>{const r=await fetch(new URL('/api/codex-telemetry',url),{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error('Telemetría: HTTP '+r.status);};
 let knownExecutions=[];let runCoverage={};const captureRuns=async api=>{const rules=await schedules(home);await post({rules});const result=await collectExecutionSnapshots(api,executionTargets(rules,knownExecutions),runCoverage);for(let i=0;i<result.snapshots.length;i+=100)await post({turnSnapshots:result.snapshots.slice(i,i+100)});await post({runCoverage:result.coverage});runCoverage=result.coverage;knownExecutions.push(...result.snapshots.filter(t=>t.identityChecked));};
 const api=connect(executable);let queue=Promise.resolve();const capture=result=>{queue=queue.catch(()=>{}).then(()=>post({sample:{id:randomUUID(),at:new Date().toISOString(),source:'app-server',shared:true,limits:normalize(result)},collector:'Conectado'}));return queue;};
 const stop=()=>{api.close();process.exitCode=0;};process.once('SIGINT',stop);process.once('SIGTERM',stop);
 try{await api.request('initialize',{clientInfo:{name:'aionsite_local_telemetry',version:'0.1.0'}});api.send({method:'initialized'});api.onUpdate(result=>{void capture(result).catch(()=>console.error('No se pudo guardar evento'));});try{const response=await fetch(new URL('/api/codex-telemetry',url),{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(10000)});if(response.ok){const saved=await response.json();runCoverage=saved.runCoverage??{};knownExecutions=saved.identityChecks??[];}}catch{}await captureRuns(api);const eventIndex=process.argv.indexOf('--run-event');if(eventIndex>=0)await post({execution:JSON.parse(await readFile(process.argv[eventIndex+1],'utf8'))});await capture(await api.request('account/rateLimits/read'));console.log('Lectura completada; cobertura agregada de esta cuenta, atribución compartida.');if(process.argv.includes('--once'))return;
 let failures=0;const timer=setInterval(async()=>{if(failures>=3){clearInterval(timer);api.close();return;}try{await capture(await api.request('account/rateLimits/read'));await captureRuns(api);failures=0;}catch{failures++;await post({collector:'Cuotas no disponibles'}).catch(()=>{});}},300000);process.once('SIGINT',()=>clearInterval(timer));process.once('SIGTERM',()=>clearInterval(timer));
 }catch{api.close();await post({collector:'Cuotas no disponibles'}).catch(()=>{});throw Error('Lectura no disponible; se conservó el último dato');}finally{if(process.argv.includes('--once')){await queue;api.close();}}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)main().catch(e=>{console.error(e.message);process.exitCode=1;});







