# BACKEND_ANALYSIS_REPORT.md

## RedeemWise — Backend Analysis & Frontend Integration Report (Phase 2 Prep)

**Analysis mode:** STRICT READ-ONLY — no backend or frontend files were modified; no code, packages, or configuration were added.
**Sources of truth:** Actual Java source under `redeem-wise/` (all 65 `.java` files inventoried, controllers/DTOs/services/repos/entities/security/configs read in full), all `application.yml` files, module POMs, and all 8 documents under `redeemwise-frontend/docs/`.
**Current frontend state observed:** `redeemwise-frontend/` contains only the static marketing landing page (Phase 1 artifacts: section components, UI primitives, mockups) — no routes, services, API clients, or hooks exist yet. Phase 2 starts from zero.

---

## PROOF OF READ — Files Analyzed

### Controllers analyzed (4)
| # | Controller | Service | Base Path |
|---|-----------|---------|-----------|
| 1 | `AuthController.java` | auth-service | `/api/auth` |
| 2 | `CardController.java` | card-service | `/api/cards` |
| 3 | `RewardController.java` | reward-service | `/api/rewards` |
| 4 | `RecommendationController.java` | recommendation-service | `/api/recommendations` (methods declared per-mapping) |

### DTOs analyzed (14)
**auth-service (3):** `LoginRequestDto`, `RegisterRequestDto`, `AuthResponseDto`
**card-service (3):** `CreateCardRequestDto`, `UpdateCardRequestDto`, `CardResponseDto`
**reward-service (3):** `CreateRewardRequestDto`, `UpdateRewardRequestDto`, `RewardResponseDto`
**recommendation-service (5):** `RecommendationRequestDto`, `RecommendationResponseDto`, `DashboardResponseDto`, `RedemptionOptionDto`, plus external contract DTOs `dto/external/CardResponseDto`, `dto/external/RewardResponseDto` (Jackson-mapped copies of the producer DTOs used to deserialize Feign payloads)

### Services analyzed (5)
| # | Service class | Role |
|---|--------------|------|
| 1 | `AuthService` | Registration (BCrypt + duplicate-email check) and login (AuthenticationManager → JWT) |
| 2 | `CardService` | Card catalog CRUD with soft-delete and 8-branch combination search |
| 3 | `RewardService` | Redemption option catalog CRUD with soft-delete, lookup by card |
| 4 | `RecommendationService` (implements `RecommendationFacade`) | Orchestrates Feign calls to Card + Reward services, delegates to engine |
| 5 | `RecommendationEngine` (@Component) | VPP calculation, eligibility, sorting, ranking, dashboard metrics |

Supporting classes also read: `CardMapper`, `RewardMapper`, `UserRepository`, `CardRepository`, `RewardRepository`, `CustomUserDetailsService`, `JwtTokenProvider`, `JwtAuthenticationFilter`, `SecurityConfiguration`, all four `GlobalExceptionHandler`s, all `OpenApiConfiguration`s, `RecommendationFacade` interface, and entity/enum classes (`User`, `Card`, `RewardOption`, `Network`, `RewardType`, `RedemptionCategory`).

### Feign clients analyzed (2)
| # | Feign Client | Target (Eureka service id) | Base path | Methods |
|---|-------------|---------------------------|-----------|---------|
| 1 | `CardServiceClient` | `card-service` | `/api/cards` | `GET /{id}` → `Map<String,Object>` |
| 2 | `RewardServiceClient` | `reward-service` | `/api/rewards` | `GET /card/{cardId}` → `Map<String,Object>`, `GET ""` → `Map<String,Object>` (getAllRewards declared but unused by `RecommendationService`) |

Feign timeouts: 5000ms connect / 5000ms read per client (`recommendation-service/application.yml`). Circuit breaker: **disabled** (`spring.cloud.openfeign.circuitbreaker.enabled: false`).

### Frontend docs read (8, in priority order)
1. `FRONTEND_DEVELOPMENT_PLAN_V1.md` (full, 1916 lines)
2. `REDEEMWISE_UI_DESIGN_SPEC.md` (structure/colors/typography sections)
3. `FRONTEND_ARCHITECTURE.md` (API + type definitions sections via targeted search)
4. `IMPLEMENTATION_PHASES.md` (phase overview + env config sections)
5. `UI_FLOW_MVP.md` (journeys + card/option display fields)
6. `DESIGN_SYSTEM.md` (category color tokens via targeted search)
7. `FRONTEND_TASKS_MVP.md` (API task tables)
8. `FRONTEND_CONTEXT.md` (product vision + env strategy)

---

## 1. Executive Summary

### What RedeemWise does
RedeemWise is a Spring Cloud microservices platform that helps Indian credit-card holders **maximize the rupee value of their reward points**. An admin seeds a catalog of credit cards and, per card, a catalog of redemption options (flights, hotels, statement credit, vouchers, merchandise, air-miles/hotel-points transfers, fuel, other), each with a **Value Per Point (VPP)**, minimum redemption threshold, priority rank, and recommended flag. A user picks their card, enters their points balance, and the Recommendation Service computes and ranks what each option is worth, surfacing the best redemption.

### Business workflow (as implemented)
1. **Catalog ingestion (admin, no UI):** cards enter Card Service (`redeemwise_card` DB); redemption options enter Reward Service (`redeemwise_reward` DB), linked to cards by `cardId` (a plain Long — no FK join, cross-service reference).
2. **Card discovery:** frontend lists active cards and filters client-side (or server-side via `/api/cards/search`).
3. **Points input:** purely client-side; no user-points storage exists anywhere in the backend.
4. **Recommendation:** frontend `POST`s `cardId` + `availablePoints` (+ optional `categoryFilter`) to Recommendation Service. That service Feign-fetches the card from Card Service and the card's reward options from Reward Service, unwraps the `data` envelope with Jackson, and feeds options to the engine.
5. **Engine computation:** `estimatedValue = availablePoints × valuePerPoint` (scale 2, HALF_UP); eligibility = `availablePoints >= minimumRedemption`; ineligible options get a reason string ("Need X more points (minimum redemption: Y points)"). Sorting: **eligible first → highest VPP → lowest priority rank**; final sequential ranks assigned 1..n. Best recommendation = first eligible option. Dashboard adds: max estimated value, average VPP (4dp), option counts.

### Service interactions
```
Browser ──HTTP──► API Gateway (:8080) ──lb://──► auth/card/reward/recommendation services
                                        recommendation-service ──OpenFeign──► card-service (:8082)
                                                              ──OpenFeign──► reward-service (:8083)
All services ⇄ Eureka registry (:8761). All services ⇄ MySQL (:3306, separate schema per service except recommendation).
```

---

## 2. Microservice Architecture

### 2.1 Service registry

| Service | Port | Artifact | Persistence | Dependencies |
|---------|------|----------|-------------|--------------|
| discovery-service | 8761 | Eureka Server | none | — |
| api-gateway | 8080 | Spring Cloud Gateway | none | Eureka (lb:// routing) |
| auth-service | 8081 | Spring Web + Security + JJWT | MySQL `redeemwise_auth` | Eureka |
| card-service | 8082 | Spring Web + JPA | MySQL `redeemwise_card` | Eureka |
| reward-service | 8083 | Spring Web + JPA | MySQL `redeemwise_reward` | Eureka |
| recommendation-service | 8084 | Spring Web + OpenFeign + LoadBalancer | **none (stateless)** | Eureka, card-service, reward-service (Feign) |

Parent POM: Spring Boot **3.2.3**, Spring Cloud **2023.0.1**, Java **21**, Lombok 1.18.36, springdoc-openapi 2.3.0. Databases auto-created (`createDatabaseIfNotExist=true`), `ddl-auto: update`, credentials from `DB_USERNAME`/`DB_PASSWORD` env vars.

### 2.2 Architecture diagram
```
                        ┌────────────────────┐
                        │  discovery-service │  Eureka :8761
                        └─────────▲──────────┘
                                  │ register/lookup (all services)
        ┌─────────────────────────┼───────────────────────────────┐
        │                         │                               │
┌───────┴────────┐        ┌───────┴────────┐                      │
│    Browser     │───────►│   api-gateway  │  :8080               │
│ (frontend :3000│        │  (CORS+routes) │                      │
└────────────────┘        └───┬────┬───┬───┘                      │
                              │    │   │ lb:// routing            │
        ┌─────────────────────┘    │   └──────────────────┐       │
        ▼                          ▼                      ▼       │
┌────────────────┐        ┌────────────────┐      ┌───────────────────┐
│  auth-service  │        │  card-service  │      │  reward-service   │
│     :8081      │        │     :8082      │      │      :8083        │
│ redeemwise_auth│        │redeemwise_card │      │redeemwise_reward  │
└────────────────┘        └────────▲───────┘      └─────────▲─────────┘
                                   │ Feign GET /api/cards/{id│
                                   │ │ Feign GET /api/rewards/card/{cardId}
                          ┌────────┴──────────────────────────┴───────┐
                          │        recommendation-service :8084       │
                          │  (stateless; no DB; Feign + engine)       │
                          └───────────────────────────────────────────┘
```

### 2.3 Per-service detail

**discovery-service** — Eureka server; no client registration (`register-with-eureka: false`); self-preservation off. APIs: Eureka dashboard/registry endpoints.

**api-gateway** — Routes (all `StripPrefix=0`, so paths pass through unchanged):
| Route id | Path predicate | Target |
|----------|----------------|--------|
| auth-service | `/api/auth/**` | `lb://auth-service` |
| card-service | `/api/cards/**` | `lb://card-service` |
| reward-service | `/api/rewards/**` | `lb://reward-service` |
| recommendation-service | `/api/recommendations/**`, `/api/dashboard/**` | `lb://recommendation-service` |

- **CORS (global):** `allowedOrigins: http://localhost:3000` only; methods GET/POST/PUT/DELETE/PATCH/OPTIONS; headers Authorization, Content-Type, Accept, Origin, X-Requested-With; `allowCredentials: true`; maxAge 3600.
- **No security filter exists in the gateway** — there is no JWT validation at the gateway layer. Auth is enforced only inside auth-service; card/reward/recommendation services have **no Spring Security at all** and are effectively open through the gateway. This matches the frontend's "Login Later" MVP plan.
- Note: the `/api/dashboard/**` route points at recommendation-service, but no controller maps under `/api/dashboard` — it is a dead/legacy route (the real endpoint is `/api/recommendations/dashboard`).
- Management endpoints exposed: `health,info,gateway`.

**auth-service** — APIs exposed: `POST /api/auth/register`, `POST /api/auth/login`. APIs consumed: none (Feign not used). Security: stateless JWT (HS256 via `Keys.hmacShaKeyFor`, secret from `app.jwt.secret` — **hardcoded in application.yml**, base64), expiry `app.jwt.expiration` = 86,400,000 ms (24h). `/api/auth/**`, swagger, `/actuator/health` are `permitAll()`; everything else authenticated. Passwords BCrypt. JWT claims: subject = email, iat, exp — **no roles/custom claims**. Swagger: bearerAuth security scheme declared.

**card-service** — APIs exposed: full CRUD + search on `/api/cards`. Consumed by: api-gateway (public/admin) and recommendation-service (Feign `GET /api/cards/{id}`). No security. `Network` enum: VISA, MASTERCARD, RUPAY, AMEX. `RewardType` enum: CASHBACK, REWARD_POINTS, AIR_MILES, HOTEL_POINTS. Soft delete via `active=false`; all reads filter `active=true`.

**reward-service** — APIs exposed: CRUD + `GET /api/rewards/card/{cardId}`. Consumed by: api-gateway and recommendation-service (Feign `GET /card/{cardId}`). No security. `RedemptionCategory` enum: FLIGHT, HOTEL, STATEMENT_CREDIT, VOUCHER, MERCHANDISE, AIR_MILES_TRANSFER, HOTEL_POINTS_TRANSFER, FUEL, OTHER. Soft delete as above. `cardId` is an unvalidated Long — **no referential integrity to card-service**.

**recommendation-service** — APIs exposed: `POST /api/recommendations`, `GET /api/recommendations/dashboard`, `GET /api/recommendations/health`. APIs consumed: card-service, reward-service via Feign. Feign failures surface as **502** via its GlobalExceptionHandler (`FeignException` → "Service Communication Error"); upstream "not found" cases are translated to `CardNotFoundException`/`RewardNotFoundException` (404). Error translation detail: if Card/Reward service returns a non-2xx, Feign throws before the handler can read the body, so the frontend sees **502**, not the downstream 404.

---

## 3. API Inventory

All endpoints discovered in controller source. Every JSON response is wrapped; see §9 for wrapper shapes.

| # | Service | Method | Endpoint | Purpose | Frontend Usage |
|---|---------|--------|----------|---------|----------------|
| 1 | auth | POST | `/api/auth/register` | Register user (BCrypt, dup-email check) | **No** (MVP "Login Later") |
| 2 | auth | POST | `/api/auth/login` | Authenticate, return JWT (24h) | **No** (MVP) |
| 3 | card | POST | `/api/cards` | Create card | **No** (admin/catalog seeding) |
| 4 | card | GET | `/api/cards` | List all **active** cards | **Yes — Phase 2 Search page (primary load)** |
| 5 | card | GET | `/api/cards/{id}` | Get active card by id | **Yes — optional** (detail/refresh; selection flow already has data) |
| 6 | card | PUT | `/api/cards/{id}` | Update card | **No** (admin) |
| 7 | card | DELETE | `/api/cards/{id}` | Soft-delete card | **No** (admin) |
| 8 | card | GET | `/api/cards/search` | Filter by bankName (contains, ignore-case), network, rewardType — all optional, combinable | **Yes — optional** (server-side search; client-side filtering preferred for MVP per docs) |
| 9 | reward | POST | `/api/rewards` | Create redemption option | **No** (admin) |
| 10 | reward | GET | `/api/rewards` | List all active reward options | **No direct need** (recommendation endpoint embeds options); optional reference data |
| 11 | reward | GET | `/api/rewards/{id}` | Get active reward option by id | **No** |
| 12 | reward | GET | `/api/rewards/card/{cardId}` | Active options for one card | **No** — internal; consumed by recommendation-service via Feign |
| 13 | reward | PUT | `/api/rewards/{id}` | Update option | **No** (admin) |
| 14 | reward | DELETE | `/api/rewards/{id}` | Soft-delete option | **No** (admin) |
| 15 | recommendation | POST | `/api/recommendations` | Ranked recommendations for cardId+points | **Yes — Phase 2 Results page (core feature)** |
| 16 | recommendation | GET | `/api/recommendations/dashboard` | Dashboard summary (query: cardId, availablePoints) | **Yes — Phase 2, optional** |
| 17 | recommendation | GET | `/api/recommendations/health` | Service self-reported health (status/service/message) | **No** (infra) |
| 18 | all | GET | `/actuator/health` (+ `info`, gateway's `gateway`) | Actuator health/info | **No** (infra) |
| 19 | gateway | GET | `/actuator/gateway` | Gateway route introspection | **No** (infra) |
| 20 | all services | GET | `/v3/api-docs`, `/swagger-ui.html` | OpenAPI/Swagger per service | **No** (dev tooling; auth-service declares bearerAuth scheme) |

**Total: 20 discovered endpoint groups (17 application + 3 infrastructure classes).**

---

## 4. API Classification

### 4.1 Public Frontend APIs (consume in Phase 2 through gateway :8080)
| Endpoint | Purpose | Phase 2 page |
|----------|---------|--------------|
| `GET /api/cards` | Card catalog | Search |
| `GET /api/cards/{id}` | Card detail | Search/Points (optional) |
| `GET /api/cards/search` | Server-side card filtering | Search (optional; client-side preferred) |
| `POST /api/recommendations` | Core recommendations | Results |
| `GET /api/recommendations/dashboard` | Dashboard summary | Results (optional) |
| `GET /api/rewards` | Full options catalog | Optional reference data only |

### 4.2 Internal Service APIs (never call from frontend)
| Endpoint | Consumer |
|----------|----------|
| `GET /api/rewards/card/{cardId}` | recommendation-service via `RewardServiceClient` |
| `GET /api/rewards/{id}` | Not consumed by any internal service; catalog-only |

> ⚠️ Note: the backend does **not** technically block frontend access to these (no security layer on card/reward services). The restriction is architectural discipline, not enforcement. The Feign-used endpoint should stay out of frontend code paths so the recommendation flow remains the single source of redemption options.

### 4.3 Admin APIs (never call from frontend; no UI exists)
`POST/PUT/DELETE /api/cards*`, `POST/PUT/DELETE /api/rewards*`
Unsecured in current implementation — must be protected before any public deployment (see §10).

### 4.4 Health/Infrastructure APIs
`GET /api/recommendations/health`; `GET /actuator/health|info|gateway` on every service; Eureka endpoints; Swagger per service.

---

## 5. DTO Analysis

### 5.1 Request DTOs

#### RegisterRequestDto — auth-service
| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| firstName | String | Yes | @NotBlank; @Size(min=2, max=50) |
| lastName | String | Yes | @NotBlank; @Size(min=2, max=50) |
| email | String | Yes | @NotBlank; @Email |
| password | String | Yes | @NotBlank; @Size(min=8) — **no max, no complexity rule** |
| phoneNumber | String | No | @Pattern(`^\+?[0-9]{10,15}$`) — null passes; empty string fails |

Example:
```json
{ "firstName": "John", "lastName": "Doe", "email": "user@example.com", "password": "SecurePass123", "phoneNumber": "+919876543210" }
```

#### LoginRequestDto — auth-service
| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| email | String | Yes | @NotBlank; @Email |
| password | String | Yes | @NotBlank |

Example:
```json
{ "email": "user@example.com", "password": "SecurePass123" }
```

#### CreateCardRequestDto / UpdateCardRequestDto — card-service (identical fields)
| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| cardName | String | Yes | @NotBlank; @Size(2–150) |
| bankName | String | Yes | @NotBlank; @Size(2–150) |
| network | Network enum | Yes | @NotNull — VISA, MASTERCARD, RUPAY, AMEX |
| rewardType | RewardType enum | Yes | @NotNull — CASHBACK, REWARD_POINTS, AIR_MILES, HOTEL_POINTS |
| annualFee | BigDecimal | Yes | @NotNull; @DecimalMin("0.0") inclusive |
| joiningFee | BigDecimal | Yes | @NotNull; @DecimalMin("0.0") inclusive |

Example:
```json
{ "cardName": "HDFC Regalia", "bankName": "HDFC Bank", "network": "VISA", "rewardType": "REWARD_POINTS", "annualFee": 2500.00, "joiningFee": 1000.00 }
```

#### CreateRewardRequestDto / UpdateRewardRequestDto — reward-service (identical fields)
| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| cardId | Long | Yes | @NotNull (no cross-service existence check) |
| redemptionCategory | RedemptionCategory enum | Yes | @NotNull — 9 values, see §5.3 |
| conversionFormula | String | No | @Size(max=500) |
| valuePerPoint | BigDecimal | Yes | @NotNull; @DecimalMin("0.0") |
| minimumRedemption | BigDecimal | Yes | @NotNull; @DecimalMin("0.0") |
| transferPartner | String | No | @Size(max=150) |
| transferRatio | BigDecimal | No | @DecimalMin("0.0") (null allowed) |
| priorityRank | Integer | Yes | @NotNull; @Min(1) |
| recommendedFlag | Boolean | No | defaults to `false` when omitted |

Example:
```json
{ "cardId": 1, "redemptionCategory": "FLIGHT", "conversionFormula": "5000 points = ₹250 voucher", "valuePerPoint": 0.25, "minimumRedemption": 1000, "transferPartner": null, "transferRatio": null, "priorityRank": 1, "recommendedFlag": true }
```

#### RecommendationRequestDto — recommendation-service (the one frontend-authored request body)
| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| cardId | Long | Yes | @NotNull |
| availablePoints | Integer | Yes | @NotNull; @Min(1) — **0 is rejected with 400**; frontend must enforce > 0 |
| categoryFilter | String | No | No validation. **Free-text, not enum-validated.** Case-insensitive equality against `RewardOption.redemptionCategory`. Any value not matching an active option's category simply yields zero options after filtering — it does NOT error. Frontend must send exact enum strings |

Example:
```json
{ "cardId": 1, "availablePoints": 50000, "categoryFilter": "FLIGHT" }
```

**GET /api/recommendations/dashboard query params:** `cardId` (Long, required — Spring throws 400 if missing/non-numeric), `availablePoints` (Integer, required, same). No explicit validation annotations (query binding). No @Min check — **0 or negative points pass through**, engine will mark all options ineligible (minimumRedemption ≥ 0 comparisons).

### 5.2 Response DTOs

#### CardResponseDto — card-service (all fields always present for active cards)
| Field | Type | Notes |
|-------|------|-------|
| id | Long | PK |
| cardName | String | |
| bankName | String | |
| network | Network enum (string in JSON) | |
| rewardType | RewardType enum (string in JSON) | |
| annualFee | number (2dp) | |
| joiningFee | number (2dp) | |
| active | boolean | always `true` in list/get responses (filtered) |
| createdAt / updatedAt | ISO-8601 string | `LocalDateTime` serialized without timezone |

Wrapped example (`GET /api/cards` → list form):
```json
{
  "message": "Cards retrieved successfully",
  "data": [
    { "id": 1, "cardName": "HDFC Regalia", "bankName": "HDFC Bank", "network": "VISA", "rewardType": "REWARD_POINTS", "annualFee": 2500.00, "joiningFee": 1000.00, "active": true, "createdAt": "2026-08-25T10:30:00", "updatedAt": "2026-08-25T10:30:00" }
  ],
  "totalElements": 1
}
```
Single-get form (`GET /api/cards/{id}`): `{ "message": "Card retrieved successfully", "data": { ...card... } }` — **no `totalElements` key**.

#### RewardResponseDto — reward-service (internal contract; also the Feign payload)
| Field | Type | Notes |
|-------|------|-------|
| id | Long | |
| cardId | Long | |
| redemptionCategory | RedemptionCategory enum | |
| conversionFormula | String \| null | may be null |
| valuePerPoint | number (4dp) | |
| minimumRedemption | number (2dp) | |
| transferPartner | String \| null | |
| transferRatio | number \| null (4dp) | |
| priorityRank | Integer | |
| recommendedFlag | boolean | |
| active | boolean | always true in active-filtered reads |
| createdAt / updatedAt | ISO-8601 string | |

#### RecommendationResponseDto — recommendation-service
| Field | Type | Notes |
|-------|------|-------|
| cardId | Long | echoed |
| cardName, bankName | String | from card-service |
| network, rewardType | **String** | serialized from the external card DTO (stringly-typed here, unlike CardResponseDto enums) |
| availablePoints | Integer | echoed |
| totalEstimatedValue | number (2dp) | **best option's estimated value, or 0.00 if none eligible** — a sum in name only |
| bestRecommendation | RedemptionOptionDto \| null | null when nothing eligible |
| recommendations | RedemptionOptionDto[] | eligible only, sorted (see §1) |
| ineligibleOptions | RedemptionOptionDto[] | below-minimum options with reasons |
| generatedAt | ISO-8601 string | server time at generation |

#### RedemptionOptionDto — recommendation-service (nested in both recommendation & dashboard responses)
| Field | Type | Notes |
|-------|------|-------|
| id | Long | reward option id |
| name | String \| null | **populated from conversionFormula — may be null** if formula wasn't seeded |
| category | String | RedemptionCategory value |
| valuePerPoint | number (4dp) | |
| pointsRequired | Integer | minimumRedemption truncated via `.intValue()` |
| estimatedValue | number (2dp) | availablePoints × valuePerPoint |
| minimumRedemption | number (2dp) | |
| conversionFormula | String \| null | duplicate of name |
| transferPartner | String \| null | |
| rank | Integer | final position 1..n (eligible first); ineligible keep DB priorityRank unless sorted to end |
| isRecommended | Boolean | from DB flag |
| isEligible | Boolean | |
| ineligibilityReason | String \| null | present only when ineligible |

#### DashboardResponseDto — recommendation-service
| Field | Type | Notes |
|-------|------|-------|
| cardId | Long | |
| cardName, bankName | String | |
| network, rewardType | String | |
| totalAvailablePoints | Integer | echoed |
| estimatedMaxValue | number (2dp) | max estimated value among eligible; 0.00 if none |
| averageValuePerPoint | number (4dp) | mean VPP of eligible options; 0.0000 if none |
| totalRedemptionOptions | Integer | **all** options (eligible + ineligible) |
| eligibleOptions | Integer | count |
| bestOption | RedemptionOptionDto \| null | |
| generatedAt | ISO-8601 string | |

### 5.3 Shared enums (backend source of truth)
| Enum | Values |
|------|--------|
| `Network` | VISA, MASTERCARD, RUPAY, AMEX |
| `RewardType` | CASHBACK, REWARD_POINTS, AIR_MILES, HOTEL_POINTS |
| `RedemptionCategory` | FLIGHT, HOTEL, STATEMENT_CREDIT, VOUCHER, MERCHANDISE, AIR_MILES_TRANSFER, HOTEL_POINTS_TRANSFER, FUEL, OTHER |

---

## 6. Frontend Integration Contract (analysis only — no implementation)

The frontend needs exactly **six contract types** plus wrappers and enums. All requests must go through the API Gateway; the token and card detail live inside response envelopes, so the frontend's job is unwrapping, not assembly.

```typescript
// ---- Envelopes (uniform across all services) ----
interface ApiSingle<T>  { message: string; data: T }
interface ApiList<T>    { message: string; data: T[]; totalElements: number }
interface ApiError {
  timestamp: string;        // ISO local date-time, no zone
  status: number;           // 400 | 401 | 404 | 500 | 502
  error: string;            // "Validation Error" | "Unauthorized" | "Not Found" | "Internal Server Error" | "Service Communication Error"
  message: string;          // human-readable summary
  details?: Record<string, string>; // field→message, ONLY on 400 validation errors
}

// ---- Enums ----
type Network = 'VISA' | 'MASTERCARD' | 'RUPAY' | 'AMEX';
type RewardType = 'CASHBACK' | 'REWARD_POINTS' | 'AIR_MILES' | 'HOTEL_POINTS';
type RedemptionCategory =
  | 'FLIGHT' | 'HOTEL' | 'STATEMENT_CREDIT' | 'VOUCHER' | 'MERCHANDISE'
  | 'AIR_MILES_TRANSFER' | 'HOTEL_POINTS_TRANSFER' | 'FUEL' | 'OTHER';

// ---- Card Service ----
interface CardResponse {
  id: number;
  cardName: string;
  bankName: string;
  network: Network;
  rewardType: RewardType;
  annualFee: number;
  joiningFee: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---- Recommendation Service ----
interface RecommendationRequest {
  cardId: number;
  availablePoints: number;      // must be >= 1 (backend @Min(1)); 0 → 400
  categoryFilter?: string | null; // exact RedemptionCategory value, or omit
}

interface RedemptionOption {
  id: number;
  name: string | null;           // derived from conversionFormula; can be null
  category: RedemptionCategory;
  valuePerPoint: number;
  pointsRequired: number;        // integer (truncated minimumRedemption)
  estimatedValue: number;
  minimumRedemption: number;
  conversionFormula: string | null;
  transferPartner: string | null;
  rank: number;
  isRecommended: boolean;
  isEligible: boolean;
  ineligibilityReason: string | null;
}

interface RecommendationResponse {
  cardId: number;
  cardName: string;
  bankName: string;
  network: string;
  rewardType: string;
  availablePoints: number;
  totalEstimatedValue: number;   // best option's value, 0.00 when nothing eligible
  bestRecommendation: RedemptionOption | null;
  recommendations: RedemptionOption[];   // eligible, pre-sorted
  ineligibleOptions: RedemptionOption[];
  generatedAt: string;
}

interface DashboardResponse {
  cardId: number;
  cardName: string;
  bankName: string;
  network: string;
  rewardType: string;
  totalAvailablePoints: number;
  estimatedMaxValue: number;
  averageValuePerPoint: number;
  totalRedemptionOptions: number;
  eligibleOptions: number;
  bestOption: RedemptionOption | null;
  generatedAt: string;
}

// ---- Frontend-only flow types (not backend DTOs) ----
type FlowStep = 'landing' | 'search' | 'points' | 'results';
interface FlowState { step: FlowStep; selectedCard: CardResponse | null; points: number | null }
```

**Nullability & formatting notes:**
- `RewardResponse`/auth DTOs are **not needed** as frontend types — the frontend never displays raw reward options, only the engine-computed `RedemptionOption`s.
- `name` on `RedemptionOption` duplicates `conversionFormula`; render `name ?? conversionFormula ?? category`.
- BigDecimal arrives as JSON number; format currency INR on the client (no locale handling server-side).
- `createdAt`/`updatedAt`/`generatedAt` carry no timezone — do not convert; display as-is or localize deliberately.

---

## 7. Frontend API Requirements

### 7.1 Recommended API flow (Phase 2, MVP)
```
Card Selection
→ GET  /api/cards                       (Search page load; filter client-side)

Optional server-side filtering
→ GET  /api/cards/search?bankName=&network=&rewardType=

Points Entry
→ (no API; client-side validation: integer ≥ 1)

Recommendation Request
→ POST /api/recommendations             (Results page; body: cardId, availablePoints, categoryFilter?)

Optional dashboard strip
→ GET  /api/recommendations/dashboard?cardId=&availablePoints=
```

### 7.2 Which APIs Phase 2 should consume
- **Must:** `GET /api/cards`, `POST /api/recommendations`.
- **Should:** `GET /api/recommendations/dashboard` (summary strip on Results).
- **May:** `GET /api/cards/search` (if catalog grows beyond comfortable client filtering), `GET /api/cards/{id}` (deep-link/refresh recovery when FlowState was lost).
- **Optional:** `GET /api/rewards` only if the UI ever needs to browse raw options outside a recommendation context.

### 7.3 APIs that must never be called directly by the frontend
- `GET /api/rewards/card/{cardId}` — internal Feign dependency of the recommendation flow; calling it would duplicate backend logic client-side and create a coupling the recommendation service is supposed to own.
- All `POST/PUT/DELETE` on `/api/cards` and `/api/rewards` — admin catalog mutations; no authorization exists yet, so the only protection is to not build UI for them.
- `/api/auth/**` — deliberately deferred ("Login Later"); revisit in the post-MVP auth phase. If enabled later, attach `Authorization: Bearer <token>`; gateway CORS already whitelists the header.

### 7.4 Recommended API flow sequencing rules
1. Search page fetches the catalog once and filters in-memory (debounce 300ms); switch to `/api/cards/search` only if the catalog grows past ~100 cards.
2. Never call `POST /api/recommendations` with `availablePoints < 1` — backend rejects with 400; enforce > 0 client-side before navigation.
3. Treat `recommendations: []` with `ineligibleOptions: []` as a legitimate empty state ("No redemption options available for this card") — it can happen for cards with no seeded options; it is NOT a network error.
4. Optionally warm the dashboard call in parallel with the recommendations call on the Results page (independent inputs, both keyed by cardId+points).

---

## 8. Validation Rules (frontend must enforce)

**Registration (future auth phase):** firstName/lastName 2–50 chars, non-blank; email RFC-shaped (@Email); password ≥ 8 chars (no upper bound/complexity — mirror backend, don't over-invent); phone optional but if present must match `^\+?[0-9]{10,15}$` (empty string invalid — send null/omit).

**Recommendation request (Phase 2 critical):**
- `cardId` required, positive integer.
- `availablePoints` required, integer, **≥ 1** (backend @Min(1)); frontend should also cap at a sane max (e.g., 9 digits) to avoid overflow noise.
- `categoryFilter`, if sent, must be one of the 9 exact `RedemptionCategory` strings (uppercase with underscores) — no enum validation server-side.

**Dashboard query:** `cardId` and `availablePoints` both required; non-numeric/missing → 400. Apply the same ≥ 1 rule client-side.

**Card display/search:** no server-side validation needed; card filtering is by exact enum match for `network`/`rewardType` chips.

**Soft-delete semantics:** deleted (inactive) cards simply disappear from GET responses — the frontend never needs to handle an "inactive" card from list endpoints, but a stale FlowState may reference a now-deleted card id; `/api/cards/{id}` then 404s → handle with a "card no longer available" reset-to-search state.

---

## 9. Error Handling Analysis

### 9.1 Uniform error envelope (all four GlobalExceptionHandlers)
```json
{
  "timestamp": "2026-09-19T10:30:00.123",
  "status": 404,
  "error": "Not Found",
  "message": "Card not found with id: 999",
  "details": { "field": "message" }   // only on validation errors
}
```

### 9.2 Handler matrix
| Handler | Trigger | HTTP | Body specifics |
|---------|---------|------|---------------|
| UserAlreadyExists (auth) | duplicate email | 409 Conflict | message includes the email |
| InvalidCredentials/BadCredentials (auth) | login failure | 401 Unauthorized | fixed message "Invalid email or password" (no info leak) |
| CardNotFound (card-service & recommendation-service) | missing/inactive id; Feign unwrap failure | 404 | recommendation-service wraps "…Card Service may be unavailable." wording for transport failures |
| RewardNotFound (reward & recommendation services) | no options for cardId (empty list ⇒ 404 from Feign path) / missing id | 404 | recommendation-service: "No reward options found for cardId: X" |
| MethodArgumentNotValid (all services) | @Valid body failure | 400 | `details` = { field: message } map |
| FeignException (recommendation-service only) | downstream non-2xx or connect/read failure | **502 Bad Gateway** | generic "Unable to reach the required service." — downstream 404s are masked as 502 by this path unless pre-translated |
| Exception (all services) | anything unhandled | 500 | generic message |

### 9.3 HTTP codes the frontend must branch on
| Code | Meaning in RedeemWise | Suggested UI |
|------|----------------------|--------------|
| 400 | Validation (body) or bad/missing query params | Inline field errors from `details`; for points input, client-side pre-validation should make this unreachable |
| 401/409 | Login failure / duplicate email | Auth screens only (not in Phase 2) |
| 404 | Card/option/rewards not found (or inactive) | Empty state; reset FlowState if stale cardId |
| 500 | Unhandled server error | Error state + retry |
| 502 | Card/Reward service unreachable from recommendation-service | Toast/error state: "Service temporarily unavailable — try again"; candidate for retry-with-backoff |
| (network/CORS) | Gateway down, or origin not whitelisted | Full-page error state; check gateway + CORS origin list |

### 9.4 Success wrappers (repeat, for contract completeness)
- Single: `{ message, data }` — used by get-by-id, POST/PUT returns, recommendations, dashboard.
- List: `{ message, data: [...], totalElements }` — used by `GET /api/cards`, `GET /api/cards/search`, `GET /api/rewards`, `GET /api/rewards/card/{cardId}`.
- Auth register returns `{ message }` only (201); login returns `AuthResponseDto { token }` directly (200) — **the only two unwrapped-shaped responses in the system** (register is a bare message map; login is a bare DTO).

---

## 10. Frontend Readiness Assessment

**Overall: READY for Phase 2 MVP integration, with known caveats.** The three APIs the frontend needs (cards list, recommendations, dashboard) are implemented, validated, and stable in shape, and all responses are fully untyped-safe to unwrap via `data`.

### Strengths
- Contract-complete DTOs for every frontend-needed payload; enums serialized as plain strings.
- Consistent envelope pattern (`message`/`data`/`totalElements`) across services; consistent error envelope with per-field validation details.
- No auth dependency for the MVP path — card/reward/recommendation routes are reachable without JWT (gateway has no security filter; those services don't use Spring Security).
- CORS is pre-configured for `http://localhost:3000`, matching the documented Vite dev port.
- Backend unit tests exist for the recommendation flow (controller/engine/service), increasing contract confidence.

### Gaps / blockers to acknowledge (not MVP-blocking, but plan for them)
1. **No security on Card/Reward/Recommendation services and no gateway auth filter.** Fine for local MVP; any public deployment exposes admin CRUD endpoints (create/update/delete cards & rewards) to anyone. Frontend team should not assume auth "will just appear."
2. **CORS is hardcoded to `http://localhost:3000`.** Production deploys require a gateway config change (add the real origin); flag this now to backend.
3. **`POST /api/recommendations` rejects 0 points** (@Min(1)) — if the UI allows "0 points", it will 400. Enforce ≥ 1 client-side.
4. **Empty-rewards is a 404 from the Feign path.** A card with zero options, or a rewards-service outage, both surface as 404/502 from the recommendation endpoint — the frontend must render distinct empty vs. error states for these.
5. **No pagination anywhere.** `GET /api/cards` returns the whole catalog (~49 cards per docs' seed data — fine for MVP).
6. **No user-specific data model** (no user-card ownership, no stored points) — matches MVP, but means every session re-enters points; localStorage mitigation as per docs.
7. **Missing DTOs (none blocking):** no `/api/auth/me`-style profile endpoint; no share-link endpoint; no `CardType`/tier concept (do not design for Platinum/Gold/Silver).
8. **Minor data-shape quirks to code around:** `totalEstimatedValue` is the *best option's* value (not a sum); `pointsRequired` truncates `minimumRedemption`; `RedemptionOption.name` may be null (mirrors missing conversionFormula); recommendation `network`/`rewardType` are plain strings; gateway has a dead `/api/dashboard/**` route.

---

## 11. Phase 2 Implementation Checklist

Grounded strictly in verified backend capabilities.

**Foundation (before any page consumes an API)**
1. Define TypeScript contracts from §6 (envelopes, enums, `CardResponse`, `RecommendationRequest`, `RecommendationResponse`, `RedemptionOption`, `DashboardResponse`) in `src/types/`.
2. Create the API client pointed at `VITE_API_BASE_URL` (default `http://localhost:8080`), 10s timeout, error interceptor normalizing the §9.1 envelope — including non-JSON/network failures and the 502 case.
3. Set up `FlowContext` (selectedCard, points, step) + localStorage persistence, and route guards for `/points` and `/results` (redirect to `/search` when FlowState is incomplete).
4. Verify gateway connectivity early (P0): `GET http://localhost:8080/api/cards` from the dev origin must return 200 with the envelope before building UI against it.

**Search page**
5. `GET /api/cards` on mount; render skeleton grid while loading; map `data` and ignore `totalElements` or use it for a count chip.
6. Client-side filtering: debounced (300ms) case-insensitive `bankName` contains + `Network`/`RewardType` chip filters (exact enum values only — there is no tier/cardType concept).
7. Selection writes `CardResponse` to FlowContext → navigate to `/points`; handle "card no longer available" 404 via optional `GET /api/cards/{id}` revalidation after refresh.

**Points page**
8. Pure client-side: integer input with comma formatting, quick chips, and **validation ≥ 1** (also guard against `NaN`/empty).
9. Estimated-value preview is client-side only (backend has no preview endpoint) — use the documented VPP range approach.

**Results page**
10. `POST /api/recommendations` with `{ cardId, availablePoints, categoryFilter? }` on mount; render skeleton cards/table while loading.
11. Branch rendering on response: `bestRecommendation` (highlight #1), `recommendations` list, `ineligibleOptions` (dimmed with `ineligibilityReason`), and the empty state when both lists are empty.
12. Optional parallel `GET /api/recommendations/dashboard?cardId=&availablePoints=` for the summary strip (`estimatedMaxValue`, `averageValuePerPoint`, counts).
13. Category filter re-issues the POST with an exact `RedemptionCategory` string — it's a re-query, not client-side filtering, since the backend filters options server-side.
14. Error mapping per §9.3: 404 → empty/"card unavailable" state; 502 → retry toast; 400 → unreachable if client validation is correct (log it); 500/network → full error state with retry.

**Cross-cutting**
15. Never call `/api/rewards/card/{cardId}` or any mutating endpoint from the frontend (§4.2/§4.3).
16. Currency/points formatting utilities (INR, integer grouping); treat all timestamps as display strings.
17. Leave auth integration out of Phase 2; when added later, the JWT goes in the `Authorization: Bearer` header (CORS already permits it) and login responses are the bare `{ token }` shape noted in §9.4.

---

*Report generated in read-only mode. Backend source treated as the functional source of truth; all conflicts with frontend documentation are cataloged in §5, §6, §7, and §10 of this report and in the discrepancies called out inline (dead `/api/dashboard/**` route, non-existent `/api/recommendations/value-per-point` and `/api/rewards/options` endpoints referenced by older docs, and legacy `CardType`/`GIFT_CARD/CASHBACK/TRAVEL/DINING` enums in `FRONTEND_ARCHITECTURE.md`, `IMPLEMENTATION_PHASES.md`, `UI_FLOW_MVP.md`, and `DESIGN_SYSTEM.md` that do not exist in backend code — use §5.3 enums instead).*
