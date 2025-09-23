import fs from 'fs';
import yaml from 'js-yaml';
import shadesOf from 'tailwind-shades';
import { schema } from '../src-pkg/schema.js';

const yml = fs.readFileSync('./src-pkg/colors.yml', 'utf8');
const rawColors = yaml.load(yml);

// Validate the configuration against the schema
const parseResult = schema.safeParse(rawColors);
if (!parseResult.success) {
	console.error('❌ Configuration validation failed:');
	console.error(parseResult.error.format());
	process.exit(1);
}

const colors = parseResult.data;

// Ensure dist directory exists
fs.mkdirSync('./dist', { recursive: true });

// Generate CSS files for each shade palette
for (const [shadePalette, values] of Object.entries(colors.shades)) {
	let css = `/* Generated Tailwind shades for ${shadePalette} palette */\n@theme {\n`;

	for (const [colorName, hexValue] of Object.entries(values as Record<string, string>)) {
		const shades: Record<string, string> = shadesOf(hexValue);
		Object.keys(shades).forEach((shadeLevel: string) => {
			css += `  --color-${colorName}-${shadeLevel}: ${shades[shadeLevel]};\n`;
		});
		css += `\n`;
	}

	css += '}\n';

	const filename = `./dist/${shadePalette}-tailwind-shades.css`;
	fs.writeFileSync(filename, css);
	console.log(`Generated ${filename}`);
}
