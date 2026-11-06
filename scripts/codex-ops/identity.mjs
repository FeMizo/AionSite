/** Parse only the leading scheduler envelope. No message text leaves this function. */
export function heartbeatIdentity(item, automations, startedAt) {
  if (item?.type !== 'userMessage') return null;
  const text=(item.content??[]).filter(x=>x.type==='text').map(x=>x.text??'').join('\n');
  const match=text.match(/^\s*<heartbeat>\s*<automation_id>([A-Za-z0-9_-]{1,200})<\/automation_id>\s*<current_time_iso>([^<]{1,60})<\/current_time_iso>/);
  if(!match)return null;
  const automation=automations.find(a=>a.id===match[1]);const at=Date.parse(match[2]);
  if(!automation||!/^\d{4}-\d{2}-\d{2}T.+(?:Z|[+-]\d{2}:\d{2})$/.test(match[2])||!Number.isFinite(at)||(startedAt&&Math.abs(startedAt*1000-at)>120000))return null;
  return {automationId:automation.id,triggeredAt:new Date(at).toISOString()};
}

export async function readTurnIdentity(api, threadId, turnId, automations, startedAt) {
  let cursor;
  for(let page=0;page<3;page++){
    const result=await api.request('thread/items/list',{threadId,turnId,limit:1,sortDirection:'asc',...(cursor?{cursor}:{})});
    const item=result.data?.[0]?.item;
    if(item?.type==='userMessage')return {identityChecked:true,...(heartbeatIdentity(item,automations,startedAt)??{})};
    cursor=result.nextCursor;if(!cursor)return {identityChecked:true};
  }
  return {identityChecked:false};
}

