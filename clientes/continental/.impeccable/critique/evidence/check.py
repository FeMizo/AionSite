import json, pathlib
from playwright.sync_api import sync_playwright
root=pathlib.Path(r'C:/Users/mizo_/Documents/Trabajo/Personal/AionSite/clientes/continental')
out=root/'.impeccable/critique/evidence'
report={'nativeBrowserFailure':'Browser is already in use; used independent Python Playwright process','visible':False,'viewports':[]}
with sync_playwright() as p:
 b=p.chromium.launch(headless=True)
 page=b.new_page()
 logs=[]
 page.on('console',lambda m:logs.append({'type':m.type,'text':m.text}))
 page.goto('http://127.0.0.1:8794/')
 page.wait_for_selector('#levels-list details')
 report['preflight']=page.evaluate('''() => {const t=document.title;document.title='[Human] '+t; const s=document.createElement('script');s.id='critique-preflight';s.textContent='window.__critiquePreflight=true';document.head.append(s);return {title:document.title,script:window.__critiquePreflight};}''')
 for width in [390,1440]:
  page.set_viewport_size({'width':width,'height':900})
  page.screenshot(path=str(out/f'render-{width}.png'),full_page=True)
  report['viewports'].append(page.evaluate('''() => ({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,images:[...document.images].map(i=>({loaded:i.complete&&i.naturalWidth>0,src:i.currentSrc})),jsonLoaded:document.querySelectorAll('#levels-list details').length,contactStatus:document.querySelector('#contact-status').innerText,whatsappHidden:document.querySelector('#whatsapp').hidden})'''))
 page.set_viewport_size({'width':390,'height':900})
 page.locator('.menu').click()
 report['menuOpen']=page.locator('.menu').get_attribute('aria-expanded')
 page.keyboard.press('Escape')
 report['menuEscape']=page.locator('.menu').get_attribute('aria-expanded')
 page.locator('.menu').click()
 page.locator('nav a').first.click()
 report['menuNavigationCloses']=page.locator('.menu').get_attribute('aria-expanded')
 page.locator('summary').first.click()
 report['accordionOpen']=page.locator('details').first.get_attribute('open') is not None
 page.locator('summary').first.click()
 report['accordionCloses']=page.locator('details').first.get_attribute('open') is None
 page.evaluate('window.scrollTo(0,0)')
 try:
  page.add_script_tag(url='http://localhost:8400/detect.js')
  page.wait_for_timeout(3000)
  report['overlayInjected']=True
 except Exception as e:report['overlayInjectionError']=str(e)
 report['console']=logs
 report['impeccableConsole']=[l for l in logs if 'impeccable' in l['text'].lower()]
 page.screenshot(path=str(out/'overlay.png'),full_page=True)
 b.close()
report['cleanup']='Independent headless browser closed. No UI/source edits. Preflight DOM and overlay removed by browser close. Live server stopped separately with --keep-inject. Server started immediately before preflight, rather than after; no source injection performed.'
(out/'browser.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
