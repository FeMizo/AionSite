# Security Best Practices Report — AionSite

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Nodemailer · Tailwind CSS  
**Fecha:** 2026-04-27

---

## Resumen ejecutivo

El sitio tiene **4 vulnerabilidades críticas** relacionadas con la ausencia total de autenticación en el panel de administración y sus APIs. Cualquier persona con la URL puede leer, modificar y sobreescribir el contenido del sitio, subir archivos al servidor, y abusar del formulario de contacto para envío masivo de emails. Adicionalmente hay inyección HTML en los emails de contacto y ausencia de límites en la subida de archivos.

---

## CRÍTICO

### [C-1] Panel de administración sin autenticación
**Archivos:** `app/admin/layout.tsx` (línea 10-16), sin `middleware.ts`  
**Impacto:** Cualquier persona con la URL puede acceder al panel admin completo y modificar todo el contenido del sitio.

Las rutas `/admin`, `/admin/content`, `/admin/sections`, `/admin/settings` no tienen ningún mecanismo de autenticación. El único "bloqueo" es `robots: { index: false }` en el layout, lo cual solo evita indexación en buscadores — no protege el acceso real.

---

### [C-2] API de CMS sin autenticación — escritura arbitraria de contenido
**Archivo:** `app/api/cms/content/route.ts` (líneas 25-39)  
**Impacto:** Cualquier atacante puede sobreescribir todo el contenido del sitio (defacement completo) con un simple `PUT`.

```
PUT /api/cms/content   ← sin token, sin sesión, sin IP whitelist
```

El endpoint `GET` también expone toda la estructura de datos del CMS públicamente.

---

### [C-3] API de About sin autenticación — escritura arbitraria
**Archivo:** `app/api/about/content/route.ts` (líneas 25-39)  
**Impacto:** Igual a C-2 pero para la página About.

```
PUT /api/about/content   ← sin autenticación
```

---

### [C-4] API de subida de imágenes sin autenticación ni límite de tamaño
**Archivo:** `app/api/uploads/image/route.ts` (líneas 37-79)  
**Impacto:** Cualquier persona puede subir archivos al servidor, llenando el disco y potencialmente ejecutando XSS vía SVG.

Problemas específicos:
- Sin autenticación — endpoint público
- Sin límite de tamaño: `maybeFile.arrayBuffer()` en línea 63 carga el archivo entero en memoria
- SVG está permitido (`image/svg+xml`, línea 32 en `getFileExtension`) — los SVG pueden contener JavaScript inline y ejecutar XSS cuando se sirven desde el mismo origen (`/uploads/`)
- El MIME type check (`file.type.startsWith("image/")`, línea 49) es del cliente y puede ser manipulado; no valida el contenido real del archivo

---

## ALTO

### [H-1] Inyección HTML en email de contacto
**Archivo:** `app/api/contact/route.ts` (líneas 26-34)  
**Impacto:** Un atacante puede inyectar HTML arbitrario en el email que recibe el equipo de AionSite, incluyendo links falsos o contenido de phishing.

Los campos `name`, `email` y `message` se insertan directamente en el template HTML sin escapar:

```ts
<p><strong>Nombre:</strong> ${name}</p>   // línea 29 — sin escapar
<p><strong>Correo:</strong> ${email}</p>  // línea 30 — sin escapar
<p ...>${message}</p>                     // línea 32 — sin escapar
```

Ejemplo de ataque:
```
name = <a href="https://malicious.com">Haz clic para ver el adjunto</a>
```

---

### [H-2] Sin rate limiting en ninguna API
**Archivos:** Todas las rutas en `app/api/`  
**Impacto:** 
- `/api/contact`: abuso del servidor SMTP para spam masivo sin costo para el atacante
- `/api/uploads/image`: llenado de disco con peticiones en bucle
- `/api/cms/content` y `/api/about/content`: flood de escrituras

No existe middleware de rate limiting ni validación de frecuencia por IP.

---

## MEDIO

### [M-1] Sin validación de longitud en campos del formulario de contacto
**Archivo:** `app/api/contact/route.ts` (líneas 5-8)  
Solo se valida presencia (`!name || !email || !message`), no longitud máxima. Un campo `message` de 10MB genera un email de 10MB al servidor SMTP.

### [M-2] Email no validado como dirección real antes de usarse como `replyTo`
**Archivo:** `app/api/contact/route.ts` (línea 24)  
El campo `email` se usa directamente como `replyTo` sin validar formato. Aunque Nodemailer lo maneja, un valor malformado puede causar comportamiento inesperado en algunos servidores SMTP.

---

## BAJO

### [L-1] `@google/genai` instalado pero no utilizado
**Archivo:** `package.json` (línea 13)  
Dependencia sin uso que aumenta la superficie de ataque. Si se mantiene, verificar que `GEMINI_API_KEY` nunca esté expuesta en el cliente.

---

## Plan de acción priorizado

| # | Acción | Severidad | Esfuerzo |
|---|--------|-----------|----------|
| 1 | Agregar `middleware.ts` con token de admin para `/admin/*` y `/api/cms/*`, `/api/about/*`, `/api/uploads/*` | Crítico | Bajo |
| 2 | Bloquear SVG en uploads + validar tamaño máximo (ej. 5MB) | Crítico | Muy bajo |
| 3 | Escapar HTML en el email de contacto | Alto | Muy bajo |
| 4 | Agregar rate limiting básico por IP en `/api/contact` | Alto | Bajo |
| 5 | Validar longitud máxima de campos en contacto | Medio | Muy bajo |
| 6 | Validar formato de email con regex básico | Medio | Muy bajo |
| 7 | Remover `@google/genai` si no se usa | Bajo | Muy bajo |
