# Setup: Tarea Programada Daily Stories - AionSite

## 📋 Descripción
Este sistema genera automáticamente contenido para Instagram Stories (Prompt + Copy + Hashtags) cada día a las 7:00 AM, con rotación semanal para evitar contenido repetitivo.

## 📁 Archivos Necesarios
- `stories-config.json` - Configuración completa (colores, dimensiones, variaciones)
- `generate-daily-stories.js` - Script Node.js que genera el contenido diario

## 🔧 Instalación Rápida

### Paso 1: Verificar Node.js
```bash
node --version
npm --version
```
Si no tienes instalado Node.js, descargalo desde https://nodejs.org/

### Paso 2: Probar el script manualmente
```bash
cd D:\IGNITE\Documents\Trabajo\LG\projects\AionSite
node generate-daily-stories.js
```

Deberías ver las historias del día con Prompt + Copy + Hashtags.

## ⏰ Crear Tarea Programada (Windows)

### Opción A: Con Claude (Recomendado)
1. En Claude, abre un nuevo chat (NO dentro de una tarea programada)
2. Di: "Crea una tarea programada para ejecutar el script de AionSite a las 7 AM diariamente"
3. Claude creará la tarea automáticamente

### Opción B: Manual con Windows Task Scheduler

1. **Abre Task Scheduler:**
   - Windows Key + R
   - Escribe: `taskschd.msc`
   - Presiona Enter

2. **Crea Nueva Tarea:**
   - Click derecho en "Task Scheduler Library"
   - Selecciona "Create Task..."

3. **Pestaña General:**
   - Name: `AionSite Daily Stories`
   - Description: `Genera contenido Instagram Stories cada día`
   - Selecciona: "Run whether user is logged in or not"

4. **Pestaña Triggers:**
   - Click "New..."
   - Begin the task: "On a schedule"
   - Daily
   - Start: Today (o cualquier día)
   - Time: 7:00 AM
   - Recurrence: Daily, repeat every 1 day
   - Click OK

5. **Pestaña Actions:**
   - Click "New..."
   - Action: "Start a program"
   - Program/script: `C:\Program Files\nodejs\node.exe` (o ruta donde instalaste Node)
   - Arguments: `"D:\IGNITE\Documents\Trabajo\LG\projects\AionSite\generate-daily-stories.js"`
   - Start in: `D:\IGNITE\Documents\Trabajo\LG\projects\AionSite`
   - Click OK

6. **Pestaña Conditions:**
   - Desactiva "Stop the task if it runs longer than..."
   - Click OK

7. **Guarda la Tarea**

## 🔍 Verificar que Funciona

### Método 1: Ver el historio
1. Abre Task Scheduler
2. Busca "AionSite Daily Stories"
3. Click derecho → Properties → History
4. Verifica que la tarea se ejecutó sin errores

### Método 2: Test Manual
```bash
node generate-daily-stories.js
```

## 📊 Sistema de Rotación

**Week 1:** Variation 0 (e.g., "Confusión", "Dinero Perdido", "Diagnóstico")
**Week 2:** Variation 1 (e.g., "Profundidad", "Oportunidad", "No Sabes")
**Week 3:** Variation 2 (e.g., "ROI", "Competencia", "Actúa")
**Week 4:** Variation 3 (e.g., "Futuro", "Inversión", "Confía")

Cada semana, el mismo día muestra una historia DIFERENTE (mismo story ID, diferente ángulo).

## 📅 Schedule Semanal

- **Monday:** Story 1 (Plataformas)
- **Tuesday:** Story 2 (Conversión)
- **Wednesday:** Story 3 (Consulta Gratis)
- **Thursday:** Story 1 (Plataformas)
- **Friday:** Story 2 (Conversión)

Weekend: Sin publicación programada

## 🎨 Cómo Usar la Salida

El script genera:
1. **PROMPT** - Copia esto a DALL-E, Midjourney o tu herramienta de generación de imágenes
2. **COPY** - Publícalo en la Story
3. **HASHTAGS** - Agrégalo a la descripción de la Story

## ⚙️ Configurar Horario Diferente

Si necesitas cambiar la hora (ej: 9 AM en lugar de 7 AM):

### En Task Scheduler:
1. Click derecho en "AionSite Daily Stories"
2. Properties
3. Triggers → Edit
4. Cambia el Time
5. OK

## 🐛 Troubleshooting

**Error: "node.exe is not recognized"**
- Node no está en PATH
- Solución: Especifica la ruta completa a node.exe en la tarea

**Error: "Cannot find module"**
- Verifica que los archivos JSON y JS estén en la misma carpeta

**Error: "Access Denied"**
- Abre Task Scheduler como Administrator
- En la tarea, marca: "Run with highest privileges"

## 📝 Logs

Para habilitar logs automáticos, descomentar la última línea en generate-daily-stories.js:
```javascript
// Uncomment to save output to file
saveOutputToFile();
```

Esto creará una carpeta `stories-generated/` con archivos de texto diarios.

## ❓ ¿Preguntas?

Cualquier ajuste, contacta a Claude en el proyecto AionSite.
