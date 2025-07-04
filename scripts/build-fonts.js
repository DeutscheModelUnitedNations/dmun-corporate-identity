#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the source fonts.js file
const srcFontsPath = path.resolve(__dirname, '../src-pkg/fonts.js');
const libDir = path.resolve(__dirname, '../lib');

// Ensure lib directory exists
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

// Read the fonts.js content
const fontsContent = fs.readFileSync(srcFontsPath, 'utf-8');

// Write as CommonJS (fonts.js)
const cjsPath = path.join(libDir, 'fonts.js');
fs.writeFileSync(cjsPath, fontsContent);

// Write as ES Module (fonts.mjs)
const mjsPath = path.join(libDir, 'fonts.mjs');
fs.writeFileSync(mjsPath, fontsContent);

console.log('✓ Generated lib/fonts.js (CommonJS)');
console.log('✓ Generated lib/fonts.mjs (ES Module)');
