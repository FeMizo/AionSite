import { occurrences, type Rule, type State, type RuleRevision } from './core';

function initialRevision(rule: Rule, observedAt: string): RuleRevision {
  const supplied = rule.updatedAt ?? rule.createdAt;
  const from = supplied && supplied <= observedAt ? supplied : observedAt;
  return { rule: structuredClone(rule), from, observedAt, source: supplied && supplied <= observedAt ? 'provider' : 'observed' };
}

/** Versions describe known schedules, never proof that a task actually ran. */
export function ingestSchedule(state: State, incoming: Rule[], observedAt: string) {
  if (!state.scheduleHistory) {
    state.scheduleHistory = state.rules.map(old => initialRevision(incoming.find(r => r.id === old.id && r.version === old.version) ?? old, state.scheduleAt ?? observedAt));
  }
  const history = state.scheduleHistory;
  const active = history.filter(r => !r.until);
  for (const previous of active) {
    const next = incoming.find(r => r.id === previous.rule.id);
    if (next?.version === previous.rule.version) {
      previous.rule = structuredClone(next);
      continue;
    }
    // Exact provider update time is usable only between the two observations.
    const update = next?.updatedAt;
    previous.until = update && update >= previous.observedAt && update <= observedAt ? update : observedAt;
  }
  for (const next of incoming) {
    const previous = active.find(r => r.rule.id === next.id);
    if (previous?.rule.version === next.version) continue;
    const revision = initialRevision(next, observedAt);
    if (previous?.until) {
      revision.from = previous.until;
      revision.source = next.updatedAt === previous.until ? 'provider' : 'observed';
    }
    const lastClosed = history.filter(r => r.rule.id === next.id && r.until).sort((a,b) => b.until!.localeCompare(a.until!))[0];
    if (!previous && lastClosed && revision.from < lastClosed.until!) {
      revision.from = next.updatedAt && next.updatedAt >= lastClosed.until! && next.updatedAt <= observedAt ? next.updatedAt : observedAt;
      revision.source = revision.from === next.updatedAt ? 'provider' : 'observed';
    }
    history.push(revision);
  }
  state.rules = incoming;
  state.scheduleAt = observedAt;
}

export function historicalOccurrences(state: State, start: string, days = 7) {
  // Legacy snapshots have a coverage boundary too; do not expand current rules into an unknown past.
  const history = state.scheduleHistory ?? state.rules.map(rule => initialRevision(rule, state.scheduleAt ?? new Date().toISOString()));
  const result: ReturnType<typeof occurrences> = [];
  for (const revision of history) {
    for (const event of occurrences([revision.rule], start, days)) {
      const instant = new Date(event.date+'T'+event.time+':00-06:00').toISOString();
      if (instant < revision.from || (revision.until && instant >= revision.until)) continue;
      if (!result.some(x => x.rule.id === event.rule.id && x.date === event.date && x.time === event.time)) result.push(event);
    }
  }
  return result.sort((a,b) => (a.date+a.time).localeCompare(b.date+b.time));
}

export function scheduleChanges(state: State) {
  const history = state.scheduleHistory ?? [];
  return history.filter(previous => previous.until).map(previous => ({
    previous,
    next: history.find(next => next.rule.id === previous.rule.id && next.from === previous.until),
    changedAt: previous.until!,
  })).sort((a,b) => b.changedAt.localeCompare(a.changedAt));
}

export function scheduleLabel(rule: Rule) {
  const fields:Record<string,string>=Object.fromEntries(rule.rrule.replace(/^RRULE:/,'').split(';').map(v=>v.split('=')));
  const names:Record<string,string>={MO:'Lun',TU:'Mar',WE:'Mié',TH:'Jue',FR:'Vie',SA:'Sáb',SU:'Dom'};
  if (!['DAILY','WEEKLY'].includes(fields.FREQ) || !fields.BYHOUR || !fields.BYMINUTE) return rule.rrule;
  const days=fields.BYDAY?fields.BYDAY.split(',').map(d=>names[d]??d).join(', '):fields.FREQ==='DAILY'?'Cada día':'Semana';
  const times=fields.BYHOUR.split(',').flatMap(h=>fields.BYMINUTE.split(',').map(m=>h.padStart(2,'0')+':'+m.padStart(2,'0'))).join(', ');
  return `${days} · ${times} · ${rule.status==='ACTIVE'?'Activa':'Pausada'}`;
}


