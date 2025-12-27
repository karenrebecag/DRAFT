# DRAFT Studio - Style Guide

## Color Palette

### Brand Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Black** | `#1b1e15` | `--color-black` | Darkest color, primary backgrounds |
| **Pine Tree** | `#2A2E22` | `--color-pine` | Dark accent, secondary backgrounds |
| **More Than A Week** | `#8C8D8C` | `--color-gray` | Primary gray, muted text |
| **Mermaid Tears** | `#D5E5A6` | `--color-sage` | Soft accent, subtle highlights |
| **Chartreuse** | `#BDFB06` | `--color-primary` | Main accent, CTAs, highlights |
| **Emptiness** | `#FCFCFC` | `--color-white` | Off-white, light backgrounds |

### Color Hierarchy

```
Darkest ─────────────────────────────────────────────────── Lightest

#1b1e15    #2A2E22    #8C8D8C    #D5E5A6    #BDFB06    #FCFCFC
 Black    Pine Tree   Gray       Sage     Chartreuse   White
```

### CSS Variables Reference

#### Primary Colors
```css
--color-primary: #BDFB06;        /* Chartreuse - main accent */
--color-primary-hover: #a8e000;  /* Darker for hover states */
--color-primary-active: #94c700; /* Even darker for active states */
--color-primary-light: rgba(189, 251, 6, 0.15);  /* Subtle backgrounds */
```

#### Secondary/Soft Accent
```css
--color-sage: #D5E5A6;           /* Mermaid Tears - soft green */
--color-sage-hover: #c8dba0;     /* Darker for hover */
--color-sage-light: rgba(213, 229, 166, 0.20); /* Very subtle */
```

#### Dark Colors
```css
--color-black: #1b1e15;          /* Darkest - primary dark backgrounds */
--color-pine: #2A2E22;           /* Pine Tree - secondary dark */
--color-true-black: #000000;     /* Pure black - special cases only */
```

#### Gray Scale
```css
--color-gray: #8C8D8C;           /* Primary gray (More Than A Week) */
--color-gray-100: #f5f5f5;       /* Lightest gray */
--color-gray-200: #e5e5e5;
--color-gray-300: #d4d4d4;
--color-gray-400: #a3a3a3;
--color-gray-500: #8C8D8C;       /* Same as --color-gray */
--color-gray-600: #6f7071;
--color-gray-700: #555855;
--color-gray-800: #3d403d;
--color-gray-900: #2A2E22;       /* Same as --color-pine */
```

#### Light Colors
```css
--color-white: #FCFCFC;          /* Off-white (Emptiness) */
--color-white-pure: #FFFFFF;     /* Pure white - special cases */
```

### Semantic Variables

#### Backgrounds
```css
--color-bg-dark: var(--color-black);       /* #1b1e15 */
--color-bg-dark-alt: var(--color-pine);    /* #2A2E22 */
--color-bg-light: var(--color-white);      /* #FCFCFC */
--color-bg-light-alt: var(--color-gray-100);
--color-bg-accent: var(--color-sage);      /* #D5E5A6 */
```

#### Text
```css
--color-text-dark: var(--color-black);     /* Dark text on light bg */
--color-text-light: var(--color-white);    /* Light text on dark bg */
--color-text-muted: var(--color-gray);     /* Secondary/muted text */
--color-text-accent: var(--color-primary); /* Highlighted text */
```

#### Borders
```css
--color-border: rgba(27, 30, 21, 0.15);        /* Subtle dark border */
--color-border-light: rgba(252, 252, 252, 0.15); /* Light border on dark bg */
--color-border-accent: rgba(189, 251, 6, 0.30);  /* Accent border */
```

### Usage Guidelines

1. **Dark Mode First**: The primary experience uses dark backgrounds (`--color-black` or `--color-pine`) with light text (`--color-white`).

2. **Accent Usage**: Use `--color-primary` (Chartreuse) sparingly for:
   - Call-to-action buttons
   - Important highlights
   - Interactive element states
   - Brand moments

3. **Soft Accents**: Use `--color-sage` (Mermaid Tears) for:
   - Subtle background highlights
   - Secondary buttons
   - Cards or sections that need visual distinction

4. **Text Contrast**:
   - On dark backgrounds: Use `--color-white` or `--color-gray-100`
   - On light backgrounds: Use `--color-black` or `--color-pine`
   - Muted/secondary text: Use `--color-gray`

5. **Shadows**: All shadows use the brand black color for consistency:
   ```css
   --shadow-sm: 0px 1px 2px rgba(27, 30, 21, 0.05);
   --shadow-glow: 0px 0px 30px rgba(189, 251, 6, 0.30); /* Chartreuse glow */
   ```

## SCSS Variables (Legacy)

For SCSS files, use the `$colors` map:

```scss
@use 'utils/colors' as *;

// Access colors like:
map-get(map-get($colors, 'common'), 'black');     // #1b1e15
map-get(map-get($colors, 'theme'), 'primary');    // #BDFB06
```

Or use the generated CSS custom properties with the `td-` prefix:
```scss
color: var(--td-common-black);
background: var(--td-theme-primary);
```
