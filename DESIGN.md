---
name: Heart & Brew
colors:
  surface: '#fff8f5'
  surface-dim: '#e0d9d5'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2ee'
  surface-container: '#f4ece9'
  surface-container-high: '#eee7e3'
  surface-container-highest: '#e8e1dd'
  on-surface: '#1e1b19'
  on-surface-variant: '#4e453d'
  inverse-surface: '#33302d'
  inverse-on-surface: '#f7efeb'
  outline: '#80756c'
  outline-variant: '#d2c4ba'
  surface-tint: '#725a42'
  primary: '#33210d'
  on-primary: '#ffffff'
  primary-container: '#4b3621'
  on-primary-container: '#bd9f83'
  inverse-primary: '#e1c1a4'
  secondary: '#944925'
  on-secondary: '#ffffff'
  secondary-container: '#fe9e72'
  on-secondary-container: '#773310'
  tertiary: '#242516'
  on-tertiary: '#ffffff'
  tertiary-container: '#3a3b2a'
  on-tertiary-container: '#a4a58f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fedcbe'
  primary-fixed-dim: '#e1c1a4'
  on-primary-fixed: '#291806'
  on-primary-fixed-variant: '#59422c'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#ffb596'
  on-secondary-fixed: '#360f00'
  on-secondary-fixed-variant: '#76320f'
  tertiary-fixed: '#e4e4cc'
  tertiary-fixed-dim: '#c8c8b0'
  on-tertiary-fixed: '#1b1d0e'
  on-tertiary-fixed-variant: '#474836'
  background: '#fff8f5'
  on-background: '#1e1b19'
  surface-variant: '#e8e1dd'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max-width: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-gap: 16px
---

## Brand & Style
The design system is built upon a **Modern-Tactile** aesthetic, blending the warmth of a rustic coffee house with the precision of a high-end digital menu. It aims to evoke a sense of comfort, aroma, and craftsmanship. The interface mimics physical hospitality through the use of soft-press elevations and subtle grain overlays, ensuring the user feels "invited in" rather than just browsing an app.

The target audience ranges from local coffee enthusiasts to foodies seeking a cozy dining experience. The UI avoids the clinical nature of typical SaaS platforms, opting instead for a rich, high-contrast environment that prioritizes food photography and legible typography.

## Colors
The palette is grounded in Earth tones, specifically curated to stimulate appetite and comfort. 

- **Primary (Deep Coffee Brown):** Used for primary navigation, headings, and high-emphasis text to ensure maximum readability and brand presence.
- **Secondary (Oak):** Applied to interactive elements like primary buttons and active states, providing a warm contrast to the deep browns.
- **Accent (Cream/Vanilla):** Serves as the primary surface color, replacing pure white to reduce eye strain and enhance the rustic feel.
- **Highlight (Leaf Green):** Reserved exclusively for vegetarian indicators, sustainability badges, and success states.
- **Surface Neutral:** A slightly desaturated version of the accent used for card backgrounds and input fields to create subtle depth.

## Typography
The typographic hierarchy utilizes a classic Serif/Sans pairing. **Playfair Display** provides an editorial, sophisticated feel for menu categories and promotional headlines. **Montserrat** handles all functional text, ensuring that ingredients, prices, and descriptions remain legible even at smaller sizes.

For menu items, use `headline-sm` for the item name and `body-md` for descriptions. Prices should use `label-bold` with a slightly increased font size to ensure they are easily scannable during a busy dining or ordering session.

## Layout & Spacing
This design system employs a **Fluid-Fixed Hybrid** grid. On desktop, content is contained within a 1200px max-width 12-column grid to maintain readability. On mobile, a single-column layout is used with generous 16px margins to prevent content from feeling cramped.

Spacing follows an 8px base unit. Vertical rhythm is critical; use larger gaps (32px - 48px) between menu categories (e.g., "Breakfast" vs "Lunch") and tighter gaps (16px) between individual items. This helps users mentally group offerings without the need for heavy dividers.

## Elevation & Depth
Elevation in this design system is achieved through **Tonal Layers** and **Ambient Shadows**, rather than harsh black shadows. 

1.  **Level 0 (Base):** The Cream (#F5F5DC) background, occasionally featuring a subtle, low-opacity (5%) wood grain texture overlay.
2.  **Level 1 (Cards):** Surface Neutral (#FDFBF7) cards with a very soft, diffused shadow (Blur: 20px, Y: 4px, Color: 10% Coffee Brown).
3.  **Level 2 (Interactive):** Secondary Color elements (Buttons/Active states) which use a slightly tighter shadow to appear "raised" and ready for interaction.
4.  **Level 3 (Modals/Overlays):** High elevation with a backdrop blur of 8px to maintain focus on the task while keeping the warm atmosphere visible behind.

## Shapes
The shape language is defined by **High Roundedness (2xl)**. All primary containers, buttons, and image wrappers should use a 1rem (16px) corner radius. This softness mirrors the organic nature of food and hospitality. 

Small components like chips and tags use a full pill-shape (rounded-full) to distinguish them from larger interactive cards. Input fields should match the button radius to maintain a consistent visual rhythm in forms.

## Components
- **Buttons:** Primary buttons use the Oak (#A0522D) background with white text. Secondary buttons use a Deep Brown (#4B3621) border with Brown text. No sharp corners; all buttons are `rounded-xl`.
- **Menu Cards:** Use a horizontal layout for desktop and a vertical stack for mobile. Images should have a 1:1 aspect ratio with `rounded-lg` corners.
- **Dietary Chips:** Small, pill-shaped tags. The "Veg" chip uses the Highlight Green (#4A7023) with white text; all others use the Deep Brown.
- **Input Fields:** Soft Cream background with a 1px border of Deep Brown at 20% opacity. On focus, the border thickens and changes to the Oak color.
- **Quantity Pickers:** Circular buttons with a soft-press shadow effect to make them feel tactile and easy to tap on mobile devices.
- **Specialty Icons:** Icons should use a medium stroke weight (2px) and be colored in Deep Coffee Brown to ensure they match the typographic weight of the headings.