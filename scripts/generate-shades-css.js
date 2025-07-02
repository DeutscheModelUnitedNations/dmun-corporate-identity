import fs from 'fs';
import yaml from 'js-yaml';
import shadesOf from 'tailwind-shades';

const yml = fs.readFileSync('./colors.yml', 'utf8');
const colors = yaml.load(yml);

fs.mkdirSync('./dist', { recursive: true });

for (const [theme, values] of Object.entries(colors.shades)) {
	let css = `@theme {\n`;
	for (const [name, value] of Object.entries(values)) {
		const shades = shadesOf(value);
		Object.keys(shades).forEach((shade) => {
			css += `  --color-${name}-${shade}: ${shades[shade]};\n`;
		});
		css += `  \n`;
	}
	css += '}\n';

	const filename = `./dist/${theme}-tailwind-shades.css`;
	fs.writeFileSync(filename, css);
	console.log(`Generated ${filename}`);
}
