// Test script to verify the fonts export structure
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the fonts.js file
const fontsContent = readFileSync(join(__dirname, 'lib/fonts.js'), 'utf-8');

// Check that all required imports are present
const requiredImports = [
  // Outfit imports
  '@fontsource/outfit/100.css',
  '@fontsource/outfit/200.css',
  '@fontsource/outfit/300.css',
  '@fontsource/outfit/400.css',
  '@fontsource/outfit/500.css',
  '@fontsource/outfit/600.css',
  '@fontsource/outfit/700.css',
  '@fontsource/outfit/800.css',
  '@fontsource/outfit/900.css',
  
  // Roboto Mono imports
  '@fontsource/roboto-mono/100.css',
  '@fontsource/roboto-mono/200.css',
  '@fontsource/roboto-mono/300.css',
  '@fontsource/roboto-mono/400.css',
  '@fontsource/roboto-mono/500.css',
  '@fontsource/roboto-mono/600.css',
  '@fontsource/roboto-mono/700.css',
  '@fontsource/roboto-mono/800.css',
  '@fontsource/roboto-mono/900.css',
  
  // Vollkorn imports
  '@fontsource/vollkorn/100.css',
  '@fontsource/vollkorn/200.css',
  '@fontsource/vollkorn/300.css',
  '@fontsource/vollkorn/400.css',
  '@fontsource/vollkorn/500.css',
  '@fontsource/vollkorn/600.css',
  '@fontsource/vollkorn/700.css',
  '@fontsource/vollkorn/800.css',
  '@fontsource/vollkorn/900.css'
];

console.log('🔍 Checking fonts export...');

let allImportsFound = true;
for (const importPath of requiredImports) {
  if (fontsContent.includes(importPath)) {
    console.log(`✓ Found: ${importPath}`);
  } else {
    console.log(`✗ Missing: ${importPath}`);
    allImportsFound = false;
  }
}

if (allImportsFound) {
  console.log('\n✅ All required font imports are present in lib/fonts.js');
  console.log('✅ Font export is ready for use in bundler environments');
} else {
  console.log('\n❌ Some font imports are missing');
  process.exit(1);
}
