import fs from 'fs';

// DMUN Font Faces - no schema validation needed as this reads a static CSS file
const fontFaces: string = fs.readFileSync('./src-pkg/fonts.css', 'utf8');

// Ensure dist directory exists
fs.mkdirSync('./dist', { recursive: true });

// Write font faces CSS file
const filename: string = './dist/dmun-fonts.css';
fs.writeFileSync(filename, fontFaces);
console.log(`Generated ${filename}`);