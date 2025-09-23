import fs from 'fs';
import yaml from 'js-yaml';
import { schema } from '../src-pkg/schema.js';

const yml = fs.readFileSync('./src-pkg/colors.yml', 'utf8');
const rawConfig = yaml.load(yml);

// Validate the configuration against the schema
const parseResult = schema.safeParse(rawConfig);
if (!parseResult.success) {
	console.error('❌ Configuration validation failed:');
	console.error(parseResult.error);
	process.exit(1);
}

const config = parseResult.data;

const { shades, themes } = config;

// Ensure dist directory exists
fs.mkdirSync('./dist', { recursive: true });

// Generate CSS files for each theme dynamically
for (const [themeName, themeConfig] of Object.entries(themes)) {
	let css = `/* Generated DaisyUI theme: ${themeName} */\n@plugin "daisyui/theme" {\n`;

	// Add preferences without dashes
	for (const [prefKey, prefValue] of Object.entries(themeConfig.preferences)) {
		css += `  ${prefKey.replace(/-/g, '_')}: ${prefValue};\n`;
	}

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
		let resolvedValue: string | null = null;

		if (shadeLevel) {
			// Look for the color in any shade palette (prioritize 'dmun' for backward compatibility)
			const shadePalettes = Object.keys(shades);
			for (const palette of ['dmun', ...shadePalettes.filter((p) => p !== 'dmun')]) {
				const paletteColors = shades[palette] as Record<string, string>;
				if (paletteColors && paletteColors[colorName]) {
					resolvedValue = `var(--color-${colorName}-${shadeLevel})`;
					break;
				}
			}
		} else {
			// Direct color reference without shade level
			const shadePalettes = Object.keys(shades);
			for (const palette of ['dmun', ...shadePalettes.filter((p) => p !== 'dmun')]) {
				const paletteColors = shades[palette] as Record<string, string>;
				if (paletteColors && paletteColors[colorName]) {
					resolvedValue = paletteColors[colorName];
					break;
				}
			}
		}

		if (resolvedValue) {
			css += `  --color-${colorKey}: ${resolvedValue};\n`;
		} else {
			console.warn(
				`⚠️  Could not resolve color reference: ${shadeRef} for ${colorKey} in theme ${themeName}`
			);
		}
	}

	css += '}\n';

	const filename = `./dist/dmun-daisyUI-${themeName}.css`;
	fs.writeFileSync(filename, css);
	console.log(`Generated ${filename}`);
}
