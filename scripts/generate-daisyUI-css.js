import fs from 'fs';
import yaml from 'js-yaml';

const yml = fs.readFileSync('./src-pkg/colors.yml', 'utf8');
const config = yaml.load(yml);

const { shades, themes } = config;

// Ensure dist directory exists
fs.mkdirSync('./dist', { recursive: true });

// Generate CSS files for each theme dynamically
for (const [themeName, themeConfig] of Object.entries(themes)) {
	let css = `/* Generated DaisyUI theme: ${themeName} */\n@plugin "daisyui/theme" {\n`;

	// Add visual properties
	for (const [visualKey, visualValue] of Object.entries(themeConfig.visuals)) {
		css += `  --${visualKey}: ${visualValue};\n`;
	}

	// Add color mappings
	for (const [colorKey, shadeRef] of Object.entries(themeConfig.colors)) {
		if (shadeRef.startsWith('#')) {
			// Direct hex color
			css += `  --${colorKey}: ${shadeRef};\n`;
			continue;
		}

		// Handle shade references like "primary-500"
		const [colorName, shadeLevel] = shadeRef.split('-');
		let resolvedValue = null;

		if (shadeLevel) {
			// Look for the color in any shade palette (prioritize 'dmun' for backward compatibility)
			const shadePalettes = Object.keys(shades);
			for (const palette of ['dmun', ...shadePalettes.filter(p => p !== 'dmun')]) {
				if (shades[palette] && shades[palette][colorName]) {
					resolvedValue = `var(--color-${colorName}-${shadeLevel})`;
					break;
				}
			}
		} else {
			// Direct color reference without shade level
			const shadePalettes = Object.keys(shades);
			for (const palette of ['dmun', ...shadePalettes.filter(p => p !== 'dmun')]) {
				if (shades[palette] && shades[palette][colorName]) {
					resolvedValue = shades[palette][colorName];
					break;
				}
			}
		}

		if (resolvedValue) {
			css += `  --${colorKey}: ${resolvedValue};\n`;
		} else {
			console.warn(`⚠️  Could not resolve color reference: ${shadeRef} for ${colorKey} in theme ${themeName}`);
		}
	}

	css += '}\n';

	const filename = `./dist/dmun-daisyUI-${themeName}.css`;
	fs.writeFileSync(filename, css);
	console.log(`Generated ${filename}`);
}
