import { readTurnIdentity } from './identity.mjs';
// Read-only collection: inspect the first request only to extract its scheduler identifier; never persist message text.
export async function collectExecutionSnapshots(api, targets, priorCoverage = {}, budget = 2, identityBudget = 10) {
  const snapshots = [];
  /** @type {Record<string,{error:boolean;nextCursor?:string|null;lastReadAt?:string;lastAttemptAt?:string;exhausted?:boolean;historicalComplete?:boolean}>} */
  const coverage = {};
  for (const target of targets) {
    const at = new Date().toISOString();
    const known=new Set(target.identityCheckedTurnIds??[]);let identitiesRead=0;
    let cursor = null;
    const previous = priorCoverage[target.threadId] ?? {};
    try {
      const meta = await api.request('thread/read', {threadId: target.threadId});
      for (let page = 0; page < budget; page++) {
        const result = await api.request('thread/turns/list', {threadId: target.threadId, limit: 50, itemsView: 'notLoaded', sortDirection: 'desc', ...(cursor ? {cursor} : {})});
        for (const turn of result.data ?? []) {
          let identity={};
          if(target.automations?.length&&!known.has(turn.id)&&identitiesRead<identityBudget){identitiesRead++;try{identity=await readTurnIdentity(api,target.threadId,turn.id,target.automations,turn.startedAt);}catch{/* retry identification on a later read */}}
          snapshots.push({...identity,
          threadId: target.threadId, taskCodes: target.taskCodes, turnId: turn.id,
          status: turn.status, ...(Number.isFinite(turn.startedAt) && turn.startedAt > 0 ? {startedAt: turn.startedAt} : {}),
          ...(Number.isFinite(turn.completedAt) && turn.completedAt > 0 ? {completedAt: turn.completedAt} : {}),
          ...(Number.isFinite(turn.durationMs) ? {durationMs: turn.durationMs} : {}),
          ...(typeof turn.error?.codexErrorInfo === 'string' && /^[A-Za-z]{1,80}$/.test(turn.error.codexErrorInfo) ? {errorCategory:turn.error.codexErrorInfo} : {}),
          observedAt: at, runtimeStatus: meta.thread?.status?.type ?? 'notLoaded',
        });}
        const next = result.nextCursor ?? null;
        if (page === 0) cursor = previous.nextCursor ?? next;
        else cursor = next;
        if (!cursor) break;
      }
      coverage[target.threadId] = {lastReadAt:at, nextCursor:cursor, exhausted:!cursor, historicalComplete:previous.historicalComplete||!cursor, error:false};
    } catch {
      coverage[target.threadId] = {...previous, error:true, lastAttemptAt:at};
    }
  }
  return {snapshots, coverage};
}

export function executionTargets(rules,executions=[]) {
  const groups = new Map();
  for (const rule of rules) {
    const threadId = rule.targetThreadId;
    if (!threadId) continue;
    const codes = groups.get(threadId) ?? new Set();
    codes.add(rule.code); groups.set(threadId,codes);
  }
  return [...groups].map(([threadId,codes])=>({threadId,taskCodes:[...codes].sort(),automations:rules.filter(r=>r.targetThreadId===threadId).map(r=>({id:r.id})),identityCheckedTurnIds:executions.filter(e=>e.threadId===threadId&&e.identityChecked).map(e=>e.turnId)}));
}





