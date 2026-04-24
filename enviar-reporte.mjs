#!/usr/bin/env node

import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 587,
  secure: false,
  auth: {
    user: 'contacto@aionsite.com.mx',
    pass: process.env.SMTP_PASS || 'Bodoke0723!'
  }
});

async function sendReport() {
  try {
    // Leer el archivo del reporte
    const reportPath = path.join(__dirname, 'REPORTE_AIONSITE_2026_04_23.md');
    const reportContent = fs.readFileSync(reportPath, 'utf-8');

    // Convertir markdown a HTML básico
    const htmlContent = reportContent
      .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
      .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/\|\s/g, '| ')
      .replace(/^<br>/gm, '');

    // Preparar el email
    const mailOptions = {
      from: 'contacto@aionsite.com.mx',
      to: 'contacto@aionsite.com.mx',
      subject: '[AionSite] Reporte Semanal de Mejoras - 23 de abril de 2026',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f5f5f5; border-left: 4px solid #0066cc; padding: 20px; margin-bottom: 20px;">
            <h2 style="margin-top: 0; color: #333;">📊 REPORTE SEMANAL DE MEJORAS - AionSite</h2>
            <p style="color: #666; font-size: 14px;">
              <strong>Fecha:</strong> 23 de abril de 2026<br>
              <strong>Hora de ejecución:</strong> 02:15 UTC<br>
              <strong>Versión del sitio:</strong> 1.17.16
            </p>
          </div>

          <div style="background-color: #e8f4f8; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #0066cc;">🔍 ESTADO GENERAL</h3>
            <p><strong>Estado:</strong> ✅ <span style="color: #28a745;">OPERACIONAL - CON ALERTAS MENORES</span></p>
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #0066cc;">🎯 TOP 3 HALLAZGOS</h3>
            <ol style="line-height: 1.8;">
              <li><strong>Actualización de Módulos v1.17.16</strong> - Todas las dependencias actualizadas a última versión. React 19.2.4, Next.js 15.1.7, Tailwind CSS 4.2.1.</li>
              <li><strong>Estructura de Contenido Optimizada</strong> - 11 componentes React funcionales, sistema CMS personalizado completamente operacional, blog dinámico con imágenes destacadas.</li>
              <li><strong>Infraestructura de Email Verificada</strong> - SMTP configurado en Hostinger, sistema de contacto funcional, Nodemailer integrado correctamente.</li>
            </ol>
          </div>

          <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #cc7700;">⚠️ PROBLEMAS IDENTIFICADOS</h3>
            <ul style="line-height: 1.8;">
              <li><strong>Dependencia Extraneous:</strong> @emnapi/runtime@1.8.1 - Ejecutar <code style="background-color: #f5f5f5; padding: 2px 5px; border-radius: 3px;">npm prune</code></li>
              <li><strong>Animaciones Motion:</strong> Verificar impacto en Core Web Vitals</li>
              <li><strong>Schema Markup SEO:</strong> No implementado - Recomendar JSON-LD</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #0066cc;">💡 RECOMENDACIONES PRIORITARIAS</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <tr style="background-color: #f5f5f5;">
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Prioridad</th>
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Acción</th>
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Tiempo</th>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 10px;"><span style="color: #dc3545; font-weight: bold;">🔴 Alta</span></td>
                <td style="border: 1px solid #ddd; padding: 10px;">Ejecutar cleanup npm prune</td>
                <td style="border: 1px solid #ddd; padding: 10px;">15 min</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="border: 1px solid #ddd; padding: 10px;"><span style="color: #dc3545; font-weight: bold;">🔴 Alta</span></td>
                <td style="border: 1px solid #ddd; padding: 10px;">Medir Core Web Vitals en producción</td>
                <td style="border: 1px solid #ddd; padding: 10px;">30 min</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 10px;"><span style="color: #dc3545; font-weight: bold;">🔴 Alta</span></td>
                <td style="border: 1px solid #ddd; padding: 10px;">Optimizar animaciones Motion</td>
                <td style="border: 1px solid #ddd; padding: 10px;">1-2 horas</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="border: 1px solid #ddd; padding: 10px;"><span style="color: #ff9800; font-weight: bold;">🟡 Media</span></td>
                <td style="border: 1px solid #ddd; padding: 10px;">Implementar JSON-LD Schema</td>
                <td style="border: 1px solid #ddd; padding: 10px;">1 hora</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #0066cc;">📈 MÉTRICAS CLAVE</h3>
            <ul style="line-height: 1.8;">
              <li><strong>Componentes React:</strong> 11 ✅</li>
              <li><strong>Rutas API:</strong> 4 ✅</li>
              <li><strong>Tamaño Build Estático:</strong> 30 MB 📦</li>
              <li><strong>Versión Node:</strong> 19+ ✅</li>
              <li><strong>Dependencias Actualizadas:</strong> 17 ✅</li>
            </ul>
          </div>

          <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #28a745;">🚀 PUNTUACIÓN GENERAL</h3>
            <p style="font-size: 24px; font-weight: bold; margin: 10px 0; color: #28a745;">7.6/10 ✅</p>
            <p style="margin-bottom: 0; color: #666;">
              Excelente actualización tecnológica | Seguridad buena | Performance con oportunidades de mejora
            </p>
          </div>

          <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px; color: #666; font-size: 12px;">
            <p style="margin: 5px 0;">
              <strong>📞 Próxima revisión:</strong> 30 de abril de 2026<br>
              <strong>📋 Duración del análisis:</strong> ~2 horas<br>
              <strong>✨ Sistema:</strong> Mejoras Automáticas AionSite v1.0
            </p>
            <p style="margin-top: 15px; font-style: italic;">
              Para consultas o aclaraciones, contactar a Felipe Miss (femiss0693@gmail.com)
            </p>
          </div>
        </div>
      `,
      text: reportContent,
      attachments: [
        {
          filename: 'REPORTE_AIONSITE_2026_04_23.md',
          content: reportContent,
          contentType: 'text/markdown'
        }
      ]
    };

    // Enviar el email
    console.log('📧 Enviando reporte a contacto@aionsite.com.mx...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado exitosamente!');
    console.log(`   ID de mensaje: ${info.messageId}`);
    console.log(`   Respuesta: ${info.response}`);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error al enviar el reporte:', error.message);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  sendReport()
    .then(result => {
      console.log('\n🎉 Proceso completado exitosamente');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Error fatal:', error);
      process.exit(1);
    });
}

export { sendReport };
