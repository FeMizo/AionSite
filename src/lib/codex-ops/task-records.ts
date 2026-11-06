import {historicalOccurrences} from './history';
import {type Execution,type Rule,type State,executionStatusLabels} from './core';
export type TaskEntry={id:string;rule:Rule;date:string;time:string;plannedAt?:string;run?:Execution;label:string};
export const mexicoDay=(at:string)=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Mexico_City',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(at));
const clock=(at:string)=>new Intl.DateTimeFormat('en-GB',{timeZone:'America/Mexico_City',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(at));
export function taskCalendarEntries(state:State,start:string,days=7,now=Date.now()):TaskEntry[]{
 const end=new Date(start+'T12:00:00Z');end.setUTCDate(end.getUTCDate()+days);const endDay=end.toISOString().slice(0,10);
 const entries:TaskEntry[]=historicalOccurrences(state,start,days).map(x=>{const at=new Date(x.date+'T'+x.time+':00-06:00').toISOString();return {...x,id:x.rule.id+':'+at,plannedAt:at,label:Date.parse(at)<now-15*60000?'Sin registro confirmado':'Programada'};});
 const runs=(state.executions??[]).filter(e=>e.automationId&&e.attribution==='automation-id'&&(e.startedAt||e.triggeredAt)).sort((a,b)=>(a.startedAt??a.triggeredAt!).localeCompare(b.startedAt??b.triggeredAt!));
 for(const run of runs){
  const at=run.startedAt??run.triggeredAt!;const date=mexicoDay(at);if(date<start||date>=endDay)continue;
  const candidates=entries.filter(e=>e.rule.id===run.automationId&&e.date===date&&e.plannedAt&&!e.run&&Date.parse(at)>=Date.parse(e.plannedAt)-15*60000).sort((a,b)=>Math.abs(Date.parse(a.plannedAt!)-Date.parse(at))-Math.abs(Date.parse(b.plannedAt!)-Date.parse(at)));
  const matching=candidates.length===1?candidates[0]:candidates.find(e=>Math.abs(Date.parse(e.plannedAt!)-Date.parse(at))<=30*60000);
  if(matching){matching.run=run;matching.time=clock(at);matching.id=run.id;matching.label=executionStatusLabels[run.status];continue;}
  const rule=state.rules.find(r=>r.id===run.automationId)??state.scheduleHistory?.find(r=>r.rule.id===run.automationId)?.rule;
  if(!rule)continue;
  entries.push({id:run.id,rule,date,time:clock(at),run,label:executionStatusLabels[run.status]});
 }
 return entries.sort((a,b)=>(a.date+a.time+a.id).localeCompare(b.date+b.time+b.id));
}


