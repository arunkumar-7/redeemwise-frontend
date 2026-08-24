# DESIGN_SYSTEM.md

## RedeemWise – Design System

### Document Version

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-08-24 | RedeemWise Frontend Team | Initial design system document |

---

## 1. Purpose

This document defines the complete design system for the RedeemWise frontend application, covering the color system, typography, spacing, layout, component principles, dark theme guidelines, and fintech-specific UI patterns. It serves as the single source of truth for all visual design decisions.

---

## 2. Design Principles

### 2.1 Core Principles

| Principle | Description | Application |
|-----------|-------------|-------------|
| **Premium Fintech** | Every pixel should feel like a high-end financial product | No cheap-looking elements; polished interactions |
| **Dark Mode First** | Dark is the default and only theme | All designs assume dark backgrounds |
| **Minimal & Clean** | Reduce visual noise; let data speak | Generous whitespace; limited color usage |
| **Mobile First** | Design for mobile, scale up | Touch targets ≥ 44px; thumb-friendly zones |
| **Data Forward** | Numbers and values are the hero | Large, prominent numerical displays |
| **Instant Clarity** | Users understand data at a glance | Clear hierarchy; obvious CTAs |

### 2.2 Inspiration Benchmarks

| App | Key Takeaway |
|-----|-------------|
| **CRED** | Dark theme execution; premium feel; minimal typography |
| **CheQ** | Card-based layouts; clean data presentation |
| **INDmoney** | Portfolio-style data display; clear value communication |
| **Zerodha** | Data-dense yet readable; professional charts; trust signals |

---

## 3. Color System

### 3.1 Dark Theme Palette

#### Background Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#0B0F1A` | Main app background |
| `bg-secondary` | `#111827` | Card backgrounds, elevated surfaces |
| `bg-tertiary` | `#1E293B` | Input fields, hover states |
| `bg-elevated` | `#1E293B` | Modals, dropdowns, popovers |
| `bg-overlay` | `rgba(0, 0, 0, 0.6)` | Modal backdrops, overlays |

#### Text Colors

| Token | Hex | Usage | Contrast on #0B0F1A |
|-------|-----|-------|---------------------|
| `text-primary` | `#F8FAFC` | Headings, primary content | 15.4:1 ✓ |
| `text-secondary` | `#94A3B8` | Descriptions, labels | 5.3:1 ✓ |
| `text-tertiary` | `#64748B` | Captions, placeholders | 3.7:1 (large text only) |
| `text-inverse` | `#0F172A` | Text on light/accent backgrounds | — |

#### Accent Colors

| Token | Hex | Usage | Contrast on #0B0F1A |
|-------|-----|-------|---------------------|
| `accent-primary` | `#14B8A6` | Primary CTAs, links, active states | 7.2:1 ✓ |
| `accent-primary-hover` | `#0D9488` | Hover state for primary accent | 5.8:1 ✓ |
| `accent-secondary` | `#8B5CF6` | Secondary actions, badges | 4.6:1 ✓ |
| `accent-tertiary` | `#F59E0B` | Warnings, highlights, rank #1 | 8.3:1 ✓ |

#### Semantic Colors

| Token | Hex | Usage | Contrast on #0B0F1A |
|-------|-----|-------|---------------------|
| `color-success` | `#34D399` | Success messages, positive values | 8.1:1 ✓ |
| `color-error` | `#F87171` | Errors, destructive actions | 5.1:1 ✓ |
| `color-warning` | `#FBBF24` | Warnings, caution states | 10.2:1 ✓ |
| `color-info` | `#60A5FA` | Informational messages | 5.4:1 ✓ |

#### Rank Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `rank-gold` | `#F59E0B` | Rank #1 recommendation border |
| `rank-silver` | `#94A3B8` | Rank #2 recommendation border |
| `rank-bronze` | `#D97706` | Rank #3 recommendation border |

#### Category Colors

| Token | Hex | Category |
|-------|-----|----------|
| `category-gift-card` | `#8B5CF6` | GIFT_CARD |
| `category-cashback` | `#34D399` | CASHBACK |
| `category-merchandise` | `#F59E0B` | MERCHANDISE |
| `category-travel` | `#60A5FA` | TRAVEL |
| `category-dining` | `#F87171` | DINING |

#### Border Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `border-default` | `#1E293B` | Default borders |
| `border-subtle` | `#334155` | Subtle separators |
| `border-focus` | `#14B8A6` | Focus ring, active state |
| `border-error` | `#F87171` | Error state borders |

### 3.2 Gradient Definitions

| Gradient | Colors | Usage |
|----------|--------|-------|
| `gradient-hero` | `#0B0F1A → #111827` | Hero section background |
| `gradient-card` | `#111827 → #1E293B` | Elevated card background |
| `gradient-accent` | `#14B8A6 → #0D9488` | Primary CTA buttons |
| `gradient-rank-1` | `#F59E0B → #D97706` | Rank #1 recommendation |
| `gradient-shimmer` | `#1E293B → #334155 → #1E293B` | Skeleton loader animation |

---

## 4. Typography

### 4.1 Font Stack

```css
/* Primary Font */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
             Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
             'Helvetica Neue', sans-serif;

/* Monospace (for numbers) */
font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
```

### 4.2 Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `text-display` | 48px / 3rem | 700 (Bold) | 1.1 | Hero headline |
| `text-h1` | 36px / 2.25rem | 700 (Bold) | 1.2 | Page titles |
| `text-h2` | 28px / 1.75rem | 600 (SemiBold) | 1.3 | Section headings |
| `text-h3` | 22px / 1.375rem | 600 (SemiBold) | 1.4 | Sub-section headings |
| `text-h4` | 18px / 1.125rem | 600 (SemiBold) | 1.4 | Card titles |
| `text-body` | 16px / 1rem | 400 (Regular) | 1.5 | Body text |
| `text-body-sm` | 14px / 0.875rem | 400 (Regular) | 1.5 | Secondary text |
| `text-caption` | 12px / 0.75rem | 400 (Regular) | 1.4 | Captions, labels |
| `text-overline` | 11px / 0.6875rem | 500 (Medium) | 1.4 | Overlines, badges |

### 4.3 Number Typography

Financial numbers use the monospace font for consistent alignment:

| Token | Size | Weight | Font | Usage |
|-------|------|--------|------|-------|
| `num-display` | 48px | 700 | Monospace | Hero value display |
| `num-large` | 32px | 700 | Monospace | Summary values |
| `num-medium` | 22px | 600 | Monospace | Card values, VPP |
| `num-small` | 16px | 500 | Monospace | Inline values |
| `num-xs` | 12px | 500 | Monospace | Table values |

### 4.4 Typography Rules

| Rule | Description |
|------|-------------|
| **Maximum 2 font families** | Inter for text; monospace for numbers |
| **Maximum 4 font weights** | 400, 500, 600, 700 |
| **No ALL CAPS except** | Overlines, badges, and status labels only |
| **Minimum body text** | 14px for readability on mobile |
| **Line height** | 1.5 for body; 1.2 for headings |
| **Letter spacing** | -0.02em for headings; normal for body |

---

## 5. Spacing System

### 5.1 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-0` | 0px | — |
| `space-1` | 4px | Tight spacing (icon gaps) |
| `space-2` | 8px | Small spacing (inline elements) |
| `space-3` | 12px | Medium-small (padding in small cards) |
| `space-4` | 16px | Medium (default gap, padding) |
| `space-5` | 20px | Medium-large (card padding) |
| `space-6` | 24px | Large (section padding) |
| `space-8` | 32px | Extra large (section gaps) |
| `space-10` | 40px | XXL (page margins) |
| `space-12` | 48px | XXXL (large section gaps) |
| `space-16` | 64px | Massive (hero section padding) |
| `space-20` | 80px | Page-level vertical spacing |
| `space-24` | 96px | Maximum spacing |

### 5.2 Tailwind Mapping

```javascript
// tailwind.config.js spacing extensions
spacing: {
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
  '20': '80px',
  '24': '96px',
}
```

### 5.3 Spacing Usage Patterns

| Context | Padding | Gap |
|---------|---------|-----|
| **Page container** | 16px mobile / 24px tablet / 32px desktop | — |
| **Section spacing** | — | 48px (mobile) / 64px (desktop) |
| **Card padding** | 16px (mobile) / 24px (desktop) | — |
| **Card gap (grid)** | — | 16px (mobile) / 24px (desktop) / 32px (desktop) |
| **Input padding** | 12px vertical / 16px horizontal | — |
| **Button padding** | 12px vertical / 24px horizontal | — |
| **Icon + text gap** | — | 8px |
| **Heading + body gap** | — | 8px / 12px |

---

## 6. Layout System

### 6.1 Container Sizes

| Container | Max-Width | Padding | Usage |
|-----------|-----------|---------|-------|
| `container-sm` | 640px | 16px | Forms, narrow content |
| `container-md` | 768px | 16px | Blog-style content |
| `container-lg` | 1024px | 24px | Standard page content |
| `container-xl` | 1200px | 32px | Wide layouts |
| `container-2xl` | 1440px | 32px | Large desktop layouts |

### 6.2 Grid System

| Breakpoint | Columns | Gutter | Margin |
|------------|---------|--------|--------|
| Mobile (< 640px) | 4 | 16px | 16px |
| Tablet (640-1024px) | 8 | 24px | 24px |
| Desktop (1024-1440px) | 12 | 32px | auto (centered) |
| Large (> 1440px) | 12 | 32px | auto (centered) |

### 6.3 Breakpoints

```javascript
// tailwind.config.js
screens: {
  'sm': '640px',      // Tablet
  'md': '768px',      // Tablet landscape
  'lg': '1024px',     // Desktop
  'xl': '1280px',     // Large desktop
  '2xl': '1536px',    // Extra large
}
```

### 6.4 Responsive Patterns

| Pattern | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| **Hero Section** | Stacked (text + image) | Side-by-side | Side-by-side, wider |
| **Card Grid** | 1 column | 2 columns | 3 columns |
| **Recommendations** | Stacked cards | 2 columns | 3 columns, side-by-side |
| **Navigation** | Hamburger menu | Inline links | Inline links |
| **Form Layout** | Full-width fields | 2-column grid | 2-column grid |
| **Table** | Card-based | Scrollable table | Full table |

---

## 7. Component Design Principles

### 7.1 Component Design Rules

| Rule | Description |
|------|-------------|
| **Consistent Border Radius** | All components use the same radius scale |
| **Subtle Shadows** | Dark theme uses glow/shadow for elevation, not drop shadows |
| **Minimal Borders** | Use borders sparingly; prefer background contrast |
| **Touch Targets** | Minimum 44px × 44px for interactive elements |
| **State Transitions** | 150ms ease-in-out for hover/focus/active states |
| **Focus Indicators** | 2px solid accent ring with 2px offset |

### 7.2 Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `radius-none` | 0px | — |
| `radius-sm` | 4px | Badges, small elements |
| `radius-md` | 8px | Inputs, buttons |
| `radius-lg` | 12px | Cards, modals |
| `radius-xl` | 16px | Large cards, hero sections |
| `radius-2xl` | 24px | Pill buttons, chips |
| `radius-full` | 9999px | Circular avatars, round buttons |

### 7.3 Shadow System (Dark Theme)

Dark themes need different shadow approach — use subtle glows rather than drop shadows:

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.3)` | Subtle elevation |
| `shadow-md` | `0 4px 6px rgba(0, 0, 0, 0.4)` | Card elevation |
| `shadow-lg` | `0 10px 15px rgba(0, 0, 0, 0.5)` | Modal elevation |
| `shadow-glow` | `0 0 20px rgba(20, 184, 166, 0.15)` | Accent glow (teal) |
| `shadow-gold` | `0 0 20px rgba(245, 158, 11, 0.2)` | Rank #1 gold glow |
| `shadow-focus` | `0 0 0 3px rgba(20, 184, 166, 0.3)` | Focus ring |

### 7.4 Button Design

#### Primary Button

```
┌─────────────────────────────────────┐
│                                     │
│        Find Best Redemption         │
│                                     │
└─────────────────────────────────────┘

Background: gradient-accent (#14B8A6 → #0D9488)
Text: #FFFFFF
Border: none
Border-radius: radius-md (8px)
Padding: 12px 24px
Font: 16px, 600 weight
Hover: brightness(1.1), shadow-glow
Active: brightness(0.95)
Disabled: opacity 0.5, cursor not-allowed
Loading: spinner icon + "Loading..." text
```

#### Secondary Button

```
┌─────────────────────────────────────┐
│                                     │
│          Edit Points                │
│                                     │
└─────────────────────────────────────┘

Background: transparent
Text: #14B8A6
Border: 1px solid #14B8A6
Border-radius: radius-md (8px)
Padding: 12px 24px
Hover: background rgba(20, 184, 166, 0.1)
```

#### Ghost Button

```
┌─────────────────────────────────────┐
│                                     │
│          Back to Home               │
│                                     │
└─────────────────────────────────────┘

Background: transparent
Text: #94A3B8
Border: none
Hover: color #F8FAFC
```

### 7.5 Input Design

```
Default State:
┌─────────────────────────────────────┐
│ 🔍 Search by bank name...           │
└─────────────────────────────────────┘
Background: #1E293B
Border: 1px solid #334155
Border-radius: radius-md (8px)
Text: #F8FAFC
Placeholder: #64748B
Padding: 12px 16px

Focus State:
┌─────────────────────────────────────┐
│ 🔍 HDFC                            │
└─────────────────────────────────────┘
Border: 2px solid #14B8A6
Box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.2)

Error State:
┌─────────────────────────────────────┐
│ 🔍                                 │
└─────────────────────────────────────┘
Border: 2px solid #F87171
Error text below: "Please enter a valid bank name"
```

### 7.6 Card Design

```
Standard Card:
┌─────────────────────────────────────┐
│                                     │
│  🏦 HDFC Bank                       │
│  Card: Regalia                      │
│  Type: PLATINUM                     │
│                                     │
│  [Select This Card]                 │
│                                     │
└─────────────────────────────────────┘
Background: #111827
Border: 1px solid #1E293B
Border-radius: radius-lg (12px)
Padding: 20px
Hover: border-color #334155, shadow-md

Selected Card:
┌─────────────────────────────────────┐
│  ✓                                  │
│  🏦 HDFC Bank                       │
│  Card: Regalia                      │
│  Type: PLATINUM                     │
│                                     │
│  [Selected]                         │
│                                     │
└─────────────────────────────────────┘
Border: 2px solid #14B8A6
Background: rgba(20, 184, 166, 0.05)
```

### 7.7 Badge Design

```
Category Badge:
┌──────────┐
│ Gift Card│
└──────────┘
Background: rgba(139, 92, 246, 0.15)  (purple for GIFT_CARD)
Text: #8B5CF6
Border-radius: radius-sm (4px)
Padding: 2px 8px
Font: 11px, 500 weight

Rank Badge:
┌──────────┐
│   #1     │
└──────────┘
Background: gradient-rank-1
Text: #FFFFFF
Border-radius: radius-full (circular)
Size: 32px × 32px
```

---

## 8. Fintech UI Guidelines

### 8.1 Data Presentation Rules

| Rule | Description |
|------|-------------|
| **Currency Format** | Always use ₹ symbol with Indian comma grouping (₹1,50,000) |
| **Number Format** | Use commas for readability (50,000 not 50000) |
| **Decimal Places** | VPP: 2 decimal places (₹0.10); Cash: 0 decimal places (₹500) |
| **Percentage** | 1 decimal place (12.5%) |
| **Date Format** | DD MMM YYYY (15 Jan 2026) |
| **Points Display** | With commas and "points" suffix (50,000 points) |

### 8.2 Value Display Hierarchy

```
Primary Value (Largest):
┌─────────────────────────────┐
│  ₹7,500                     │  ← num-large, text-primary
│  Estimated Value            │  ← text-caption, text-secondary
└─────────────────────────────┘

Secondary Value (Medium):
┌─────────────────────────────┐
│  ₹0.10                      │  ← num-medium, accent-primary
│  Value per Point            │  ← text-caption, text-secondary
└─────────────────────────────┘

Tertiary Value (Small):
┌─────────────────────────────┐
│  50,000 points              │  ← num-small, text-primary
│  Required: 4,000 pts        │  ← text-caption, text-secondary
└─────────────────────────────┘
```

### 8.3 Positive/Negative Value Colors

| Value Type | Color | Example |
|------------|-------|---------|
| **Positive** | `#34D399` (green) | "+12.5% increase" |
| **Negative** | `#F87171` (red) | "Expiring in 30 days" |
| **Neutral** | `#94A3B8` (gray) | "No change" |
| **High Value** | `#14B8A6` (teal) | "Best option" |
| **Premium** | `#F59E0B` (gold) | "#1 Recommended" |

### 8.4 Trust Signals

| Signal | Implementation |
|--------|---------------|
| **No Login Required** | "No login required" badge on CTA |
| **Instant Results** | "Results in seconds" tagline |
| **Data Security** | "Your data stays on your device" footer note |
| **Professional Look** | Premium dark theme builds confidence |
| **Transparent Logic** | Show VPP formula; explain recommendation reasoning |

---

## 9. Dark Theme Guidelines

### 9.1 Dark Theme Rules

| Rule | Description |
|------|-------------|
| **Background Depth** | Use 3-4 background shades for depth hierarchy |
| **No Pure Black** | Avoid #000000; use #0B0F1A or #111827 instead |
| **Border Subtlety** | Use very subtle borders (#1E293B) for separation |
| **Text Hierarchy** | 3 text levels: primary (#F8FAFC), secondary (#94A3B8), tertiary (#64748B) |
| **Accent Pops** | Use accent colors sparingly for emphasis |
| **Hover States** | Slightly lighten backgrounds on hover |
| **Focus Rings** | Use accent glow for focus indicators |

### 9.2 Elevation Model

```
Level 0: App Background      #0B0F1A
         (deepest, flat)

Level 1: Content Surface     #111827
         (cards, sections)    + shadow-sm

Level 2: Elevated Surface    #1E293B
         (inputs, modals)     + shadow-md

Level 3: Overlay             rgba(0, 0, 0, 0.6)
         (backdrop)           + shadow-lg

Each level adds subtle elevation through background color + shadow
```

### 9.3 Dark Theme Implementation (Tailwind)

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    colors: {
      dark: {
        50: '#F8FAFC',    // text-primary
        100: '#F1F5F9',   // text-secondary (light)
        200: '#E2E8F0',   // text-secondary
        300: '#CBD5E1',   // text-secondary (dark)
        400: '#94A3B8',   // text-secondary
        500: '#64748B',   // text-tertiary
        600: '#475569',   // border-subtle
        700: '#334155',   // border-default
        800: '#1E293B',   // bg-tertiary
        900: '#111827',   // bg-secondary
        950: '#0B0F1A',   // bg-primary
      },
      accent: {
        DEFAULT: '#14B8A6',  // teal
        hover: '#0D9488',
        light: '#5EEAD4',
      },
      rank: {
        gold: '#F59E0B',
        silver: '#94A3B8',
        bronze: '#D97706',
      },
    },
  },
}
```

### 9.4 Dark Theme CSS Variables

```css
:root {
  /* Backgrounds */
  --bg-primary: #0B0F1A;
  --bg-secondary: #111827;
  --bg-tertiary: #1E293B;
  --bg-elevated: #1E293B;
  --bg-overlay: rgba(0, 0, 0, 0.6);

  /* Text */
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --text-tertiary: #64748B;

  /* Accent */
  --accent-primary: #14B8A6;
  --accent-hover: #0D9488;

  /* Semantic */
  --color-success: #34D399;
  --color-error: #F87171;
  --color-warning: #FBBF24;
  --color-info: #60A5FA;

  /* Borders */
  --border-default: #1E293B;
  --border-subtle: #334155;
  --border-focus: #14B8A6;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 20px rgba(20, 184, 166, 0.15);
}
```

---

## 10. Animation Guidelines

### 10.1 Timing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Most transitions |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exiting elements |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Entering elements |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy interactions |

### 10.2 Duration Scale

| Token | Duration | Usage |
|-------|----------|-------|
| `duration-fast` | 100ms | Micro-interactions (icon hover) |
| `duration-normal` | 150ms | Button states, input focus |
| `duration-medium` | 250ms | Card transitions, menu open |
| `duration-slow` | 400ms | Page transitions, modals |
| `duration-slower` | 600ms | Complex animations (hero) |

### 10.3 Animation Patterns

| Animation | Trigger | Duration | Description |
|-----------|---------|----------|-------------|
| **Fade In** | Element enters viewport | 300ms | Opacity 0 → 1 |
| **Slide Up** | Element enters viewport | 300ms | translateY(20px) → 0 |
| **Scale Up** | Card hover | 150ms | scale(1.02) |
| **Shimmer** | Skeleton loading | 1.5s loop | Gradient sweep left → right |
| **Number Count** | Value changes | 500ms | Animated counter |
| **Pulse** | Loading indicator | 1s loop | Opacity pulse |
| **Toast Enter** | Toast appears | 300ms | Slide in from right |
| **Toast Exit** | Toast dismisses | 200ms | Slide out to right |

### 10.4 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. Iconography

### 11.1 Icon Library

| Library | Usage |
|---------|-------|
| **React Icons (Feather)** | Primary icon set for UI elements |
| **React Icons (Heroicons)** | Secondary icons for fintech-specific elements |

### 11.2 Icon Sizes

| Token | Size | Usage |
|-------|------|-------|
| `icon-sm` | 16px | Inline icons, badges |
| `icon-md` | 20px | Button icons, navigation |
| `icon-lg` | 24px | Card icons, section headers |
| `icon-xl` | 32px | Feature icons, empty states |
| `icon-2xl` | 48px | Hero illustrations |

### 11.3 Common Icons

| Action | Icon | Library |
|--------|------|---------|
| Search | `FiSearch` | Feather |
| Credit Card | `FiCreditCard` | Feather |
| Star/Best | `FiStar` | Feather |
| Trophy/Rank | `FiAward` | Feather |
| Arrow Right | `FiArrowRight` | Feather |
| Arrow Left | `FiArrowLeft` | Feather |
| Check Circle | `FiCheckCircle` | Feather |
| Alert Triangle | `FiAlertTriangle` | Feather |
| Info | `FiInfo` | Feather |
| Share | `FiShare2` | Feather |
| Filter | `FiFilter` | Feather |
| Sort | `FiArrowUpDown` | Feather |
| Close | `FiX` | Feather |
| Menu | `FiMenu` | Feather |
| Loader | `FiLoader` | Feather (animated) |

---

## 12. Responsive Design Tokens

### 12.1 Mobile-First Token Application

```css
/* Mobile First Approach */
.container {
  padding: 16px;                    /* space-4 */
}

@media (min-width: 640px) {
  .container {
    padding: 24px;                  /* space-6 */
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 32px;                  /* space-8 */
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### 12.2 Component Responsive Behavior

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| **Header** | Hamburger | Inline nav | Inline nav + CTA |
| **Hero** | Stacked, centered | Side-by-side | Side-by-side, wider |
| **Card Grid** | 1 col, full-width | 2 cols | 3 cols |
| **Input** | Full-width | Full-width | Max-width 400px |
| **Button** | Full-width | Auto-width | Auto-width |
| **Recommendation** | Stacked, full-width | 2 cols | 3 cols, compact |
| **Table** | Card layout | Horizontal scroll | Full table |

---

*Document maintained by RedeemWise Frontend Team*
