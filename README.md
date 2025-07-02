# DMUN Corporate Identity

A comprehensive corporate identity package for Deutsche Model United Nations (DMUN) containing TailwindCSS configurations, DaisyUI themes, and color palettes.

## Installation

First, configure npm to use GitHub Packages for the `@deutschemodelunitednations` scope:

```bash
npm config set @deutschemodelunitednations:registry https://npm.pkg.github.com
```

Then install the package:

```bash
npm install @deutschemodelunitednations/corporate-identity
```

## Usage

### Importing CSS Files

```javascript
// Import the generated shade variables
import '@deutschemodelunitednations/corporate-identity/css/shades';

// Import light theme
import '@deutschemodelunitednations/corporate-identity/css/light';

// Import dark theme  
import '@deutschemodelunitednations/corporate-identity/css/dark';
```

### Using the JavaScript API

```javascript
import dmun from '@deutschemodelunitednations/corporate-identity';

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
@import '@deutschemodelunitednations/corporate-identity/css/shades';
@import '@deutschemodelunitednations/corporate-identity/css/light';
@import '@deutschemodelunitednations/corporate-identity/css/dark';
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

1. **Update the version** in `package.json`
2. **Commit your changes** to the main branch
3. **Create a new release** on GitHub:
   - Go to [Releases](https://github.com/DeutscheModelUnitedNations/dmun-corporate-identity/releases)
   - Click "Create a new release"
   - Create a new tag (e.g., `v1.1.0`)
   - Add release notes
   - Click "Publish release"

4. **Automatic publishing**: GitHub Actions will automatically:
   - Build the package
   - Run tests
   - Publish to GitHub Package Registry (`npm.pkg.github.com`)

### 🔧 **Setup for Users**

Users need to configure npm to access your GitHub Packages:

```bash
# Configure npm to use GitHub Packages for your organization
npm config set @deutschemodelunitednations:registry https://npm.pkg.github.com

# If installing in a project, you can also use .npmrc file:
echo "@deutschemodelunitednations:registry=https://npm.pkg.github.com" >> .npmrc
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
