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
 if(active||reducedMotion.matches||sliderMoving)return;
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
 ['.hero-copy',[{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'none'}],560],
 ['.hero-collage',[{clipPath:'circle(0% at 65% 45%)'},{clipPath:'circle(110% at 65% 45%)'}],720],
 ['.education-heading',[{opacity:0,clipPath:'inset(18% 0 18% 0 round 24px)'},{opacity:1,clipPath:'inset(0% 0 0% 0 round 0px)'}],500],
 ['.contact-section',[{opacity:0,clipPath:'inset(8% 0 8% 0 round 36px)'},{opacity:1,clipPath:'inset(0% 0 0% 0 round 0px)'}],560],
 ['.footer-layout',[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],400]
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
let sliderTimer;
let sliderMoving=false;
document.addEventListener('continental:stage-motion',()=>{
 settleRelated(document.querySelector('#etapas'));
 if(active)complete(active);
 sliderMoving=true;clearTimeout(sliderTimer);
 sliderTimer=setTimeout(()=>{sliderMoving=false;pump();},660);
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

// Two institutional fields expand toward the reader; their children stay still.
const scaleSections=['#colegio','#visita'].map(selector=>document.querySelector(selector));
scaleSections.forEach(section=>{const wrapper=document.createElement('div');wrapper.className='scale-section-wrap';section.before(wrapper);wrapper.append(section);});
function updateSectionScale(){
 const header=document.querySelector('.header-ground').getBoundingClientRect().height;
 const available=Math.max(1,innerHeight-header),center=header+available/2;
 scaleSections.forEach(section=>{
  const box=section.parentElement.getBoundingClientRect();
  const distance=Math.abs(box.top+box.height/2-center);
  const plateau=Math.abs(box.height-available)/2;
  const proximity=Math.max(0,Math.min(1,1-(distance-plateau)/(available*.65)));
  section.style.scale=reducedMotion.matches||section.contains(document.activeElement)?'1':String(.75+.25*proximity);
 });
}
let scaleFrame=0;
function requestSectionScale(){if(scaleFrame)return;scaleFrame=requestAnimationFrame(()=>{scaleFrame=0;updateSectionScale();});}
addEventListener('scroll',requestSectionScale,{passive:true});addEventListener('resize',requestSectionScale);
document.addEventListener('focusin',requestSectionScale);reducedMotion.addEventListener('change',requestSectionScale);updateSectionScale();
