# DMUN Corporate Identity

A comprehensive corporate identity package for Deutsche Model United Nations (DMUN) containing TailwindCSS configurations, DaisyUI themes, and color palettes.

## Installation

Install the package from npm:

```bash
npm install @deutschemodelunitednations/corporate-identity
```

## Usage

### Importing CSS Files

```javascript
// Import shade variables for specific palettes
import '@deutschemodelunitednations/corporate-identity/css/shades/dmun';
import '@deutschemodelunitednations/corporate-identity/css/shades/munsh';
import '@deutschemodelunitednations/corporate-identity/css/shades/munbw';

// Import theme CSS files
import '@deutschemodelunitednations/corporate-identity/css/theme/light';
import '@deutschemodelunitednations/corporate-identity/css/theme/dark';
```

### Using with TailwindCSS

```css
/* Import all shade palettes */
@import '@deutschemodelunitednations/corporate-identity/css/shades/dmun';
@import '@deutschemodelunitednations/corporate-identity/css/shades/munsh';
@import '@deutschemodelunitednations/corporate-identity/css/shades/munbw';

/* Import themes */
@import '@deutschemodelunitednations/corporate-identity/css/theme/light';
@import '@deutschemodelunitednations/corporate-identity/css/theme/dark';
```

### Available Palettes and Themes

The package dynamically generates CSS files for all palettes and themes defined in `colors.yml`:

- **Shade Palettes**: `dmun`, `munsh`, `munbw`
- **Themes**: `light`, `dark`

*Note: Additional palettes and themes can be added to `colors.yml` and will be automatically included in the build.*

### Using the JavaScript API

```javascript
import dmun from '@deutschemodelunitednations/corporate-identity';

// Get all colors configuration
const colors = dmun.loadColors();

// Get specific color palette
const dmunColors = dmun.getColorPalette('dmun');
const munshColors = dmun.getColorPalette('munsh');
const munbwColors = dmun.getColorPalette('munbw');

// Get theme configuration
const lightTheme = dmun.getTheme('light');
const darkTheme = dmun.getTheme('dark');

// Get all available palettes and themes
const availablePalettes = dmun.getAllShadePalettes(); // ['dmun', 'munsh', 'munbw']
const availableThemes = dmun.getAllThemeNames(); // ['light', 'dark']

// Get dynamic CSS file paths
const cssFiles = dmun.getCssFiles();
console.log(cssFiles.shades.dmun); // "../dist/dmun-tailwind-shades.css"
console.log(cssFiles.themes.light); // "../dist/dmun-daisyUI-light.css"
```
const allThemes = dmun.getAllThemes();
```

### Using with TailwindCSS

Add the CSS files to your project:

```css
/* Import specific shade palettes as needed */
@import '@deutschemodelunitednations/corporate-identity/css/shades/dmun';

/* Import themes */
@import '@deutschemodelunitednations/corporate-identity/css/theme/light';
@import '@deutschemodelunitednations/corporate-identity/css/theme/dark';
```

Then configure TailwindCSS:

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
}
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

### Creating a Release

To publish a new version:

1. **Create a new release** on GitHub:
   - Go to [Releases](https://github.com/DeutscheModelUnitedNations/dmun-corporate-identity/releases)
   - Click "Create a new release"
   - Create a new tag with semantic versioning (e.g., `v1.1.0`)
   - Add release notes describing changes
   - Click "Publish release"

2. **Automatic publishing**: GitHub Actions will automatically:
   - Extract version from the release tag
   - Build the package (CSS + library)
   - Run tests
   - Publish to npm registry (`registry.npmjs.org`)

### � **Installation for Users**

Users can install the package directly from npm:

```bash
npm install @deutschemodelunitednations/corporate-identity
```

No additional configuration required!

## Files Structure

```
lib/
├── index.js              # CommonJS entry point
├── index.mjs             # ES Module entry point  
├── index.d.ts            # TypeScript definitions
dist/
├── dmun-tailwind-shades.css     # DMUN shade variables
├── munsh-tailwind-shades.css    # MUNSH shade variables
├── munbw-tailwind-shades.css    # MUNBW shade variables
├── dmun-daisyUI-light.css       # Light theme
└── dmun-daisyUI-dark.css        # Dark theme
colors.yml                # Source color configuration
```

*Note: The build process automatically generates CSS files for all palettes and themes defined in `colors.yml`.*

## License

CC BY-NC 4.0

## Author

Deutsche Model United Nations e.V. / Tade Strehk
