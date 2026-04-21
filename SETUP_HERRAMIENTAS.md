# Setup de Herramientas 🛠️
**Guía paso a paso para configuración inicial**

---

## 1️⃣ EMAIL MARKETING - BREVO

### Configuración (15 min)

1. **Crear cuenta**
   - Ir a: https://www.brevo.com/
   - Sign up gratuito
   - Confirmar email

2. **Conectar con sitio web**
   ```javascript
   // En tu sitio web (NextJS, WordPress, etc)
   // Agregar formulario con ID de Brevo
   
   <!-- Formulario simple de Brevo -->
   <form method="POST" action="https://app.brevo.com/form/submit" 
         class="form" id="form">
     <input type="hidden" name="action" value="addcontact" />
     <input type="hidden" name="email_subject_id" value="123456789" />
     <input type="hidden" name="to_folder_id" value="1" />
     
     <input type="text" name="FIRSTNAME" placeholder="Tu nombre" required />
     <input type="email" name="EMAIL" placeholder="Tu email" required />
     <input type="url" name="WEBSITE" placeholder="URL de tu sitio" />
     
     <button type="submit">Recibir auditoría gratis</button>
   </form>
   ```

3. **Crear primera lista de contactos**
   - En Brevo dashboard: Contacts → Lists → Create
   - Nombre: "Newsletter general"
   - Describir: "Suscriptores de newsletter"

4. **Crear primer email**
   - Email templates → New template
   - Nombre: "Bienvenida auditoría"
   - Tipo: Automation
   - Trigger: "Nuevo contacto añadido a list"

5. **Crear secuencia automática**
   ```
   Email 1 (inmediato): Bienvenida
   ↓
   Email 2 (día 2): Tip SEO  
   ↓
   Email 3 (día 4): Case study
   ↓
   Email 4 (día 7): Oferta
   ```

---

## 2️⃣ PROGRAMACIÓN DE REDES - BUFFER

### Configuración (10 min)

1. **Crear cuenta**
   - Ir a: https://buffer.com/
   - Sign up gratuito (100 posts/mes)

2. **Conectar Instagram**
   - Settings → Connected Accounts
   - Click "Connect to Instagram"
   - Autorizar con tu account de IG
   - Seleccionar: @aionsite.webs

3. **Conectar Facebook**
   - Settings → Connected Accounts  
   - Click "Connect to Facebook"
   - Autorizar
   - Seleccionar página: /aionsite

4. **Crear primeros posts**
   - Click "Compose"
   - Escribir o pegar contenido
   - Agregar imagen
   - Select channels: Instagram + Facebook
   - Schedule para mañana a las 9 AM

5. **Configurar horarios**
   - Analytics → Optimal posting times
   - Buffer sugiere mejores horas para publicar

---

## 3️⃣ AUTOMATIZACIONES - ZAPIER

### Configuración (30 min)

**Zap 1: Blog publicado → Email automático**

1. Ir a: https://zapier.com/
2. Sign up gratuito
3. Click "Create Zap"

```
TRIGGER:
App: WordPress
Event: New Post (published)
Blog: aionsite.com.mx

CONDITION:
Category = Blog (no publicidad)

ACTION 1:
App: Brevo
Action: Create Contact
Email: Post URL
List: Newsletter

ACTION 2:
App: Brevo  
Action: Send Email
Template: Newsletter semanal
To: All list contacts
Variables:
  - {post_title}
  - {post_excerpt}
  - {post_url}
```

**Zap 2: Formulario → Múltiples acciones**

```
TRIGGER:
App: Your website form
Event: New submission

ACTION 1:
App: Brevo
Action: Create Contact
Map: nombre, email, website

ACTION 2:
App: Brevo
Action: Add tag
Tag: "Lead caliente"

ACTION 3:
App: Google Sheets
Action: Create Spreadsheet Row
Columns: fecha, nombre, email, website

ACTION 4:
App: Gmail
Action: Send email
To: contact@aionsite.com.mx
Mensaje: "[NUEVO LEAD] {nombre} - {email}"
```

**Zap 3: Instagram mention → Follow up**

```
TRIGGER:
App: Instagram
Event: New mention

ACTION:
App: Brevo
Create contact from mention
Add tag: "Mencionado en IG"
Send welcome email
```

---

## 4️⃣ ANALYTICS - GOOGLE DATA STUDIO

### Configuración (20 min)

1. **Crear dashboard**
   - Ir a: https://datastudio.google.com/
   - New → Report
   - Nombre: "AionSite - Métricas"

2. **Conectar Google Analytics 4**
   - Add data → Select Google Analytics 4
   - Seleccionar propiedad: aionsite.com.mx
   - Autorizar

3. **Conectar Google Search Console**
   - Add data → Select Google Search Console
   - Seleccionar propiedad: aionsite.com.mx
   - Autorizar

4. **Crear cards de métricas**

   **Tarjeta 1: Visitantes**
   ```
   Métrica: Users
   Dimensión: Date
   Gráfico: Line chart
   ```

   **Tarjeta 2: Leads**
   ```
   Fuente: Google Sheets (con leads)
   Métrica: Contar registros
   Rango: Últimos 30 días
   ```

   **Tarjeta 3: Conversión**
   ```
   Métrica: Leads / Visitors
   Fórmula: (Leads / Users) * 100
   ```

   **Tarjeta 4: Top posts**
   ```
   Métrica: Pageviews
   Dimensión: Page title
   Top 10
   ```

---

## 5️⃣ PIXEL DE FACEBOOK

### Configuración (10 min)

1. **Crear pixel**
   - Facebook Business Manager
   - Eventos → Pixeles
   - Crear pixel nuevo
   - Nombre: "AionSite pixel"
   - Copiar ID

2. **Instalar en sitio**
   
   ```html
   <!-- En <head> de tu sitio -->
   <script>
     !function(f,b,e,v,n,t,s)
     {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
     n.callMethod.apply(n,arguments):n.queue.push(arguments)};
     if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
     n.queue=[];t=b.createElement(e);t.async=!0;
     t.src=v;s=b.getElementsByTagName(e)[0];
     s.parentNode.insertBefore(t,s)}(window, document,'script',
     'https://connect.facebook.net/en_US/fbevents.js');
     fbq('init', 'TU_PIXEL_ID_AQUÍ');
     fbq('track', 'PageView');
   </script>
   ```

3. **Trackear eventos**
   
   ```html
   <!-- Al enviar formulario de lead -->
   <script>
     fbq('track', 'Lead');
   </script>
   
   <!-- Al descargar auditoría -->
   <script>
     fbq('track', 'Download');
   </script>
   ```

4. **Crear audiencia personalizada**
   - Business Manager → Audiencias
   - Custom audience → Website traffic
   - Seleccionar pixel
   - Crear audiencia para retargeting

---

## 6️⃣ SEO - GOOGLE SEARCH CONSOLE

### Configuración (5 min)

1. **Ir a**: https://search.google.com/search-console

2. **Agregar propiedad**
   - URL prefix: https://aionsite.com.mx
   - Verificar propiedad (agregar DNS record o HTML)

3. **Enviar sitemap**
   - Settings → Sitemaps
   - Enviar: https://aionsite.com.mx/sitemap.xml

4. **Revisar mensajes**
   - Dashboard mostrará errores a arreglar
   - Monitorear rankings principales keywords

---

## 7️⃣ GOOGLE ANALYTICS 4

### Configuración (5 min)

1. **Ya debería estar en tu sitio**
   - Si no, agregar tracking ID en sitio

2. **Crear eventos personalizados**
   
   ```javascript
   // Cuando alguien envía formulario
   gtag('event', 'lead_form_submitted', {
     'form_type': 'audiencia_gratis'
   });
   
   // Cuando alguien descarga archivo
   gtag('event', 'file_download', {
     'file_name': 'checklist_seo.pdf'
   });
   ```

3. **Crear conversiones**
   - Admin → Conversions
   - Nombre: "Lead capturado"
   - Event: lead_form_submitted

---

## 8️⃣ CANVA PRO (Opcional)

### Configuración (2 min)

1. **Suscribirse**
   - https://www.canva.com/pricing/
   - Plan Pro: $10/mes
   - O gratuito si puedes vivir con limitaciones

2. **Templates para guardar**
   - Crear template Instagram post
   - Crear template carousel
   - Crear template email header
   - Duplicar y editar rápidamente

---

## 9️⃣ CAPCCUT (Gratis)

### Configuración (0 min - listo para usar)

1. **Descargar**
   - https://www.capcut.com
   - Desktop o mobile

2. **Templates **
   - Usar templates de IG Reels
   - Templates de TikTok
   - Editar en 10 minutos

---

## 🔟 MAKE.COM (Alternativa Zapier)

### Configuración (30 min)

1. **Crear cuenta**
   - https://www.make.com/
   - Gratuito: 1000 operaciones/mes

2. **Crear primer scenario**
   
   ```
   TRIGGER:
   WordPress → Post published
   
   REPEATER:
   Tomar párrafos del post
   
   ACTIONS:
   1. Redimensionar imagen
   2. Guardar en Dropbox
   3. Publicar en Instagram
   4. Publicar en Facebook
   5. Enviar email
   ```

---

## 📋 CHECKLIST CONFIGURACIÓN - DÍA 1

### Mañana:
- [ ] Crear cuenta Brevo (5 min)
- [ ] Crear cuenta Buffer (5 min)
- [ ] Crear cuenta Zapier (5 min)
- [ ] **Total: 15 minutos**

### Tarde:
- [ ] Conectar IG a Buffer (5 min)
- [ ] Conectar FB a Buffer (5 min)
- [ ] Crear lista en Brevo (5 min)
- [ ] Crear landing page auditoría (30 min)
- [ ] **Total: 45 minutos**

### Noche:
- [ ] Setup Google Search Console (5 min)
- [ ] Crear Zap en Zapier (30 min)
- [ ] Crear dashboard Google Data Studio (20 min)
- [ ] Instalar pixel Facebook (10 min)
- [ ] **Total: 65 minutos**

### Total Día 1: ~2 horas

---

## 📋 CHECKLIST CONFIGURACIÓN - DÍA 2

### Mañana:
- [ ] Crear primeros 4 posts en Buffer
- [ ] Programar para próximas 2 semanas
- [ ] **Total: 1 hora**

### Tarde:
- [ ] Escribir primer blog post
- [ ] Publicar blog post
- [ ] Email automático debería enviarse
- [ ] **Total: 2 horas**

### Noche:
- [ ] Grabar primer video Reels
- [ ] Editar en CapCut (15 min)
- [ ] Subir a Instagram
- [ ] **Total: 45 min**

### Total Día 2: ~4 horas

---

## 🎯 RESULTADO FINAL

Después de 2 días, tendrás:

✅ Email marketing automático (Brevo)
✅ Posts programados (Buffer)
✅ Automatizaciones (Zapier)
✅ Analytics en tiempo real (Google Data Studio)
✅ Retargeting setup (Facebook Pixel)
✅ SEO monitoreado (Search Console)
✅ Primeros posts publicados
✅ Landing page para leads
✅ Blog post con email automático
✅ Video creado

**Siguiente paso:** Mantener consistencia 3-4 horas/semana.

