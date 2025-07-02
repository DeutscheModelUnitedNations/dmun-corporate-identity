// DMUN Corporate Identity
// Export colors configuration and utilities

import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load colors configuration
export function loadColors() {
  const colorsPath = path.join(__dirname, '..', 'colors.yml');
  const yml = fs.readFileSync(colorsPath, 'utf8');
  return yaml.load(yml) as {
    shades: Record<string, Record<string, string>>;
    themes: Record<string, any>;
  };
}

// Export individual color palettes
export function getColorPalette(theme: string = 'dmun') {
  const colors = loadColors();
  return colors.shades[theme] || null;
}

// Export theme configurations
export function getTheme(themeName: string = 'light') {
  const colors = loadColors();
  return colors.themes[themeName] || null;
}

// Export all themes
export function getAllThemes() {
  const colors = loadColors();
  return colors.themes;
}

// Export CSS file paths for easy importing
export const cssFiles = {
  shades: '../dist/dmun-tailwind-shades.css',
  light: '../dist/dmun-daisyUI-light.css',
  dark: '../dist/dmun-daisyUI-dark.css',
};

// Default export
export default {
  loadColors,
  getColorPalette,
  getTheme,
  getAllThemes,
  cssFiles,
};
