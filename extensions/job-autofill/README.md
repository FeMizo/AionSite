# AionSite Job Autofill

Extensión de Chrome para auto-rellenar formularios de vacantes compatibles con el perfil guardado en AionSite.

## Flujo

1. Configura la URL base de AionSite en `options.html`.
2. Sincroniza el perfil desde `/api/admin/jobs/content`.
3. Abre una vacante compatible o una página de aplicación.
4. La extensión intenta rellenar automáticamente los campos visibles.

## Sitios soportados inicialmente

- Greenhouse
- Ashby
- Lever
- Workable
- SmartRecruiters
- Workday
- iCIMS
- LinkedIn
- Indeed
- Computrabajo

## Notas

- No envía formularios.
- No salta captchas ni bloqueos anti-bot.
- Rellena solo campos compatibles y visibles.
- Si la página carga campos de forma tardía, la extensión sigue intentando durante unos segundos.
