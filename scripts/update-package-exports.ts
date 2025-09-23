import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import { schema } from '../src-pkg/schema.js';

interface PackageExport {
	types?: string;
	import?: string;
	require?: string;
}

interface PackageExports {
	[key: string]: string | PackageExport;
}

interface PackageJson {
	exports: PackageExports;
	[key: string]: any;
}

/**
 * Updates package.json exports based on generated files
 */
function updatePackageExports(): void {
	// Read colors configuration
	const yml = fs.readFileSync('./src-pkg/colors.yml', 'utf8');
	const rawConfig = yaml.load(yml);

	// Validate the configuration against the schema
	const parseResult = schema.safeParse(rawConfig);
	if (!parseResult.success) {
		console.error('❌ Configuration validation failed:');
		console.error(parseResult.error.format());
		process.exit(1);
	}

	const config = parseResult.data;

	// Read current package.json
	const packageJson: PackageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

	// Initialize exports with core library exports
	const exports: PackageExports = {
		'.': {
			types: './lib/index.d.ts',
			import: './lib/index.mjs',
			require: './lib/index.js'
		},
		'./colors': './src-pkg/colors.yml',
		'./css/fonts': './dist/dmun-fonts.css'
	};

	// Add exports for shade CSS files
	if (config.shades) {
		for (const shadePalette of Object.keys(config.shades)) {
			const cssFile = `./dist/${shadePalette}-tailwind-shades.css`;
			exports[`./css/shades/${shadePalette}`] = cssFile;
		}
	}

	// Add exports for theme CSS files
	if (config.themes) {
		for (const themeName of Object.keys(config.themes)) {
			const cssFile = `./dist/dmun-daisyUI-${themeName}.css`;
			exports[`./css/theme/${themeName}`] = cssFile;
		}
	}

	// Update package.json
	packageJson.exports = exports;

	// Write updated package.json
	fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, '\t'));

	console.log('✅ Updated package.json exports:');
	console.log(
		'📦 Library exports:',
		Object.keys(exports).filter((k) => k.startsWith('.') && !k.includes('/css/'))
	);
	console.log(
		'🎨 Shade exports:',
		Object.keys(exports).filter((k) => k.includes('/css/shades/'))
	);
	console.log(
		'🌈 Theme exports:',
		Object.keys(exports).filter((k) => k.includes('/css/theme/'))
	);
}

updatePackageExports();
