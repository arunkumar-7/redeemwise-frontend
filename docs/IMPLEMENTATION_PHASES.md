# IMPLEMENTATION_PHASES.md

## RedeemWise – Frontend Implementation Phases

### Document Version

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-08-24 | RedeemWise Frontend Team | Initial implementation phases document |

---

## 1. Purpose

This document provides a detailed phase-by-phase implementation plan for the RedeemWise frontend MVP. Each phase includes specific goals, deliverables, acceptance criteria, and technical guidance to ensure systematic and high-quality implementation.

---

## 2. Phase Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     IMPLEMENTATION PHASES                                │
│                                                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│  │ Phase 1 │─►│ Phase 2 │─►│ Phase 3 │─►│ Phase 4 │─►│ Phase 5 │─►│ Phase 6 │
│  │ Project │  │Foundat- │  │  Core   │  │  API    │  │   UI    │  │Testing &│
│  │  Setup  │  │  ion    │  │  User   │  │Integr-  │  │ Polish  │  │Deploy-  │
│  │         │  │& Layout │  │  Flow   │  │  ation  │  │         │  │  ment   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘
│   1-2 days     2-3 days     3-4 days     2-3 days     2-3 days     2-3 days
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Phase 1: Project Setup

### 3.1 Goal

Initialize the React + TypeScript + Vite project with all necessary tooling, configuration, and project structure.

### 3.2 Duration

**1-2 days**

### 3.3 Deliverables

| Deliverable | Description |
|-------------|-------------|
| Vite project | React + TypeScript scaffolding |
| Tailwind CSS | Configured with custom dark theme |
| React Router | Route definitions ready |
| Axios | Configured with API Gateway base URL |
| Project structure | All directories and barrel exports |
| Dev environment | ESLint, Prettier, TypeScript strict mode |

### 3.4 Technical Steps

#### Step 1: Initialize Project

```bash
# Create Vite project
npm create vite@latest redeemwise-frontend -- --template react-ts

# Navigate to project
cd redeemwise-frontend

# Install dependencies
npm install
```

#### Step 2: Install Core Dependencies

```bash
# Routing
npm install react-router-dom

# HTTP Client
npm install axios

# Icons
npm install react-icons

# Dev dependencies
npm install -D @types/react @types/react-dom
```

#### Step 3: Install and Configure Tailwind CSS

```bash
# Install Tailwind CSS
npm install -D tailwindcss @tailwindcss/vite

# Initialize Tailwind
npx tailwindcss init -p
```

#### Step 4: Configure TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### Step 5: Configure Tailwind Theme

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#111827',
          950: '#0B0F1A',
        },
        accent: {
          DEFAULT: '#14B8A6',
          hover: '#0D9488',
          light: '#5EEAD4',
        },
        rank: {
          gold: '#F59E0B',
          silver: '#94A3B8',
          bronze: '#D97706',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'monospace'],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite linear',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
```

#### Step 6: Create Project Structure

```
src/
├── assets/
│   ├── images/
│   └── icons/
├── components/
│   ├── ui/
│   ├── feedback/
│   └── layout/
├── pages/
│   ├── LandingPage/
│   ├── SearchPage/
│   ├── PointsPage/
│   ├── ResultsPage/
│   └── NotFoundPage/
├── hooks/
├── context/
├── services/
├── types/
├── utils/
├── config/
├── App.tsx
├── main.tsx
└── index.css
```

#### Step 7: Configure Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
```

### 3.5 Acceptance Criteria

| Criterion | Requirement |
|-----------|-------------|
| **Dev Server** | `npm run dev` starts without errors on port 3000 |
| **TypeScript** | `npx tsc --noEmit` passes with zero errors |
| **Tailwind** | Custom dark theme colors are available |
| **Routing** | React Router is configured with placeholder routes |
| **Axios** | API client can be imported and configured |
| **Project Structure** | All directories created with barrel exports |

---

## 4. Phase 2: Foundation & Layout

### 4.1 Goal

Build the foundational layout, shared components, and context providers that all pages will use.

### 4.2 Duration

**2-3 days**

### 4.3 Deliverables

| Deliverable | Description |
|-------------|-------------|
| FlowContext | Cross-page state management for the user flow |
| Layout | App shell with header, content area, footer |
| Header | Logo, navigation, CTA button |
| StepIndicator | Visual progress through the flow |
| Shared Components | Button, Input, Card, Badge, LoadingSpinner, etc. |
| Toast System | Notification system for user feedback |

### 4.4 Technical Steps

#### Step 1: FlowContext

Create the flow state management that tracks the user's position in the linear journey:

```
FlowContext State:
├── step: 'landing' | 'search' | 'points' | 'results'
├── selectedCard: CreditCard | null
├── points: number | null
├── selectCard(card): void
├── setPoints(points): void
├── nextStep(): void
├── prevStep(): void
├── resetFlow(): void
└── canProceed: boolean
```

**Key Implementation Details:**
- Persist flow state to localStorage for page refresh resilience
- Validate step transitions (can't skip ahead without data)
- Reset clears all state and returns to landing

#### Step 2: Layout Component

```
Layout Structure:
┌─────────────────────────────────────────────────┐
│ Header                                          │
│ ┌─────────────────────────────────────────────┐ │
│ │ Logo    StepIndicator    [CTA Button]       │ │
│ └─────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────┤
│                                                 │
│ Main Content Area                               │
│ ┌─────────────────────────────────────────────┐ │
│ │                                             │ │
│ │  <Outlet /> (React Router)                  │ │
│ │                                             │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
├─────────────────────────────────────────────────┤
│ Footer                                          │
│ ┌─────────────────────────────────────────────┐ │
│ │ RedeemWise · Maximize Your Rewards          │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

**Key Implementation Details:**
- Header is sticky on mobile, static on desktop
- StepIndicator shows current position in the flow
- CTA button text changes based on current step
- Footer is minimal with branding

#### Step 3: Shared Components

**Component Specifications:**

| Component | Props | Variants |
|-----------|-------|----------|
| `Button` | `variant`, `size`, `disabled`, `loading`, `onClick`, `children` | primary, secondary, ghost |
| `Input` | `label`, `error`, `placeholder`, `value`, `onChange`, `type` | default, error, disabled |
| `Card` | `selected`, `onClick`, `children` | default, selected, hoverable |
| `Badge` | `variant`, `children` | category, rank, status |
| `LoadingSpinner` | `size`, `color` | sm, md, lg |
| `SkeletonLoader` | `variant`, `count` | card, text, circle |
| `EmptyState` | `icon`, `title`, `description`, `action` | — |
| `ErrorState` | `message`, `onRetry` | — |
| `Modal` | `isOpen`, `onClose`, `title`, `children` | — |
| `Toast` | `type`, `message`, `duration` | success, error, warning, info |

#### Step 4: Toast System

```
Toast System Architecture:
├── ToastContext (global state)
├── useToast() hook (add/remove toasts)
├── ToastContainer (renders toasts)
└── Toast component (individual toast)

Toast Types:
├── Success (green) - 3 seconds
├── Error (red) - 5 seconds
├── Warning (yellow) - 4 seconds
└── Info (blue) - 3 seconds
```

### 4.5 Acceptance Criteria

| Criterion | Requirement |
|-----------|-------------|
| **FlowContext** | State persists across page navigations and refreshes |
| **Layout** | App shell renders with header, content area, footer |
| **Header** | Logo, step indicator, and CTA are visible |
| **Shared Components** | All shared components render correctly with props |
| **Toast** | Toasts appear and auto-dismiss correctly |
| **Responsive** | Layout adapts to mobile/tablet/desktop |

---

## 5. Phase 3: Core User Flow

### 5.1 Goal

Build all four main pages (Landing, Search, Points, Results) with their sub-components and implement the complete user journey.

### 5.2 Duration

**3-4 days**

### 5.3 Deliverables

| Deliverable | Description |
|-------------|-------------|
| LandingPage | Hero section, value proposition, how it works |
| SearchPage | Card search, filter, selection |
| PointsPage | Points entry, validation, estimated value |
| ResultsPage | Recommendations, all options table |
| Page Navigation | Complete flow between all pages |

### 5.4 Technical Steps

#### Step 1: Landing Page

**Components to Build:**

| Component | Purpose |
|-----------|---------|
| `HeroSection` | Main headline, subtext, CTA button |
| `ValueProposition` | Three key benefits in card layout |
| `HowItWorksSection` | Three-step process explanation |
| `AnimatedNumber` | Animated counter for stats (optional) |

**Key Implementation Details:**
- Hero section uses gradient background
- CTA button navigates to `/search`
- Scroll-triggered animations for sections (Intersection Observer)
- Mobile: stacked layout; Desktop: side-by-side

#### Step 2: Search Page

**Components to Build:**

| Component | Purpose |
|-----------|---------|
| `SearchBar` | Text input with debounced search |
| `FilterChips` | Card type filter (All, Platinum, Gold, Silver, Other) |
| `CardResultItem` | Selectable card display |
| `SelectedCardPreview` | Preview of selected card |

**Key Implementation Details:**
- Search input debounced at 300ms
- Filter chips use radio-group behavior (single selection)
- Card results displayed in responsive grid
- Card selection updates FlowContext
- Auto-navigate to Points page after selection (500ms delay)

**Data Flow:**
```
Search Input → useDebounce → useSearch → cardService.getCards() → Filtered Results → CardResultItem
                                                                        │
                                                                        ▼
                                                              FlowContext.selectCard()
                                                                        │
                                                                        ▼
                                                              Navigate to /points
```

#### Step 3: Points Page

**Components to Build:**

| Component | Purpose |
|-----------|---------|
| `SelectedCardDisplay` | Shows selected card with option to change |
| `PointsInput` | Number input with comma formatting |
| `QuickAmountChips` | Preset point amounts (5K, 10K, 25K, 50K) |
| `EstimatedValuePreview` | Shows estimated value range |

**Key Implementation Details:**
- Points input formats with commas as user types (50000 → 50,000)
- Quick chips populate the input and trigger animation
- Estimated value calculated using average VPP across all options
- Validation: points must be > 0
- "Find Best Redemption" disabled when points = 0 or empty

**Estimated Value Calculation:**
```
Average VPP = Sum of all option VPPs / Number of options
Min Value = Points × (Average VPP - 20%)
Max Value = Points × (Average VPP + 50%)

Example for 50,000 points:
  Average VPP = ₹0.10
  Min = 50,000 × 0.08 = ₹4,000
  Max = 50,000 × 0.15 = ₹7,500
```

#### Step 4: Results Page

**Components to Build:**

| Component | Purpose |
|-----------|---------|
| `SummaryBanner` | Top stats: points, best value, top VPP |
| `RecommendationCard` | Ranked recommendation with details |
| `RankBadge` | Rank indicator (#1, #2, #3) |
| `AllOptionsTable` | Sortable/filterable table of all options |
| `ShareSection` | Share/save actions (optional) |

**Key Implementation Details:**
- Top 3 recommendations highlighted with rank badges
- #1 gets gold treatment (border, glow, "RECOMMENDED" badge)
- All options table sortable by: VPP, Points Required, Cash Value, Name
- Filter by category (All, Gift Card, Cashback, Merchandise, Travel, Dining)
- "Edit Points" navigates back to Points page
- "New Search" resets flow and navigates to Search page

**Recommendation Card Layout:**
```
┌─────────────────────────────────────────┐
│ 🥇 #1 RECOMMENDED                       │
│                                         │
│ Cashback to Account                     │
│ Category: CASHBACK                      │
│                                         │
│ ┌──────────────┐  ┌──────────────┐     │
│ │ Value/Point  │  │ Cash Value   │     │
│ │ ₹0.10        │  │ ₹400         │     │
│ └──────────────┘  └──────────────┘     │
│                                         │
│ Points Required: 4,000                  │
│ 💡 "Best value per point ratio"         │
└─────────────────────────────────────────┘
```

### 5.5 Acceptance Criteria

| Criterion | Requirement |
|-----------|-------------|
| **Landing Page** | Hero, value prop, and how it works render correctly |
| **Search Page** | Search, filter, and card selection work |
| **Points Page** | Points input, validation, and estimated value work |
| **Results Page** | Recommendations and all options table display correctly |
| **Flow Navigation** | Complete journey: Landing → Search → Points → Results |
| **Back Navigation** | Can go back to any previous step |
| **State Persistence** | Flow state survives page refresh |
| **Responsive** | All pages work on mobile, tablet, desktop |

---

## 6. Phase 4: API Integration

### 6.1 Goal

Connect all pages to the real backend APIs through the API Gateway, replacing mock data with live data.

### 6.2 Duration

**2-3 days**

### 6.3 Deliverables

| Deliverable | Description |
|-------------|-------------|
| apiClient | Configured Axios instance with interceptors |
| Services | cardService, redemptionService, recommendationService |
| Types | TypeScript interfaces matching API contracts |
| Custom Hooks | useSearch, useRecommendations, useRedemptionOptions |
| Error Handling | Global error handler and user-facing error messages |

### 6.4 Technical Steps

#### Step 1: API Client Configuration

```
apiClient Configuration:
├── Base URL: from environment variable
├── Timeout: 10 seconds
├── Headers: Content-Type, Accept (JSON)
├── Request Interceptor: (auth token stub for v2.0)
├── Response Interceptor: error normalization
└── Error Handler: toast notifications
```

**Environment Variables:**
```env
# .env.development
VITE_API_BASE_URL=http://localhost:8080

# .env.staging
VITE_API_BASE_URL=https://api-staging.redeemwise.com

# .env.production
VITE_API_BASE_URL=https://api.redeemwise.com
```

#### Step 2: TypeScript Types

Create type definitions that match the backend API contracts:

```typescript
// types/api.ts - Key types

interface ApiResponse<T> {
  timestamp: string;
  status: number;
  message: string;
  data: T;
}

interface PaginatedData<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// types/domain.ts - Key types

type CardType = 'PLATINUM' | 'GOLD' | 'SILVER' | 'OTHER';
type RedemptionCategory = 'GIFT_CARD' | 'CASHBACK' | 'MERCHANDISE' | 'TRAVEL' | 'DINING';

interface CreditCard {
  id: number;
  bankName: string;
  cardType: CardType;
  cardNumber: string;
  rewardProgram: string;
  expiryDate: string;
}

interface RedemptionOption {
  id: number;
  name: string;
  category: RedemptionCategory;
  pointsRequired: number;
  cashValue: number;
  valuePerPoint: number;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
}

interface Recommendation {
  rank: number;
  redemptionOption: RedemptionOption;
  valuePerPoint: number;
  isRecommended: boolean;
  reason: string;
}
```

#### Step 3: Service Layer

Each service maps to the backend API routes through the Gateway:

| Service | Methods | Backend Route |
|---------|---------|---------------|
| `cardService` | `getCards()`, `getCardById()` | `/api/cards` |
| `redemptionService` | `getOptions()`, `getOptionById()` | `/api/rewards/options` |
| `recommendationService` | `getRecommendations()`, `getValuePerPoint()` | `/api/recommendations` |

#### Step 4: Custom Hooks

| Hook | Purpose | Returns |
|------|---------|---------|
| `useSearch` | Debounced card search | `{ query, results, loading, error, setQuery }` |
| `useRecommendations` | Fetch ranked recommendations | `{ recommendations, loading, error, fetch }` |
| `useRedemptionOptions` | Fetch all options | `{ options, loading, error, fetch }` |
| `useDebounce` | Debounce any value | `{ debouncedValue }` |
| `useLocalStorage` | Persist to localStorage | `{ value, setValue, remove }` |

#### Step 5: Integrate Pages

**SearchPage Integration:**
```
User types → useDebounce (300ms) → useSearch → cardService.getCards() → Display results
```

**PointsPage Integration:**
```
User enters points → useRedemptionOptions (for VPP estimate) → Display estimated value
```

**ResultsPage Integration:**
```
FlowContext (card + points) → useRecommendations → recommendationService.getRecommendations() → Display
```

### 6.5 Acceptance Criteria

| Criterion | Requirement |
|-----------|-------------|
| **API Client** | Axios instance configured with correct base URL |
| **Error Handling** | API errors display user-friendly messages |
| **Search Integration** | Search returns real cards from backend |
| **Recommendations** | Results page shows real recommendations |
| **Loading States** | All API calls show appropriate loading indicators |
| **Error States** | All API failures show appropriate error states |
| **No Direct Microservice Calls** | All requests go through API Gateway only |

---

## 7. Phase 5: UI Polish

### 7.1 Goal

Polish all UI elements with animations, responsive refinements, accessibility, and visual consistency.

### 7.2 Duration

**2-3 days**

### 7.3 Deliverables

| Deliverable | Description |
|-------------|-------------|
| Animations | Page transitions, hover effects, number animations |
| Responsive Polish | Perfect layouts on all breakpoints |
| Accessibility | WCAG 2.1 AA compliance |
| Loading States | Skeleton loaders for all data-loading scenarios |
| Empty States | Meaningful empty states for all edge cases |
| Error States | User-friendly error displays with retry options |

### 7.4 Technical Steps

#### Step 1: Loading States

Implement skeleton loaders for:

| Context | Skeleton Type |
|---------|---------------|
| Search results loading | 3-4 card-shaped skeletons |
| Recommendations loading | 3 recommendation card skeletons |
| Options table loading | Table row skeletons |
| Page transition | Top progress bar |

**Skeleton Animation:**
```css
/* Shimmer effect */
.skeleton {
  background: linear-gradient(90deg, #1E293B 25%, #334155 50%, #1E293B 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}
```

#### Step 2: Empty States

Implement for:

| Context | Message | Action |
|---------|---------|--------|
| No search results | "No cards found for [query]" | "Try a different search" |
| No recommendations | "No redemption options available" | "Back to Home" |
| No points entered | "Enter your reward points to see options" | — |
| API failure | "Something went wrong" | "Retry" |

#### Step 3: Error States

Implement for:

| Context | Display |
|---------|---------|
| Network error | Error page with retry + home link |
| API 404 | "Resource not found" with back link |
| API 500 | "Server error" with retry button |
| Rate limit (429) | "Too many requests" with wait message |
| Validation error | Inline error below input field |

#### Step 4: Responsive Polish

**Mobile (< 640px):**
- All buttons full-width
- All inputs full-width
- Cards stacked, single column
- Navigation collapses to hamburger
- Touch targets ≥ 44px

**Tablet (640-1024px):**
- Cards in 2-column grid
- Navigation inline
- Forms can be 2-column
- Buttons auto-width

**Desktop (> 1024px):**
- Cards in 3-column grid
- Max-width container (1200px)
- Generous whitespace
- Side-by-side layouts where appropriate

#### Step 5: Accessibility

**Keyboard Navigation:**
- Tab through all interactive elements
- Enter/Space to activate buttons
- Arrow keys for filter chips and table navigation
- Escape to close modals

**Screen Reader Support:**
- ARIA labels on all interactive elements
- `aria-live` for dynamic content changes
- Semantic HTML (nav, main, header, footer, section)
- Heading hierarchy (h1 → h2 → h3)
- Form labels and error associations

**Focus Management:**
- Visible focus rings (2px accent color)
- Focus trap in modals
- Skip navigation link

#### Step 6: Animations

| Animation | Trigger | Implementation |
|-----------|---------|----------------|
| Page fade-in | Route change | CSS transition on route wrapper |
| Card hover | Mouse hover | scale(1.02) + shadow increase |
| Number count | Value changes | Animated counter component |
| Skeleton shimmer | Loading | CSS gradient animation |
| Toast enter/exit | Toast show/hide | Slide from right + fade |
| Button press | Click | scale(0.98) on active |

### 7.5 Acceptance Criteria

| Criterion | Requirement |
|-----------|-------------|
| **Loading States** | All data-loading scenarios have skeleton loaders |
| **Empty States** | All empty scenarios have meaningful messages |
| **Error States** | All failure scenarios have user-friendly error displays |
| **Responsive** | Pixel-perfect on 375px, 768px, 1280px, 1440px |
| **Keyboard** | All interactions work via keyboard |
| **Screen Reader** | All content is accessible via screen reader |
| **Focus** | All focus indicators are visible |
| **Animations** | Smooth 150ms transitions; respects reduced-motion |
| **Color Contrast** | All text meets 4.5:1 ratio |
| **Touch Targets** | All interactive elements ≥ 44px |

---

## 8. Phase 6: Testing & Deployment

### 8.1 Goal

Test the complete application, fix bugs, optimize performance, and deploy to production.

### 8.2 Duration

**2-3 days**

### 8.3 Deliverables

| Deliverable | Description |
|-------------|-------------|
| Unit Tests | Tests for utilities, hooks, and key components |
| Manual Testing | Cross-browser, cross-device testing |
| Performance Optimization | Lighthouse score > 90 |
| Production Build | Optimized bundle ready for deployment |
| Deployment | Application deployed and accessible |

### 8.4 Technical Steps

#### Step 1: Unit Tests

**Test Coverage Targets:**

| Area | Target |
|------|--------|
| Utility functions | 100% |
| Custom hooks | 80% |
| Key components | 70% |
| Services | 80% |

**Key Tests to Write:**

| Test | Description |
|------|-------------|
| `formatCurrency` | Formats INR correctly with commas |
| `formatPoints` | Formats large numbers with commas |
| `useDebounce` | Debounces values correctly |
| `useSearch` | Returns filtered results |
| `Button` | Renders with correct variant |
| `Input` | Shows error state correctly |
| `Card` | Handles selection correctly |
| `SearchPage` | Renders search bar and results |
| `ResultsPage` | Renders recommendations |

#### Step 2: Manual Testing

**Cross-Browser Testing:**

| Browser | Versions | Platform |
|---------|----------|----------|
| Chrome | Latest 2 versions | Windows, macOS, Android |
| Firefox | Latest 2 versions | Windows, macOS |
| Safari | Latest 2 versions | macOS, iOS |
| Edge | Latest 2 versions | Windows |

**Device Testing:**

| Device | Width | OS |
|--------|-------|-----|
| iPhone SE | 375px | iOS 15+ |
| iPhone 11/12/13 | 414px | iOS 15+ |
| iPad | 768px | iPadOS 15+ |
| Samsung Galaxy | 360px | Android 12+ |
| Laptop | 1280px | Windows/macOS |
| Desktop | 1440px | Windows/macOS |

#### Step 3: Performance Optimization

**Optimizations:**

| Optimization | Implementation |
|-------------|----------------|
| Code splitting | React.lazy for route-based splitting |
| Image optimization | WebP format; lazy loading |
| Bundle analysis | `npm run build -- --analyze` |
| Tree shaking | Ensure all imports are tree-shakeable |
| Minification | Vite production build handles this |
| Compression | Enable gzip/brotli on server |
| Caching | Set cache headers for static assets |

**Lighthouse Targets:**

| Metric | Target |
|--------|--------|
| Performance | > 90 |
| Accessibility | > 90 |
| Best Practices | > 90 |
| SEO | > 90 |

#### Step 4: Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Analyze bundle
npm run build -- --analyze
```

**Build Output:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js      (~150KB gzipped)
│   ├── index-[hash].css     (~30KB gzipped)
│   └── vendor-[hash].js     (~50KB gzipped)
└── favicon.ico
```

#### Step 5: Deployment Options

| Platform | Method | Best For |
|----------|--------|----------|
| **Vercel** | Git integration | Automatic deploys, preview URLs |
| **Netlify** | Git integration | Form handling, edge functions |
| **GitHub Pages** | GitHub Actions | Free hosting, simple setup |
| **Cloudflare Pages** | Git integration | Global CDN, fast builds |
| **Static Server** | Manual upload | Full control, self-hosted |

**Recommended: Vercel** (best DX for React + Vite)

**Deployment Steps (Vercel):**
1. Connect GitHub repository
2. Framework: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment variables: `VITE_API_BASE_URL`
6. Deploy

### 8.5 Acceptance Criteria

| Criterion | Requirement |
|-----------|-------------|
| **Unit Tests** | All tests pass; coverage meets targets |
| **Manual Testing** | Works on all specified browsers and devices |
| **Lighthouse** | All scores > 90 |
| **Bundle Size** | Initial bundle < 200KB gzipped |
| **Build** | Production build succeeds without errors |
| **Deployment** | Application accessible via production URL |
| **Error Handling** | Graceful degradation in production |
| **Performance** | Page loads in < 2 seconds on 4G |

---

## 9. Phase Dependencies

### 9.1 Dependency Matrix

| Phase | Depends On | Blocks |
|-------|------------|--------|
| Phase 1 | None | Phase 2 |
| Phase 2 | Phase 1 | Phase 3, Phase 4 |
| Phase 3 | Phase 2 | Phase 5 |
| Phase 4 | Phase 2 | Phase 5, Phase 6 |
| Phase 5 | Phase 3, Phase 4 | Phase 6 |
| Phase 6 | Phase 5 | — |

### 9.2 Parallel Work Opportunities

| Work Stream | Can Parallel With |
|-------------|-------------------|
| Landing Page components | Search Page components |
| Points Page components | Results Page components |
| Service layer implementation | Page UI development |
| Unit tests | UI polish work |

---

## 10. Risk Mitigation

### 10.1 Identified Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Backend API not ready | Medium | High | Use mock data during Phase 3; integrate in Phase 4 |
| Tailwind dark theme complexity | Low | Medium | Use pre-defined color tokens; test early |
| Mobile responsiveness issues | Medium | Medium | Mobile-first development; test on real devices |
| Accessibility gaps | Medium | Medium | Use ARIA best practices; test with screen reader |
| Performance issues | Low | Medium | Code split early; monitor bundle size |
| API Gateway not configured | Medium | High | Use Vite proxy in development; verify endpoints |

### 10.2 Contingency Plans

| Contingency | Trigger | Action |
|-------------|---------|--------|
| **Mock Data** | Backend API unavailable | Use JSON mock data files for development |
| **Progressive Enhancement** | Accessibility tooling gaps | Prioritize keyboard nav; add ARIA incrementally |
| **Reduced Scope** | Timeline pressure | Cut ShareSection, animations; keep core flow |
| **Performance Budget** | Bundle too large | Analyze dependencies; replace heavy libs |

---

*Document maintained by RedeemWise Frontend Team*
