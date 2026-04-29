import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read configuration
const configPath = path.join(__dirname, 'stories-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Calculate current week (1-4)
function getCurrentWeek() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const diff = now - startOfYear;
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const weekNumber = Math.floor(diff / oneWeek) % 4;
  return weekNumber;
}

// Get current day name (lowercase)
function getCurrentDay() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
}

// Get story IDs for today
function getStoriesForToday() {
  const day = getCurrentDay();
  const schedule = config.rotation_logic.day_schedule;

  if (schedule[day]) {
    return schedule[day];
  }

  return [];
}

// Save output to file for logging
function saveOutputToFile() {
  const timestamp = new Date().toISOString().split('T')[0];
  const outputDir = path.join(__dirname, 'stories-generated');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const week = getCurrentWeek();
  const day = getCurrentDay();
  const storiesToday = getStoriesForToday();

  if (storiesToday.length === 0) {
    return;
  }

  let output = `AionSite Daily Stories - ${timestamp}\n`;
  output += `Week ${week + 1} | Day: ${day}\n\n`;

  storiesToday.forEach((storyId) => {
    const story = config.stories[storyId];
    const variation = story.variations[week];

    output += `\n${'='.repeat(80)}\n`;
    output += `${storyId.toUpperCase()} - ${story.nombre}\n`;
    output += `Ángulo: ${variation.angulo}\n`;
    output += `${'='.repeat(80)}\n\n`;

    output += `PROMPT:\n${variation.prompt}\n\n`;
    output += `COPY:\n${variation.copy}\n\n`;
    output += `HASHTAGS:\n${variation.hashtags}\n\n`;
  });

  const filename = `stories-${timestamp}.txt`;
  const filepath = path.join(outputDir, filename);
  fs.writeFileSync(filepath, output);

  console.log(`\n💾 Output saved to: ${filepath}`);
}

saveOutputToFile();
