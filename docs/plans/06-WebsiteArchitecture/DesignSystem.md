# Design System

[<- Back to Phase 06 README](README.md)

## Color Palette

### Easter Pastel Backgrounds

Used for section backgrounds, gradients, and UI accents throughout `index.html`. Defined as CSS custom properties in `:root`.

| Variable | Hex | Usage |
|----------|-----|-------|
| `--pink` | `#fce4ec` | Section backgrounds, nav hover, rule card icons |
| `--pink-deep` | `#f8bbd0` | Nav border, hero date border, gradient endpoints |
| `--lavender` | `#e8d5f5` | Section backgrounds, gradient endpoints |
| `--lavender-deep` | `#ce93d8` | Nav brand gradient, hero RR badge |
| `--mint` | `#e8f5e9` | Section backgrounds (location, players) |
| `--mint-deep` | `#a5d6a7` | Gradient endpoints |
| `--sky` | `#e3f2fd` | Section backgrounds (how-it-works, rules) |
| `--sky-deep` | `#90caf9` | Gradient endpoints |
| `--butter` | `#fff9c4` | Section backgrounds (rules, prizes) |
| `--butter-deep` | `#fff176` | Gradient endpoints |

### Text & UI Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| `--brown` | `#5d4037` | Primary text, headings |
| `--brown-light` | `#6d4c41` | Nav link text |
| `--brown-soft` | `#8d6e63` | Subtitles, secondary text, details |
| `--white` | `#ffffff` | Card backgrounds, contrast surfaces |
| `--shadow` | `rgba(93,64,55,0.1)` | Card shadows (light) |
| `--shadow-md` | `rgba(93,64,55,0.15)` | Card shadows (hover/elevated) |

### Player Colors

Each player has an assigned hex color stored in `config.json`. These are applied via inline CSS custom property `--player-color` on player cards.

| Player | Color Name | Hex | Light Text? |
|--------|-----------|-----|-------------|
| Reuben | Red | `#e53935` | No |
| Raina | Hot Pink | `#ec407a` | No |
| Swathy | Light Pink | `#f8bbd0` | No |
| Jason | Blue | `#1e88e5` | No |
| Nikith | Sky Blue | `#4fc3f7` | No |
| Shawn | Neon Green | `#76ff03` | Yes |
| Shua | Dark Green | `#2e7d32` | No |
| Rutuja | Yellow | `#fdd835` | Yes |
| Shantanu | Purple | `#9c27b0` | No |

The `lightText` flag causes the player's color badge to use dark brown text instead of white, ensuring readability on light backgrounds.

### Scoring Page Palette

The scoring page (`scoring.css`) uses its own set of CSS variables, with a slightly different naming convention but overlapping hues:

| Variable | Hex | Usage |
|----------|-----|-------|
| `--pastel-pink` | `#fce4ec` | Body gradient |
| `--pastel-lavender` | `#f3e5f5` | Body gradient, egg frame fallback |
| `--pastel-mint` | `#e8f5e9` | Body gradient |
| `--pastel-sky` | `#e3f2fd` | Body gradient |
| `--pastel-butter` | `#fffde7` | Body gradient |
| `--text-dark` | `#3e2723` | Primary text |
| `--text-medium` | `#5d4037` | Labels, secondary |
| `--text-light` | `#8d6e63` | Tertiary, metadata |

### Task Card Color Schemes

Printed task cards use gradient backgrounds mapped to difficulty level, matching the physical two-tone egg colors:

| Difficulty | Background | Text Color |
|-----------|------------|------------|
| Easy | `#f8bbd0` -> `#f48fb1` (all pink) | `#4a0028` |
| Medium | `#f8bbd0` -> `#fff5f8` -> white (pink-to-white) | `#333` |
| Hard | `#f8bbd0` -> `#ce93d8` -> `#ab47bc` (pink-to-purple) | `#1a0033` |
| Extreme | `#ab47bc` -> `#7b1fa2` -> `#6a1b9a` (all purple) | `#fff` |
| Power-Up | `#fff8e1` -> `#ffe082` -> `#ffd54f` -> `#ffca28` (gold) | `#3e2723` |

---

## Typography

### Font Stack

| Use | Font | Fallback | Weight(s) |
|-----|------|----------|-----------|
| Headings (index.html) | Baloo 2 | Nunito, cursive | 400, 500, 600, 700, 800 |
| Body text (index.html) | Nunito | Segoe UI, system-ui, sans-serif | 400, 600, 700 |
| All text (scoring.html, tasks-print.html) | Segoe UI | system-ui, -apple-system, sans-serif | -- |

Fonts are loaded from Google Fonts via `<link>` on `index.html` only. The scoring and print pages use system fonts to avoid external dependencies (the scoring page is used on event day and must load fast; the print page needs no custom fonts).

### Type Scale (index.html)

| Element | Size | Notes |
|---------|------|-------|
| Hero title | `clamp(2rem, 6vw, 3.8rem)` | Fluid scaling |
| Hero subtitle (accent) | `clamp(2.2rem, 7vw, 4.2rem)` | Gradient text fill |
| Hero invited text | `clamp(1.2rem, 3vw, 1.6rem)` | Fluid scaling |
| Section title | `2.2rem` (desktop), `1.7rem` (mobile) | Baloo 2 |
| Section subtitle | `1.1rem` (desktop), `0.95rem` (mobile) | Nunito, semi-bold |
| Nav links | `0.82rem` (desktop), `0.95rem` (mobile) | Pill-shaped |
| Player name | `1.1rem` (desktop), `0.9rem` (mobile) | Baloo 2 |
| Player badge | `0.72rem` (desktop), `0.6rem` (mobile) | Uppercase, letter-spaced |

---

## Component Patterns

### Player Card (index.html)

A white card with a colored top-border accent (4px solid, player's color). Contains:

1. **Hatching egg frame** -- The player's photo is displayed inside a circular frame with two pseudo-elements creating a cracked-eggshell effect:
   - `::after` -- Bottom shell half, using a `clip-path: polygon()` for an irregular cracked edge along the top
   - `::before` -- Small tilted shell cap perched on top of the photo, rotated 22deg
   - Both shells use a cream-to-off-white gradient (`#fffef8` to `#f5f0e6`) with subtle border and shadow
2. **Name** -- Baloo 2, bold
3. **Color badge** -- Pill-shaped, solid player-color background, white text (or dark brown if `lightText`)
4. **Color subtitle** -- Small uppercase label of the color name

Cards are laid out in a 3-column grid (`grid-template-columns: repeat(3, 1fr)`) that maintains 3 columns down to mobile, with reduced padding and element sizes at `max-width: 640px`.

### Player Card (scoring.html)

A card with a 4px top-border in the player's accent color. Contains:

1. **Egg-shaped photo frame** -- `border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%` with a colored border
2. **Name** -- System font, bold
3. **Score display** -- Large numeric display (2.2rem), with a `.bumped` class that scales to 1.2x briefly on change
4. **+/- buttons** -- Circular tap targets (48x48px), green for plus, red for minus
5. **Power-up buttons** -- Stacked below, each styled with difficulty-themed border colors. Disabled state adds strikethrough and reduced opacity.

3-column grid layout. Score state persists in localStorage.

### Two-Tone Egg (index.html, Special Eggs Guide)

A pure CSS egg shape with a top half and bottom half in different colors:

```css
.two-tone-egg {
    width: 40px;
    height: 52px;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    overflow: hidden;
}
.two-tone-egg .top { height: 50%; }
.two-tone-egg .bottom { height: 50%; }
```

Colors are set via inline `style` from config. The power-up egg uses a `"rainbow"` value that generates a `linear-gradient` from all player colors.

### Step Card (index.html, How It Works)

Horizontal card with:
- **Egg-shaped number badge** -- `border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%`, each step gets a unique gradient from the Easter palette
- **Icon + text** on the right
- **Detail text** below in softer color

Steps slide right on hover (`transform: translateX(6px)`).

### Rule Card (index.html)

Horizontal card with:
- **Icon square** -- 48x48px rounded square with alternating pastel backgrounds (pink, lavender, mint, sky, butter)
- **Text + detail** on the right

Cards lift on hover (`transform: translateY(-3px)`).

### Printable Task Card (tasks-print.html)

Sized at 2.5in x 3.5in (standard playing card) with:
- Dashed border for cut lines
- Decorative emoji corners (low opacity)
- Header: difficulty label, star rating, reward text
- Body: centered task description
- Footer: "R&R Easter 2026" branding
- Watermark: rotated "R&R" in near-invisible text (`opacity: 0.04`)

### Navigation (index.html)

Fixed top bar with:
- Frosted glass effect (`backdrop-filter: blur(12px)`, white 92% opacity)
- Brand text with gradient fill (hot pink to lavender)
- Pill-shaped nav links with hover background
- Hide/show on scroll (translates off-screen when scrolling down, returns on scroll up)
- Active section highlighting via scroll position detection
- Hamburger toggle at `max-width: 768px` with dropdown menu

---

## Animations

### CSS Keyframe Animations

| Name | Element | Duration | Description |
|------|---------|----------|-------------|
| `gradientShift` | Hero background | 12s infinite | Shifts the 6-stop pastel gradient back and forth |
| `eggBounce` | Hero eggs | 2s infinite | Bounces eggs up/down with slight rotation, staggered delays |
| `fadeInUp` | Hero text elements | 1s once | Fade in from 20px below, staggered (0.5s, 0.8s, 1.2s) |
| `scrollBounce` | Scroll hint arrow | 1.5s infinite | Subtle down-bounce |
| `shimmerRotate` | Prize card background | 8s infinite | Rotates a conic-gradient overlay for shimmer effect |
| `mysteryPulse` | Prize egg emoji | 2s infinite | Scale pulse with slight rotation |
| `heartbeat` | Footer heart | 1.5s infinite | Scale pulse from 1 to 1.15 |
| `floatDown` | Background eggs | 15-40s infinite | Translates emoji from above viewport to below, rotating 360deg |
| `nameGlow` | Winner name (scoring) | 2s infinite alternate | Text shadow glow oscillation |
| `winnerBounce` | Winner egg (scoring) | 1.5s infinite | Bounce with rotation |
| `confettiFall` | Confetti pieces (scoring) | 2.5-5.5s once | Fall from top with rotation and fade |

### Scroll Reveal

Elements with class `.reveal` start hidden (`opacity: 0; transform: translateY(30px)`) and transition to visible when they enter the viewport (120px trigger threshold). Delay classes `.reveal-delay-1` through `.reveal-delay-3` stagger the effect for grid items.

The reveal system re-queries `.reveal:not(.visible)` on each scroll event, so dynamically added content (from config rendering) is picked up automatically. An initial `window.dispatchEvent(new Event('scroll'))` fires after config content loads.

### Floating Background Eggs

20 emoji spans (`main.js`) are placed in a fixed full-screen container at `z-index: 0`. Each gets a random emoji, horizontal position, font size, and animation duration (15-40s). They float downward continuously at 12% opacity, creating a subtle parallax layer behind all content.

---

## Responsive Breakpoints

| Breakpoint | Scope | Changes |
|------------|-------|---------|
| `max-width: 768px` | index.html nav | Hamburger menu replaces inline links |
| `max-width: 640px` | index.html players | Smaller player cards, egg frames, font sizes |
| `max-width: 480px` | index.html global | Reduced section padding, smaller titles/subtitles, single-column rules grid |
| `max-width: 400px` | scoring.html | Tighter grid gaps, smaller egg frames, score displays, and buttons |
| `min-width: 600px` | scoring.html | Larger egg frames and score displays |
| `@media print` | tasks-print.html | Hides screen UI, enforces `page-break-after`, exact color printing |

All pages maintain their core 3-column grid on mobile -- they reduce element sizes rather than collapsing to fewer columns. This keeps the player roster compact and scannable on phone screens.

---

## Modals & Overlays (scoring.html)

Three overlay patterns, all using the same mechanism:

1. **Egg Swap Modal** -- `display: none` by default, `.active` sets `display: flex`. Fixed inset with dark backdrop. Contains a `<select>` for target player and number input for Skittle amount.

2. **Reset Confirm** -- Same pattern, `z-index: 3000` (above other overlays). Red-accented destructive action confirmation.

3. **Winner Celebration** -- `z-index: 2000`, dark 85% opacity backdrop. Contains confetti container (fixed, pointer-events none) and centered content (winner photo, name, score). Confetti launches 120 pieces in a first wave, then 60 more after 2 seconds, using player colors plus extra pastels.
