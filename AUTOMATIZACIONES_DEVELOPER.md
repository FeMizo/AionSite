# Automatizaciones para Developers 🚀
**Scripts y soluciones técnicas para maximizar eficiencia**

---

## 📋 TABLA DE CONTENIDOS
1. [Repurposing automático de contenido](#repurposing-automático)
2. [Publicación en redes desde CMS](#publicación-desde-cms)
3. [Email automático desde blog](#email-automático)
4. [Dashboard de métricas](#dashboard)
5. [Lead tracking y CRM](#lead-tracking)

---

## Repurposing Automático

### Opción 1: Node.js + APIs (Recomendado)

**Objetivo:** Crear 1 blog post → auto-generar carrusel Instagram, video, email

```javascript
// repurpose-content.js
const sharp = require('sharp');
const axios = require('axios');
const fs = require('fs');

async function repurposeContent(blogPost) {
  const { title, content, image, slug } = blogPost;
  
  // 1. Generar carrusel Instagram (5 slides)
  const slides = content
    .split('\n\n')
    .filter(p => p.length > 50)
    .slice(0, 5)
    .map((text, i) => ({
      number: i + 1,
      text: text.substring(0, 150) + '...',
      image: image
    }));

  await generateInstagramSlides(slides, slug);

  // 2. Generar script para video (30 seg)
  const videoScript = generateVideoScript(title, slides[0].text);
  fs.writeFileSync(`videos/${slug}-script.txt`, videoScript);

  // 3. Generar email newsletter
  const emailHTML = generateEmailTemplate(title, content.substring(0, 300), slug);
  fs.writeFileSync(`emails/${slug}-newsletter.html`, emailHTML);

  // 4. Generar preview Twitter/LinkedIn
  const twitterThreads = generateTwitterThreads(content, 5);
  fs.writeFileSync(`social/${slug}-threads.txt`, twitterThreads);

  console.log(`✅ Repurposing completado para: ${slug}`);
  return {
    slides,
    videoScript,
    email: emailHTML,
    twitterThreads
  };
}

// Generar slides de Instagram con Canva API o Sharp
async function generateInstagramSlides(slides, slug) {
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    
    // Crear imagen 1080x1350 (estándar Instagram)
    await sharp({
      create: {
        width: 1080,
        height: 1350,
        channels: 3,
        background: { r: 245, g: 245, b: 245 }
      }
    })
    .png()
    .toFile(`instagram/${slug}-slide-${i + 1}.png`);
    
    // Aquí agregarías texto y diseño
    console.log(`Slide ${i + 1}/${slides.length} generada`);
  }
}

function generateVideoScript(title, description) {
  return `
    [0-3 seg] Hook visual + Título
    "${title}"
    
    [3-20 seg] Content principal
    "${description}"
    
    [20-25 seg] CTA
    "Lee el artículo completo en aionsite.com.mx"
    
    [25-30 seg] Logo + WhatsApp CTA
  `;
}

function generateEmailTemplate(title, content, slug) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: #1a1a1a; color: white; padding: 20px; }
        .content { padding: 20px; }
        .cta { background: #007AFF; color: white; padding: 12px 24px; 
               text-decoration: none; border-radius: 6px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${title}</h1>
        </div>
        <div class="content">
          <p>${content}</p>
          <br>
          <a href="https://aionsite.com.mx/${slug}" class="cta">Leer artículo completo</a>
        </div>
        <div style="border-top: 1px solid #ccc; padding-top: 20px; color: #666; font-size: 12px;">
          <p>© AionSite 2024 | <a href="#">Desuscribirse</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateTwitterThreads(content, tweets) {
  const sentences = content.split('.').filter(s => s.trim().length > 0);
  const thread = [];
  
  for (let i = 0; i < Math.min(tweets, sentences.length); i++) {
    thread.push(`${i + 1}/${tweets} ${sentences[i].trim()}`);
  }
  
  return thread.join('\n\n');
}

module.exports = { repurposeContent };
```

**Usar con webhook:**
```javascript
// pages/api/webhook/blog-published.js
import { repurposeContent } from '@/lib/repurpose-content';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const blogPost = req.body;
    
    try {
      const repurposed = await repurposeContent(blogPost);
      
      // Auto-publicar en Buffer/Zapier
      await publishToBuffer(repurposed.slides);
      await sendEmail(repurposed.email);
      
      res.status(200).json({ success: true, repurposed });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

---

## Publicación desde CMS

### Opción 2: WordPress + Plugin Automático

Si usas WordPress:

```php
<?php
// functions.php - Auto-publicar en Facebook e Instagram cuando publicas post

add_action('publish_post', 'auto_publish_to_social', 10, 1);

function auto_publish_to_social($post_id) {
    $post = get_post($post_id);
    
    if (!get_post_meta($post_id, 'published_to_social', true)) {
        // Obtener token de Facebook Graph API
        $facebook_token = get_option('facebook_graph_token');
        $page_id = get_option('facebook_page_id');
        
        $message = $post->post_title . "\n\n" . 
                   wp_trim_excerpt($post_id) . "\n\n" .
                   get_permalink($post_id);
        
        // POST a Facebook
        $response = wp_remote_post(
            "https://graph.facebook.com/v18.0/{$page_id}/feed",
            array(
                'method' => 'POST',
                'body' => array(
                    'message' => $message,
                    'link' => get_permalink($post_id),
                    'picture' => get_the_post_thumbnail_url($post_id),
                    'access_token' => $facebook_token
                )
            )
        );
        
        update_post_meta($post_id, 'published_to_social', true);
    }
}
?>
```

### Opción 3: NextJS + API Routes

```javascript
// lib/social-publisher.js
export async function publishToFacebook(post) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${process.env.FACEBOOK_PAGE_ID}/feed`,
    {
      method: 'POST',
      body: JSON.stringify({
        message: post.title,
        link: post.url,
        picture: post.imageUrl,
        access_token: process.env.FACEBOOK_TOKEN
      })
    }
  );
  
  return response.json();
}

export async function publishToInstagram(post) {
  // Para Reels/Feed
  const response = await fetch(
    `https://graph.instagram.com/${process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`,
    {
      method: 'POST',
      body: JSON.stringify({
        image_url: post.imageUrl,
        caption: post.caption,
        access_token: process.env.INSTAGRAM_TOKEN
      })
    }
  );
  
  return response.json();
}
```

---

## Email Automático desde Blog

### Con Brevo + Zapier (Sin código)

1. Configurar Webhook en blog/CMS
2. Zapier captura el webhook
3. Trigger: "Blog post publicado"
4. Action: Enviar email por Brevo
5. Template: Automático desde Brevo

### Con Node.js (Más control)

```javascript
// lib/email-automation.js
import brevo from '@getbrevo/brevo';

const client = new brevo.ApiClient();
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
const transactionalEmailsApi = new brevo.TransactionalEmailsApi();

export async function sendNewsletterEmail(blogPost) {
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = blogPost.title;
  sendSmtpEmail.htmlContent = `
    <h1>${blogPost.title}</h1>
    <p>${blogPost.excerpt}</p>
    <a href="${blogPost.url}">Leer más</a>
  `;
  
  // Obtener lista de suscriptores desde Brevo
  sendSmtpEmail.to = [{ email: "contact@aionsite.com.mx" }];
  sendSmtpEmail.replyTo = { email: "contact@aionsite.com.mx" };
  
  // Enviar a todos los suscriptores
  const listId = 2; // ID de lista en Brevo
  sendSmtpEmail.listIds = [listId];
  
  try {
    const data = await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
    console.log('Email enviado:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## Dashboard de Métricas

### Google Data Studio (Gratis)

Conectar:
1. Google Analytics 4 (tráfico sitio)
2. Google Search Console (SEO)
3. Google Sheets (leads manuales)

**Crear dashboards personalizados:**
- Visitantes únicos/mes
- Tasa de conversión
- Leads generados
- Top posts por engagement

### Custom Dashboard (Node.js + React)

```javascript
// components/MetricsDashboard.jsx
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function MetricsDashboard() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetchMetrics();
  }, []);

  async function fetchMetrics() {
    const response = await fetch('/api/metrics');
    const data = await response.json();
    setMetrics(data);
  }

  return (
    <div className="dashboard">
      <div className="grid grid-cols-3 gap-4">
        <MetricCard 
          title="Visitantes este mes" 
          value={metrics.visitors} 
        />
        <MetricCard 
          title="Leads generados" 
          value={metrics.leads} 
        />
        <MetricCard 
          title="Tasa conversión" 
          value={`${metrics.conversionRate}%`} 
        />
      </div>
      
      <LineChart width={800} height={400} data={metrics.daily}>
        <CartesianGrid />
        <XAxis dataKey="date" />
        <YAxis />
        <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
```

---

## Lead Tracking y CRM

### Solución Simple: Google Sheets + Apps Script

```javascript
// apps-script.js (en Google Sheets)
function setupWebhook() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const webhookUrl = ScriptApp.getService().getUrl();
  console.log("Webhook URL: " + webhookUrl);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow([
    new Date(),
    data.nombre,
    data.email,
    data.telefono,
    data.urlSitio,
    'Nuevo'
  ]);
  
  // Enviar respuesta
  return ContentService.createTextOutput("Lead capturado");
}
```

### Con Brevo + Automation

```javascript
// pages/api/lead-capture.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre, email, telefono, urlSitio } = req.body;
    
    // 1. Guardar en Brevo como contacto
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        firstName: nombre,
        attributes: {
          TELEFONO: telefono,
          URL_SITIO: urlSitio,
          FECHA_REGISTRO: new Date()
        }
      })
    });
    
    // 2. Enviar email automático de bienvenida
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: [{ email }],
        subject: '¡Hola ' + nombre + '! Tu auditoría está en camino',
        htmlContent: `
          <h1>Hola ${nombre}</h1>
          <p>Recibimos tu solicitud de auditoría para ${urlSitio}</p>
          <p>Te enviaremos un análisis completo en las próximas 24 horas</p>
          <a href="https://wa.me/+5215551234567?text=Hola%20quiero%20saber%20más">
            Chat con nosotros en WhatsApp
          </a>
        `
      })
    });
    
    // 3. Guardar en Google Sheets también
    await fetch(process.env.GOOGLE_SHEETS_WEBHOOK, {
      method: 'POST',
      body: JSON.stringify({ nombre, email, telefono, urlSitio })
    });
    
    res.status(200).json({ success: true });
  }
}
```

---

## Automatizaciones con Zapier (Alternativa sin código)

### Setup básico (Gratis):

**Zap 1: Blog → Email**
- Trigger: "Blog post published en WordPress"
- Action: "Send email via Brevo" 
- Template: Newsletter automática

**Zap 2: Lead form → Multiple actions**
- Trigger: "Form submitted en sitio"
- Action 1: Add to Brevo contact list
- Action 2: Send welcome email
- Action 3: Add to Google Sheets
- Action 4: Send Slack notification

**Zap 3: Instagram tag → Follow up**
- Trigger: "New Instagram mention"
- Action: "Add to Brevo as contact"
- Action: "Send email with special offer"

---

## Checklist de Implementación

- [ ] Instalar dependencias Node (sharp, axios, brevo)
- [ ] Configurar variables de entorno (.env)
- [ ] Setup Facebook/Instagram Graph API tokens
- [ ] Crear webhook en blog para publicación
- [ ] Setup Zapier con 3 Zaps básicos
- [ ] Crear templates de emails en Brevo
- [ ] Crear script de repurposing automático
- [ ] Setup Google Data Studio
- [ ] Prueba con 1 blog post real
- [ ] Monitorear y ajustar

---

## Recursos

- [Facebook Graph API Docs](https://developers.facebook.com/docs/graph-api)
- [Brevo API Docs](https://developers.brevo.com/docs)
- [Zapier No-Code Automation](https://zapier.com)
- [Google Apps Script](https://script.google.com)

