from playwright.sync_api import sync_playwright
import json
from pathlib import Path
out=Path('.impeccable/review/v2-motion-critique-B');rows=[]
with sync_playwright() as p:
 b=p.chromium.launch()
 for w,h in [(1250,695),(375,812)]:
  page=b.new_page(viewport={'width':w,'height':h});page.goto('http://127.0.0.1:8794/v2/index.html?premium=9');page.wait_for_timeout(1400)
  page.locator('#etapas').evaluate('(e)=>e.scrollIntoView({behavior:"instant"})');page.wait_for_timeout(40)
  page.locator('[role=tab]').first.focus();page.keyboard.press('ArrowRight');page.wait_for_timeout(160)
  rows.append({'width':w,'type':'keyboard stage during entrance','evidence':page.evaluate('''()=>{const a=document.getAnimations().filter(a=>a.playState==='running');const d=a=>({target:a.effect.target.className,time:a.currentTime,clip:getComputedStyle(a.effect.target).clipPath});return {running:a.map(d),actualActive:a.filter(a=>a.currentTime>=a.effect.getTiming().delay).length,conflicts:a.flatMap(x=>a.filter(y=>x!==y&&x.effect.target.contains(y.effect.target)).map(y=>[d(x),d(y)]))}}''')})
  page.screenshot(path=str(out/f'{w}-conflict.png'));page.wait_for_timeout(1500)
  page.locator('#replay-motion').click(force=True);page.wait_for_timeout(450)
  rows.append({'width':w,'type':'replay 450ms','evidence':page.evaluate('''()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,actualActive:document.getAnimations().filter(a=>a.playState==='running'&&a.currentTime>=a.effect.getTiming().delay).length})''')})
  page.close()
 b.close()
(out/'targeted-evidence.json').write_text(json.dumps(rows,indent=2));print(json.dumps(rows,indent=2))
