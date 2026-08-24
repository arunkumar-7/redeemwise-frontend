# UI_FLOW_MVP.md

## RedeemWise – MVP User Interface Flows

### Document Version

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-08-24 | RedeemWise Frontend Team | Initial MVP UI flow document |

---

## 1. Purpose

This document defines the complete user interface flows, screen layouts, responsive behaviors, empty/loading/error states, and accessibility considerations for the RedeemWise MVP. It serves as the primary reference for frontend UI development.

---

## 2. User Journeys

### 2.1 Primary Journey: First-Time Visitor

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FIRST-TIME VISITOR JOURNEY                            │
│                                                                         │
│  1. ARRIVE                                                              │
│     User lands on homepage (direct, search, or referral)                │
│     → Sees hero section with value proposition                          │
│     → Understands: "Find the best way to use my reward points"          │
│                                                                         │
│  2. ENGAGE                                                              │
│     User scrolls or reads "How It Works" section                        │
│     → Sees 3-step process explained                                     │
│     → Builds confidence in the tool                                     │
│                                                                         │
│  3. ACT                                                                 │
│     User clicks "Find Best Redemption" CTA                              │
│     → Navigates to Search Page                                          │
│                                                                         │
│  4. SEARCH                                                              │
│     User types bank name (e.g., "HDFC")                                 │
│     → Sees matching cards in results                                    │
│     → Selects their specific card                                       │
│                                                                         │
│  5. INPUT                                                               │
│     User enters reward point balance (e.g., 50,000)                     │
│     → Sees estimated value preview                                      │
│     → Clicks "Find Best Redemption"                                     │
│                                                                         │
│  6. DISCOVER                                                            │
│     User sees ranked recommendations                                    │
│     → Top 3 highlighted with reasons                                    │
│     → All options listed with VPP and cash value                        │
│     → Feels confident about their redemption choice                     │
│                                                                         │
│  7. SHARE (Optional)                                                    │
│     User shares results or returns to search                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Secondary Journey: Returning User

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    RETURNING USER JOURNEY                                │
│                                                                         │
│  1. ARRIVE                                                              │
│     User returns to homepage                                            │
│     → Hero section loads instantly                                      │
│     → Previous search history in localStorage (optional)                │
│                                                                         │
│  2. QUICK ACCESS                                                        │
│     User clicks CTA or uses previous search                             │
│     → Fast path to search or results                                    │
│                                                                         │
│  3. COMPARE                                                             │
│     User searches for a different card                                  │
│     → Compares with previous results                                    │
│     → Updates points and gets new recommendations                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Error Journey

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    ERROR RECOVERY JOURNEY                                │
│                                                                         │
│  NETWORK ERROR                                                          │
│  → User sees friendly error message                                     │
│  → "Something went wrong" with retry button                             │
│  → Retry calls API again                                                │
│  → If retry fails, show support/contact info                            │
│                                                                         │
│  NO RESULTS FOUND                                                       │
│  → User sees empty state: "No cards found for 'XYZ'"                    │
│  → Suggestions: "Try a different bank name"                             │
│  → Option to go back to search                                          │
│                                                                         │
│  API FAILURE                                                            │
│  → User sees generic error page                                         │
│  → "We're having trouble reaching our servers"                          │
│  → Retry button + back to home link                                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Screen Flow Diagrams

### 3.1 Complete Screen Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SCREEN FLOW DIAGRAM                               │
│                                                                             │
│                                                                             │
│  ┌──────────────┐                                                          │
│  │              │                                                          │
│  │  LANDING     │                                                          │
│  │  PAGE        │──── CTA Click ────┐                                      │
│  │              │                    │                                      │
│  └──────────────┘                    │                                      │
│                                      ▼                                      │
│  ┌──────────────┐     ┌──────────────────────┐                             │
│  │              │     │                      │                             │
│  │  404 PAGE    │◄────│    SEARCH PAGE       │                             │
│  │              │     │                      │                             │
│  └──────────────┘     │  ┌────────────────┐  │                             │
│                       │  │  Search Input  │  │                             │
│  ┌──────────────┐     │  └────────────────┘  │                             │
│  │              │     │  ┌────────────────┐  │                             │
│  │  ERROR PAGE  │◄────│  │ Filter Chips   │  │                             │
│  │              │     │  └────────────────┘  │                             │
│  └──────────────┘     │  ┌────────────────┐  │                             │
│       ▲               │  │  Results Grid   │  │                             │
│       │               │  │  (selectable)   │  │                             │
│       │               │  └────────────────┘  │                             │
│       │               │                      │                             │
│       │               │  Card Selected ──────┤                             │
│       │               └──────────────────────┘                             │
│       │                              │                                      │
│       │                              ▼                                      │
│       │               ┌──────────────────────┐                             │
│       │               │                      │                             │
│       │               │    POINTS PAGE       │                             │
│       │               │                      │                             │
│       │               │  ┌────────────────┐  │                             │
│       │               │  │ Selected Card  │  │                             │
│       │               │  └────────────────┘  │                             │
│       │               │  ┌────────────────┐  │                             │
│       │               │  │ Points Input   │  │                             │
│       │               │  └────────────────┘  │                             │
│       │               │  ┌────────────────┐  │                             │
│       │               │  │ Quick Chips    │  │                             │
│       │               │  └────────────────┘  │                             │
│       │               │  ┌────────────────┐  │                             │
│       │               │  │ Est. Value     │  │                             │
│       │               │  └────────────────┘  │                             │
│       │               │                      │                             │
│       │               │  Submit ─────────────┤                             │
│       │               └──────────────────────┘                             │
│       │                              │                                      │
│       │                              ▼                                      │
│       │               ┌──────────────────────┐                             │
│       │               │                      │                             │
│       │               │   RESULTS PAGE       │                             │
│       │               │                      │                             │
│       │               │  ┌────────────────┐  │                             │
│       │               │  │ Summary Banner │  │                             │
│       │               │  └────────────────┘  │                             │
│       │               │  ┌────────────────┐  │                             │
│       │               │  │ Top 3 Ranked   │  │                             │
│       │               │  │ Recommendations│  │                             │
│       │               │  └────────────────┘  │                             │
│       │               │  ┌────────────────┐  │                             │
│       │               │  │ All Options    │  │                             │
│       │               │  │ Table          │  │                             │
│       │               │  └────────────────┘  │                             │
│       │               │  ┌────────────────┐  │                             │
│       │               │  │ Share / Action │  │                             │
│       │               │  └────────────────┘  │                             │
│       │               │                      │                             │
│       │               │  Edit Points ◄───────┤  (back to PointsPage)       │
│       │               │  New Search ◄────────┤  (back to SearchPage)       │
│       │               └──────────────────────┘                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Step Progress Indicator

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     STEP PROGRESS INDICATOR                              │
│                                                                         │
│  Landing (implicit) ─── Search ─── Points ─── Results                   │
│                              │                                           │
│                              ▼                                           │
│  ┌─────┐      ┌─────┐      ┌─────┐      ┌─────┐                       │
│  │  ✓  │ ───► │  ●  │ ───► │  ○  │ ───► │  ○  │                       │
│  └─────┘      └─────┘      └─────┘      └─────┘                       │
│   Done       Current      Upcoming     Upcoming                        │
│                                                                         │
│  States:                                                                │
│  ✓ = Completed (green/teal accent)                                      │
│  ● = Current (white/primary accent)                                     │
│  ○ = Upcoming (gray/muted)                                              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Homepage Flow

### 4.1 Landing Page Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        LANDING PAGE                                      │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  HEADER                                                         │   │
│  │  ┌─────────┐                            ┌──────────────────┐    │   │
│  │  │ Logo    │                            │  [Find Best      │    │   │
│  │  │         │                            │   Redemption]    │    │   │
│  │  │         │                            └──────────────────┘    │   │
│  │  └─────────┘                                                    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  HERO SECTION                                                    │   │
│  │                                                                   │   │
│  │       ┌─────────────────────────────────────────────────┐       │   │
│  │       │                                                 │       │   │
│  │       │   "Maximize the Value of                        │       │   │
│  │       │    Your Reward Points"                           │       │   │
│  │       │                                                 │       │   │
│  │       │   Find the best redemption option for           │       │   │
│  │       │   your credit card reward points.               │       │   │
│  │       │   Compare options. Calculate value.             │       │   │
│  │       │   Save money.                                   │       │   │
│  │       │                                                 │       │   │
│  │       │   ┌─────────────────────────────────────────┐   │       │   │
│  │       │   │     [Find Best Redemption]              │   │       │   │
│  │       │   └─────────────────────────────────────────┘   │       │   │
│  │       │                                                 │       │   │
│  │       └─────────────────────────────────────────────────┘       │   │
│  │                                                                   │   │
│  │  ┌───────────────────────────────────────────────────────┐       │   │
│  │  │  [Animated illustration: credit card → value points]   │       │   │
│  │  └───────────────────────────────────────────────────────┘       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  HOW IT WORKS SECTION                                           │   │
│  │                                                                   │   │
│  │  "How It Works"                                                  │   │
│  │                                                                   │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │   │
│  │  │    Step 1    │  │    Step 2    │  │    Step 3    │          │   │
│  │  │              │  │              │  │              │          │   │
│  │  │  🔍 Search   │  │  📊 Enter    │  │  🏆 Get      │          │   │
│  │  │  Your Card   │  │  Points      │  │  Best Option │          │   │
│  │  │              │  │              │  │              │          │   │
│  │  │  Find your   │  │  Tell us how │  │  See ranked  │          │   │
│  │  │  credit card │  │  many reward │  │  recommend-  │          │   │
│  │  │  by bank     │  │  points you  │  │  ations with │          │   │
│  │  │  name        │  │  have        │  │  best value  │          │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  VALUE PER POINT EXPLAINER                                      │   │
│  │                                                                   │   │
│  │  "What is Value Per Point?"                                      │   │
│  │                                                                   │   │
│  │  ┌───────────────────────────────────────────────────────┐       │   │
│  │  │                                                       │       │   │
│  │  │  Value Per Point = Cash Value ÷ Points Required       │       │   │
│  │  │                                                       │       │   │
│  │  │  Example:                                              │       │   │
│  │  │  Amazon Gift Card: ₹500 for 5,000 points              │       │   │
│  │  │  Value Per Point = ₹500 ÷ 5,000 = ₹0.10              │       │   │
│  │  │                                                       │       │   │
│  │  └───────────────────────────────────────────────────────┘       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  FOOTER                                                         │   │
│  │  ┌─────────────────────────────────────────────────────────┐   │   │
│  │  │  RedeemWise · Maximize Your Rewards · No Login Required  │   │   │
│  │  └─────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Landing Page Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| **Logo** | Click | Navigate to `/` (reload landing) |
| **"Find Best Redemption" CTA** | Click | Navigate to `/search` |
| **Step Cards** | Hover | Subtle lift animation |
| **VPP Explainer** | Scroll into view | Fade-in animation |

---

## 5. Search Card Flow

### 5.1 Search Page Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SEARCH PAGE                                       │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  HEADER                                                         │   │
│  │  ┌─────────┐      Step: ●──○──○      ┌──────────────────┐     │   │
│  │  │ Logo    │      Search · Points · Results                │     │   │
│  │  └─────────┘                          └──────────────────┘     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  SEARCH SECTION                                                 │   │
│  │                                                                   │   │
│  │  "Find Your Credit Card"                                         │   │
│  │                                                                   │   │
│  │  ┌───────────────────────────────────────────────────────┐       │   │
│  │  │ 🔍 Search by bank name or card program...             │       │   │
│  │  └───────────────────────────────────────────────────────┘       │   │
│  │                                                                   │   │
│  │  Quick Filters:                                                   │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                  │   │
│  │  │ All  │ │Plat. │ │ Gold │ │Silv. │ │Other │                  │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  RESULTS SECTION                                                │   │
│  │                                                                   │   │
│  │  Search Results (12 cards found)                                 │   │
│  │                                                                   │   │
│  │  ┌─────────────────────────────────────────────────────────┐    │   │
│  │  │ ┌─────────────────────┐  ┌─────────────────────┐       │    │   │
│  │  │ │ 🏦 HDFC Bank        │  │ 🏦 ICICI Bank        │       │    │   │
│  │  │ │                     │  │                     │       │    │   │
│  │  │ │ Card: HDFC Regalia  │  │ Card: ICICI Sapphiro│       │    │   │
│  │  │ │ Type: PLATINUM      │  │ Type: PLATINUM      │       │    │   │
│  │  │ │                     │  │                     │       │    │   │
│  │  │ │ [Select This Card]  │  │ [Select This Card]  │       │    │   │
│  │  │ └─────────────────────┘  └─────────────────────┘       │    │   │
│  │  │                                                         │    │   │
│  │  │ ┌─────────────────────┐  ┌─────────────────────┐       │    │   │
│  │  │ │ 🏦 SBI Cards        │  │ 🏦 Axis Bank         │       │    │   │
│  │  │ │                     │  │                     │       │    │   │
│  │  │ │ Card: SBI Aurum     │  │ Card: Axis Vistara  │       │    │   │
│  │  │ │ Type: GOLD          │  │ Type: GOLD          │       │    │   │
│  │  │ │                     │  │                     │       │    │   │
│  │  │ │ [Select This Card]  │  │ [Select This Card]  │       │    │   │
│  │  │ └─────────────────────┘  └─────────────────────┘       │    │   │
│  │  └─────────────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Search States

| State | Display |
|-------|---------|
| **Idle** | "Find Your Credit Card" heading + search input |
| **Typing** | Real-time filtered results appear |
| **Loading** | Skeleton card placeholders (3-4 cards) |
| **Results Found** | Grid of matching cards |
| **No Results** | Empty state with suggestions |
| **Error** | Error message with retry button |

### 5.3 Card Selection Interaction

```
Card Hover:
┌─────────────────────────┐
│ 🏦 HDFC Bank            │  → Border brightens
│ Card: HDFC Regalia      │  → Subtle shadow increase
│ Type: PLATINUM          │  → Background lightens slightly
│ [Select This Card]      │  → CTA button highlights
└─────────────────────────┘

Card Selected:
┌─────────────────────────┐
│ 🏦 HDFC Bank            │  → Border: accent color (teal)
│ Card: HDFC Regalia      │  → Checkmark icon appears
│ Type: PLATINUM          │  → "Selected" badge visible
│ ✓ Selected              │  → CTA changes to "Continue"
└─────────────────────────┘
     │
     └──► Auto-navigate to Points Page after 500ms delay
```

---

## 6. Points Entry Flow

### 6.1 Points Page Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        POINTS PAGE                                       │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  HEADER                                                         │   │
│  │  ┌─────────┐      Step: ●──●──○      ┌──────────────────┐     │   │
│  │  │ Logo    │      Search · Points · Results                │     │   │
│  │  └─────────┘                          └──────────────────┘     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  SELECTED CARD DISPLAY                                          │   │
│  │                                                                   │   │
│  │  ┌───────────────────────────────────────────────────────┐       │   │
│  │  │                                                       │       │   │
│  │  │  🏦 HDFC Bank · Regalia · PLATINUM                    │       │   │
│  │  │  Reward Program: HDFC Rewards                          │       │   │
│  │  │                                                       │       │   │
│  │  │  [Change Card]                                        │       │   │
│  │  │                                                       │       │   │
│  │  └───────────────────────────────────────────────────────┘       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  POINTS INPUT SECTION                                           │   │
│  │                                                                   │   │
│  │  "How Many Reward Points Do You Have?"                           │   │
│  │                                                                   │   │
│  │  ┌───────────────────────────────────────────────────────┐       │   │
│  │  │                                                       │       │   │
│  │  │    ┌───────────────────────────────────────────┐       │       │   │
│  │  │    │  ┌─────────────────────────────────┐      │       │       │   │
│  │  │    │  │  50,000                          │      │       │       │   │
│  │  │    │  └─────────────────────────────────┘      │       │       │   │
│  │  │    └───────────────────────────────────────────┘       │       │   │
│  │  │                                                       │       │   │
│  │  │  Quick Select:                                         │       │   │
│  │  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐         │       │   │
│  │  │  │ 5,000  │ │ 10,000 │ │ 25,000 │ │ 50,000 │         │       │   │
│  │  │  └────────┘ └────────┘ └────────┘ └────────┘         │       │   │
│  │  │                                                       │       │   │
│  │  │  ┌─────────────────────────────────────────────┐     │       │   │
│  │  │  │  💡 Estimated Value: ₹5,000 - ₹7,500       │     │       │   │
│  │  │  └─────────────────────────────────────────────┘     │       │   │
│  │  │                                                       │       │   │
│  │  └───────────────────────────────────────────────────────┘       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  ┌───────────────────────────────────────────────────────┐      │   │
│  │  │              [Find Best Redemption]                   │      │   │
│  │  └───────────────────────────────────────────────────────┘      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Points Input Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| **Points Input** | Focus | Border glow, cursor appears |
| **Points Input** | Type | Real-time comma formatting (50000 → 50,000) |
| **Points Input** | Blur | Validate positive integer; show error if invalid |
| **Quick Chips** | Click | Populate input with chip value; animate number change |
| **Est. Value** | Points change | Animate value range update (e.g., ₹5,000 - ₹7,500) |
| **"Change Card"** | Click | Navigate back to Search Page |
| **"Find Best Redemption"** | Click | Validate points > 0; navigate to Results Page |
| **"Find Best Redemption"** | Disabled | When points = 0 or empty |

### 6.3 Estimated Value Range

The estimated value is calculated client-side using the average VPP across all redemption options:

```
Estimated Value Range:
  Min = Points × Average VPP (low estimate)
  Max = Points × Best VPP (high estimate)

Example for 50,000 points:
  Min = 50,000 × 0.08 = ₹4,000
  Max = 50,000 × 0.15 = ₹7,500
```

---

## 7. Recommendations Flow

### 7.1 Results Page Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        RESULTS PAGE                                      │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  HEADER                                                         │   │
│  │  ┌─────────┐      Step: ○──○──●      ┌──────────────────┐     │   │
│  │  │ Logo    │      Search · Points · Results                │     │   │
│  │  └─────────┘                          └──────────────────┘     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  SUMMARY BANNER                                                 │   │
│  │                                                                   │   │
│  │  ┌───────────────────────────────────────────────────────┐       │   │
│  │  │                                                       │       │   │
│  │  │  HDFC Regalia · 50,000 Points                         │       │   │
│  │  │                                                       │       │   │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │       │   │
│  │  │  │ Your Points  │  │ Best Value   │  │ Top VPP    │  │       │   │
│  │  │  │              │  │              │  │            │  │       │   │
│  │  │  │ 50,000       │  │ ₹7,500       │  │ ₹0.15      │  │       │   │
│  │  │  └──────────────┘  └──────────────┘  └────────────┘  │       │   │
│  │  │                                                       │       │   │
│  │  └───────────────────────────────────────────────────────┘       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  TOP 3 RECOMMENDATIONS                                          │   │
│  │                                                                   │   │
│  │  "Best Redemption Options"                                       │   │
│  │                                                                   │   │
│  │  ┌───────────────────────────────────────────────────────┐       │   │
│  │  │  🥇 #1 RECOMMENDED                                    │       │   │
│  │  │                                                       │       │   │
│  │  │  ┌─────────────────────────────────────────────────┐  │       │   │
│  │  │  │  Cashback to Account                             │  │       │   │
│  │  │  │                                                   │  │       │   │
│  │  │  │  Category: CASHBACK                               │  │       │   │
│  │  │  │                                                   │  │       │   │
│  │  │  │  ┌──────────────┐  ┌──────────────┐              │  │       │   │
│  │  │  │  │ Value/Point  │  │ Cash Value   │              │  │       │   │
│  │  │  │  │ ₹0.10        │  │ ₹400         │              │  │       │   │
│  │  │  │  └──────────────┘  └──────────────┘              │  │       │   │
│  │  │  │                                                   │  │       │   │
│  │  │  │  Points Required: 4,000                           │  │       │   │
│  │  │  │                                                   │  │       │   │
│  │  │  │  💡 "Best value per point ratio"                  │  │       │   │
│  │  │  │                                                   │  │       │   │
│  │  │  └─────────────────────────────────────────────────┘  │       │   │
│  │  └───────────────────────────────────────────────────────┘       │   │
│  │                                                                   │   │
│  │  ┌───────────────────────────────────────────────────────┐       │   │
│  │  │  🥈 #2                                                │       │   │
│  │  │                                                       │       │   │
│  │  │  Flight Discount Voucher                              │       │   │
│  │  │  Category: TRAVEL                                     │       │   │
│  │  │  VPP: ₹0.12 | Value: ₹1,200 | Points: 10,000        │       │   │
│  │  │  "High value for travel enthusiasts"                  │       │   │
│  │  └───────────────────────────────────────────────────────┘       │   │
│  │                                                                   │   │
│  │  ┌───────────────────────────────────────────────────────┐       │   │
│  │  │  🥉 #3                                                │       │   │
│  │  │                                                       │       │   │
│  │  │  Flipkart Voucher ₹1000                               │       │   │
│  │  │  Category: GIFT_CARD                                  │       │   │
│  │  │  VPP: ₹0.125 | Value: ₹1,000 | Points: 8,000        │       │   │
│  │  │  "Good value for shopping"                            │       │   │
│  │  └───────────────────────────────────────────────────────┘       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  ALL REDEMPTION OPTIONS                                          │   │
│  │                                                                   │   │
│  │  "All Redemption Options"                                        │   │
│  │                                                                   │   │
│  │  Sort by: [Value per Point ▼]  Filter: [All Categories ▼]       │   │
│  │                                                                   │   │
│  │  ┌──────────────────────────────────────────────────────────┐    │   │
│  │  │  Name              │ Category  │ Points │ Value │ VPP   │    │   │
│  │  ├────────────────────┼───────────┼────────┼───────┼───────┤    │   │
│  │  │ Amazon Gift Card   │ Gift Card │ 5,000  │ ₹500  │ 0.10  │    │   │
│  │  │ Flipkart Voucher   │ Gift Card │ 8,000  │ ₹1,000│ 0.125 │    │   │
│  │  │ Cashback           │ Cashback  │ 4,000  │ ₹400  │ 0.10  │    │   │
│  │  │ Flight Voucher     │ Travel    │ 10,000 │ ₹1,200│ 0.12  │    │   │
│  │  │ Dining Voucher     │ Dining    │ 3,000  │ ₹300  │ 0.10  │    │   │
│  │  └────────────────────┴───────────┴────────┴───────┴───────┘    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  ACTION SECTION                                                  │   │
│  │                                                                   │   │
│  │  ┌──────────────────┐  ┌──────────────────┐                     │   │
│  │  │  Edit Points     │  │  New Search      │                     │   │
│  │  └──────────────────┘  └──────────────────┘                     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Recommendation Card States

| State | Visual Treatment |
|-------|-----------------|
| **#1 Recommended** | Gold border, "RECOMMENDED" badge, elevated shadow, slightly larger |
| **#2 Rank** | Silver border, standard size |
| **#3 Rank** | Bronze border, standard size |
| **Hover** | Shadow increase, border brighten |
| **Loading** | Skeleton card with shimmer effect |

### 7.3 Recommendation Interactions

| Element | Interaction | Result |
|---------|-------------|--------|
| **Recommendation Card** | Hover | Elevate, show details |
| **"Edit Points"** | Click | Navigate to Points Page |
| **"New Search"** | Click | Navigate to Search Page, clear state |
| **Sort dropdown** | Change | Re-sort the all-options table |
| **Filter dropdown** | Change | Filter table by category |
| **Table row** | Hover | Highlight row |

---

## 8. Empty States

### 8.1 Empty State Designs

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    EMPTY STATES                                          │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  NO SEARCH RESULTS                                               │   │
│  │                                                                   │   │
│  │       ┌───────────────────────────────────────────────┐          │   │
│  │       │                                               │          │   │
│  │       │           🔍                                  │          │   │
│  │       │                                               │          │   │
│  │       │   No cards found for "XYZ Bank"               │          │   │
│  │       │                                               │          │   │
│  │       │   Try searching for:                          │          │   │
│  │       │   • HDFC Bank                                 │          │   │
│  │       │   • ICICI Bank                                │          │   │
│  │       │   • SBI Cards                                 │          │   │
│  │       │                                               │          │   │
│  │       │   [Clear Search]                              │          │   │
│  │       │                                               │          │   │
│  │       └───────────────────────────────────────────────┘          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  NO RECOMMENDATIONS                                              │   │
│  │                                                                   │   │
│  │       ┌───────────────────────────────────────────────┐          │   │
│  │       │                                               │          │   │
│  │       │           📊                                  │          │   │
│  │       │                                               │          │   │
│  │       │   No redemption options available             │          │   │
│  │       │                                               │          │   │
│  │       │   We're working on adding more options.       │          │   │
│  │       │   Check back soon!                            │          │   │
│  │       │                                               │          │   │
│  │       │   [Back to Home]                              │          │   │
│  │       │                                               │          │   │
│  │       └───────────────────────────────────────────────┘          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  NO POINTS ENTERED                                               │   │
│  │                                                                   │   │
│  │       ┌───────────────────────────────────────────────┐          │   │
│  │       │                                               │          │   │
│  │       │           💰                                  │          │   │
│  │       │                                               │          │   │
│  │       │   Enter your reward points                    │          │   │
│  │       │   to see the best redemption options.         │          │   │
│  │       │                                               │          │   │
│  │       └───────────────────────────────────────────────┘          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Loading States

### 9.1 Loading Indicators

| Context | Indicator | Description |
|---------|-----------|-------------|
| **Page Transition** | Progress bar | Top-of-page progress bar |
| **Search Results** | Skeleton cards | 3-4 card-shaped skeletons with shimmer |
| **Recommendations** | Skeleton cards | 3 recommendation card skeletons |
| **Points Calculation** | Inline spinner | Next to "Find Best Redemption" button |
| **API Call** | Button loading | Button shows spinner + "Loading..." text |
| **Full Page** | Centered spinner | For initial page load only |

### 9.2 Skeleton Loader Designs

```
Search Results Skeleton:
┌─────────────────────────┐
│ ┌─────────────────────┐ │  Shimmer animation
│ │ ░░░░░░░░░░░░░░░░░░░ │ │  (gradient sweep left→right)
│ │ ░░░░░░░░░░░░░░░░░░░ │ │
│ │ ░░░░░░░░░░░░░░░░░░░ │ │
│ │ ┌─────────────────┐ │ │
│ │ │ ░░░░░░░░░░░░░░░ │ │ │
│ │ └─────────────────┘ │ │
│ └─────────────────────┘ │
└─────────────────────────┘

Recommendation Skeleton:
┌──────────────────────────────────────┐
│ ┌────────────────────────────────┐   │
│ │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│ │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│ │ ┌──────────┐  ┌──────────┐    │   │
│ │ │ ░░░░░░░░ │  │ ░░░░░░░░ │    │   │
│ │ └──────────┘  └──────────┘    │   │
│ │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│ └────────────────────────────────┘   │
└──────────────────────────────────────┘
```

---

## 10. Error States

### 10.1 Error Page Designs

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ERROR STATES                                     │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  NETWORK ERROR                                                   │   │
│  │                                                                   │   │
│  │       ┌───────────────────────────────────────────────┐          │   │
│  │       │                                               │          │   │
│  │       │           ⚠️                                  │          │   │
│  │       │                                               │          │   │
│  │       │   Something went wrong                        │          │   │
│  │       │                                               │          │   │
│  │       │   We couldn't reach the server.              │          │   │
│  │       │   Please check your connection and try again. │          │   │
│  │       │                                               │          │   │
│  │       │   [Retry]                    [Back to Home]   │          │   │
│  │       │                                               │          │   │
│  │       └───────────────────────────────────────────────┘          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  404 NOT FOUND                                                   │   │
│  │                                                                   │   │
│  │       ┌───────────────────────────────────────────────┐          │   │
│  │       │                                               │          │   │
│  │       │           🔍                                  │          │   │
│  │       │                                               │          │   │
│  │       │   Page not found                              │          │   │
│  │       │                                               │          │   │
│  │       │   The page you're looking for doesn't exist.  │          │   │
│  │       │                                               │          │   │
│  │       │   [Go to Home]                                │          │   │
│  │       │                                               │          │   │
│  │       └───────────────────────────────────────────────┘          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  RATE LIMITED (429)                                              │   │
│  │                                                                   │   │
│  │       ┌───────────────────────────────────────────────┐          │   │
│  │       │                                               │          │   │
│  │       │           ⏱️                                  │          │   │
│  │       │                                               │          │   │
│  │       │   Too many requests                           │          │   │
│  │       │                                               │          │   │
│  │       │   Please wait a moment and try again.         │          │   │
│  │       │                                               │          │   │
│  │       └───────────────────────────────────────────────┘          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 10.2 Inline Error States

| Error Type | Display |
|------------|---------|
| **Search API Error** | Red banner above results: "Failed to load cards. [Retry]" |
| **Recommendation Error** | Red banner above results: "Failed to load recommendations. [Retry]" |
| **Points Validation** | Red text below input: "Please enter a valid number greater than 0" |
| **Network Timeout** | Toast notification: "Request timed out. Please try again." |

---

## 11. Mobile Layouts

### 11.1 Mobile Breakpoint (< 640px)

```
┌─────────────────────────┐
│ ☰  RedeemWise           │  Header: hamburger + logo
├─────────────────────────┤
│                         │
│  Single column layout   │
│  Full-width components  │
│  Stacked elements       │
│                         │
│  ┌───────────────────┐  │
│  │   Hero Text       │  │  Hero: centered, large text
│  │   (centered)      │  │
│  │                   │  │
│  │  [CTA Button]     │  │  CTA: full-width button
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │   Step 1          │  │  Steps: stacked vertically
│  │   Step 2          │  │  (not side-by-side)
│  │   Step 3          │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │  Search Input     │  │  Search: full-width
│  │  (full width)     │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │  Card Result 1    │  │  Results: single column
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │  Card Result 2    │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │  Points Input     │  │  Points: full-width input
│  │  (full width)     │  │
│  │                   │  │
│  │  [Chip] [Chip]    │  │  Chips: 2 columns
│  │  [Chip] [Chip]    │  │
│  │                   │  │
│  │  [Find Best]      │  │  CTA: full-width
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │  🥇 #1            │  │  Recommendations: stacked
│  │  (full card)      │  │  Full-width cards
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │  🥈 #2            │  │
│  │  (full card)      │  │
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │  🥉 #3            │  │
│  │  (full card)      │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │  All Options      │  │  Table: horizontal scroll
│  │  (scrollable)     │  │  or card-based layout
│  └───────────────────┘  │
│                         │
├─────────────────────────┤
│  Footer                 │
└─────────────────────────┘
```

### 11.2 Mobile Navigation

```
┌─────────────────────────┐
│ ☰  RedeemWise           │  Hamburger menu
├─────────────────────────┤
│                         │
│  When menu opened:      │
│  ┌───────────────────┐  │
│  │                   │  │
│  │  ○ Home           │  │  Slide-in overlay
│  │  ○ Search         │  │  Semi-transparent backdrop
│  │  ○ Results        │  │
│  │                   │  │
│  └───────────────────┘  │
│                         │
└─────────────────────────┘
```

---

## 12. Tablet Layouts

### 12.1 Tablet Breakpoint (640px - 1024px)

```
┌─────────────────────────────────────────────────┐
│  Logo          [Search] [Results]                │  Header: logo + nav links
├─────────────────────────────────────────────────┤
│                                                   │
│  Two-column grid for cards                       │
│  ┌───────────────────┐  ┌───────────────────┐   │
│  │   Card 1          │  │   Card 2          │   │
│  │                   │  │                   │   │
│  └───────────────────┘  └───────────────────┘   │
│  ┌───────────────────┐  ┌───────────────────┐   │
│  │   Card 3          │  │   Card 4          │   │
│  │                   │  │                   │   │
│  └───────────────────┘  └───────────────────┘   │
│                                                   │
│  Hero section: side-by-side                      │
│  ┌───────────────────┐  ┌───────────────────┐   │
│  │   Text Content    │  │   Illustration    │   │
│  │                   │  │                   │   │
│  └───────────────────┘  └───────────────────┘   │
│                                                   │
│  Recommendations: 2 columns                      │
│  ┌───────────────────┐  ┌───────────────────┐   │
│  │   #1              │  │   #2              │   │
│  └───────────────────┘  └───────────────────┘   │
│  ┌───────────────────────────────────────────┐   │
│  │   #3 (full width)                         │   │
│  └───────────────────────────────────────────┘   │
│                                                   │
└─────────────────────────────────────────────────┘
```

---

## 13. Desktop Layouts

### 13.1 Desktop Breakpoint (> 1024px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Logo              Search    Results          [Find Best Redemption]    │  Header: horizontal nav
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Hero: side-by-side with max-width container                           │
│  ┌─────────────────────────────────────────────────────────────┐       │
│  │  ┌──────────────────┐  ┌──────────────────────────────────┐ │       │
│  │  │  Text Content    │  │  Hero Illustration / Animation    │ │       │
│  │  │  (max-width:     │  │  (fills remaining space)          │ │       │
│  │  │   600px)         │  │                                  │ │       │
│  │  │                  │  │                                  │ │       │
│  │  │  [CTA Button]    │  │                                  │ │       │
│  │  └──────────────────┘  └──────────────────────────────────┘ │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  Cards: 3-column grid                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                   │
│  │   Card 1    │  │   Card 2    │  │   Card 3    │                   │
│  └─────────────┘  └─────────────┘  └─────────────┘                   │
│                                                                         │
│  How It Works: 3 columns                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                   │
│  │  Step 1     │  │  Step 2     │  │  Step 3     │                   │
│  └─────────────┘  └─────────────┘  └─────────────┘                   │
│                                                                         │
│  Max-width container: 1200px, centered                                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 13.2 Responsive Grid System

| Breakpoint | Columns | Gap | Container Max-Width |
|------------|---------|-----|---------------------|
| Mobile (< 640px) | 1 | 16px | 100% (with padding) |
| Tablet (640-1024px) | 2 | 24px | 100% (with padding) |
| Desktop (> 1024px) | 3-4 | 32px | 1200px |
| Large Desktop (> 1440px) | 4 | 32px | 1440px |

---

## 14. Accessibility Considerations

### 14.1 WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| **Color Contrast** | All text meets 4.5:1 contrast ratio against dark backgrounds |
| **Keyboard Navigation** | All interactive elements are focusable and operable via keyboard |
| **Focus Indicators** | Visible focus rings on all focusable elements |
| **Screen Reader** | All images have alt text; ARIA labels on interactive elements |
| **Semantic HTML** | Use `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>` |
| **Form Labels** | All inputs have associated `<label>` elements |
| **Error Identification** | Errors announced to screen readers via `aria-live` |
| **Skip Navigation** | "Skip to main content" link at top of page |

### 14.2 Keyboard Navigation Flow

```
Tab Order:
1. Skip to main content link
2. Logo (home link)
3. Navigation links (Search, Results)
4. CTA buttons
5. Search input
6. Filter chips
7. Card result items
8. Points input
9. Quick amount chips
10. Submit buttons
11. Recommendation cards
12. Table headers (sortable)
13. Table rows
14. Action buttons (Edit Points, New Search)
15. Footer links

Keyboard Shortcuts:
- Enter/Space: Activate buttons and links
- Escape: Close modals, clear search
- Arrow keys: Navigate between filter chips, table cells
```

### 14.3 ARIA Labels

| Element | ARIA Label |
|---------|------------|
| **Search Input** | `aria-label="Search by bank name or card program"` |
| **Filter Chips** | `role="radiogroup"` with `aria-label="Card type filter"` |
| **Card Result** | `role="button"` with `aria-label="Select HDFC Regalia card"` |
| **Points Input** | `aria-label="Enter reward points balance"` |
| **Quick Chips** | `aria-label="Quick select 50,000 points"` |
| **Recommendation** | `aria-label="Rank 1: Cashback to Account, value per point ₹0.10"` |
| **Sort Dropdown** | `aria-label="Sort redemption options by"` |
| **Loading** | `aria-live="polite"` with status announcement |
| **Error** | `aria-live="assertive"` with error message |

### 14.4 Color Accessibility

| Element | Color | Contrast Ratio |
|---------|-------|----------------|
| **Primary Text on Dark BG** | #F8FAFC on #0F172A | 15.4:1 ✓ |
| **Secondary Text on Dark BG** | #94A3B8 on #0F172A | 5.3:1 ✓ |
| **Accent on Dark BG** | #14B8A6 on #0F172A | 7.2:1 ✓ |
| **Error on Dark BG** | #F87171 on #0F172A | 5.1:1 ✓ |
| **Success on Dark BG** | #34D399 on #0F172A | 8.1:1 ✓ |

---

*Document maintained by RedeemWise Frontend Team*
