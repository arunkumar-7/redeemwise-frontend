# FRONTEND_ARCHITECTURE.md

## RedeemWise – Frontend Architecture Blueprint

### Document Version

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-08-24 | RedeemWise Frontend Team | Initial frontend architecture document |

---

## 1. Purpose

This document defines the complete frontend architecture for the RedeemWise web application, covering information architecture, navigation, component hierarchy, React patterns, TypeScript conventions, folder structure, API integration, state management, and scalability strategy.

---

## 2. High-Level Architecture

### 2.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         REACT APPLICATION                                    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        PRESENTATION LAYER                           │   │
│  │                                                                     │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│  │  │  Pages   │  │Components│  │  Shared  │  │  Layout  │          │   │
│  │  │          │  │          │  │  UI Kit  │  │          │          │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         STATE LAYER                                 │   │
│  │                                                                     │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                         │   │
│  │  │  Context  │  │  Custom  │  │  Local   │                         │   │
│  │  │  Providers│  │  Hooks   │  │  State   │                         │   │
│  │  └──────────┘  └──────────┘  └──────────┘                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        SERVICE LAYER                                │   │
│  │                                                                     │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│  │  │  Axios   │  │  API     │  │ Intercep │  │  Error   │          │   │
│  │  │  Client  │  │ Services │  │  tors    │  │ Handler  │          │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                       INFRASTRUCTURE LAYER                          │   │
│  │                                                                     │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐          │   │
│  │  │  Vite    │  │  React   │  │ Tailwind │  │  React   │          │   │
│  │  │  Build   │  │  Router  │  │   CSS    │  │  Icons   │          │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        API GATEWAY (localhost:8080)                          │
│                                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Auth Service │  │ Card Service │  │Reward Service│  │Recommend Svc │   │
│  │   (8081)     │  │   (8082)     │  │   (8083)     │  │   (8084)     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Information Architecture

### 3.1 Screen Map

```
RedeemWise
│
├── Landing Page (/)
│   ├── Hero Section
│   ├── Value Proposition
│   ├── How It Works
│   └── CTA → Search
│
├── Search & Select (/search)
│   ├── Search Input
│   ├── Filter Chips (Bank Name, Card Type)
│   ├── Results Grid
│   │   └── Card Selection Card
│   └── Selected Card Preview
│
├── Points Entry (/points)
│   ├── Selected Card Display
│   ├── Points Input Field
│   ├── Estimated Value Preview
│   └── CTA → Find Best Redemption
│
├── Recommendations (/results)
│   ├── Summary Banner
│   ├── Top 3 Recommendations
│   │   └── Recommendation Card (ranked)
│   ├── All Options Table
│   │   └── Sortable, Filterable List
│   └── Share / Save CTA
│
├── Not Found (/404)
│   └── 404 Illustration + Back to Home
│
└── Error (/error)
    └── Error Message + Retry CTA
```

### 3.2 Navigation Model

The MVP uses a **linear flow** navigation model rather than traditional multi-page navigation:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        NAVIGATION MODEL                                  │
│                                                                         │
│  LINEAR FLOW (Primary)                                                   │
│  ┌────┐    ┌────┐    ┌────┐    ┌────┐                                  │
│  │Home│ ─► │Src │ ─► │Pts │ ─► │Res │                                  │
│  └────┘    └────┘    └────┘    └────┘                                  │
│    │                   ▲         │                                      │
│    │         ┌─────────┘         │                                      │
│    │         │  Edit Points      │                                      │
│    │         └───────────────────┘                                      │
│    │                                                                    │
│    │  Back buttons at each step                                         │
│    │  Breadcrumb-style progress indicator                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Navigation Patterns:**

| Pattern | Usage |
|---------|-------|
| **Linear flow** | Primary user journey: Home → Search → Points → Results |
| **Back navigation** | Each step has a back button to return to previous step |
| **Progress indicator** | Step indicator showing current position in the flow |
| **Restart** | Logo always links back to homepage |
| **Deep link** | `/results?bank=HDFC&card=Platinum&points=50000` for shareable URLs |

---

## 4. Navigation Architecture

### 4.1 Route Definitions

| Route | Page Component | Description |
|-------|---------------|-------------|
| `/` | `LandingPage` | Hero, value prop, CTA |
| `/search` | `SearchPage` | Card search and selection |
| `/points` | `PointsPage` | Points entry for selected card |
| `/results` | `ResultsPage` | Ranked redemption recommendations |
| `/404` | `NotFoundPage` | 404 error page |
| `*` | `NotFoundPage` | Catch-all redirect |

### 4.2 Route Guards

| Guard | Description |
|-------|-------------|
| **Points Guard** | `/points` requires a selected card in context; redirects to `/search` if absent |
| **Results Guard** | `/results` requires both selected card and points in context; redirects to `/search` if absent |
| **Completion Guard** | `/search` and `/points` redirect to `/results` if all data is available |

---

## 5. Component Architecture

### 5.1 Component Hierarchy

```
App
├── AppProviders (Context Wrappers)
│   └── AppContext (Flow State)
│
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── StepIndicator (Linear flow progress)
│   │   └── BackButton (context-aware)
│   │
│   └── Footer
│       ├── Branding
│       └── Links
│
├── Pages
│   ├── LandingPage
│   │   ├── HeroSection
│   │   │   ├── AnimatedHeadline
│   │   │   ├── ValueProposition
│   │   │   └── PrimaryCTA
│   │   ├── HowItWorksSection
│   │   │   ├── StepCard (x3)
│   │   │   └── ValuePerPointExplainer
│   │   └── TestimonialSection (optional)
│   │
│   ├── SearchPage
│   │   ├── SearchBar
│   │   │   └── SearchInput
│   │   ├── FilterChips
│   │   ├── SearchResults
│   │   │   └── CardResultItem (selectable)
│   │   └── SelectedCardPreview
│   │
│   ├── PointsPage
│   │   ├── SelectedCardDisplay
│   │   ├── PointsInput
│   │   │   ├── NumberInput
│   │   │   └── PointsFormatter (comma-separated)
│   │   ├── QuickAmountChips
│   │   └── EstimatedValuePreview
│   │
│   └── ResultsPage
│       ├── SummaryBanner
│       │   ├── TotalPoints
│       │   └── EstimatedValue
│       ├── TopRecommendations
│       │   └── RecommendationCard (x3, ranked)
│       │       ├── RankBadge
│       │       ├── OptionDetails
│       │       ├── ValuePerPoint
│       │       ├── CashValue
│       │       ├── CategoryTag
│       │       └── RecommendationReason
│       ├── AllOptionsTable
│       │   ├── SortControls
│       │   ├── FilterControls
│       │   └── OptionRow (sortable)
│       └── ShareSection
│
├── Shared Components
│   ├── Button
│   ├── Input
│   ├── Card
│   ├── Badge
│   ├── Modal
│   ├── LoadingSpinner
│   ├── SkeletonLoader
│   ├── EmptyState
│   ├── ErrorState
│   ├── Toast
│   └── Tooltip
│
└── Utility Components
    ├── AnimatedNumber
    ├── CurrencyFormatter
    ├── PointsFormatter
    └── TimeAgo
```

### 5.2 Component Categories

| Category | Description | Examples |
|----------|-------------|----------|
| **Page Components** | Full page layouts | `LandingPage`, `SearchPage`, `PointsPage`, `ResultsPage` |
| **Feature Components** | Business logic containers | `SearchBar`, `PointsInput`, `RecommendationCard` |
| **Shared Components** | Reusable UI primitives | `Button`, `Input`, `Card`, `Badge`, `Modal` |
| **Layout Components** | Structural wrappers | `Header`, `Footer`, `Layout`, `StepIndicator` |
| **Utility Components** | Helper/display | `CurrencyFormatter`, `PointsFormatter`, `AnimatedNumber` |

---

## 6. React Architecture

### 6.1 Component Patterns

| Pattern | Usage | Example |
|---------|-------|---------|
| **Functional Components** | All components | `const Card: React.FC<CardProps> = ({ ... })` |
| **Hooks** | State, effects, context | `useState`, `useEffect`, `useContext`, custom hooks |
| **Composition** | Component assembly | Parent renders children via props |
| **Render Props** | Rare; for complex shared logic | `StepIndicator` with render prop |
| **Compound Components** | Complex components | `Card` with `Card.Header`, `Card.Body`, `Card.Footer` |

### 6.2 Custom Hooks

| Hook | Purpose | Returns |
|------|---------|---------|
| `useFlow` | Manage linear flow state (selected card, points, step) | `{ selectedCard, points, step, setCard, setPoints, next, back }` |
| `useSearch` | Search cards with debounced input | `{ query, results, loading, error, setQuery }` |
| `useRecommendations` | Fetch and rank recommendations | `{ recommendations, loading, error, fetchRecommendations }` |
| `useRedemptionOptions` | Fetch all redemption options | `{ options, loading, error, fetchOptions }` |
| `useDebounce` | Debounce input values | `{ debouncedValue }` |
| `useLocalStorage` | Persist state to localStorage | `{ value, setValue, remove }` |

### 6.3 Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        DATA FLOW PATTERN                                 │
│                                                                         │
│  API Gateway ──► Service Layer ──► Custom Hook ──► Page Component       │
│       │                                            │                    │
│       │                                            ▼                    │
│       │                                     Child Components            │
│       │                                            │                    │
│       │                                     (props down)                │
│       │                                            │                    │
│       │                                     (events up)                 │
│       │                                            │                    │
│       ◄─────────── Service Layer ◄──── Handler ◄───┘                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Data Flow Principles:**

1. **Props down, events up** — Parent passes data via props; children communicate via callback props
2. **State lifted to page level** — Page components own the state; child components are presentational
3. **Context for cross-page state** — Flow state (selected card, points) lives in Context
4. **Services are stateless** — API services return data; they don't own state

---

## 7. TypeScript Architecture

### 7.1 Type Categories

| Category | Location | Purpose |
|----------|----------|---------|
| **API Types** | `types/api.ts` | API request/response shapes |
| **Domain Types** | `types/domain.ts` | Business entity types |
| **Component Props** | Co-located with component | Component interface definitions |
| **Event Types** | `types/events.ts` | User interaction event types |
| **Utility Types** | `types/utils.ts` | Generic utility types |

### 7.2 Core Type Definitions

```typescript
// types/domain.ts

// Card Types
type CardType = 'PLATINUM' | 'GOLD' | 'SILVER' | 'OTHER';
type RedemptionCategory = 'GIFT_CARD' | 'CASHBACK' | 'MERCHANDISE' | 'TRAVEL' | 'DINING';

interface CreditCard {
  id: number;
  bankName: string;
  cardType: CardType;
  cardNumber: string;          // masked: ****-****-****-3456
  rewardProgram: string;
  expiryDate: string;          // ISO date string
}

interface RedemptionOption {
  id: number;
  name: string;
  category: RedemptionCategory;
  pointsRequired: number;
  cashValue: number;           // in INR
  valuePerPoint: number;       // cashValue / pointsRequired
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

// types/api.ts

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

interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

// types/flow.ts

type FlowStep = 'landing' | 'search' | 'points' | 'results';

interface FlowState {
  step: FlowStep;
  selectedCard: CreditCard | null;
  points: number | null;
}
```

### 7.3 TypeScript Conventions

| Convention | Rule |
|------------|------|
| **No `any`** | Never use `any` type; use `unknown` or specific types |
| **Interface for objects** | Use `interface` for object shapes |
| **Type for unions** | Use `type` for unions and primitives |
| **Enum as const** | Use `as const` objects instead of TypeScript enums |
| **Strict mode** | `tsconfig.json` with `strict: true` |
| **Non-null assertion** | Avoid `!` operator; use type guards |
| **Generic constraints** | Use `<T extends BaseShape>` for generic constraints |

---

## 8. Folder Architecture

### 8.1 Directory Structure

```
src/
├── assets/                          # Static assets
│   ├── images/                      # Image files
│   ├── icons/                       # Custom SVG icons
│   └── fonts/                       # Custom fonts (if any)
│
├── components/                      # Shared/reusable components
│   ├── ui/                          # Basic UI primitives
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── Button.stories.ts    # Optional: Storybook
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   └── Input.test.tsx
│   │   ├── Card/
│   │   ├── Badge/
│   │   ├── Modal/
│   │   ├── Tooltip/
│   │   └── index.ts                 # Barrel export
│   │
│   ├── feedback/                    # Status/feedback components
│   │   ├── LoadingSpinner/
│   │   ├── SkeletonLoader/
│   │   ├── EmptyState/
│   │   ├── ErrorState/
│   │   ├── Toast/
│   │   └── index.ts
│   │
│   └── layout/                      # Structural components
│       ├── Header/
│       ├── Footer/
│       ├── Layout/
│       ├── StepIndicator/
│       └── index.ts
│
├── pages/                           # Page-level components (route targets)
│   ├── LandingPage/
│   │   ├── LandingPage.tsx
│   │   ├── LandingPage.test.tsx
│   │   ├── components/              # Page-specific sub-components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   └── ValueProposition.tsx
│   │   └── index.ts
│   │
│   ├── SearchPage/
│   │   ├── SearchPage.tsx
│   │   ├── SearchPage.test.tsx
│   │   ├── components/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterChips.tsx
│   │   │   ├── CardResultItem.tsx
│   │   │   └── SelectedCardPreview.tsx
│   │   └── index.ts
│   │
│   ├── PointsPage/
│   │   ├── PointsPage.tsx
│   │   ├── PointsPage.test.tsx
│   │   ├── components/
│   │   │   ├── PointsInput.tsx
│   │   │   ├── QuickAmountChips.tsx
│   │   │   └── EstimatedValuePreview.tsx
│   │   └── index.ts
│   │
│   ├── ResultsPage/
│   │   ├── ResultsPage.tsx
│   │   ├── ResultsPage.test.tsx
│   │   ├── components/
│   │   │   ├── SummaryBanner.tsx
│   │   │   ├── RecommendationCard.tsx
│   │   │   ├── RankBadge.tsx
│   │   │   ├── AllOptionsTable.tsx
│   │   │   └── ShareSection.tsx
│   │   └── index.ts
│   │
│   └── NotFoundPage/
│       ├── NotFoundPage.tsx
│       └── index.ts
│
├── hooks/                           # Custom React hooks
│   ├── useFlow.ts
│   ├── useSearch.ts
│   ├── useRecommendations.ts
│   ├── useRedemptionOptions.ts
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── index.ts
│
├── context/                         # React Context providers
│   ├── FlowContext.tsx
│   ├── ToastContext.tsx
│   └── index.ts
│
├── services/                        # API service layer
│   ├── apiClient.ts                 # Axios instance with interceptors
│   ├── cardService.ts               # Card API calls
│   ├── redemptionService.ts         # Redemption options API calls
│   ├── recommendationService.ts     # Recommendation API calls
│   └── index.ts
│
├── types/                           # TypeScript type definitions
│   ├── api.ts                       # API request/response types
│   ├── domain.ts                    # Business entity types
│   ├── flow.ts                      # Flow state types
│   ├── events.ts                    # Event handler types
│   └── index.ts                     # Barrel export
│
├── utils/                           # Utility functions
│   ├── formatters.ts                # Currency, number, date formatters
│   ├── validators.ts                # Input validation helpers
│   ├── constants.ts                 # App constants (API URLs, etc.)
│   └── index.ts
│
├── config/                          # Configuration files
│   ├── routes.tsx                   # Route definitions
│   └── theme.ts                     # Tailwind theme extension
│
├── App.tsx                          # Root component
├── main.tsx                         # Entry point
├── index.css                        # Global styles + Tailwind imports
├── vite-env.d.ts                    # Vite type declarations
├── tailwind.config.js               # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
└── package.json                     # Dependencies
```

### 8.2 Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| **Directories** | camelCase | `components/`, `hooks/`, `services/` |
| **Page components** | PascalCase + `Page` suffix | `LandingPage.tsx`, `SearchPage.tsx` |
| **Shared components** | PascalCase | `Button.tsx`, `Input.tsx`, `Card.tsx` |
| **Hooks** | `use` prefix + PascalCase | `useFlow.ts`, `useSearch.ts` |
| **Services** | camelCase + `Service` suffix | `cardService.ts`, `redemptionService.ts` |
| **Types** | PascalCase | `CreditCard`, `RedemptionOption` |
| **Constants** | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_POINTS` |
| **Utils** | camelCase | `formatCurrency.ts`, `validateInput.ts` |

---

## 9. API Integration Architecture

### 9.1 API Gateway Communication

The frontend communicates **exclusively** through the API Gateway:

```
┌─────────────────────┐
│   React Frontend    │
│                     │
│   apiClient.ts      │──── Base URL: http://localhost:8080
│   (Axios)           │
└─────────────────────┘
           │
           ▼
┌─────────────────────┐
│   API Gateway       │
│   (Port 8080)       │
│                     │
│   Routes:           │
│   /api/auth/**      │──► Auth Service (8081)
│   /api/cards/**     │──► Card Service (8082)
│   /api/rewards/**   │──► Reward Service (8083)
│   /api/recommendations/** │──► Recommendation Service (8084)
│   /api/dashboard/** │──► Recommendation Service (8084)
└─────────────────────┘
```

### 9.2 Axios Configuration

```typescript
// services/apiClient.ts

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // In MVP: no auth token
    // In v2.0: inject JWT token from localStorage
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    // 401 → redirect to login (v2.0)
    // 429 → rate limit toast
    // 500 → generic error toast
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 9.3 API Service Layer

Each backend resource maps to a service module:

| Service | API Routes | Frontend Service | Description |
|---------|------------|------------------|-------------|
| Card Service | `/api/cards/**` | `cardService.ts` | Search, list, filter cards |
| Reward Service | `/api/rewards/**` | `redemptionService.ts` | Fetch redemption options |
| Recommendation Service | `/api/recommendations/**` | `recommendationService.ts` | Get ranked recommendations |
| Dashboard | `/api/dashboard/**` | `dashboardService.ts` | Aggregated dashboard data (v2.0) |

### 9.4 API Endpoints Used in MVP

| Endpoint | Method | Purpose | MVP Usage |
|----------|--------|---------|-----------|
| `GET /api/cards` | GET | Search/filter cards | SearchPage |
| `GET /api/cards/{id}` | GET | Get card details | PointsPage (preview) |
| `GET /api/rewards/options` | GET | Get redemption catalog | ResultsPage |
| `GET /api/recommendations` | GET | Get ranked recommendations | ResultsPage |
| `GET /api/recommendations/value-per-point` | GET | Calculate VPP for option | ResultsPage (detail) |

### 9.5 Error Response Handling

```typescript
// services/errorHandler.ts

interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  details?: Array<{ field: string; message: string }>;
}

function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data as ApiErrorResponse;
    if (response?.details) {
      return response.details.map(d => d.message).join(', ');
    }
    return response?.message || 'An unexpected error occurred';
  }
  return 'Network error. Please check your connection.';
}
```

---

## 10. State Management Architecture

### 10.1 State Categories

| Category | Scope | Solution | Examples |
|----------|-------|----------|----------|
| **Flow State** | Cross-page | React Context | Selected card, points, current step |
| **Server State** | Component-level | Custom hooks + useState | Search results, recommendations |
| **UI State** | Component-level | useState | Modal open, input focused, loading |
| **Persistent State** | Browser | localStorage via hook | Search history (optional) |

### 10.2 Flow Context

The primary shared state is the **Flow Context**, which manages the linear user journey:

```typescript
// context/FlowContext.tsx

interface FlowContextType {
  step: FlowStep;
  selectedCard: CreditCard | null;
  points: number | null;
  selectCard: (card: CreditCard) => void;
  setPoints: (points: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetFlow: () => void;
  canProceed: boolean;
}
```

**Flow State Diagram:**

```
┌─────────────────────────────────────────────────────────────────┐
│                     FLOW STATE MACHINE                           │
│                                                                  │
│  ┌─────────┐     selectCard()     ┌─────────┐                   │
│  │ Landing  │ ──────────────────► │ Search  │                   │
│  └─────────┘                     └─────────┘                    │
│                                                      │          │
│                                                      │ selectCard│
│                                                      ▼          │
│                                             ┌─────────┐         │
│                                             │ Points  │         │
│                                             └─────────┘         │
│                                                      │          │
│                                                      │ setPoints│
│                                                      ▼          │
│                                             ┌─────────┐         │
│                                             │ Results │         │
│                                             └─────────┘         │
│                                                      │          │
│                   ┌──────────────────────────────────┘          │
│                   │ prevStep() / editPoints()                    │
│                   ▼                                             │
│              Back to previous step                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 10.3 State Management Principles

| Principle | Description |
|-----------|-------------|
| **Minimize shared state** | Only cross-page flow state uses Context |
| **Lift state minimally** | Each page owns its own server state |
| **No global loading** | Loading states are per-request, per-component |
| **No state duplication** | Single source of truth for each piece of data |
| **Immutable updates** | Never mutate state objects directly |

---

## 11. Scalability Strategy

### 11.1 MVP → v2.0 Preparation

The MVP architecture is designed to accommodate future features without major refactoring:

| Future Feature | Architectural Preparation |
|----------------|--------------------------|
| **Authentication** | AuthContext is pre-defined; JWT interceptor is stubbed; ProtectedRoute pattern is documented |
| **User Dashboard** | Route structure supports `/dashboard`; Context can hold user identity |
| **Saved Cards** | API service layer supports CRUD; card state management is modular |
| **Multiple Cards** | Flow state supports card list; selection is already card-object-based |
| **Notifications** | Toast context pattern is reusable; WebSocket service can be added |
| **Analytics** | Service layer abstraction allows event tracking hooks |

### 11.2 Code Splitting Strategy

```
Route-based Code Splitting:
├── LandingPage  → lazy(() => import('./pages/LandingPage'))
├── SearchPage   → lazy(() => import('./pages/SearchPage'))
├── PointsPage   → lazy(() => import('./pages/PointsPage'))
├── ResultsPage  → lazy(() => import('./pages/ResultsPage'))
└── NotFoundPage → lazy(() => import('./pages/NotFoundPage'))
```

### 11.3 Performance Optimization

| Strategy | Implementation |
|----------|----------------|
| **Code Splitting** | React.lazy + Suspense for route-based splitting |
| **Image Optimization** | WebP format; lazy loading; responsive sizes |
| **Bundle Analysis** | Vite bundle analyzer for dependency auditing |
| **Memoization** | React.memo for frequently re-rendered components |
| **Debouncing** | Debounced search input to reduce API calls |
| **Virtualization** | For large lists of redemption options (future) |

### 11.4 Future Architecture Enhancements

| Enhancement | When | Description |
|-------------|------|-------------|
| **Redux/Zustand** | v3.0 | If state complexity grows significantly |
| **React Query** | v2.0 | For server state caching and synchronization |
| **Storybook** | v2.0 | For component documentation and visual testing |
| **E2E Tests** | v2.0 | Cypress/Playwright for critical user flows |
| **i18n** | v3.0 | React i18next for multi-language support |
| **PWA** | v3.0 | Service worker for offline capability |

---

*Document maintained by RedeemWise Frontend Team*
