import { NextResponse } from 'next/server';
import { requireAdmin } from '@/src/lib/admin-auth';
import { enabled,readState,transact } from '@/src/lib/codex-ops/store';
import { requestSchema,createChange } from '@/src/lib/codex-ops/core';
import { refreshLocal } from '@/src/lib/codex-ops/local-reader';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET(request:Request){const denied=await requireAdmin(request);if(denied)return denied;if(!enabled())return NextResponse.json({error:'Integración local desactivada'},{status:503});await refreshLocal();return NextResponse.json(await readState(),{headers:{'Cache-Control':'no-store'}});}
export async function POST(request:Request){const denied=await requireAdmin(request);if(denied)return denied;if(!enabled())return NextResponse.json({error:'Desactivado'},{status:503});if(request.headers.get('origin')!==new URL(request.url).origin)return NextResponse.json({error:'Origen inválido'},{status:403});try{if(Number(request.headers.get('content-length'))>8192)throw Error('Solicitud demasiado grande');const body=await request.json();const result=await transact(state=>{if(body.action==='cancel'){const c=state.changes.find(c=>c.id===body.id);if(!c||c.state!=='pending')throw Error('No cancelable');c.state='cancelled';return c;}return createChange(state,requestSchema.parse(body),'administrador-local');});return NextResponse.json(result);}catch{return NextResponse.json({error:'Solicitud inválida, duplicada o en conflicto. Releer datos.'},{status:409});}}

