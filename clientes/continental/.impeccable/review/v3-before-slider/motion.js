const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const mobile=window.matchMedia('(max-width:760px)');
const replay=document.querySelector('#replay-motion');
const running=new Set();
function stopMotion(){running.forEach(animation=>animation.cancel());running.clear();}
function play(element,frames,options){
 if(!element||reducedMotion.matches)return;
 element.getAnimations().forEach(animation=>animation.cancel());
 const animation=element.animate(frames,{easing:'cubic-bezier(.23,1,.32,1)',...options});running.add(animation);animation.finished.catch(()=>{}).finally(()=>running.delete(animation));return animation;
}
function welcome(){
 stopMotion();if(reducedMotion.matches)return;
 play(document.querySelector('.hero h1'),[{opacity:.4,transform:'translateY(20px)'},{opacity:1,transform:'none'}],{duration:600});
 play(document.querySelector('.hero-copy>p'),[{opacity:.5,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:500,delay:80});
 play(document.querySelector('.hero-collage'),[{opacity:.4,transform:'translateY(28px) scale(.97)'},{opacity:1,transform:'none'}],{duration:650,delay:100});
}
function syncPreference(){if(reducedMotion.matches)stopMotion();replay.disabled=reducedMotion.matches;replay.textContent=reducedMotion.matches?'Movimiento reducido':'Repetir animación';}
replay.addEventListener('click',()=>{document.querySelector('#inicio').scrollIntoView({behavior:'instant'});welcome();});
document.querySelector('.menu').addEventListener('click',event=>{const panel=document.querySelector('#navigation');if(mobile.matches&&event.detail>0&&document.querySelector('.menu').getAttribute('aria-expanded')==='true')play(panel,[{opacity:.5,transform:'translateY(-8px)'},{opacity:1,transform:'none'}],{duration:220});});
document.addEventListener('continental:stage-change',()=>play(document.querySelector('.stage-panel:not([hidden])'),[{opacity:.4},{opacity:1}],{duration:220}));
document.addEventListener('continental:visit',()=>play(document.querySelector('.request-sheet'),[{opacity:.5,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:280}));
reducedMotion.addEventListener('change',syncPreference);syncPreference();
if(document.readyState==='complete')welcome();else window.addEventListener('load',welcome,{once:true});
// Whole-page motion: one entrance per section, with composition-specific sequences.
// Default styles remain visible; observers never hide content before it is reached.
const pageSequences = [
 { root:'.welcome', items:[['.welcome-title',0,'left'],['.welcome-copy',100,'rise'],['.city-note',180,'fade']] },
 { root:'.education', items:[['.education-heading',0,'rise'],['.stage-tabs',100,'fade'],['.stage-details',180,'rise'],['.section-note',260,'fade']] },
 { root:'.visit-section', items:[['.visit-intro',0,'left'],['.request-sheet',120,'settle']] },
 { root:'.contact-section', items:[['.contact-heading',0,'rise'],['.contact-details',140,'left']] },
 { root:'.footer', items:[['.footer-brand',0,'fade'],['.footer-layout>p',90,'fade'],['.footer-layout>div:last-child',170,'fade']] }
];
let pageObserver=null;
let enteredSections=new WeakSet();
function entranceFrames(kind){
 if(kind==='left')return [{opacity:.25,transform:'translateX(-22px)'},{opacity:1,transform:'none'}];
 if(kind==='settle')return [{opacity:.25,transform:'translateY(20px) scale(.985)'},{opacity:1,transform:'none'}];
 if(kind==='rise')return [{opacity:.25,transform:'translateY(24px)'},{opacity:1,transform:'none'}];
 return [{opacity:.2},{opacity:1}];
}
function observePageMotion(reset=false){
 pageObserver?.disconnect();
 if(reset)enteredSections=new WeakSet();
 if(reducedMotion.matches||!('IntersectionObserver' in window))return;
 pageObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(!entry.isIntersecting||enteredSections.has(entry.target))return;
   enteredSections.add(entry.target);pageObserver.unobserve(entry.target);
   const sequence=pageSequences.find(item=>entry.target.matches(item.root));
   if(!sequence)return;
   sequence.items.forEach(([selector,delay,kind])=>{
    const element=entry.target.querySelector(selector);
    const animation=play(element,entranceFrames(kind),{duration:520,delay});
    if(animation)element.dataset.pageMotion='played';
   });
  });
 },{threshold:0,rootMargin:'0px 0px -70px 0px'});
 pageSequences.forEach(sequence=>{
  const section=document.querySelector(sequence.root);
  if(section&&!enteredSections.has(section))pageObserver.observe(section);
 });
}
reducedMotion.addEventListener('change',()=>observePageMotion());
replay.addEventListener('click',()=>observePageMotion(true));
observePageMotion();
