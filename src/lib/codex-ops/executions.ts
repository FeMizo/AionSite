import { createHash } from 'node:crypto';
import { z } from 'zod';
import { executionSchema, type Execution, type State } from './core';
import { historicalOccurrences } from './history';
import { taskCalendarEntries } from './task-records';

export const turnSnapshotSchema = z.object({
  threadId:z.string().max(200),turnId:z.string().max(200),taskCodes:z.array(z.string().regex(/^(0[1-9]|1[01])$/)).min(1).max(11),
  automationId:z.string().max(200).optional(),triggeredAt:z.string().datetime().optional(),identityChecked:z.boolean().optional(),status:z.enum(['completed','failed','interrupted','inProgress']),startedAt:z.number().positive().optional(),completedAt:z.number().positive().optional(),durationMs:z.number().nonnegative().optional(),
  errorCategory:z.string().regex(/^[A-Za-z]{1,80}$/).optional(),observedAt:z.string().datetime(),runtimeStatus:z.enum(['active','idle','notLoaded','systemError']),
}).strict();
export const coverageSchema=z.record(z.string(),z.object({lastReadAt:z.string().datetime().optional(),lastAttemptAt:z.string().datetime().optional(),nextCursor:z.string().nullable().optional(),exhausted:z.boolean().optional(),historicalComplete:z.boolean().optional(),error:z.boolean()}).strict());
export type TurnSnapshot=z.infer<typeof turnSnapshotSchema>;
function uuid(value:string){const hex=createHash('sha256').update(value).digest('hex');return `${hex.slice(0,8)}-${hex.slice(8,12)}-5${hex.slice(13,16)}-8${hex.slice(17,20)}-${hex.slice(20,32)}`;}
const iso=(seconds:number)=>new Date(seconds*1000).toISOString();
const terminal=(status:Execution['status'])=>['completed','failed','interrupted','cancelled'].includes(status);
export const statusLabels:Record<Execution['status'],string>={running:'Inicio registrado',completed:'Completada',failed:'Fallida',interrupted:'Interrumpida',cancelled:'Cancelada',unconfirmed:'Sin cierre confirmado'};

export function ingestExecution(state:State,record:Execution){
  const run=executionSchema.parse(record);state.executions??=[];
  const old=state.executions.find(e=>e.id===run.id);
  if(old){
    if(old.coverage==='manual-instrumentation'&&old.startedAt&&run.startedAt&&old.startedAt!==run.startedAt)throw Error('Inicio de ejecución en conflicto');
    if(old.coverage!==run.coverage||old.threadId!==run.threadId||old.turnId!==run.turnId)throw Error('Identidad de ejecución en conflicto');
    if(terminal(old.status)&&!terminal(run.status))return old;
    const events=old.events??[{at:old.observedAt??old.startedAt??new Date().toISOString(),status:old.status}];
    if(old.status!==run.status)events.push({at:run.observedAt??run.endedAt??new Date().toISOString(),status:run.status});
    Object.assign(old,run,{events});return old;
  }
  run.events=[{at:run.observedAt??run.startedAt??new Date().toISOString(),status:run.status}];state.executions.push(run);return run;
}

export function ingestTurns(state:State,snapshots:TurnSnapshot[]){
  for(const raw of snapshots){
    const t=turnSnapshotSchema.parse(raw);
    const previous=state.executions?.find(e=>e.id===uuid(t.threadId+':'+t.turnId));
    const automationId=t.automationId??previous?.automationId;
    const automation=state.rules.find(r=>r.id===automationId&&r.targetThreadId===t.threadId)??state.scheduleHistory?.find(r=>r.rule.id===automationId&&r.rule.targetThreadId===t.threadId)?.rule;
    const start=t.startedAt!==undefined?t.startedAt:t.completedAt!==undefined&&t.durationMs!==undefined?t.completedAt-t.durationMs/1000:undefined;
    const uncertain=t.status==='inProgress'&&(start===undefined||Date.parse(t.observedAt)-start*1000>15*60000);
    const status:Execution['status']=t.status==='inProgress'?(uncertain?'unconfirmed':'running'):t.status;
    ingestExecution(state,{
      id:uuid(t.threadId+':'+t.turnId),taskCode:automation?.code??(t.taskCodes.length===1?t.taskCodes[0]:'00'),taskCodes:automation?[automation.code]:t.taskCodes,project:'Chat asociado',threadId:t.threadId,turnId:t.turnId,
      ...(start!==undefined?{startedAt:iso(start)}:{}),...(t.completedAt!==undefined?{endedAt:iso(t.completedAt)}:{}),status,
      retries:0,images:0,countsKnown:false,...((t.durationMs??previous?.durationMs)!==undefined?{durationMs:t.durationMs??previous?.durationMs}:{}),...(t.errorCategory?{failureCategory:t.errorCategory}:{}),observedAt:t.observedAt,
      evidence:uncertain?'Hay inicio persistido, pero no consta final. No se infiere fallo ni interrupción.':status==='running'?'Inicio registrado por Codex; actividad en vivo no verificada.':'Estado final registrado por Codex; no confirma publicación ni resultado comercial.',
      coverage:'app-server-history',attribution:automation?'automation-id':'thread-only',...(automation?{automationId:automation.id}:{}),identityChecked:t.identityChecked??previous?.identityChecked??false,...((t.triggeredAt??previous?.triggeredAt)?{triggeredAt:t.triggeredAt??previous?.triggeredAt}:{}),
    });
  }
}

export function reconcileMissingClosures(state:State,now:string){
  for(const run of state.executions??[]){
    if(run.status==='running'&&run.startedAt&&Date.parse(now)-Date.parse(run.startedAt)>15*60000){
      ingestExecution(state,{...run,status:'unconfirmed',observedAt:now,evidence:'No se ha observado un cierre. Puede existir un hueco de cobertura; no se declara fallo.'});
    }
  }
}

export function reconcileScheduledChecks(state:State,now:string){
  const end=new Date(now);const start=new Date(end);start.setUTCDate(start.getUTCDate()-14);
  const checks=state.scheduledChecks??=[];
  const individual=taskCalendarEntries(state,start.toISOString().slice(0,10),15,Date.parse(now));
  for(const occurrence of historicalOccurrences(state,start.toISOString().slice(0,10),15)){
    const at=new Date(occurrence.date+'T'+occurrence.time+':00-06:00').toISOString();
    if(Date.parse(at)>Date.parse(now)-15*60000)continue;
    const id=occurrence.rule.id+':'+at;
    const nearby=(state.executions??[]).some(e=>e.threadId===occurrence.rule.targetThreadId&&e.startedAt&&Math.abs(Date.parse(e.startedAt)-Date.parse(at))<=30*60000);
    const linked=individual.filter(x=>x.rule.id===occurrence.rule.id&&x.plannedAt===at&&x.run).map(x=>x.run!.id);
    const status=linked.length?'recorded':nearby?'unattributed-activity':'no-record';
    const prior=checks.find(c=>c.id===id);
    if(prior){prior.status=status;prior.checkedAt=now;prior.executionIds=linked;}else checks.push({id,ruleId:occurrence.rule.id,taskCode:occurrence.rule.code,name:occurrence.rule.name,scheduledAt:at,status,executionIds:linked,checkedAt:now});
  }
  state.scheduledChecks=checks;
}







