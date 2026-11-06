import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { enabled,transact,readState } from '@/src/lib/codex-ops/store';
import { sampleSchema,ruleSchema,mergeLimits,executionSchema } from '@/src/lib/codex-ops/core';
import { ingestSchedule } from '@/src/lib/codex-ops/history';
import { ingestExecution,ingestTurns,coverageSchema,turnSnapshotSchema,reconcileMissingClosures,reconcileScheduledChecks } from '@/src/lib/codex-ops/executions';
export const runtime='nodejs';
const payload=z.object({turnSnapshots:z.array(turnSnapshotSchema).max(200).optional(),runCoverage:coverageSchema.optional(),sample:sampleSchema.optional(),execution:executionSchema.optional(),rules:z.array(ruleSchema).max(500).optional(),collector:z.enum(['Conectado','Cuotas no disponibles']).optional()}).strict();
export async function POST(request:Request){if(!enabled())return new Response(null,{status:503});const expected=process.env.CODEX_OPS_COLLECTOR_TOKEN;const token=request.headers.get('authorization')?.replace(/^Bearer /,'');if(!expected||!token||Buffer.byteLength(token)!==Buffer.byteLength(expected)||!timingSafeEqual(Buffer.from(token),Buffer.from(expected)))return new Response(null,{status:401});try{const text=await request.text();if(text.length>200000)return new Response(null,{status:413});const data=payload.parse(JSON.parse(text));await transact(s=>{if(data.execution)ingestExecution(s,data.execution);if(data.turnSnapshots)ingestTurns(s,data.turnSnapshots);if(data.runCoverage){s.runsReadError=false;s.runCoverage={...s.runCoverage,...data.runCoverage};s.runsSyncedAt=new Date().toISOString();}reconcileMissingClosures(s,new Date().toISOString());if(data.sample&&!s.samples.some(x=>x.id===data.sample!.id)){const last=s.samples.at(-1);if(last&&data.sample.at<=last.at)throw Error('Muestra fuera de orden');const stamped=structuredClone(data.sample.limits);for(const w of Object.values(stamped))for(const q of Object.values(w))if(q)q.observedAt=data.sample.at;s.samples.push({...data.sample,limits:mergeLimits(last?.limits??{},stamped)});s.syncedAt=data.sample.at;}if(data.rules){ingestSchedule(s,data.rules,new Date().toISOString());}reconcileScheduledChecks(s,new Date().toISOString());s.collector=data.collector??s.collector;});return NextResponse.json({ok:true});}catch{return NextResponse.json({error:'Formato inválido o escritura ocupada'},{status:400});}}





export async function GET(request:Request){
 if(!enabled())return new Response(null,{status:503});
 const expected=process.env.CODEX_OPS_COLLECTOR_TOKEN;const token=request.headers.get('authorization')?.replace(/^Bearer /,'');
 if(!expected||!token||Buffer.byteLength(token)!==Buffer.byteLength(expected)||!timingSafeEqual(Buffer.from(token),Buffer.from(expected)))return new Response(null,{status:401});
 return NextResponse.json({runCoverage:(await readState()).runCoverage??{},identityChecks:(await readState()).executions?.filter(e=>e.identityChecked).map(e=>({threadId:e.threadId,turnId:e.turnId,identityChecked:true}))??[]},{headers:{'Cache-Control':'no-store'}});
}


