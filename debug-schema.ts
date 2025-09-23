import fs from 'fs';
import yaml from 'js-yaml';
import { schema } from './src-pkg/schema.js';

const yml = fs.readFileSync('./src-pkg/colors.yml', 'utf8');
const rawConfig = yaml.load(yml);

console.log('Raw config:', JSON.stringify(rawConfig, null, 2));

const parseResult = schema.safeParse(rawConfig);
if (!parseResult.success) {
	console.error('❌ Configuration validation failed:');
	console.error('Full error:', JSON.stringify(parseResult.error.issues, null, 2));
	process.exit(1);
} else {
	console.log('✅ Configuration is valid!');
}