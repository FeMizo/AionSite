import os from 'node:os';
import path from 'node:path';
import { access, readdir, stat } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { connect, normalize, schedules } from '../../../scripts/codex-ops/collector.mjs';
import { mergeLimits, ruleSchema, sampleSchema } from './core';
import { readState, transact } from './store';
import { ingestSchedule } from './history';
import { collectExecutionSnapshots,executionTargets } from '../../../scripts/codex-ops/execution-reader.mjs';
import { coverageSchema,turnSnapshotSchema,ingestTurns,reconcileMissingClosures,reconcileScheduledChecks } from './executions';

let pending: Promise<void> | null = null;
let lastAttempt = 0;
async function executable() {
  if (process.env.CODEX_OPS_EXECUTABLE) return process.env.CODEX_OPS_EXECUTABLE;
  const root = path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local'), 'OpenAI', 'Codex', 'bin');
  const candidates = await Promise.all((await readdir(root)).map(async name => {
    const file = path.join(root, name, 'codex.exe');
    try { await access(file); return { file, modified: (await stat(file)).mtimeMs }; } catch { return null; }
  }));
  const found = candidates.filter(x => x !== null).sort((a,b) => b.modified-a.modified)[0];
  if (!found) throw Error('Codex local no encontrado');
  return found.file;
}
export async function refreshLocal() {
  if (pending) return pending;
  if (Date.now()-lastAttempt < 60000) return;
  lastAttempt = Date.now();
  const before = await readState();
  if (before.scheduleHistory && before.scheduleAt && before.syncedAt && Date.now()-Date.parse(before.scheduleAt)<300000 && Date.now()-Date.parse(before.syncedAt)<300000 && before.runsSyncedAt && Date.now()-Date.parse(before.runsSyncedAt)<60000) return;
  pending = (async () => {
    // Schedule visibility does not depend on quota authentication.
    try {
      const rules = ruleSchema.array().parse(await schedules(process.env.CODEX_HOME || path.join(os.homedir(), '.codex')));
      await transact(s => ingestSchedule(s,rules,new Date().toISOString()));
    } catch {
      await transact(s => {s.collector='Calendario local no disponible; última lectura conservada';});
    }
    let api: ReturnType<typeof connect> | undefined;
    try {
      api = connect(await executable());
      await api.request('initialize',{clientInfo:{name:'aionsite_local_telemetry',version:'0.1.0'}});
      api.send({method:'initialized'});
      const current=await readState();
      try {
        const result=await collectExecutionSnapshots(api,executionTargets(current.rules,current.executions??[]),current.runCoverage??{});
        const turns=turnSnapshotSchema.array().parse(result.snapshots);const coverage=coverageSchema.parse(result.coverage);
        await transact(s=>{ingestTurns(s,turns);s.runsReadError=false;s.runCoverage={...s.runCoverage,...coverage};s.runsSyncedAt=new Date().toISOString();reconcileMissingClosures(s,s.runsSyncedAt);reconcileScheduledChecks(s,s.runsSyncedAt);});
      } catch {await transact(s=>{s.runsReadError=true;reconcileMissingClosures(s,new Date().toISOString());});}
      if(current.syncedAt&&Date.now()-Date.parse(current.syncedAt)<300000)return;
      const sample = sampleSchema.parse({id:randomUUID(),at:new Date().toISOString(),source:'app-server',shared:true,limits:normalize(await api.request('account/rateLimits/read'))});
      if (!Object.keys(sample.limits).length) throw Error('Sin cuotas disponibles');
      for (const windows of Object.values(sample.limits)) for (const quota of Object.values(windows)) if(quota)quota.observedAt=sample.at;
      await transact(s => {s.samples.push({...sample,limits:mergeLimits(s.samples.at(-1)?.limits??{},sample.limits)});s.syncedAt=sample.at;s.collector='Conectado';});
    } catch {
      await transact(s => {s.runsReadError=true;s.collector='Lectura no disponible; últimos datos conservados';reconcileMissingClosures(s,new Date().toISOString());});
    } finally {api?.close();}
  })().finally(() => {pending=null;});
  return pending;
}






