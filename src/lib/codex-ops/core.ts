import { z } from 'zod';
export const quotaSchema = z.object({ usedPercent: z.number().min(0).max(100), windowDurationMins: z.number().positive(), resetsAt: z.number().int().positive(), observedAt: z.string().datetime().optional() }).strict();
export const sampleSchema = z.object({ id: z.string().uuid(), at: z.string().datetime(), source: z.literal('app-server'), shared: z.boolean(), limits: z.record(z.string(), z.object({ primary: quotaSchema.optional(), secondary: quotaSchema.optional() }).strict()) }).strict();
export const ruleSchema = z.object({ id: z.string().min(1).max(200), name: z.string().max(200), code: z.string().regex(/^(0[1-9]|1[01]|00)$/), version: z.string().max(80), rrule: z.string().max(1000), status: z.enum(['ACTIVE','PAUSED']), project: z.string().max(200), zone: z.string().max(80), targetThreadId: z.string().max(200).optional(), createdAt: z.string().datetime().optional(), updatedAt: z.string().datetime().optional() }).strict();
export const requestSchema = z.object({ id: z.string().uuid(), ruleId: z.string(), expectedVersion: z.string(), occurrence: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/), scope: z.enum(['once','weekday','series']) }).strict();
export type Sample = z.infer<typeof sampleSchema>;
export type Rule = z.infer<typeof ruleSchema>;
export type Change = z.infer<typeof requestSchema> & { requester: string; state: 'pending'|'cancelled'|'conflict'|'failed'|'confirmed'; reason: string; createdAt: string };
export type RuleRevision = { rule: Rule; from: string; until?: string; observedAt: string; source: "provider"|"observed" };
export type RunCoverage = Record<string,{lastReadAt?:string;lastAttemptAt?:string;nextCursor?:string|null;exhausted?:boolean;historicalComplete?:boolean;error:boolean}>;
export type ScheduledCheck = {id:string;ruleId:string;taskCode:string;name:string;scheduledAt:string;status:"no-record"|"unattributed-activity"|"recorded";executionIds?:string[];checkedAt:string};
export type State = { runCoverage?:RunCoverage; runsSyncedAt?:string; runsReadError?:boolean; scheduledChecks?:ScheduledCheck[]; scheduleHistory?: RuleRevision[]; samples: Sample[]; rules: Rule[]; changes: Change[]; syncedAt: string|null; scheduleAt: string|null; collector: string; executions?: Execution[] };
export const emptyState = (): State => ({samples:[],rules:[],changes:[],syncedAt:null,scheduleAt:null,collector:'Desconectado'});
export function mergeLimits(previous: Sample['limits'], patch: Sample['limits']) {
 const result = structuredClone(previous);
 for (const [id, windows] of Object.entries(patch)) result[id] = {...result[id], ...windows};
 return result;
}
export function consumption(a: Sample, b: Sample, id: string, kind: 'primary'|'secondary') {
 const x=a.limits[id]?.[kind], y=b.limits[id]?.[kind];
 if (!x || !y || b.at <= a.at || x.resetsAt !== y.resetsAt || y.usedPercent < x.usedPercent) return {value:null, attribution:'no reconstruible'};
 return {value:y.usedPercent-x.usedPercent, attribution:a.shared||b.shared?'compartida':'aislada'};
}
export function estimate(values: number[], pending: number, real: number, reserve=0) {
 if(values.length<3) return {count:values.length,range:null,confidence:'sin datos suficientes'};
 return {count:values.length,range:[real+Math.min(...values)*pending+reserve,real+Math.max(...values)*pending+reserve],confidence:values.length<5?'baja':'moderada'};
}
export function createChange(state: State, input: z.infer<typeof requestSchema>, requester: string): Change {
 const prior=state.changes.find(c=>c.id===input.id);
 if(prior) { if(JSON.stringify(requestSchema.parse(Object.fromEntries(Object.keys(input).map(k=>[k,prior[k as keyof Change]]))))!==JSON.stringify(input)) throw Error('Identificador reutilizado'); return prior; }
 const rule=state.rules.find(r=>r.id===input.ruleId); if(!rule) throw Error('Regla desconocida');
 if(state.changes.some(c=>c.state==='pending'&&c.ruleId===input.ruleId)) throw Error('Ya existe una solicitud pendiente');
 const conflict=rule.version!==input.expectedVersion;
 const result:Change={...input,requester,state:conflict?'conflict':'pending',reason:conflict?'La versión cambió; releer antes de reintentar.':'Sin adaptador verificado. Aplicar con herramientas de Codex y releer el horario.',createdAt:new Date().toISOString()};
 state.changes.push(result);return result;
}
export async function applyWithAdapter(change:Change, adapter:{read:(id:string)=>Promise<{version:string;time:string}>;apply:(c:Change)=>Promise<void>}) {
 if(change.state!=='pending') return;
 try { const before=await adapter.read(change.ruleId);if(before.version!==change.expectedVersion){change.state='conflict';return;} await adapter.apply(change); const after=await adapter.read(change.ruleId);change.state=after.time===change.time&&after.version!==before.version?'confirmed':'failed'; } catch {change.state='failed';}
}
export function contrast(hex:string) {const rgb=hex.slice(1).match(/../g)!.map(n=>parseInt(n,16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);const l=rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;return {black:(l+.05)/.05,white:1.05/(l+.05)};}
export const identities = [
 ['01','AionSite','#0072B2','solid'],['02','Empleos + Gmail','#E69F00','dashed'],['03','Social Buffer','#CC79A7','double'],['04','Leads','#00B8C4','solid'],['05','Multi Shop social','#D55E00','dashed'],['06','Blog','#F0E442','double'],['07','Prospectos · correo','#009E73','solid'],['08','Acciones pendientes','#A694FF','dashed'],['09','Crawl Site','#E8F3FF','double'],['10','MultiSite','#FF4A59','solid'],['11','Theme','#94A000','dashed']
] as const;
export function occurrences(rules:Rule[], start:string, days=7) {
 const result:{rule:Rule;date:string;time:string}[]=[];const names=['SU','MO','TU','WE','TH','FR','SA'];
 for(let i=0;i<days;i++){const date=new Date(start+'T12:00:00Z');date.setUTCDate(date.getUTCDate()+i);const day=date.toISOString().slice(0,10);
 for(const rule of rules){if(rule.status!=='ACTIVE'||rule.zone!=='America/Mexico_City')continue;const fields=Object.fromEntries(rule.rrule.replace(/^RRULE:/,'').split(';').map(v=>v.split('=')));
 // Only the verified daily/weekly, interval=1 subset is expanded. Other rules remain visible verbatim.
 if(!['DAILY','WEEKLY'].includes(fields.FREQ)|| (fields.INTERVAL&&fields.INTERVAL!=='1') || Object.keys(fields).some(k=>!['FREQ','BYDAY','BYHOUR','BYMINUTE','BYSECOND','INTERVAL'].includes(k)))continue;
 if(fields.BYDAY&&!fields.BYDAY.split(',').includes(names[date.getUTCDay()]))continue;
 if(!fields.BYHOUR||!fields.BYMINUTE)continue;
 for(const h of fields.BYHOUR.split(',')) for(const m of fields.BYMINUTE.split(',')){const time=h.padStart(2,'0')+':'+m.padStart(2,'0');if(!result.some(x=>x.rule.id===rule.id&&x.date===day&&x.time===time))result.push({rule,date:day,time});}
 }}return result.sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
}

export const executionSchema=z.object({id:z.string().uuid(),taskCode:z.string().regex(/^(0[0-9]|1[01])$/),taskCodes:z.array(z.string()).optional(),project:z.string().max(200),model:z.string().max(100).optional(),startedAt:z.string().datetime().optional(),endedAt:z.string().datetime().optional(),status:z.enum(['running','completed','failed','cancelled','interrupted','unconfirmed']),retries:z.number().int().min(0).max(100),images:z.number().int().min(0).max(1000),evidence:z.string().max(500),coverage:z.enum(['manual-instrumentation','app-server-history']),threadId:z.string().max(200).optional(),turnId:z.string().max(200).optional(),observedAt:z.string().datetime().optional(),failureCategory:z.string().max(80).optional(),durationMs:z.number().nonnegative().optional(),countsKnown:z.boolean().optional(),automationId:z.string().max(200).optional(),triggeredAt:z.string().datetime().optional(),identityChecked:z.boolean().optional(),attribution:z.enum(['thread-only','automation-id']).optional(),events:z.array(z.object({at:z.string().datetime(),status:z.enum(['running','completed','failed','cancelled','interrupted','unconfirmed'])}).strict()).optional()}).strict().refine(x=>x.coverage==='manual-instrumentation'?!!x.startedAt&&(x.status==='running'||x.status==='unconfirmed'?!x.endedAt:!!x.endedAt&&x.endedAt>=x.startedAt):!!x.threadId&&!!x.turnId&&!!x.observedAt);export type Execution=z.infer<typeof executionSchema>;
export function overlapping(a:Execution,b:Execution){return !!a.startedAt&&!!b.startedAt&&a.id!==b.id&&Date.parse(a.startedAt)<Date.parse(b.endedAt??'9999-12-31')&&Date.parse(b.startedAt)<Date.parse(a.endedAt??'9999-12-31');}
export function windowsForDay(day:string, quota:{windowDurationMins:number;resetsAt:number}, now=Date.now()){
 const duration=quota.windowDurationMins*60000;if(duration<60000||duration>86400000)return [];
 const start=Date.parse(day+'T00:00:00-06:00'),end=start+86400000,reset=quota.resetsAt*1000;
 let boundary=reset+Math.floor((start-reset)/duration)*duration;const windows=[];
 for(;boundary<end;boundary+=duration){windows.push({start:boundary,end:boundary+duration,projected:boundary+duration!==reset||reset<now});}return windows;
}



export function mondayOfWeek(day:string) {
 const date = new Date(day+'T12:00:00Z');
 if (!Number.isFinite(date.getTime())) throw Error('Fecha inválida');
 date.setUTCDate(date.getUTCDate()-((date.getUTCDay()+6)%7));
 return date.toISOString().slice(0,10);
}
export function shiftWeek(monday:string,offset:number) {
 const date=new Date(monday+'T12:00:00Z');date.setUTCDate(date.getUTCDate()+offset*7);return mondayOfWeek(date.toISOString().slice(0,10));
}


export const executionStatusLabels = {running:'Inicio registrado',completed:'Completada',failed:'Fallida',interrupted:'Interrumpida',cancelled:'Cancelada',unconfirmed:'Sin cierre confirmado'};




