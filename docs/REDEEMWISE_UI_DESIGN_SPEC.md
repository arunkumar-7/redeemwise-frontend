# REDEEMWISE\_UI\_DESIGN\_SPEC.md

*Frontend UI & Design System Specification for [RedeemWise](https://redeemwise.my.canva.site/)*

---

## SECTION 1: DESIGN OVERVIEW

### Overall Visual Style

The design of RedeemWise follows a modern, high-trust fintech editorial aesthetic. It pairs high-contrast editorial typography with clean, structured software UI surfaces. The visual language blends airy whitespace, soft slate-gray neutral backgrounds, crisp border outlines, and vibrant turquoise/teal accents to create an atmosphere of financial intelligence, transparency, and modern precision.

### Design Philosophy

The core design philosophy is **"Clarity Over Complexity"**. Credit card reward programs are inherently opaque and confusing; RedeemWise counters this by stripping away complex calculations and presenting clear, actionable value comparisons. The UI relies on lightweight card structures, digestible 3-step flows, quantifiable metrics, and visual comparison tables rather than dense text blocks.

### Target Audience

- Credit card holders in India seeking to optimize points redemption value.  
- Cardholders with premium cards (e.g., HDFC Regalia, Axis, ICICI, SBI, Amex).  
- Frequent flyers, travel hackers, and value-conscious consumers who want to compare flight, hotel, shopping, and cashback redemption rates without friction or login requirements.

### Brand Personality

- **Authoritative & Trustworthy:** Clean lines, solid contrast, balanced typography, and structured proof points.  
- **Effortless & Accessible:** No forced login, no data capture barriers, transparent instant recommendations.  
- **Intelligent & Analytical:** Data-driven presentation highlighting concrete Rupee valuations (e.g., ₹0.25 per point).

### Fintech & SaaS Inspirations

- **Linear / Stripe:** Subtle borders, refined card radii, micro-badges, and high-legibility sans-serif UI typography.  
- **CRED / The Points Guy:** Reward-centric value proposition, credit card visualization mockups, and bold value-delta callouts.  
- **Apple Product Pages:** Editorial serif headings juxtaposed with clean product UI previews.

### Visual Hierarchy Strategy

1. **Primary Focus (Level 1):** Large serif headlines communicating the core benefit ("Stop Wasting Your Reward Points") and primary conversion buttons ("Find Best Redemption").  
2. **Secondary Anchors (Level 2):** Asymmetric visual artifacts—specifically the Credit Card Reward Potential graphic in the Hero fold and the interactive Recommendation Dashboard preview.  
3. **Tertiary Flow (Level 3):** 3-column structured step and feature cards framed with lightweight borders and categorized pre-heading badges in small-caps teal.  
4. **Supporting Detail (Level 4):** Slate-gray body copy, compact metadata labels, and single-column stacked FAQ accordions.

---

## SECTION 2: PAGE STRUCTURE

The website comprises 10 distinct, vertically stacked sections:

### 1\. Navigation Bar (Navbar)

- **Purpose:** Brand anchoring, internal page navigation, and persistent conversion trigger.  
- **Layout Type:** Full-width fixed/sticky horizontal row (3-zone: Logo on left, navigation links in center, primary action button on right).  
- **Visual Importance:** High (persistent utility).  
- **Estimated Spacing:** Height 72px–80px, horizontal padding 24px–32px, max content width 1200px.

### 2\. Hero Section

- **Purpose:** Instant value proposition delivery, intent capture, and visual credibility demonstration.  
- **Layout Type:** 2-column asymmetric split grid (Desktop: \~55% Left text and action stack, \~45% Right illustrated reward card preview).  
- **Visual Importance:** Maximum (above-the-fold focal point).  
- **Estimated Spacing:** Top padding 80px–100px, bottom padding 60px–80px, inter-column gap 48px–64px.

### 3\. Statistics Bar

- **Purpose:** Immediate quantifiable scale and credibility indicators.  
- **Layout Type:** 4-column inline metric bar with vertical dividing rules housed in a subtle tinted container.  
- **Visual Importance:** Medium-High.  
- **Estimated Spacing:** Internal vertical padding 28px–32px, horizontal padding 32px, column gap 24px.

### 4\. "How It Works" Section

- **Purpose:** Demystify the 3-step user journey and demonstrate simplicity.  
- **Layout Type:** Centered section header stack followed by a 3-column horizontal card grid.  
- **Visual Importance:** High.  
- **Estimated Spacing:** Vertical section padding 80px–96px, grid gap 24px–32px, card padding 28px–32px.

### 5\. Benefits Section ("A Better Way to Think About Card Rewards")

- **Purpose:** Highlight core feature advantages (Rupee valuation, side-by-side comparison, privacy-first architecture).  
- **Layout Type:** Centered section header stack followed by a 3-column feature card grid.  
- **Visual Importance:** High.  
- **Estimated Spacing:** Vertical section padding 80px–96px, grid gap 24px–32px, card padding 28px–32px.

### 6\. "See It In Action" / Interactive Preview Section

- **Purpose:** Concrete product UI demonstration showcasing the ranking algorithm and value calculation.  
- **Layout Type:** 2-column asymmetric layout (Left: narrative copy with checkmark benefit points; Right: Recommendation Dashboard component).  
- **Visual Importance:** Very High.  
- **Estimated Spacing:** Vertical section padding 80px–96px, inter-column gap 48px–64px, dashboard card padding 24px–28px.

### 7\. Testimonials Section ("Trusted by Reward Optimizers")

- **Purpose:** Social proof across relevant professional personas and major Indian tech hubs.  
- **Layout Type:** Centered section header followed by a 3-column review card grid.  
- **Visual Importance:** Medium-High.  
- **Estimated Spacing:** Vertical section padding 80px–96px, grid gap 24px–32px, card padding 32px.

### 8\. FAQ Accordion Section ("Questions, Answered")

- **Purpose:** Overcome user hesitation, clarify data privacy, and explain calculation methodology.  
- **Layout Type:** Centered header block with a single-column, centered vertical accordion list (max-width \~768px–800px).  
- **Visual Importance:** Medium.  
- **Estimated Spacing:** Vertical section padding 80px–96px, vertical gap between items 12px–16px, item internal padding 20px–24px.

### 9\. Final Call-to-Action (CTA) Section

- **Purpose:** High-impact final conversion opportunity before page exit.  
- **Layout Type:** Full-width dark navy background block with centered typography and an enlarged primary action button.  
- **Visual Importance:** Very High.  
- **Estimated Spacing:** Vertical padding 96px–112px, container max-width 800px, internal vertical element gap 24px.

### 10\. Footer Bar

- **Purpose:** Legal compliance links, navigation support, and brand attribution.  
- **Layout Type:** Full-width pitch-black horizontal bar with a 2-side split (links on left, attribution badge on right).  
- **Visual Importance:** Low / Utility.  
- **Estimated Spacing:** Height 56px–64px, horizontal padding 24px–32px, vertical padding 16px–20px.

---

## SECTION 3: COLOR SYSTEM

| Category | Color Name | HEX Code | Usage |
| :---- | :---- | :---- | :---- |
| **Primary** | Primary Teal | `#14B8A6` | Primary buttons, active state indicators, step badges, checkmark icons, highlight borders |
| **Primary** | Primary Teal Dark (Hover) | `#0D9488` | Button hover and active press states |
| **Primary** | Primary Teal Light (Tint) | `#F0FDFA` | Highlighted table row backgrounds, subtle badge fills |
| **Secondary** | Dark Slate / Navy | `#0F172A` | Main headings, dark CTA block background, secondary button borders/text |
| **Secondary** | Dark Navy Surface | `#1E293B` | Credit card mockup container, dark UI cards |
| **Background** | Pure White | `#FFFFFF` | Primary page body, card backgrounds, accordion item background |
| **Background** | Soft Neutral / Off-White | `#F8FAFC` | Statistics strip background, step card subtle surface alternative |
| **Background** | Slate Muted Light | `#F1F5F9` | Icon box container background, subtle dividing lines |
| **Background** | Deep Midnight Navy | `#0A1128` | Final CTA section background container |
| **Background** | Pure Black | `#000000` | Bottom footer bar background |
| **Text** | Text Primary (Headings) | `#0F172A` | High-contrast serif headlines, bold card titles, testimonial quotes |
| **Text** | Text Secondary (Body) | `#475569` | Paragraph descriptions, subtitles, feature descriptions |
| **Text** | Text Muted (Captions) | `#64748B` | Step numbers, metadata, author locations, statistic labels |
| **Text** | Text On-Dark Primary | `#FFFFFF` | Headings and primary button text on dark surfaces |
| **Text** | Text On-Dark Secondary | `#94A3B8` | Subtitles and supporting copy on dark surfaces |
| **Border** | Border Default / Subtle | `#E2E8F0` | Card borders, accordion dividers, statistic dividers, outline buttons |
| **Border** | Border Highlight / Active | `#14B8A6` | Highlighted recommendation dashboard row, active elements |
| **Border** | Border Dark Mode | `#334155` | Dividers and borders on dark background sections |
| **Success** | Success Emerald / Teal | `#10B981` | Checkmarks, positive value metrics, "Best Value" badges |
| **Success** | Success Light | `#ECFDF5` | Positive delta indicator backgrounds |
| **Accent** | Gold / Amber | `#FBBF24` | 5-star testimonial rating stars, "Up to 3X Better Value" highlight pill |
| **Accent** | Soft Sky Blue | `#E0F2FE` | Alternative icon container background |
| **Accent** | Soft Amber Tint | `#FEF3C7` | Step 3 / Feature highlight icon background |

---

## SECTION 4: TYPOGRAPHY SYSTEM

The typography pairs an **Editorial Serif** font family for all primary narrative headings with a clean **Modern Sans-Serif** font family for UI, labels, statistics, and body text.

### Font Family Allocations

- **Primary Serif Family:** *Playfair Display*, *Libre Baskerville*, *Merriweather*, or Canva Serif equivalent (used for H1, H2, and pull quotes).  
- **Primary Sans-Serif Family:** *Inter*, *Plus Jakarta Sans*, *DM Sans*, or system sans-serif (used for UI elements, badges, body copy, buttons, and statistics).

### Typography Scale & Specifications

| Text Style / Role | Font Family | Size (Desktop) | Size (Mobile) | Font Weight | Line Height | Letter Spacing |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **Hero Display Headline (H1)** | Editorial Serif | 56px–64px | 36px–40px | Bold (700) | 1.15 | \-0.02em |
| **Hero Sub-Headline** | Modern Sans-Serif | 24px–28px | 18px–20px | SemiBold (600) | 1.30 | \-0.01em |
| **Section Headline (H2)** | Editorial Serif | 36px–40px | 28px–32px | Bold (700) | 1.20 | \-0.015em |
| **Section Subtitle** | Modern Sans-Serif | 18px–20px | 16px | Regular (400) | 1.50 | normal |
| **Pre-Heading Badge** | Modern Sans-Serif | 12px–14px | 11px–12px | Bold (700) | 1.40 | 0.12em (Uppercase) |
| **Card Title (H3)** | Modern Sans-Serif | 20px–22px | 18px | SemiBold (600) / Bold (700) | 1.30 | \-0.01em |
| **Body Large (Intro text)** | Modern Sans-Serif | 16px–18px | 15px–16px | Regular (400) | 1.60 | normal |
| **Body Regular (Card text)** | Modern Sans-Serif | 15px–16px | 14px–15px | Regular (400) | 1.55 | normal |
| **Testimonial Quote** | Editorial Serif | 17px–18px | 15px–16px | Regular (400) Italic | 1.50 | normal |
| **Stat Numbers** | Modern Sans-Serif | 40px–48px | 32px–36px | Bold (700) / ExtraBold (800) | 1.10 | \-0.02em |
| **Stat Labels** | Modern Sans-Serif | 14px–15px | 13px | Medium (500) | 1.30 | normal |
| **Button Text** | Modern Sans-Serif | 14px–15px | 14px | SemiBold (600) | 1.20 | 0.01em |
| **Caption / Metadata** | Modern Sans-Serif | 12px–13px | 12px | Regular (400) | 1.40 | normal |

---

## SECTION 5: SPACING SYSTEM

### Global Container & Structural Layout Dimensions

- **Primary Content Max Width:** `1200px` (centered horizontally with auto margins).  
- **Narrow Content Max Width (FAQ, Final CTA):** `768px–800px`.  
- **Gutter Width (Horizontal Screen Margin):** `32px` on desktop, `24px` on tablet, `16px` on mobile.

### Section Vertical Spacing

- **Standard Section Vertical Padding:** `80px–96px` top and bottom.  
- **Hero Section Vertical Padding:** `80px–100px` top, `60px–80px` bottom.  
- **Final CTA Section Vertical Padding:** `96px–112px` top and bottom.  
- **Statistics Bar Vertical Padding:** `28px–32px` top and bottom.

### Component Internal Padding

- **Standard Cards (Steps, Benefits, Testimonials):** `28px–32px` all sides.  
- **Dashboard Preview Container:** `24px–28px` all sides.  
- **Accordion Item Padding:** `20px–24px` horizontal, `18px–20px` vertical.  
- **Icon Container Box:** `48px x 48px` to `56px x 56px` square dimensions with centered content.

### Inter-Element Spacing (Margins & Gaps)

- **Pre-Heading Badge to Section Title:** `12px–16px`.  
- **Section Title to Section Subtitle:** `16px–20px`.  
- **Section Header Block to Card Grid:** `48px–56px`.  
- **Card Title to Card Body Copy:** `12px–14px`.  
- **CTA Button Group Horizontal Gap:** `16px`.  
- **Grid Gaps (3-Column Grids):** `24px–32px`.  
- **Asymmetric Grid Gap (2-Column Hero/Action):** `48px–64px`.

### Navigation & Footer Heights

- **Navbar Height:** `72px–80px`.  
- **Footer Bar Height:** `56px–64px`.

---

## SECTION 6: GRID SYSTEM

### Breakpoint Strategy

- **Mobile (`< 640px`):** Single column linear stack, 16px screen padding, 100% element width.  
- **Tablet (`640px – 1024px`):** 2-column wrapping grids for cards, vertically stacked hero with centered text, 24px screen padding.  
- **Desktop (`> 1024px`):** 12-column grid system, 3-column equal card grids, 4-column inline metric bar, 2-column asymmetric hero/action layouts, 32px screen padding.

### Column Layout Specifications

1. **Hero Section:**  
   - Desktop: 12-column grid. Left content spans 7 columns (58.33%); right visual graphic spans 5 columns (41.67%).  
   - Tablet/Mobile: Stacks into 1 column (text on top, graphic underneath).  
2. **Statistics Bar:**  
   - Desktop: 4 equal columns (`repeat(4, minmax(0, 1fr))`) separated by vertical 1px divider lines.  
   - Tablet: 2x2 grid (`repeat(2, minmax(0, 1fr))`).  
   - Mobile: 1-column stack or 2-column compact layout.  
3. **Step Cards & Benefit Cards:**  
   - Desktop: 3 equal columns (`repeat(3, minmax(0, 1fr))`).  
   - Tablet: 2 columns (Card 1 & 2 side-by-side, Card 3 full width or wrapped).  
   - Mobile: 1 column vertical stack.  
4. **"See It In Action" Fold:**  
   - Desktop: 2-column asymmetric layout (Left text spans 5 columns; Right dashboard card spans 7 columns).  
   - Tablet/Mobile: Stacks into 1 column (narrative text on top, dashboard preview below).  
5. **Testimonial Cards:**  
   - Desktop: 3 equal columns (`repeat(3, minmax(0, 1fr))`).  
   - Tablet/Mobile: 1 column vertical stack (or horizontal snap carousel).  
6. **FAQ Accordion:**  
   - Single column centered layout with max-width constrained to `768px`.

---

## SECTION 7: COMPONENT INVENTORY

### 1\. `Navbar`

- **Purpose:** Top-level navigation, identity, and persistent CTA access.  
- **Props / Content:**  
  - `logoText`: string ("RedeemWise")  
  - `logoIcon`: SVG asset (Teal abstract reward leaf)  
  - `navLinks`: Array of `{ label: string, href: string }` (`Home`, `How It Works`, `Benefits`, `FAQ`)  
  - `ctaButton`: `{ label: string, onClick: function }` ("Find Best Redemption")  
- **Visual Behavior:** Fixed or sticky at page top; maintains subtle border-bottom (`#E2E8F0`) on scroll.

### 2\. `SectionHeader`

- **Purpose:** Standardized title block for all major content sections.  
- **Props / Content:**  
  - `badgeText`: string (e.g., "SIMPLE BY DESIGN")  
  - `titleText`: string (e.g., "Your smartest redemption is three steps away")  
  - `subtitleText`: optional string  
  - `align`: "center" | "left" (Defaults to "center", "left" for 2-column splits)  
- **Visual Behavior:** Pre-heading rendered in uppercase tracked teal; title in high-contrast serif.

### 3\. `HeroBadge`

- **Purpose:** Highlights the top branding statement in the Hero fold.  
- **Props / Content:**  
  - `label`: string ("REWARDS, MADE WORTHWHILE")  
- **Visual Behavior:** Teal bold text, tracked letter-spacing, uppercase.

### 4\. `Button`

- **Purpose:** Primary, secondary, and ghost interactive triggers.  
- **Props / Content:**  
  - `variant`: "primary" | "secondary" | "ghost"  
  - `size`: "medium" | "large"  
  - `label`: string  
  - `icon`: optional React node  
- **Visual Behavior:** Documented in detail in Section 8\.

### 5\. `TrustIndicator`

- **Purpose:** Displays a micro trust item beneath the Hero CTAs.  
- **Props / Content:**  
  - `icon`: SVG node (ShieldCheck, IndianRupee, Zap)  
  - `label`: string  
- **Visual Behavior:** Small circular container with a fine border (`#E2E8F0`) enclosing the icon, accompanied by compact caption text.

### 6\. `CreditCardMockup`

- **Purpose:** Visual anchor simulating a modern credit card in the Hero graphic.  
- **Props / Content:**  
  - `bankName`: string ("HDFC BANK")  
  - `cardModel`: string ("Regalia")  
  - `liveBadge`: boolean (true)  
  - `floatingBadges`: Array of `{ text: string, type: "value" | "multiplier" }`  
- **Visual Behavior:** Dark slate background (`#1E293B`), subtle gold chip illustration, rounded 16px corners, soft perspective tilt, floating chips ("Up to 3X Better Value", "₹0.25 / point").

### 7\. `StatCard` / `StatBar`

- **Purpose:** Showcases quantifiable scale metrics.  
- **Props / Content:**  
  - `stats`: Array of `{ value: string, label: string }`  
    - Item 1: `50+` | `Supported Credit Cards`  
    - Item 2: `100+` | `Redemption Options`  
    - Item 3: `10+` | `Major Banks`  
    - Item 4: `Instant` | `Recommendations`  
- **Visual Behavior:** Framed in a single continuous `#F8FAFC` container; vertical `#E2E8F0` dividers between items on desktop.

### 8\. `StepCard`

- **Purpose:** Explains a single step in the 3-step redemption process.  
- **Props / Content:**  
  - `stepNumber`: string ("STEP 01", "STEP 02", "STEP 03")  
  - `icon`: SVG icon  
  - `iconBgColor`: string (Teal tint, Blue tint, Amber tint)  
  - `title`: string  
  - `description`: string  
- **Visual Behavior:** Rounded white card (`#FFFFFF`) with 1px border (`#E2E8F0`), colored icon container at top-left, teal step badge, bold title, slate description.

### 9\. `FeatureCard`

- **Purpose:** Highlights a specific user benefit.  
- **Props / Content:**  
  - `icon`: SVG icon  
  - `title`: string  
  - `description`: string  
- **Visual Behavior:** Matches `StepCard` aesthetic dimensions; features rounded icon square at top-left.

### 10\. `RecommendationDashboard`

- **Purpose:** Realistic interactive card preview of the product recommendation interface.  
- **Props / Content:**  
  - `cardName`: string ("HDFC Regalia")  
  - `availablePoints`: number | string ("50,000")  
  - `subtitle`: string ("Your best ways to redeem today")  
  - `rows`: Array of `{ category: string, rate: string, totalRupees: string, isBestValue: boolean }`  
    - Row 1: `Flights` | `₹0.25 per point` | `₹12,500` | `isBestValue: true`  
    - Row 2: `Hotels` | `₹10,200` | `isBestValue: false`  
    - Row 3: `Shopping` | `₹8,000` | `isBestValue: false`  
- **Visual Behavior:** White container with 24px border radius. Row 1 is highlighted with a solid teal border (`#14B8A6`), light teal background (`#F0FDFA`), and a green/teal "BEST VALUE" badge.

### 11\. `TestimonialCard`

- **Purpose:** User review and social validation.  
- **Props / Content:**  
  - `rating`: number (5)  
  - `quote`: string  
  - `authorName`: string  
  - `authorRole`: string  
  - `avatarUrl`: string  
- **Visual Behavior:** 5 filled amber stars (`#FBBF24`, 16px size) at top; italic serif quote; flex row at bottom with circular avatar thumbnail and name/location text.

### 12\. `FAQAccordionItem`

- **Purpose:** Collapsible question and answer container.  
- **Props / Content:**  
  - `question`: string  
  - `answer`: string  
  - `isOpen`: boolean  
  - `onToggle`: function  
- **Visual Behavior:** White container with 16px radius and 1px border (`#E2E8F0`). Question row with right-aligned teal chevron. Answer smoothly animates down when expanded.

### 13\. `CTABanner`

- **Purpose:** Final dark-themed conversion section.  
- **Props / Content:**  
  - `badgeText`: string ("MAKE EVERY POINT COUNT")  
  - `titleText`: string ("Ready To Unlock More Value From Your Reward Points?")  
  - `buttonText`: string ("Find Best Redemption")  
- **Visual Behavior:** Dark navy background (`#0A1128`), white serif title, teal uppercase pre-badge, large centered teal button.

### 14\. `Footer`

- **Purpose:** Bottom legal bar and attribution.  
- **Props / Content:**  
  - `links`: Array of `{ label: string, href: string }` (`Terms & Support`, `Privacy Policy`)  
  - `attribution`: string ("Designed with Canva")  
- **Visual Behavior:** Pitch black background (`#000000`), muted slate text links with hover state, clean single-line layout.

---

## SECTION 8: BUTTON SYSTEM

### 1\. Primary Button ("Find Best Redemption")

- **Purpose:** Main conversion action throughout the page (Navbar, Hero, Final CTA).  
- **Background Color:** Solid Primary Teal (`#14B8A6`).  
- **Text Color:** Pure White (`#FFFFFF`).  
- **Font Specifications:** Modern Sans-Serif, 14px–15px size, SemiBold (600) weight.  
- **Border:** None (flush solid fill).  
- **Border Radius:** `8px–10px` (modern rounded corner).  
- **Padding:** Vertical `12px–14px`, Horizontal `24px–28px` (Hero/CTA large version: Vertical `16px`, Horizontal `32px`).  
- **Drop Shadow:** Subtle colored ambient shadow (`0 4px 14px 0 rgba(20, 184, 166, 0.25)`).  
- **Hover State:** Background shifts to Darker Teal (`#0D9488`), shadow expands slightly, subtle upward translation (`translateY(-1px)`).  
- **Active State:** Background shifts to `#0F766E`, shadow contracts, translation resets.

### 2\. Secondary / Outline Button ("See How It Works")

- **Purpose:** Secondary exploration action in the Hero fold.  
- **Background Color:** Pure White (`#FFFFFF`) or Transparent.  
- **Text Color:** Dark Slate (`#0F172A`).  
- **Font Specifications:** Modern Sans-Serif, 14px–15px size, SemiBold (600) weight.  
- **Border:** `1px solid #E2E8F0` (or `1px solid #0F172A` subtle outline).  
- **Border Radius:** `8px–10px`.  
- **Padding:** Vertical `12px–14px`, Horizontal `24px–28px`.  
- **Hover State:** Background transitions to soft neutral slate (`#F1F5F9`), border darkens to `#CBD5E1`.  
- **Active State:** Background transitions to `#E2E8F0`.

### 3\. Ghost Button (Nav Links & Text Triggers)

- **Purpose:** Header navigation links and inline text triggers.  
- **Background Color:** Transparent.  
- **Text Color:** Slate Gray (`#475569`).  
- **Font Specifications:** Modern Sans-Serif, 14px–15px size, Medium (500) weight.  
- **Border:** None.  
- **Border Radius:** `6px`.  
- **Padding:** Vertical `6px–8px`, Horizontal `12px–16px`.  
- **Hover State:** Text color shifts to Dark Slate (`#0F172A`) or Primary Teal (`#14B8A6`); optional subtle background fill (`#F8FAFC`).  
- **Active State:** Text color shifts to Primary Teal (`#14B8A6`).

---

## SECTION 9: CARD SYSTEM

### 1\. Step Card (How It Works)

- **Border Radius:** `20px–24px`.  
- **Border:** `1px solid #E2E8F0`.  
- **Background:** Pure White (`#FFFFFF`).  
- **Drop Shadow:** `0 4px 20px -2px rgba(15, 23, 42, 0.04)`.  
- **Padding:** `28px–32px`.  
- **Internal Layout Structure:**  
  - Top: Colored rounded-square icon box (`48px x 48px`, radius `12px`).  
  - Middle 1: Step Badge in uppercase teal (`STEP 01`).  
  - Middle 2: Card Title in bold dark slate (`Select Your Credit Card`).  
  - Bottom: Body copy in slate gray.  
- **Hover Effects:** Subtle upward translation (`translateY(-2px)`), border shifts to `#CBD5E1`, shadow deepens slightly.

### 2\. Benefit / Feature Card

- **Border Radius:** `20px–24px`.  
- **Border:** `1px solid #E2E8F0`.  
- **Background:** Pure White (`#FFFFFF`).  
- **Drop Shadow:** `0 4px 20px -2px rgba(15, 23, 42, 0.04)`.  
- **Padding:** `28px–32px`.  
- **Internal Layout Structure:**  
  - Top: Icon container box (`48px x 48px`, radius `12px`).  
  - Middle: Card Title in bold dark slate (`Maximize Reward Value`).  
  - Bottom: Body copy in slate gray (`Know the real rupee value behind your points...`).  
- **Hover Effects:** Subtle upward translation (`translateY(-2px)`), shadow elevation.

### 3\. Recommendation Dashboard Preview Card

- **Border Radius:** `24px–28px`.  
- **Border:** `1px solid #E2E8F0`.  
- **Background:** Pure White (`#FFFFFF`).  
- **Drop Shadow:** `0 10px 30px -4px rgba(15, 23, 42, 0.08)`.  
- **Padding:** `24px–28px`.  
- **Internal Layout Structure:**  
  - Header Row: Left: Card Name (`HDFC Regalia`); Right: Badge Box (`AVAILABLE POINTS: 50,000`).  
  - Sub-Header: Muted slate text (`Your best ways to redeem today`).  
  - Stacked Recommendation Rows:  
    - **Active/Top Row:** Solid 1.5px Teal border (`#14B8A6`), light teal background (`#F0FDFA`), category icon/name (`Flights`), per-point rate (`₹0.25 per point`), total Rupee valuation (`₹12,500`), and a green/teal pill badge (`BEST VALUE`).  
    - **Standard Rows:** Neutral white background, subtle border (`#E2E8F0`), category name (`Hotels`, `Shopping`), and total value (`₹10,200`, `₹8,000`).

### 4\. Testimonial Card

- **Border Radius:** `20px–24px`.  
- **Border:** `1px solid #E2E8F0`.  
- **Background:** Pure White (`#FFFFFF`).  
- **Drop Shadow:** `0 4px 20px -2px rgba(15, 23, 42, 0.04)`.  
- **Padding:** `32px`.  
- **Internal Layout Structure:**  
  - Top: Row of 5 gold filled stars (`#FBBF24`, 16px size).  
  - Middle: Italicized editorial serif review quote in dark slate.  
  - Bottom: Author row featuring circular avatar image thumbnail (40px x 40px), bold author name, and subtitle location/role.  
- **Hover Effects:** Border shifts subtly to `#CBD5E1`.

### 5\. FAQ Accordion Item Card

- **Border Radius:** `16px`.  
- **Border:** `1px solid #E2E8F0`.  
- **Background:** Pure White (`#FFFFFF`).  
- **Padding:** `20px–24px`.  
- **Internal Layout Structure:**  
  - Header: Question text in bold dark slate with right-aligned teal down chevron.  
  - Collapsible Body: Clean sans-serif answer text in slate gray.  
- **Hover Effects:** Border darkens to `#CBD5E1` on cursor hover.

---

## SECTION 10: ICONOGRAPHY

### Icon Style & Visual Characteristics

- **Type:** Minimalist vector stroke / outline icons.  
- **Stroke Width:** `2px` uniform stroke.  
- **End Caps & Joins:** Rounded (`stroke-linecap="round"`, `stroke-linejoin="round"`).  
- **Default Icon Sizing:** `20px x 20px` to `24px x 24px`.

### Icon Usage Patterns Across Sections

1. **Brand Logo:** Modern abstract leaf / multi-facet reward token in Teal (`#14B8A6`).  
2. **Trust Indicators (Hero):**  
   - Shield with checkmark (`ShieldCheck`)  
   - Currency symbol (`IndianRupee`)  
   - Lightning bolt (`Zap`)  
3. **Step Cards (How It Works):**  
   - Step 1: Credit Card glyph (`CreditCard`)  
   - Step 2: Input / Calculator / Sliders (`Sliders` or `Coins`)  
   - Step 3: Sparkle / Chart / Trending Up (`TrendingUp` or `Sparkles`)  
4. **Benefit Cards:**  
   - Bar chart / valuation growth (`TrendingUp`)  
   - Comparison / layers (`Layers` or `Copy`)  
   - Privacy / instant shield (`ShieldCheck` or `Lock`)  
5. **Interactive Preview Checkmarks:** Solid teal circle with white checkmark (`CheckCircle`).  
6. **Testimonials:** Solid 5-point star rating (`Star` filled in `#FBBF24`).  
7. **FAQ Accordion:** Chevron indicator (`ChevronDown` in `#14B8A6`, rotating 180° upon expansion).

### Recommended Icon Libraries

- **Lucide Icons (`lucide-react`):** Primary recommendation due to perfect matching stroke width, modern aesthetic, and lightweight bundle size.  
- **Heroicons (Outline set):** Strong alternative for clean 2px stroke fintech iconography.  
- **React Icons (`react-icons/lu`):** Comprehensive fallback.

---

## SECTION 11: RESPONSIVE BEHAVIOR

### Desktop (`> 1024px`)

- **Navbar:** Full horizontal layout with brand logo on the left, 4 centered text links, and the solid teal CTA button on the right.  
- **Hero Section:** 2-column split (Left: 58.33% text content, action button pair, and inline trust indicators; Right: 41.67% credit card visual container).  
- **Statistics Bar:** Single horizontal bar with 4 inline columns divided by 1px vertical borders.  
- **Step, Benefit & Testimonial Grids:** 3 equal-width columns (`repeat(3, 1fr)`) with 24px–32px gap.  
- **Action Preview Section:** 2-column split (Left: narrative copy and checkmarks; Right: full Recommendation Dashboard card).  
- **FAQ Section:** Centered single column constrained to 768px.  
- **Footer:** Single horizontal bar with left-aligned links and right-aligned badge.

### Tablet (`640px – 1024px`)

- **Navbar:** Maintains horizontal structure with compressed link margins, or condenses navigation into a slide-over drawer while preserving the primary CTA.  
- **Hero Section:** Transitions to a single vertical column. Hero copy and CTA group remain left-aligned or centered; the credit card visual mockup scales to 100% width and rests underneath.  
- **Statistics Bar:** Converts from a 1x4 bar to a 2x2 grid with horizontal and vertical dividers.  
- **Step & Benefit Grids:** Converts to 2-column wrapping grids (Card 1 and Card 2 side-by-side; Card 3 centered full-width below).  
- **Testimonials:** 2-column layout or horizontally scrollable card row.  
- **Action Preview Section:** Stacks vertically (copy on top, dashboard preview below).

### Mobile (`< 640px`)

- **Navbar:** Compact 56px–64px height; brand logo on left; hamburger menu icon on right (collapsing links and CTA into a full-screen or slide-in mobile navigation menu).  
- **Hero Section:** Single-column layout. Headings downscale to 36px–40px. CTA buttons stack vertically with 100% full width. Trust indicators wrap horizontally with smaller padding. Credit card visual scales down proportionally with 100% container width.  
- **Statistics Bar:** Stacks into a 2-column compact grid or 4-row vertical list; divider borders adjust to horizontal rules.  
- **Card Grids (Steps, Benefits, Testimonials):** All grids convert to a single full-width column (`1fr`) with 16px vertical gaps between cards.  
- **Action Preview Dashboard:** Scales to 100% width; recommendation table adjusts font sizes and wraps column data if necessary to prevent horizontal overflow.  
- **FAQ Accordion:** Full-width items with 16px screen padding; question font size scales to 16px.  
- **Footer:** Stacks into a centered vertical column (links on top, attribution badge below).

---

## SECTION 12: ANIMATION & INTERACTION SYSTEM

### Micro-Interactions & Transitions

- **Button Hover State:**  
  - Properties: `background-color`, `transform`, `box-shadow`  
  - Duration: `150ms–200ms`  
  - Easing: `ease-out` (cubic-bezier(0, 0, 0.2, 1))  
  - Action: Upward translation by `1px` (`translateY(-1px)`) with expanded ambient shadow.  
- **Card Hover Elevation:**  
  - Properties: `transform`, `box-shadow`, `border-color`  
  - Duration: `250ms–300ms`  
  - Easing: `cubic-bezier(0.16, 1, 0.3, 1)`  
  - Action: Subtle elevation shift (`translateY(-2px)`) with border darkening to `#CBD5E1`.  
- **Accordion Expand / Collapse:**  
  - Properties: `max-height`, `opacity`, `transform`  
  - Duration: `250ms–300ms`  
  - Easing: `cubic-bezier(0.4, 0, 0.2, 1)`  
  - Action: Chevron rotates 180 degrees (`rotate(180deg)`); body container reveals smoothly without jarring content jumps.  
- **Page Load & Scroll Reveal (Fade-In-Up):**  
  - Properties: `opacity`, `transform`  
  - Initial State: `opacity: 0`, `transform: translateY(20px)`  
  - Animated State: `opacity: 1`, `transform: translateY(0)`  
  - Duration: `500ms–600ms`  
  - Easing: `cubic-bezier(0.16, 1, 0.3, 1)`  
  - Staggering: Card grids apply a `100ms` progressive delay per column item.

---

## SECTION 13: FRONTEND FILE STRUCTURE

The recommended structure for a clean, modular **React \+ TypeScript \+ Tailwind** codebase strictly separating UI atoms, molecules, sections, mock data, and design tokens:

src/

├── components/

│   ├── ui/

│   │   ├── Button.tsx

│   │   ├── Badge.tsx

│   │   ├── Card.tsx

│   │   ├── Accordion.tsx

│   │   ├── SectionHeader.tsx

│   │   └── Container.tsx

│   ├── sections/

│   │   ├── Navbar.tsx

│   │   ├── HeroSection.tsx

│   │   ├── StatsSection.tsx

│   │   ├── HowItWorksSection.tsx

│   │   ├── BenefitsSection.tsx

│   │   ├── ActionPreviewSection.tsx

│   │   ├── TestimonialsSection.tsx

│   │   ├── FAQSection.tsx

│   │   ├── CTASection.tsx

│   │   └── Footer.tsx

│   └── visual/

│       ├── CreditCardMockup.tsx

│       ├── RecommendationDashboardMockup.tsx

│       └── TrustIndicators.tsx

├── types/

│   └── ui-types.ts

└── data/

    └── landing-content.ts

*(Note: In accordance with specification rules, no route config files, hooks, contexts, stores, or services are included).*

---

## SECTION 14: IMPLEMENTATION PHASES

### Phase 1: Design Tokens & Foundations

- Establish global color palette variables (Primary Teal `#14B8A6`, Dark Slate `#0F172A`, Backgrounds `#FFFFFF` / `#F8FAFC`, Borders `#E2E8F0`).  
- Configure typography imports (Editorial Serif family for headings and Modern Sans-Serif family for UI/body).  
- Set up global container constraints (max-width `1200px` and standard responsive screen padding).

### Phase 2: Primitive UI Components

- Implement base layout container (`Container.tsx`).  
- Implement button component supporting Primary, Secondary/Outline, and Ghost variants (`Button.tsx`).  
- Implement typography badge atom (`Badge.tsx`) and section header molecule (`SectionHeader.tsx`).  
- Implement base card container with standardized radius, border, and elevation (`Card.tsx`).

### Phase 3: Header & Hero Experience

- Implement `Navbar` with logo, centered navigation links, and desktop/mobile responsive behaviors.  
- Construct `HeroSection` left column (pre-heading badge, H1 serif title, subhead, action buttons, and trust indicators).  
- Build `CreditCardMockup` right column (HDFC Regalia mockup card, floating points badge, Rupee value tag, and live indicator).

### Phase 4: Social Proof & Process Mechanics

- Build `StatsSection` bar with 4-column metric layout, divider rules, and responsive 2x2 wrapping.  
- Implement `HowItWorksSection` with centered header and 3-step grid (`StepCard` components with numbered step badges).

### Phase 5: Benefits & Interactive Dashboard Preview

- Implement `BenefitsSection` with 3-column feature card grid.  
- Build `ActionPreviewSection` 2-column layout (narrative copy with checkmarks on left; `RecommendationDashboardMockup` on right).  
- Implement interactive row styling in the dashboard (highlighted top row with teal border, mint background, and "BEST VALUE" tag).

### Phase 6: Testimonials & FAQ

- Implement `TestimonialsSection` with 3-column review cards (5 gold stars, serif quote, user avatar, and author location).  
- Implement `FAQSection` with single-column collapsible accordion items (`Accordion.tsx`) and animated chevron toggles.

### Phase 7: Final Conversion CTA, Footer & Polish

- Implement `CTASection` with full-width dark navy background, white serif headline, and primary CTA trigger.  
- Implement `Footer` with terms/privacy links and Canva attribution badge.  
- Conduct cross-browser, responsive breakpoint, and typography contrast audits.

---

## SECTION 15: FREEBUFF IMPLEMENTATION NOTES

### Critical Elements to Preserve

1. **Typographic Contrast (Serif \+ Sans-Serif):** Headings MUST use an elegant editorial serif font (*Playfair Display*, *Libre Baskerville*, or equivalent). Body copy and UI labels MUST use a clean sans-serif font (*Inter* or *Plus Jakarta Sans*). Do not make the entire landing page sans-serif.  
2. **Signature Teal Brand Color (`#14B8A6`):** All primary conversion actions, active badges, highlighted table borders, step tags, and interactive checkmarks must strictly utilize this exact teal hue.  
3. **Card Radii (`20px–24px`):** All card surfaces and interactive containers require smooth, modern rounded corners. Do not use sharp or boxy rectangle borders.  
4. **Exact Copy & Content Integrity:** Preserve all headline text, subheadings, step names, benefit copy, exact testimonial quotes (Arjun Mehta, Naina Shah, Rohan Kapoor), and verbatim FAQ questions/answers.  
5. **Dashboard Visual Data:** Ensure the preview dashboard specifically reflects:  
   - Card: **HDFC Regalia**  
   - Available Points: **50,000**  
   - Highlighted Row: **Flights** | **₹0.25 per point** | **₹12,500** | Badge: **BEST VALUE**  
   - Secondary Rows: **Hotels** (**₹10,200**) and **Shopping** (**₹8,000**).

### What Should NOT Be Changed

- Do not invert or alter the 10-section sequential narrative structure.  
- Do not omit the trust indicators under the Hero button group.  
- Do not omit the vertical dividing lines in the Statistics bar on desktop screens.  
- Do not make the Final CTA section light-themed; it must remain a deep navy (`#0A1128`) contrast block.  
- Do not make the footer anything other than pure black (`#000000`).

### Naming Conventions for Code Generation

- Components should use PascalCase matching domain naming: `Navbar`, `HeroSection`, `CreditCardMockup`, `StatCard`, `StepCard`, `FeatureCard`, `RecommendationDashboard`, `TestimonialCard`, `FAQAccordionItem`, `CTABanner`, `Footer`.  
- Content arrays and data structures should be stored in a dedicated `landing-content.ts` data file rather than hardcoded inline across JSX trees.  
- Props should follow clean descriptive conventions: `badgeText`, `isHighlighted`, `stepNumber`, `rating`, `isBestValue`.

### Common Mistakes to Avoid

- **Mistake 1:** Forgetting to style the pre-headings as uppercase with wide letter spacing (`letter-spacing: 0.12em`).  
- **Mistake 2:** Stacking hero action buttons on desktop instead of placing them side-by-side in a horizontal row.  
- **Mistake 3:** Omitting the light teal background (`#F0FDFA`) on the active "Flights" row in the Recommendation Dashboard.  
- **Mistake 4:** Setting cards to pure gray backgrounds instead of crisp white (`#FFFFFF`) with subtle outer borders (`#E2E8F0`).  
- **Mistake 5:** Failing to provide sufficient vertical section padding (must be at least 80px–96px on desktop to maintain the airy, premium fintech feel).

