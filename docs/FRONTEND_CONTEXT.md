# FRONTEND_CONTEXT.md

## RedeemWise – Frontend Product Context

### Document Version

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-08-24 | RedeemWise Frontend Team | Initial frontend context document |

---

## 1. Product Vision

### 1.1 Vision Statement

> "To deliver an instant, zero-friction experience that helps credit card users discover the highest-value redemption option for their reward points — without requiring login, signup, or any commitment."

### 1.2 Frontend Mission

Build a premium, dark-themed, mobile-first React application that communicates exclusively through the API Gateway to deliver:

- **Instant value** — users see redemption recommendations within seconds
- **Zero friction** — no login, no signup, no authentication walls
- **Visual clarity** — every screen communicates the "best option" clearly
- **Premium feel** — design inspired by CRED, CheQ, INDmoney, and Zerodha

---

## 2. User Personas

### 2.1 Primary Persona: "The Pragmatic Saver"

| Attribute | Detail |
|-----------|--------|
| **Name** | Rahul |
| **Age** | 28-40 |
| **Occupation** | IT Professional / Salaried Employee |
| **Credit Cards** | 2-3 cards from HDFC, ICICI, SBI |
| **Reward Points** | 10,000 - 100,000 across cards |
| **Behavior** | Checks reward balance quarterly, often forgets to redeem |
| **Pain Point** | Doesn't know which option gives the best value per point |
| **Goal** | Maximize cash value from accumulated points |
| **Technical Skill** | Moderate smartphone user, comfortable with web apps |

### 2.2 Secondary Persona: "The Points Maximizer"

| Attribute | Detail |
|-----------|--------|
| **Name** | Priya |
| **Age** | 25-35 |
| **Occupation** | Marketing Manager |
| **Credit Cards** | 4-5 premium cards |
| **Reward Points** | 50,000 - 300,000+ across cards |
| **Behavior** | Actively tracks points across multiple cards |
| **Pain Point** | No unified tool to compare redemption across different card programs |
| **Goal** | Find the absolute best redemption for each card's points |
| **Technical Skill** | High — uses fintech apps regularly |

### 2.3 Tertiary Persona: "The Casual User"

| Attribute | Detail |
|-----------|--------|
| **Name** | Amit |
| **Age** | 30-50 |
| **Occupation** | Business Owner |
| **Credit Cards** | 1 primary card |
| **Reward Points** | 5,000 - 30,000 |
| **Behavior** | Rarely checks reward points, doesn't understand redemption options |
| **Pain Point** | Points expire without being redeemed; doesn't know options exist |
| **Goal** | Quick answer: "What's the best thing I can do with my points?" |
| **Technical Skill** | Low to moderate |

---

## 3. MVP Product Strategy

### 3.1 Login Later Approach

The MVP deliberately excludes all authentication and account management features.

**Rationale:**

| Principle | Explanation |
|-----------|-------------|
| **Value First** | Users receive redemption recommendations without any commitment |
| **Zero Friction** | No signup form, no password, no email verification |
| **Lower Barrier** | Any user with reward points can use the tool immediately |
| **Faster Development** | No auth UI, no token management, no protected routes |
| **Viral Potential** | Users can share recommendations without login walls |

### 3.2 MVP User Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│          │     │          │     │          │     │          │     │          │     │          │
│ Homepage │ ──► │  Search  │ ──► │  Select  │ ──► │  Enter   │ ──► │   Find   │ ──► │   View   │
│          │     │   Card   │     │   Card   │     │  Points  │     │  Best    │     │  Results │
│          │     │          │     │          │     │          │     │ Redeem   │     │          │
└──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘
```

**Flow Description:**

1. **Homepage** — Hero section explaining the value proposition; CTA to search
2. **Search Card** — User searches by bank name or card program
3. **Select Card** — User selects their credit card from search results
4. **Enter Reward Points** — User enters their current reward point balance
5. **Find Best Redemption** — System calculates and ranks redemption options
6. **View Recommendations** — Top 3 recommendations displayed with value-per-point, cash value, and reasoning

---

## 4. MVP Scope

### 4.1 In Scope (MVP)

| Feature | Description | Priority |
|---------|-------------|----------|
| **Landing Page** | Hero section, value proposition, CTA | High |
| **Card Search** | Search by bank name, filter by card type | High |
| **Card Selection** | Display matching cards, user selects one | High |
| **Points Entry** | Input field for reward point balance | High |
| **Redemption Recommendations** | Ranked list with VPP, cash value, category | High |
| **Value Per Point Calculator** | Show VPP for each option | High |
| **Top 3 Highlight** | Visually highlight best 3 options | High |
| **Responsive Design** | Mobile, tablet, and desktop layouts | High |
| **Dark Theme** | Premium dark fintech aesthetic | High |
| **Loading States** | Skeleton loaders, spinners | Medium |
| **Error States** | Network errors, API failures | Medium |
| **Empty States** | No results, no cards found | Medium |
| **Accessibility** | WCAG 2.1 AA compliance | Medium |

### 4.2 Out of Scope (Future Versions)

| Feature | Version | Rationale |
|---------|---------|-----------|
| Login / Signup | v2.0 | Login Later strategy |
| User Dashboard | v2.0 | Requires authentication |
| Saved Cards | v2.0 | Requires user accounts |
| Multiple Card Management | v2.0 | Requires persistent user state |
| Reward Portfolio | v2.0 | Requires card-to-user association |
| Notifications | v3.0 | Requires user preferences |
| Analytics | v3.0 | Requires historical data |
| AI Features | v4.0 | Requires ML infrastructure |

---

## 5. Product Goals

### 5.1 Business Goals

| Goal | Metric | Target |
|------|--------|--------|
| **User Engagement** | Average session duration | > 2 minutes |
| **Conversion** | % users who reach recommendations | > 70% |
| **Return Users** | Monthly return rate | > 20% |
| **Sharing** | Recommendation share rate | > 10% |
| **Performance** | Time to first meaningful paint | < 1.5 seconds |

### 5.2 Technical Goals

| Goal | Metric | Target |
|------|--------|--------|
| **Performance** | Lighthouse Performance Score | > 90 |
| **Bundle Size** | Initial JS bundle | < 200KB gzipped |
| **Accessibility** | Lighthouse Accessibility Score | > 90 |
| **SEO** | Lighthouse SEO Score | > 90 |
| **Browser Support** | Chrome, Firefox, Safari, Edge (latest 2 versions) | 100% |
| **Mobile Performance** | Core Web Vitals on 4G | All green |

### 5.3 UX Goals

| Goal | Measurement |
|------|-------------|
| **Discoverability** | User finds "best option" within 3 steps |
| **Clarity** | Value-per-point is immediately understood |
| **Trust** | Recommendation reasoning builds confidence |
| **Delight** | Premium feel matches CRED/Zerodha quality |
| **Simplicity** | No instructions needed to use the tool |

---

## 6. Business Decisions

### 6.1 Key Frontend Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Auth Strategy** | No auth in MVP | Value-first approach; reduce friction |
| **State Management** | React Context + Custom Hooks | Sufficient for MVP complexity; no Redux needed |
| **Routing** | React Router DOM | Standard React routing; no need for alternatives |
| **Styling** | Tailwind CSS | Utility-first; rapid prototyping; dark theme support |
| **HTTP Client** | Axios | Interceptors, error handling, request/response transforms |
| **Icons** | React Icons | Lightweight; extensive icon set; tree-shakeable |
| **Build Tool** | Vite | Faster dev experience; optimized builds |
| **Type Safety** | TypeScript | Catch errors early; better DX; API contract enforcement |

### 6.2 Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Theme** | Dark mode only | Premium fintech feel; matches CRED/Zerodha aesthetic |
| **Mobile First** | Yes | Primary user base accesses via mobile |
| **Layout** | Single-page flow | Linear user journey; no complex navigation |
| **Color Palette** | Dark backgrounds + accent colors | Professional, premium, easy on eyes |
| **Typography** | Inter / system fonts | Clean, modern, excellent readability |

### 6.3 API Integration Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **API Communication** | API Gateway only | Never communicate directly with microservices |
| **Base URL** | Configurable via env | Supports dev/staging/production environments |
| **Error Handling** | Global interceptor | Consistent error display across all API calls |
| **Loading States** | Per-request tracking | Granular loading indicators for better UX |
| **Caching** | Minimal in MVP | API responses are relatively fresh; localStorage for search history |

---

## 7. Login Later Rationale

### 7.1 Why Login Later?

The backend documentation defines a full authentication system with JWT, user registration, and protected routes. The frontend MVP deliberately bypasses this.

**Strategic Reasoning:**

| Factor | Explanation |
|--------|-------------|
| **User Acquisition** | Login walls reduce conversion by 30-50% |
| **Value Demonstration** | Users must see value before committing to signup |
| **Fintech Precedent** | CRED, CheQ, INDmoney all offer value before full account creation |
| **MVP Philosophy** | Ship the core value first, add complexity later |
| **Development Speed** | No auth UI, no token management, no protected routes |

### 7.2 How MVP Avoids Auth

The backend APIs for card search, redemption options, and recommendations may or may not require JWT tokens. The frontend handles this by:

1. **Calling only public/guest-friendly endpoints** if available
2. **Implementing a lightweight session identifier** (optional) via localStorage
3. **Preparing auth infrastructure** in the codebase for v2.0 activation
4. **Keeping auth code dormant** but architecturally correct

### 7.3 Future Auth Activation Path

When authentication is added in v2.0:

```
MVP (No Auth)                    v2.0 (With Auth)
─────────────                    ─────────────────
Homepage → Search → Results      Login → Dashboard → Search → Results
                     ↑                                       ↑
              No token needed                         JWT token required
```

The architecture is designed so that adding auth requires:
- Activating the AuthContext
- Adding ProtectedRoute wrappers
- Enabling JWT token injection in Axios interceptors
- No structural changes to existing components

---

## 8. Success Criteria

### 8.1 MVP Launch Criteria

| Criterion | Requirement |
|-----------|-------------|
| **Core Flow** | Complete user journey from homepage to recommendations works end-to-end |
| **API Integration** | All API calls go through API Gateway; no direct microservice calls |
| **Responsive** | Works on mobile (375px), tablet (768px), and desktop (1440px) |
| **Dark Theme** | Consistent dark theme across all screens |
| **Performance** | Page loads in < 2 seconds on 4G connection |
| **Error Handling** | Graceful error states for all failure scenarios |
| **Empty States** | Meaningful empty states for no-results scenarios |
| **Accessibility** | Keyboard navigable; screen reader compatible |
| **Cross-Browser** | Works on Chrome, Firefox, Safari, Edge (latest 2 versions) |
| **No Auth Required** | Zero authentication barriers to using the tool |

### 8.2 Quality Gates

| Gate | Requirement |
|------|-------------|
| **Code Review** | All PRs reviewed before merge |
| **TypeScript** | Zero `any` types in production code |
| **Linting** | ESLint passes with zero warnings |
| **Build** | Production build succeeds without errors |
| **Bundle Size** | Initial bundle < 200KB gzipped |
| **Lighthouse** | Performance > 90, Accessibility > 90 |

---

*Document maintained by RedeemWise Frontend Team*
