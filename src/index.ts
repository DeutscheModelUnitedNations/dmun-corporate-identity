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
	const colorsPath = path.join(__dirname, '..', 'src-pkg/colors.yml');
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

// Export all available shade palettes
export function getAllShadePalettes() {
	const colors = loadColors();
	return Object.keys(colors.shades);
}

// Export all available theme names
export function getAllThemeNames() {
	const colors = loadColors();
	return Object.keys(colors.themes);
}

// Generate CSS file paths dynamically
export function getCssFiles() {
	const colors = loadColors();
	const cssFiles: Record<string, any> = {};

	// Add shade CSS files
	cssFiles.shades = {};
	for (const palette of Object.keys(colors.shades)) {
		cssFiles.shades[palette] = `../dist/${palette}-tailwind-shades.css`;
	}

	// Add theme CSS files
	cssFiles.themes = {};
	for (const theme of Object.keys(colors.themes)) {
		cssFiles.themes[theme] = `../dist/dmun-daisyUI-${theme}.css`;
	}

	// Add fonts CSS file
	cssFiles.fonts = '../dist/dmun-fonts.css';

	return cssFiles;
}

// Export CSS file paths for easy importing (dynamic, maintains legacy structure)
export const cssFiles = (() => {
	const colors = loadColors();
	const files: Record<string, any> = {};

	// Legacy structure for backward compatibility
	const firstShade = Object.keys(colors.shades)[0] || 'dmun';
	files.shades = `../dist/${firstShade}-tailwind-shades.css`;

	// Add theme files
	for (const theme of Object.keys(colors.themes)) {
		files[theme] = `../dist/dmun-daisyUI-${theme}.css`;
	}

	// Add fonts file
	files.fonts = '../dist/dmun-fonts.css';

	return files;
})();

// Default export
export default {
	loadColors,
	getColorPalette,
	getTheme,
	getAllThemes,
	getAllShadePalettes,
	getAllThemeNames,
	getCssFiles,
	cssFiles // legacy support
};
