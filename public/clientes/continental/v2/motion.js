const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const replay=document.querySelector('#replay-motion');
const jobs=new Map();
let observer=null;
let active=null;
let queue=[];
const easing='cubic-bezier(.22,1,.36,1)';
const revealX=[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)'}];
const revealY=[{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)'}];
const revealDown=[{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)'}];
// One animation plays at a time. Prepared entrances retain their first frame.
function inView(element){const r=element.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight-24&&r.width>0&&r.height>0;}
function complete(job){
 if(job.state==='done')return;
 job.state='done';job.animation.cancel();observer?.unobserve(job.element);
 if(active===job)active=null;
}
function pump(){
 if(active||reducedMotion.matches)return;
 queue=queue.filter(job=>job.state==='queued');
 while(queue.length){
  const job=queue.shift();
  if(!inView(job.element)){job.state='pending';continue;}
  active=job;job.state='playing';job.element.dataset.pageMotion='played';job.animation.play();return;
 }
}
function prepare(element,frames,duration){
 if(!element||reducedMotion.matches)return null;
 const previous=jobs.get(element);if(previous)complete(previous);
 const animation=element.animate(frames,{duration,easing,fill:'both'});animation.pause();
 const job={element,animation,state:'pending'};jobs.set(element,job);
 animation.finished.then(()=>{complete(job);pump();}).catch(()=>{});
 return job;
}
function enqueue(job,priority=false){
 if(!job||job.state!=='pending')return;
 job.state='queued';if(priority)queue.unshift(job);else queue.push(job);pump();
}
function settleRelated(root){
 if(!root)return;
 jobs.forEach(job=>{if(root===job.element||root.contains(job.element)||job.element.contains(root))complete(job);});
}
const entrances=[
 ['.hero-copy',revealY,620],
 ['.hero-collage',revealX,650],
 ['.welcome-title',revealX,540],
 ['.welcome-copy',revealDown,460],
 ['.city-note',revealX,380],
 ['.education-heading',revealY,520],
 ['.stage-tabs',revealX,560],
 ['.stage-details',revealDown,460],
 ['.visit-intro',revealY,540],
 ['.request-sheet',revealX,600],
 ['.contact-heading',revealX,500],
 ['.contact-details',revealDown,480],
 ['.footer-layout',revealY,440]
];
function initialize(){
 observer?.disconnect();jobs.forEach(complete);jobs.clear();queue=[];active=null;
 replay.disabled=reducedMotion.matches;replay.textContent=reducedMotion.matches?'Movimiento reducido':'Repetir animación';
 if(reducedMotion.matches||!('IntersectionObserver' in window))return;
 observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   const job=jobs.get(entry.target);if(!job||job.state==='done')return;
   if(entry.isIntersecting)enqueue(job);
   else if(job.state==='playing')complete(job);
   else if(job.state==='queued'){job.state='pending';queue=queue.filter(item=>item!==job);}
  });pump();
 },{threshold:0,rootMargin:'0px 0px -24px 0px'});
 entrances.forEach(([selector,frames,duration])=>document.querySelectorAll(selector).forEach(element=>{
  prepare(element,frames,duration);observer.observe(element);
 }));
}
function interaction(root,element,frames,duration){
 settleRelated(root);
 // Keep focused controls fully visible throughout their interaction.
 if(element?.contains(document.activeElement)){pump();return;}
 if(active)complete(active);
 enqueue(prepare(element,frames,duration),true);
}
document.addEventListener('continental:stage-change',()=>{
 const panel=document.querySelector('.stage-panel:not([hidden])');
 interaction(document.querySelector('#etapas'),panel,[{opacity:.55},{opacity:1}],240);
});
document.addEventListener('continental:visit',()=>{
 settleRelated(document.querySelector('#visita'));pump();
});
document.querySelector('.menu').addEventListener('click',()=>{
 if(document.querySelector('.menu').getAttribute('aria-expanded')==='true')interaction(document.querySelector('#navigation'),document.querySelector('#navigation'),revealDown,220);
});
document.addEventListener('focusin',event=>{settleRelated(event.target);pump();});
// If a rapid scroll abandons an entrance, finish it rather than delaying the next scene.
let scrollFrame=0;
addEventListener('scroll',()=>{if(scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;if(active&&!inView(active.element))complete(active);pump();});},{passive:true});
replay.addEventListener('click',()=>{document.querySelector('#inicio').scrollIntoView({behavior:'instant'});initialize();});
reducedMotion.addEventListener('change',initialize);
initialize();
