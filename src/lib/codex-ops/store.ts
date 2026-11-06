import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { emptyState, type State } from './core';
const folder=()=>{const p=process.env.CODEX_OPS_DATA_DIR || path.join(process.env.LOCALAPPDATA || path.join(os.homedir(),'AppData','Local'),'AionSite','codex-ops');if(!p||!path.isAbsolute(p))throw Error('Configure CODEX_OPS_DATA_DIR absoluto y fuera de public');if(p.split(/[\\/]/).includes('public'))throw Error('Directorio público prohibido');return p;};
export const enabled=()=>process.env.CODEX_OPS_ENABLED!=='false'&&process.env.NODE_ENV==='development';
export async function readState():Promise<State>{try{return JSON.parse(await fs.readFile(path.join(folder(),'state.json'),'utf8'));}catch(e){if((e as NodeJS.ErrnoException).code==='ENOENT')return emptyState();throw e;}}
let queue:Promise<unknown>=Promise.resolve();
export function transact<T>(fn:(s:State)=>T):Promise<T>{const work=queue.then(async()=>{const p=folder();await fs.mkdir(p,{recursive:true});const lock=path.join(p,'write.lock');const handle=await fs.open(lock,'wx');try{const state=await readState();const result=fn(state);state.samples=state.samples.slice(-5000);state.changes=state.changes.slice(-1000);const temp=path.join(p,'state.tmp');await fs.writeFile(temp,JSON.stringify(state),{mode:0o600});await fs.rename(temp,path.join(p,'state.json'));return result;}finally{await handle.close();await fs.unlink(lock);}});queue=work.catch(()=>{});return work;}

