import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
const root=process.cwd();
http.createServer(async(req,res)=>{try{const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(path!==root&&!path.startsWith(root+'\\')){res.writeHead(403).end();return;}const file=path===root?resolve(root,'index.html'):path;const data=await readFile(file);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(data)}catch{res.writeHead(404).end('No encontrado')}}).listen(8794,'127.0.0.1',()=>console.log('http://127.0.0.1:8794/'));
