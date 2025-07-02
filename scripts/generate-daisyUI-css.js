import fs from 'fs';
import yaml from 'js-yaml';

const yml = fs.readFileSync('./colors.yml', 'utf8');
const config = yaml.load(yml);

const { shades, themes } = config;

fs.mkdirSync('./dist', { recursive: true });

for (const [themeName, themeObj] of Object.entries(themes)) {
	let css = `@plugin "daisyui/theme" {\n`;

	for (const [key, value] of Object.entries(themeObj.visuals)) {
		css += `  --${key}: ${value};\n`;
	}

	// Cross-reference color keys with shades
	for (const [colorKey, shadeRef] of Object.entries(themeObj.colors)) {
		if (shadeRef.startsWith('#')) {
			// If the shadeRef is a hex color, use it directly
			css += `  --${colorKey}: ${shadeRef};\n`;
			continue;
		}

		// shadeRef could be e.g. "primary-500" or "accent-900"
		const [shadeName, shadeLevel] = shadeRef.split('-');
		let value = null;

		if (shadeLevel) {
			// Try to find the base color in shades
			if (shades.dmun && shades.dmun[shadeName]) {
				// If you want to use the base color, you can use shades.dmun[shadeName]
				// But since you want the shade, you might want to use a generated variable
				value = `var(--color-${shadeName}-${shadeLevel})`;
			}
		} else {
			// Fallback: just use the base color if no shade level
			if (shades.dmun && shades.dmun[shadeName]) {
				value = shades.dmun[shadeName];
			}
		}

		if (value) {
			css += `  --${colorKey}: ${value};\n`;
		}
	}

	css += '}\n';

	const filename = `./dist/dmun-daisyUI-${themeName}.css`;
	fs.writeFileSync(filename, css);
	console.log(`Generated ${filename}`);
}
