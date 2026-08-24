# FRONTEND_TASKS_MVP.md

## RedeemWise – Frontend MVP Task Breakdown & Roadmap

### Document Version

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-08-24 | RedeemWise Frontend Team | Initial frontend tasks document |

---

## 1. Purpose

This document defines the complete frontend implementation task breakdown, development roadmap, checklists, and Definition of Done for the RedeemWise MVP. It serves as the primary reference for project planning, task assignment, and progress tracking.

---

## 2. Development Roadmap

### 2.1 Phase Summary

| Phase | Name | Duration | Focus |
|-------|------|----------|-------|
| Phase 1 | Project Setup | 1-2 days | Vite, TypeScript, Tailwind, routing |
| Phase 2 | Foundation & Layout | 2-3 days | Layout, header, shared components |
| Phase 3 | Core User Flow | 3-4 days | Landing, Search, Points, Results pages |
| Phase 4 | API Integration | 2-3 days | Axios, services, hooks, data flow |
| Phase 5 | UI Polish | 2-3 days | Animations, responsive, accessibility |
| Phase 6 | Testing & Deployment | 2-3 days | Testing, optimization, deployment |

**Total Estimated Duration: 12-18 days**

### 2.2 Gantt Chart

```
Day:  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18
      ├──┼──┼──┼──┼──┼──┼──┼──┼──┼──┼──┼──┼──┼──┼──┼──┼──┤
P1:   ██████
P2:         █████████
P3:                ████████████
P4:                        █████████
P5:                              █████████
P6:                                    █████████
```

---

## 3. Phase 1: Project Setup Tasks

| Task ID | Task | Est. Hours | Priority | Status |
|---------|------|------------|----------|--------|
| P1-001 | Initialize Vite + React + TypeScript project | 0.5 | High | Pending |
| P1-002 | Configure TypeScript (tsconfig.json) | 0.5 | High | Pending |
| P1-003 | Install and configure Tailwind CSS | 0.5 | High | Pending |
| P1-004 | Set up custom Tailwind theme (colors, fonts) | 1 | High | Pending |
| P1-005 | Install React Router DOM | 0.5 | High | Pending |
| P1-006 | Install Axios | 0.5 | High | Pending |
| P1-007 | Install React Icons | 0.5 | Medium | Pending |
| P1-008 | Set up project folder structure | 1 | High | Pending |
| P1-009 | Create global CSS (fonts, resets, variables) | 1 | High | Pending |
| P1-010 | Configure ESLint + Prettier | 1 | Medium | Pending |
| P1-011 | Set up Vite proxy for API Gateway | 0.5 | High | Pending |
| P1-012 | Create .env files (dev/staging/prod) | 0.5 | Medium | Pending |
| P1-013 | Verify dev server runs without errors | 0.5 | High | Pending |

---

## 4. Phase 2: Foundation & Layout Tasks

| Task ID | Task | Est. Hours | Priority | Status |
|---------|------|------------|----------|--------|
| P2-001 | Create AppProviders wrapper (Context) | 1 | High | Pending |
| P2-002 | Create FlowContext (flow state management) | 2 | High | Pending |
| P2-003 | Create Layout component (header + content + footer) | 2 | High | Pending |
| P2-004 | Create Header component (logo, nav, CTA) | 2 | High | Pending |
| P2-005 | Create Footer component | 1 | Medium | Pending |
| P2-006 | Create StepIndicator component | 2 | High | Pending |
| P2-007 | Create Button component (primary, secondary, ghost) | 1.5 | High | Pending |
| P2-008 | Create Input component | 1.5 | High | Pending |
| P2-009 | Create Card component | 1 | High | Pending |
| P2-010 | Create Badge component | 0.5 | Medium | Pending |
| P2-011 | Create Modal component | 1.5 | Medium | Pending |
| P2-012 | Create LoadingSpinner component | 0.5 | High | Pending |
| P2-013 | Create SkeletonLoader component | 1.5 | High | Pending |
| P2-014 | Create EmptyState component | 1 | High | Pending |
| P2-015 | Create ErrorState component | 1 | High | Pending |
| P2-016 | Create Toast component + ToastContext | 2 | Medium | Pending |
| P2-017 | Set up React Router with route definitions | 1.5 | High | Pending |
| P2-018 | Create NotFoundPage (404) | 0.5 | Medium | Pending |

---

## 5. Phase 3: Core User Flow Tasks

| Task ID | Task | Est. Hours | Priority | Status |
|---------|------|------------|----------|--------|
| **Landing Page** | | | | |
| P3-001 | Create LandingPage layout | 1 | High | Pending |
| P3-002 | Create HeroSection component | 2 | High | Pending |
| P3-003 | Create ValueProposition component | 1.5 | High | Pending |
| P3-004 | Create HowItWorksSection component | 1.5 | High | Pending |
| P3-005 | Create AnimatedHeadline (optional animation) | 1 | Low | Pending |
| P3-006 | Implement Landing Page CTA navigation | 0.5 | High | Pending |
| **Search Page** | | | | |
| P3-007 | Create SearchPage layout | 1 | High | Pending |
| P3-008 | Create SearchBar component with debounce | 2 | High | Pending |
| P3-009 | Create FilterChips component (card type filters) | 1.5 | High | Pending |
| P3-010 | Create CardResultItem component (selectable card) | 2 | High | Pending |
| P3-011 | Create SelectedCardPreview component | 1 | High | Pending |
| P3-012 | Implement card selection logic + navigation | 1 | High | Pending |
| P3-013 | Create useSearch custom hook | 1.5 | High | Pending |
| P3-014 | Implement search results grid (responsive) | 1 | High | Pending |
| **Points Page** | | | | |
| P3-015 | Create PointsPage layout | 1 | High | Pending |
| P3-016 | Create SelectedCardDisplay component | 1 | High | Pending |
| P3-017 | Create PointsInput component with formatting | 2 | High | Pending |
| P3-018 | Create QuickAmountChips component | 1 | Medium | Pending |
| P3-019 | Create EstimatedValuePreview component | 1.5 | High | Pending |
| P3-020 | Implement points validation logic | 1 | High | Pending |
| P3-021 | Implement "Change Card" navigation | 0.5 | High | Pending |
| **Results Page** | | | | |
| P3-022 | Create ResultsPage layout | 1 | High | Pending |
| P3-023 | Create SummaryBanner component | 1.5 | High | Pending |
| P3-024 | Create RecommendationCard component (ranked) | 3 | High | Pending |
| P3-025 | Create RankBadge component | 0.5 | Medium | Pending |
| P3-026 | Create AllOptionsTable component (sortable) | 2.5 | High | Pending |
| P3-027 | Implement sort/filter controls | 1.5 | High | Pending |
| P3-028 | Create ShareSection component | 1 | Low | Pending |
| P3-029 | Implement "Edit Points" navigation | 0.5 | High | Pending |
| P3-030 | Implement "New Search" navigation + state reset | 0.5 | High | Pending |

---

## 6. Phase 4: API Integration Tasks

| Task ID | Task | Est. Hours | Priority | Status |
|---------|------|------------|----------|--------|
| P4-001 | Create Axios instance (apiClient.ts) | 1 | High | Pending |
| P4-002 | Configure request interceptor (auth token stub) | 0.5 | High | Pending |
| P4-003 | Configure response interceptor (error handling) | 1 | High | Pending |
| P4-004 | Create cardService (search, get, list) | 1.5 | High | Pending |
| P4-005 | Create redemptionService (get options) | 1 | High | Pending |
| P4-006 | Create recommendationService (get recommendations) | 1.5 | High | Pending |
| P4-007 | Create TypeScript types (api.ts, domain.ts) | 2 | High | Pending |
| P4-008 | Create useDebounce hook | 0.5 | High | Pending |
| P4-009 | Create useFlow hook | 1 | High | Pending |
| P4-010 | Create useSearch hook (API integration) | 1.5 | High | Pending |
| P4-011 | Create useRecommendations hook | 1.5 | High | Pending |
| P4-012 | Create useRedemptionOptions hook | 1 | High | Pending |
| P4-013 | Create useLocalStorage hook | 0.5 | Medium | Pending |
| P4-014 | Create error handler utility | 1 | High | Pending |
| P4-015 | Create formatters utility (currency, number) | 1 | High | Pending |
| P4-016 | Integrate SearchPage with cardService | 1 | High | Pending |
| P4-017 | Integrate ResultsPage with recommendationService | 1.5 | High | Pending |
| P4-018 | Test API integration with backend | 2 | High | Pending |

---

## 7. Phase 5: UI Polish Tasks

| Task ID | Task | Est. Hours | Priority | Status |
|---------|------|------------|----------|--------|
| P5-001 | Implement all loading states (skeletons) | 2 | High | Pending |
| P5-002 | Implement all empty states | 1.5 | High | Pending |
| P5-003 | Implement all error states | 1.5 | High | Pending |
| P5-004 | Add hover/focus/active states to all components | 2 | High | Pending |
| P5-005 | Implement page transitions | 1 | Medium | Pending |
| P5-006 | Add number counting animations | 1 | Medium | Pending |
| P5-007 | Add card hover animations | 0.5 | Medium | Pending |
| P5-008 | Implement responsive layouts (mobile/tablet/desktop) | 3 | High | Pending |
| P5-009 | Test on mobile devices (375px, 414px) | 1 | High | Pending |
| P5-010 | Test on tablet (768px, 1024px) | 0.5 | High | Pending |
| P5-011 | Test on desktop (1280px, 1440px) | 0.5 | High | Pending |
| P5-012 | Add keyboard navigation support | 1.5 | High | Pending |
| P5-013 | Add ARIA labels to all interactive elements | 1.5 | High | Pending |
| P5-014 | Add focus indicators | 0.5 | High | Pending |
| P5-015 | Add skip navigation link | 0.5 | Medium | Pending |
| P5-016 | Verify color contrast ratios | 0.5 | High | Pending |
| P5-017 | Add meta tags (title, description, OG tags) | 0.5 | Medium | Pending |
| P5-018 | Add favicon and app icons | 0.5 | Low | Pending |

---

## 8. Phase 6: Testing & Deployment Tasks

| Task ID | Task | Est. Hours | Priority | Status |
|---------|------|------------|----------|--------|
| P6-001 | Write unit tests for utility functions | 2 | High | Pending |
| P6-002 | Write component tests (key components) | 3 | High | Pending |
| P6-003 | Write hook tests | 1.5 | Medium | Pending |
| P6-004 | Perform end-to-end manual testing | 2 | High | Pending |
| P6-005 | Fix bugs found during testing | 2 | High | Pending |
| P6-006 | Run Lighthouse audit | 0.5 | High | Pending |
| P6-007 | Optimize bundle size | 1 | Medium | Pending |
| P6-008 | Configure production build | 1 | High | Pending |
| P6-009 | Set up deployment (Vercel/Netlify/static) | 1 | High | Pending |
| P6-010 | Configure environment variables for production | 0.5 | High | Pending |
| P6-011 | Test production deployment | 1 | High | Pending |
| P6-012 | Create deployment documentation | 1 | Medium | Pending |

---

## 9. Component Build Order

### 9.1 Recommended Build Sequence

```
Layer 1: Shared Primitives (no dependencies)
├── Button
├── Input
├── Card
├── Badge
├── LoadingSpinner
└── SkeletonLoader

Layer 2: Feedback Components (depend on primitives)
├── EmptyState
├── ErrorState
├── Toast
└── Modal

Layer 3: Layout Components (depend on primitives)
├── Header
├── Footer
├── Layout
└── StepIndicator

Layer 4: Page-Specific Components (depend on all above)
├── HeroSection
├── HowItWorksSection
├── SearchBar
├── FilterChips
├── CardResultItem
├── PointsInput
├── QuickAmountChips
├── RecommendationCard
├── AllOptionsTable
└── SummaryBanner

Layer 5: Pages (compose all components)
├── LandingPage
├── SearchPage
├── PointsPage
├── ResultsPage
└── NotFoundPage

Layer 6: Integration (API + hooks + context)
├── Services (cardService, redemptionService, recommendationService)
├── Hooks (useSearch, useRecommendations, useFlow)
├── Context (FlowContext, ToastContext)
└── AppProviders
```

### 9.2 Dependency Graph

```
Primitives ──► Feedback ──► Layout ──► Page Components ──► Pages ──► Integration
   │               │            │              │               │           │
   │               │            │              │               │           │
   ▼               ▼            ▼              ▼               ▼           ▼
 Button        EmptyState    Header      HeroSection     LandingPage   Services
 Input         ErrorState    Footer      SearchBar       SearchPage    Hooks
 Card          Toast         Layout      FilterChips     PointsPage    Context
 Badge         Modal         StepInd.    CardResult      ResultsPage   App
 Loading       Skeleton                  PointsInput
```

---

## 10. API Integration Order

### 10.1 Integration Sequence

| Order | API Endpoint | Service | Page | Notes |
|-------|-------------|---------|------|-------|
| 1 | `GET /api/cards` | cardService | SearchPage | Foundation for search flow |
| 2 | `GET /api/rewards/options` | redemptionService | ResultsPage | Redemption catalog |
| 3 | `GET /api/recommendations` | recommendationService | ResultsPage | Core recommendation engine |
| 4 | `GET /api/recommendations/value-per-point` | recommendationService | ResultsPage | Individual VPP calculation |

### 10.2 API Gateway Base URL

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:8080` |
| Staging | `https://api-staging.redeemwise.com` |
| Production | `https://api.redeemwise.com` |

---

## 11. Responsive Design Checklist

### 11.1 Mobile (< 640px)

- [ ] Header collapses to hamburger menu
- [ ] Hero section stacks vertically
- [ ] Search input is full-width
- [ ] Filter chips wrap to 2 lines
- [ ] Card results are single column, full-width
- [ ] Points input is full-width
- [ ] Quick amount chips are 2-column grid
- [ ] "Find Best Redemption" button is full-width
- [ ] Recommendation cards are stacked, full-width
- [ ] All options table converts to card layout or horizontal scroll
- [ ] All touch targets are ≥ 44px
- [ ] Text is readable without horizontal scrolling
- [ ] Footer is stacked

### 11.2 Tablet (640px - 1024px)

- [ ] Header shows inline navigation links
- [ ] Hero section is side-by-side
- [ ] Card results are 2-column grid
- [ ] Recommendation cards are 2-column grid
- [ ] Form inputs use 2-column grid
- [ ] Buttons are auto-width
- [ ] Table is horizontally scrollable if needed

### 11.3 Desktop (> 1024px)

- [ ] Container is centered with max-width 1200px
- [ ] Header shows full navigation + CTA
- [ ] Hero section is side-by-side with max-width
- [ ] Card results are 3-column grid
- [ ] Recommendation cards are 3-column layout
- [ ] All options table is full-width, readable
- [ ] Footer is horizontal layout
- [ ] Generous whitespace around all sections

---

## 12. Accessibility Checklist

### 12.1 WCAG 2.1 AA Compliance

- [ ] All text meets 4.5:1 contrast ratio (large text: 3:1)
- [ ] All interactive elements have visible focus indicators
- [ ] All images have descriptive alt text
- [ ] All form inputs have associated labels
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical and follows visual flow
- [ ] Skip navigation link is present
- [ ] ARIA labels are used for screen reader context
- [ ] `aria-live` regions announce dynamic content changes
- [ ] Error messages are associated with form fields via `aria-describedby`
- [ ] Modal focus is trapped when open
- [ ] No content relies solely on color to convey meaning
- [ ] Motion respects `prefers-reduced-motion`

### 12.2 Keyboard Navigation

- [ ] Logo links to home
- [ ] All nav links are focusable
- [ ] Search input is focusable and operable
- [ ] Filter chips are navigable with arrow keys
- [ ] Card results are focusable and selectable with Enter/Space
- [ ] Points input accepts keyboard input
- [ ] Quick amount chips are focusable
- [ ] CTA buttons are focusable and activatable
- [ ] Sort controls are keyboard accessible
- [ ] Table rows are focusable
- [ ] Modal close button is focusable
- [ ] Escape key closes modals

### 12.3 Screen Reader Support

- [ ] Page landmarks are properly defined (nav, main, footer)
- [ ] Heading hierarchy is logical (h1 → h2 → h3)
- [ ] Dynamic content changes are announced
- [ ] Loading states are announced
- [ ] Error states are announced
- [ ] Form validation errors are announced
- [ ] Recommendation rank and value are read aloud
- [ ] Currency values include currency context

---

## 13. Testing Checklist

### 13.1 Unit Tests

- [ ] Utility functions (formatters, validators) tested
- [ ] Custom hooks tested with mocked services
- [ ] Component rendering tested (default state)
- [ ] Component interactions tested (click, input)
- [ ] Error handling tested (API failures)
- [ ] Loading states tested
- [ ] Empty states tested

### 13.2 Integration Tests

- [ ] Search flow works end-to-end (search → select → points → results)
- [ ] API integration works with mock data
- [ ] Navigation between pages works correctly
- [ ] Flow state persists across page navigations
- [ ] Back navigation works correctly
- [ ] Error recovery works (retry after failure)

### 13.3 Manual Testing

- [ ] Test on Chrome (latest)
- [ ] Test on Firefox (latest)
- [ ] Test on Safari (latest)
- [ ] Test on Edge (latest)
- [ ] Test on mobile Safari (iOS)
- [ ] Test on mobile Chrome (Android)
- [ ] Test on 375px width (iPhone SE)
- [ ] Test on 414px width (iPhone 11)
- [ ] Test on 768px width (iPad)
- [ ] Test on 1280px width (laptop)
- [ ] Test on 1920px width (desktop)
- [ ] Test network throttled (3G speed)
- [ ] Test with JavaScript disabled (graceful degradation)

### 13.4 Performance Testing

- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse Accessibility score > 90
- [ ] Lighthouse Best Practices score > 90
- [ ] Lighthouse SEO score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms
- [ ] Bundle size < 200KB gzipped
- [ ] No render-blocking resources

---

## 14. Production Readiness Checklist

### 14.1 Code Quality

- [ ] No `any` types in production code
- [ ] ESLint passes with zero warnings
- [ ] TypeScript compiles with zero errors
- [ ] No console.log statements in production
- [ ] No TODO/FIXME comments in production
- [ ] All components are properly typed
- [ ] All props have explicit types

### 14.2 Build & Deploy

- [ ] Production build succeeds
- [ ] Environment variables configured for production
- [ ] API base URL points to production gateway
- [ ] Source maps disabled for production
- [ ] Asset hashing enabled for cache busting
- [ ] Compression enabled (gzip/brotli)
- [ ] CDN configured for static assets

### 14.3 Security

- [ ] No sensitive data in client-side code
- [ ] API tokens handled securely (when auth is added)
- [ ] HTTPS enforced in production
- [ ] Content Security Policy headers configured
- [ ] XSS prevention measures in place
- [ ] No eval() or innerHTML usage

### 14.4 Monitoring & Analytics

- [ ] Error boundary catches React errors
- [ ] Console errors are logged (in development)
- [ ] Performance metrics are trackable
- [ ] 404 errors are handled gracefully
- [ ] API errors are logged

---

## 15. Definition of Done

### 15.1 Task-Level DoD

| Criterion | Description |
|-----------|-------------|
| **Code Complete** | Feature is fully implemented and working |
| **Types** | All TypeScript types are defined and correct |
| **Tests** | Relevant unit/integration tests written and passing |
| **Responsive** | Works on mobile, tablet, and desktop |
| **Accessible** | Keyboard navigable, screen reader compatible |
| **Error Handling** | Loading, error, and empty states implemented |
| **Code Review** | Code reviewed by peer |
| **No Regressions** | Existing features still work |

### 15.2 Phase-Level DoD

| Phase | Completion Criteria |
|-------|---------------------|
| **Phase 1** | Project runs without errors; all tools configured |
| **Phase 2** | Layout renders; shared components work; routing works |
| **Phase 3** | Complete user flow works end-to-end (mock data) |
| **Phase 4** | Real API integration works; data flows correctly |
| **Phase 5** | Responsive on all breakpoints; accessible; polished |
| **Phase 6** | Tests pass; production build succeeds; deployed |

### 15.3 MVP-Level DoD

| Criterion | Requirement |
|-----------|-------------|
| **Core Flow** | Homepage → Search → Points → Results works completely |
| **API Integration** | All API calls go through API Gateway |
| **Responsive** | Mobile (375px), Tablet (768px), Desktop (1440px) |
| **Dark Theme** | Consistent premium dark theme across all screens |
| **Performance** | Lighthouse score > 90 on all metrics |
| **Accessibility** | WCAG 2.1 AA compliant |
| **Cross-Browser** | Chrome, Firefox, Safari, Edge (latest 2 versions) |
| **No Auth Required** | Zero authentication barriers |
| **Error Handling** | Graceful handling of all failure scenarios |
| **Production Ready** | Deployed and accessible via URL |

---

*Document maintained by RedeemWise Frontend Team*
