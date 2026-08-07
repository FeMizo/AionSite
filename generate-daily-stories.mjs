#!/usr/bin/env node

/**
 * AionSite social diario Buffer
 * Reads the stories configuration and generates daily content
 * Run this script daily at 7:00 AM
 */

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

function buildBufferDraft(storyId, story, variation, timestamp) {
  return {
    title: story.nombre,
    text: `${variation.copy}\n\n${variation.hashtags}`,
    services: ["instagram", "facebook"],
    date: timestamp,
    meta: {
      storyId,
      angle: variation.angulo,
      week: variation.semana,
    },
  };
}

// Generate daily output
function generateDailyStories() {
  const week = getCurrentWeek();
  const day = getCurrentDay();
  const storiesToday = getStoriesForToday();

  if (storiesToday.length === 0) {
    console.log(`📅 ${new Date().toLocaleString()}`);
    console.log('No hay publicaciones programadas para hoy.');
    return;
  }

  const timestamp = new Date().toISOString();
  const draftPayloads = [];

  console.log(`\n${'='.repeat(80)}`);
  console.log(`📱 AIONSITE SOCIAL DIARIO BUFFER - ${new Date().toLocaleDateString()}`);
  console.log(`📅 Week: ${week + 1} | Day: ${day.charAt(0).toUpperCase() + day.slice(1)}`);
  console.log(`${'='.repeat(80)}\n`);

  storiesToday.forEach((storyId) => {
    const story = config.stories[storyId];
    const variation = story.variations[week];
    draftPayloads.push(buildBufferDraft(storyId, story, variation, timestamp));

    console.log(`\n${'─'.repeat(80)}`);
    console.log(`📸 ${storyId.toUpperCase()} - ${story.nombre}`);
    console.log(`Ángulo: ${variation.angulo} | Semana ${variation.semana}`);
    console.log(`${'─'.repeat(80)}\n`);

    console.log(`🎨 PROMPT:`);
    console.log(`${variation.prompt}\n`);

    console.log(`📝 COPY:`);
    console.log(`${variation.copy}\n`);

    console.log(`#️⃣ HASHTAGS:`);
    console.log(`${variation.hashtags}\n`);

    console.log(`${'─'.repeat(80)}`);
    console.log(`📋 COPIAR TODO (Prompt + Copy + Hashtags):`);
    console.log(`${'─'.repeat(80)}`);
    const fullContent = `${variation.prompt}\n\n${variation.copy}\n\n${variation.hashtags}`;
    console.log(fullContent);
    console.log(`${'─'.repeat(80)}\n`);
  });

  console.log(`${'='.repeat(80)}`);
  console.log(`✅ Generated at: ${new Date().toLocaleString()}`);
  console.log(`${'='.repeat(80)}\n`);

  const outputDir = path.join(__dirname, 'stories-generated');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const draftPath = path.join(outputDir, `buffer-draft-${new Date().toISOString().slice(0, 10)}.json`);
  fs.writeFileSync(draftPath, `${JSON.stringify(draftPayloads, null, 2)}\n`);
  console.log(`🧩 Buffer draft payload saved to: ${draftPath}`);
}

// Run generator
generateDailyStories();

// Optional: Save output to file for logging
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

  let output = `AionSite social diario Buffer - ${timestamp}\n`;
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

// Uncomment to save output to file
// saveOutputToFile();
