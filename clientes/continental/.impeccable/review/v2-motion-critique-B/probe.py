from playwright.sync_api import sync_playwright
import json,time
from pathlib import Path
out=Path('.impeccable/review/v2-motion-critique-B')
js='''() => {const aa=document.getAnimations().filter(a=>a.playState==='running');const describe=a=>{const e=a.effect.target; const c=getComputedStyle(e); return {target:e.tagName+'.'+e.className,id:e.id,time:a.currentTime,delay:a.effect.getTiming().delay,clip:c.clipPath,opacity:c.opacity}};return {running:aa.map(describe),paused:document.getAnimations().filter(a=>a.playState==='paused').length,conflicts:aa.flatMap(a=>aa.filter(b=>a!==b&&a.effect.target.contains(b.effect.target)).map(b=>[describe(a).target,describe(b).target])),overflow:document.documentElement.scrollWidth>innerWidth}}'''
results=[]
with sync_playwright() as p:
 b=p.chromium.launch(headless=True)
 for w,h in [(1250,695),(375,812)]:
  page=b.new_page(viewport={'width':w,'height':h}); errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.goto('http://127.0.0.1:8794/v2/index.html?premium=9',wait_until='domcontentloaded');page.wait_for_selector('[role=tab]')
  rec={'size':[w,h],'opening':page.evaluate(js)}
  page.screenshot(path=str(out/f'{w}-opening.png'))
  page.wait_for_timeout(1500)
  page.locator('#etapas').evaluate('(e)=>e.scrollIntoView({behavior:"instant"})');page.wait_for_timeout(80)
  page.locator('[role=tab]').nth(1).click(force=True,no_wait_after=True);page.wait_for_timeout(40)
  rec['stageDuringEntrance']=page.evaluate(js);page.screenshot(path=str(out/f'{w}-stage-entrance.png'))
  for i in [0,1300,2600,3900,0,2600]:
   page.evaluate('(y)=>window.scrollTo({top:y,behavior:"instant"})',i);page.wait_for_timeout(45)
  rec['rapidScroll']=page.evaluate(js);page.wait_for_timeout(1500)
  page.locator('#replay-motion').click(force=True);page.wait_for_timeout(60);rec['replay']=page.evaluate(js)
  page.wait_for_timeout(1400)
  page.locator('[role=tab]').first.focus();page.keyboard.press('ArrowRight');rec['keyboardTab']=page.evaluate('''()=>{const e=document.activeElement,c=getComputedStyle(e);return {id:e.id,outline:c.outline,ancestors:[e,...function*(e){while(e.parentElement){e=e.parentElement;yield e}}(e)].map(x=>({class:x.className,clip:getComputedStyle(x).clipPath}))}}''')
  page.locator('#stage').focus();rec['keyboardSelect']=page.evaluate('''()=>{const e=document.activeElement;return {id:e.id,ancestors:[e,...function*(e){while(e.parentElement){e=e.parentElement;yield e}}(e)].map(x=>({class:x.className,clip:getComputedStyle(x).clipPath}))}}''')
  page.screenshot(path=str(out/f'{w}-keyboard.png'))
  page.emulate_media(reduced_motion='reduce');page.wait_for_timeout(60);rec['reduced']=page.evaluate(js);rec['reducedReplayDisabled']=page.locator('#replay-motion').is_disabled();rec['errors']=errors
  results.append(rec);page.close()
 b.close()
(out/'browser-evidence.json').write_text(json.dumps(results,indent=2),encoding='utf8')
print(json.dumps(results,indent=2))
