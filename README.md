# DMUN Corporate Identity

A comprehensive corporate identity package for Deutsche Model United Nations (DMUN) containing TailwindCSS configurations, DaisyUI themes, and color palettes.

## Installation

```bash
npm install @dmun/corporate-identity
```

## Usage

### Importing CSS Files

```javascript
// Import the generated shade variables
import '@dmun/corporate-identity/css/shades';

// Import light theme
import '@dmun/corporate-identity/css/light';

// Import dark theme  
import '@dmun/corporate-identity/css/dark';
```

### Using the JavaScript API

```javascript
import dmun from '@dmun/corporate-identity';

// Get all colors configuration
const colors = dmun.loadColors();

// Get specific color palette
const dmunColors = dmun.getColorPalette('dmun');
console.log(dmunColors.primary); // "#3D7DD2"

// Get theme configuration
const lightTheme = dmun.getTheme('light');
const darkTheme = dmun.getTheme('dark');

// Get all themes
const allThemes = dmun.getAllThemes();
```

### Using with TailwindCSS

Add the generated CSS files to your TailwindCSS configuration:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      // Your custom configurations
    },
  },
  plugins: [
    require('daisyui'),
  ],
  // Import the DMUN CSS files
  corePlugins: {
    preflight: false, // if you want to use your own base styles
  }
}
```

Then import the CSS files in your main CSS file:

```css
@import '@dmun/corporate-identity/css/shades';
@import '@dmun/corporate-identity/css/light';
@import '@dmun/corporate-identity/css/dark';
```

### Available Colors

The package includes the following color palette:

- **Primary**: `#3D7DD2` (Blue)
- **Secondary**: `#ABABAB` (Gray)  
- **Accent**: `#D0AF65` (Gold)
- **Info**: `#45BC64` (Green)
- **Success**: `#587491` (Blue-Gray)
- **Warning**: `#F77E19` (Orange)
- **Error**: `#F51D42` (Red)

Each color comes with automatically generated shades (50, 100, 200, ..., 900, 950).

### Themes

- **Light Theme**: Optimized for light backgrounds
- **Dark Theme**: Optimized for dark backgrounds

Both themes include DaisyUI-compatible variables and visual configurations.

## Development

If you want to contribute or modify the package:

```bash
# Clone the repository
git clone https://github.com/DeutscheModelUnitedNations/dmun-corporate-identity.git

# Install dependencies
npm install

# Generate CSS files
npm run generate:css

# Build the package
npm run build
```

## Files Structure

```
dist/
├── index.js              # CommonJS entry point
├── index.mjs             # ES Module entry point  
├── index.d.ts            # TypeScript definitions
├── dmun-tailwind-shades.css  # Color shade variables
├── dmun-daisyUI-light.css    # Light theme
└── dmun-daisyUI-dark.css     # Dark theme
colors.yml                # Source color configuration
```

## License

CC BY-NC 4.0

## Author

Deutsche Model United Nations e.V. / Tade Strehk
