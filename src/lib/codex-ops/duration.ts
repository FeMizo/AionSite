import {type Execution,type State} from './core';
import {mexicoDay,type TaskEntry} from './task-records';
export type Duration={milliseconds:number|null;source:'reported'|'timestamps'|'elapsed'|'unknown'};
const finished=(run:Execution)=>['completed','failed','interrupted','cancelled'].includes(run.status);
export function executionDuration(run:Execution,now=Date.now()):Duration{
 if(finished(run)){
  if(run.durationMs!==undefined&&Number.isFinite(run.durationMs)&&run.durationMs>=0)return {milliseconds:run.durationMs,source:'reported'};
  if(run.startedAt&&run.endedAt){const duration=Date.parse(run.endedAt)-Date.parse(run.startedAt);if(Number.isFinite(duration)&&duration>=0)return {milliseconds:duration,source:'timestamps'};}
 }
 if(run.status==='running'&&run.startedAt){const elapsed=now-Date.parse(run.startedAt);if(Number.isFinite(elapsed)&&elapsed>=0)return {milliseconds:elapsed,source:'elapsed'};}
 return {milliseconds:null,source:'unknown'};
}
export function formatDuration(milliseconds:number|null){
 if(milliseconds===null||!Number.isFinite(milliseconds)||milliseconds<0)return 'Sin duración confirmada';
 if(milliseconds<1000)return `${Math.round(milliseconds)} ms`;
 const total=Math.floor(milliseconds/1000),seconds=total%60,minutes=Math.floor(total/60)%60,hours=Math.floor(total/3600);
 return hours?`${hours} h ${minutes} min ${seconds} s`:minutes?`${minutes} min ${seconds} s`:`${seconds} s`;
}
export function durationLabel(run:Execution,now=Date.now()){
 const duration=executionDuration(run,now);
 return (duration.source==='elapsed'?'Transcurrido: ':'Duración: ')+formatDuration(duration.milliseconds)+(duration.source==='timestamps'?' (inicio–fin)':'');
}
export type TaskStatus=Execution['status']|'scheduled'|'missing';
export function taskEntryStatus(entry:TaskEntry):TaskStatus{return entry.run?.status??(entry.label==='Programada'?'scheduled':'missing');}
export function filterTaskEntries(entries:TaskEntry[],taskCode='',status=''){
 return entries.filter(e=>(!taskCode||e.rule.code===taskCode)&&(!status||taskEntryStatus(e)===status));
}
export function taskDurationSummaries(state:State,start:string,days=7,taskCode=''){
 const end=new Date(start+'T12:00:00Z');end.setUTCDate(end.getUTCDate()+days);const endDay=end.toISOString().slice(0,10);
 const runs=(state.executions??[]).filter(e=>{const at=e.startedAt??e.triggeredAt??e.endedAt;return e.automationId&&e.attribution==='automation-id'&&at&&mexicoDay(at)>=start&&mexicoDay(at)<endDay&&(!taskCode||e.taskCode===taskCode);});
 return [...new Set([...state.rules.filter(r=>!taskCode||r.code===taskCode).map(r=>r.id),...runs.map(e=>e.automationId!)])].map(automationId=>{
  const own=runs.filter(e=>e.automationId===automationId),complete=own.filter(e=>e.status==='completed');
  const measured=complete.map(run=>({run,duration:executionDuration(run).milliseconds})).filter((x):x is {run:Execution;duration:number}=>x.duration!==null);
  const values=measured.map(x=>x.duration);const latest=measured.slice().sort((a,b)=>(b.run.startedAt??b.run.endedAt??'').localeCompare(a.run.startedAt??a.run.endedAt??''))[0];
  const unsuccessful=own.filter(e=>e.status==='failed'||e.status==='interrupted');
  const failedValues=unsuccessful.map(e=>executionDuration(e).milliseconds).filter((n):n is number=>n!==null);
  return {automationId,name:state.rules.find(r=>r.id===automationId)?.name??state.scheduleHistory?.find(r=>r.rule.id===automationId)?.rule.name??automationId,code:own[0]?.taskCode??state.rules.find(r=>r.id===automationId)?.code??'00',completed:complete.length,samples:values.length,unknown:complete.length-values.length,last:latest?.duration??null,average:values.length?values.reduce((a,b)=>a+b,0)/values.length:null,min:values.length?Math.min(...values):null,max:values.length?Math.max(...values):null,failed:own.filter(e=>e.status==='failed').length,interrupted:own.filter(e=>e.status==='interrupted').length,unsuccessfulMeasured:failedValues.length,unsuccessfulTime:failedValues.length?failedValues.reduce((a,b)=>a+b,0):null};
 }).sort((a,b)=>a.code.localeCompare(b.code)||a.name.localeCompare(b.name));
}

