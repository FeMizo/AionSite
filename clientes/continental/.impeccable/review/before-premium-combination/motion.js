const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobile = window.matchMedia('(max-width:760px)');
const trigger = document.querySelector('.menu');
const panel = document.querySelector('#navigation');
const replay = document.querySelector('#replay-motion');
const running = new Set();
const ease = 'cubic-bezier(.23,1,.32,1)';
function stopMotion() { running.forEach(animation => animation.cancel()); running.clear(); }
function play(element, frames, options) {
  if (!element || reducedMotion.matches) return;
  const animation = element.animate(frames, { easing:ease, ...options });
  running.add(animation);animation.finished.catch(()=>{}).finally(()=>running.delete(animation));return animation;
}
function welcome() {
  stopMotion();
  if(reducedMotion.matches) return;
  play(document.querySelector('.hero h1'),[{opacity:.4,transform:'translateY(22px)'},{opacity:1,transform:'none'}],{duration:600});
  play(document.querySelector('.hero-copy>p'),[{opacity:.5,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:500,delay:90});
  play(document.querySelector('.opening-gallery'),[{opacity:.4,transform:'translateY(30px) scale(.98)'},{opacity:1,transform:'none'}],{duration:650,delay:120});
}
function syncPreference() {
  if(reducedMotion.matches) stopMotion();
  replay.disabled=reducedMotion.matches;
  replay.textContent=reducedMotion.matches?'Movimiento reducido':'Repetir animación';
}
replay.addEventListener('click',()=>{document.querySelector('#inicio').scrollIntoView({behavior:'instant'});welcome();});
trigger.addEventListener('click',event=>{
 if(trigger.getAttribute('aria-expanded')==='true'&&mobile.matches&&event.detail>0) play(panel,[{opacity:.45,transform:'translateY(-10px)'},{opacity:1,transform:'none'}],{duration:220});
});
document.addEventListener('continental:stage-change',()=>play(document.querySelector('.stage-panel:not([hidden])'),[{opacity:.45},{opacity:1}],{duration:220}));
document.addEventListener('click',event=>{
 if(event.target.closest('.stage-choice'))play(document.querySelector('.request-sheet'),[{opacity:.5,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:280});
});
reducedMotion.addEventListener('change',syncPreference);syncPreference();
if(document.readyState==='complete') welcome();else window.addEventListener('load',welcome,{once:true});
