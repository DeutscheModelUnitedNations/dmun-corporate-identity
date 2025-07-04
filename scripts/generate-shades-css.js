import fs from 'fs';
import yaml from 'js-yaml';
import shadesOf from 'tailwind-shades';

const yml = fs.readFileSync('./colors.yml', 'utf8');
const colors = yaml.load(yml);

// Ensure dist directory exists
fs.mkdirSync('./dist', { recursive: true });

// Generate CSS files for each shade palette
for (const [shadePalette, values] of Object.entries(colors.shades)) {
	let css = `/* Generated Tailwind shades for ${shadePalette} palette */\n@theme {\n`;

	for (const [colorName, hexValue] of Object.entries(values)) {
		const shades = shadesOf(hexValue);
		Object.keys(shades).forEach((shadeLevel) => {
			css += `  --color-${colorName}-${shadeLevel}: ${shades[shadeLevel]};\n`;
		});
		css += `\n`;
	}

	css += '}\n';

	const filename = `./dist/${shadePalette}-tailwind-shades.css`;
	fs.writeFileSync(filename, css);
	console.log(`Generated ${filename}`);
}
