import fs from 'fs';

// DMUN Font Faces
const fontFaces = fs.readFileSync('./fonts.css', 'utf8');

// Ensure dist directory exists
fs.mkdirSync('./dist', { recursive: true });

// Write font faces CSS file
const filename = './dist/dmun-fonts.css';
fs.writeFileSync(filename, fontFaces);
console.log(`Generated ${filename}`);
