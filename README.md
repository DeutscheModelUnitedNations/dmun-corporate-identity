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

// Import DMUN font faces
import '@deutschemodelunitednations/corporate-identity/css/fonts';
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

/* Import fonts */
@import '@deutschemodelunitednations/corporate-identity/css/fonts';
```

### Available Palettes and Themes

The package dynamically generates CSS files for all palettes and themes defined in `colors.yml`:

- **Shade Palettes**: `dmun`, `munsh`, `munbw`
- **Themes**: `light`, `dark`
- **Fonts**: Complete DMUN typography system

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
console.log(cssFiles.fonts); // "../dist/dmun-fonts.css"
```

### Available Fonts

The package includes carefully selected web fonts optimized for the DMUN corporate identity:

- **Sans Font (Primary)**: Outfit - Modern and beautiful Futura inspired sans-serif for body text and headings. 
- **Serif Font**: Vollkorn - Use with caution for headings. Don't use for body text.
- **Monospace Font**: Roboto Mono - Fontface for code, technical and monospaced Numbers contexts

#### Font Loading Options

**Option 1: CSS Font Faces (Recommended for most use cases)**
```javascript
import '@deutschemodelunitednations/corporate-identity/css/fonts';
```
This loads custom DMUN font faces with optimized font loading.

**Option 2: Fontsource Fonts (For projects already using Fontsource)**
```javascript
import '@deutschemodelunitednations/corporate-identity/fonts';
```
This loads all font weights from Fontsource packages.

#### CSS Classes

```css
.font-sans { /* Outfit */ }
.font-serif { /* Vollkorn */ }
.font-mono { /* Roboto Mono */ }
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

The palette follows the DMUN *Corporate Design Guidelines* ("Farbwelt"). Three
colours carry all three brands (DMUN, MUN-SH, MUNBW); each brand adds its own
accent on top.

Ramp seeds — each is expanded into shades (50, 100, 200, ..., 900):

- **Primary**: `#01548F` — DMUN-Blau. Logos, headings, central design elements.
  Best on white; never over large areas and never on the dark ground.
- **Secondary**: `#9C9C9C` — the neutral grey. Its `200`/`100` steps land on the
  guideline greys `#D8D8D8` / `#F2F2F2`.
- **Accent**: `#6D9392` — Akzentfarbe Türkis. Used sparingly: Akzentstreifen,
  decorative elements, charts. Its `300`–`700` steps reproduce the published
  DMUN Designfarben.
- **Info**: `#587491` (Blue-Gray)
- **Success**: `#45BC64` (Green)
- **Warning**: `#F77E19` (Orange)
- **Error**: `#F51D42` (Red)

> The Corporate Design defines **no** semantic status colours — DMUN-Blau doubles
> as the attention colour in form states. The four status seeds above are carried
> over unchanged and still need sign-off from DMUN.

Colours the themes reference directly, outside the ramps:

| Hex | Guideline token | Role |
| --- | --- | --- |
| `#FFFFFF` | `--paper` | the page ground |
| `#F0EFF5` | `--paper-tint` | Hintergrund hell — text boxes, quiet fields |
| `#1B1837` | `--navy-900` | Hintergrund dunkel — large areas, covers |
| `#2B2750` / `#545269` | `--navy-700` / `--navy-500` | dark-theme surface steps |
| `#000000` | `--ink` | Fließtext, true black |

### Themes

- **Light Theme** (`dmun-light`, registered as `light`, the default): white page
  ground, black body copy, DMUN-Blau for headings and links.
- **Dark Theme** (`dmun-dark`, registered as `dark`, follows
  `prefers-color-scheme: dark`): the `#1B1837` ground with white type.
  Because the guidelines forbid combining DMUN-Blau with the dark ground,
  `primary` there is a lightened step of the blue ramp; logos and headings on
  dark stay white.

Both themes are flat by instruction: `--depth: 0`, `--noise: 0`, `--radius-box: 0`
for cards, panels and alerts, and `0.125rem` (2px) only on interactive chrome
— buttons, inputs, badges and checkboxes. The radio dot stays circular.

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

# Start the dev app to review the generated output
npm run dev
```

The dev app has two routes:

- `/` — every generated shade ramp, 50 through 900.
- `/preview` — the daisyUI themes in use: the Farbwelt, the semantic tokens and
  surfaces, the six type roles, and the component set, with a light/dark toggle.
  Everything on it is driven by the generated tokens, so it shows what consumers
  of the package actually get.

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
├── dmun-daisyUI-dark.css        # Dark theme
└── dmun-fonts.css               # DMUN font faces
colors.yml                # Source color configuration
```

*Note: The build process automatically generates CSS files for all palettes and themes defined in `colors.yml`.*

## License

CC BY-NC 4.0

## Author

Deutsche Model United Nations e.V. / Tade Strehk
