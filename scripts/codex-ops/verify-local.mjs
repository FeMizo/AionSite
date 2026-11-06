import { spawn } from 'node:child_process';
import { mkdtemp,writeFile,mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
const root=process.cwd();const data=await mkdtemp(path.join(tmpdir(),'aionsite-codex-ops-'));const admin=randomUUID(),collector=randomUUID();
const env={...process.env,CODEX_OPS_VERIFY:"true",ADMIN_TOKEN:admin,CODEX_OPS_ENABLED:'true',CODEX_OPS_DATA_DIR:data,CODEX_OPS_COLLECTOR_TOKEN:collector,CODEX_OPS_URL:'http://127.0.0.1:2677',CODEX_OPS_EXECUTABLE:process.env.CODEX_OPS_EXECUTABLE};
const child=spawn(process.execPath,['node_modules/next/dist/bin/next','dev','--hostname','127.0.0.1','--port','2677'],{env,stdio:['ignore','pipe','pipe'],windowsHide:true});
child.stdout.resume();child.stderr.resume();
let ready=false;for(let i=0;i<90;i++){try{const r=await fetch(env.CODEX_OPS_URL+'/api/admin/codex',{headers:{Authorization:'Bearer '+admin}});if(r.ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,1000));}if(!ready){child.kill();throw Error('Servidor no disponible');}
const run=spawn(process.execPath,['scripts/codex-ops/collector.mjs','--once'],{env,stdio:['ignore','pipe','pipe'],windowsHide:true});let output='';run.stdout.on('data',d=>output+=d);run.stderr.on('data',d=>output+=d);await new Promise(r=>run.on('exit',r));
const state=await (await fetch(env.CODEX_OPS_URL+'/api/admin/codex',{headers:{Authorization:'Bearer '+admin}})).json();const anonymous=await fetch(env.CODEX_OPS_URL+'/api/admin/codex');
await mkdir('docs/codex-ops/evidence',{recursive:true});await writeFile('docs/codex-ops/evidence/read-verification.json',JSON.stringify({at:new Date().toISOString(),appServerVersion:'0.166.0-alpha.6',rules:state.rules?.length,samples:state.samples?.length,quotas:state.samples?.at(-1)?.limits??null,collector:state.collector,anonymousStatus:anonymous.status,collectorOutput:output},null,2));
await writeFile(path.join(tmpdir(),'aionsite-codex-ops-browser.json'),JSON.stringify({admin,url:env.CODEX_OPS_URL,data}));console.log('Servidor local de verificación activo en 2677. Reglas: '+state.rules?.length+'; muestras: '+state.samples?.length+'; anónimo: '+anonymous.status);console.log(output);process.on('SIGINT',()=>child.kill());process.on('SIGTERM',()=>child.kill());



