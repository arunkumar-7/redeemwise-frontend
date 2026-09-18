# FRONTEND_DEVELOPMENT_PLAN_V2.md

## RedeemWise – Complete Frontend Blueprint

### Document Version

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 2.0 | 2026-08-25 | Buffy (Principal Frontend Architect) | Complete reverse-engineered frontend blueprint based on source code analysis |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Understanding](#2-system-understanding)
3. [Backend Verification Evidence](#3-backend-verification-evidence)
4. [Backend API Inventory](#4-backend-api-inventory)
5. [API Classification](#5-api-classification)
6. [DTO Analysis](#6-dto-analysis)
7. [Frontend Data Contracts](#7-frontend-data-contracts)
8. [Frontend Feature Mapping](#8-frontend-feature-mapping)
9. [Page Inventory](#9-page-inventory)
10. [Component Inventory](#10-component-inventory)
11. [Phase 1 Development Plan](#11-phase-1-development-plan)
12. [Phase 2 Development Plan](#12-phase-2-development-plan)
13. [Recommended Frontend Architecture](#13-recommended-frontend-architecture)
14. [Risks & Gaps](#14-risks--gaps)
15. [Documentation vs Backend Discrepancies](#15-documentation-vs-backend-discrepancies)
16. [Implementation Order](#16-implementation-order)

---

## 1. Executive Summary

### 1.1 System Overview

RedeemWise is a Spring Cloud microservices fintech platform that helps credit card holders in India maximize the value of their accumulated reward points. The system analyzes redemption options across multiple cards and banks, calculating Value Per Point (VPP) and ranking options to surface the highest-value redemption path.

### 1.2 Architecture Summary

The backend consists of **6 microservices** deployed via Spring Cloud with Netflix Eureka service discovery and Spring Cloud Gateway:

| Service | Port | Database | Responsibility |
|---------|------|----------|----------------|
| Discovery Service | 8761 | None (in-memory) | Eureka service registry |
| API Gateway | 8080 | None | Routing, CORS, load balancing |
| Auth Service | 8081 | `redeemwise_auth` (MySQL) | User registration, JWT authentication |
| Card Service | 8082 | `redeemwise_card` (MySQL) | Credit card catalog CRUD |
| Reward Service | 8083 | `redeemwise_reward` (MySQL) | Redemption option catalog CRUD |
| Recommendation Service | 8084 | None (stateless) | Recommendation engine, dashboard |

### 1.3 Frontend Strategy

The frontend follows a **"Login Later"** philosophy for the MVP. Users receive immediate value without authentication. The marketing landing page (Phase 1) requires zero backend integration. The application experience (Phase 2) communicates exclusively through the API Gateway at `http://localhost:8080`.

### 1.4 Key Metrics

| Metric | Value |
|--------|-------|
| Verified Backend Endpoints | 13 |
| Public Frontend APIs | 5 |
| Verified TypeScript Interfaces | 12 |
| Required Pages | 5 |
| Required Components | 28 |
| Estimated Phase 1 Duration | 5-7 days |
| Estimated Phase 2 Duration | 10-14 days |

---

## 2. System Understanding

### 2.1 Business Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        BUSINESS WORKFLOW                                      │
│                                                                             │
│  1. DATA INGESTION (Admin)                                                   │
│     Admin seeds credit cards into Card Service                               │
│     Admin seeds redemption options into Reward Service                       │
│     Each option linked to a specific card via cardId                         │
│                                                                             │
│  2. USER DISCOVERY (Public)                                                  │
│     User visits landing page → understands value proposition                 │
│     User searches for their credit card by bank name                         │
│     User selects their specific card from catalog                            │
│                                                                             │
│  3. POINTS INPUT (Public)                                                    │
│     User manually enters their available reward point balance                │
│     Frontend may show estimated value preview                                │
│                                                                             │
│  4. RECOMMENDATION (Engine)                                                  │
│     Frontend sends cardId + availablePoints to Recommendation Service         │
│     Recommendation Service fetches card details via Feign → Card Service     │
│     Recommendation Service fetches reward options via Feign → Reward Service │
│     RecommendationEngine calculates VPP, eligibility, estimated value        │
│     Options sorted: eligible first, then by VPP (highest first), then rank   │
│                                                                             │
│  5. RESULTS (Display)                                                        │
│     Top recommendation highlighted as "Best Value"                           │
│     All options displayed with VPP, estimated cash value, eligibility        │
│     Ineligible options shown with reason (points below minimum redemption)   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 User Journey

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        USER JOURNEY MAP                                      │
│                                                                             │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐          │
│  │          │     │          │     │          │     │          │          │
│  │ Homepage │ ──► │  Search  │ ──► │  Enter   │ ──► │  View    │          │
│  │ (Landing)│     │  Card    │     │  Points  │     │ Results  │          │
│  │          │     │          │     │          │     │          │          │
│  └──────────┘     └──────────┘     └──────────┘     └──────────┘          │
│       │                │                │                 │                 │
│       │                │                │                 │                 │
│  No auth needed   GET /api/cards   User input        POST /api/           │
│  No API calls     Client filter    No API needed     recommendations      │
│                                       │                 │                 │
│                                       │                 │                 │
│                                  Optional:          Response includes:    │
│                                  GET /api/cards/{id}  - Card info         │
│                                  (for estimated       - Ranked options    │
│                                   value preview)      - Best recommendation│
│                                                       - Ineligible opts  │
│                                                       - Total est. value │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Service Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     SERVICE INTERACTION MAP                                  │
│                                                                             │
│  ┌──────────┐     ┌──────────┐                                             │
│  │ Frontend │────►│   API    │                                             │
│  │ (:3000)  │     │ Gateway  │                                             │
│  └──────────┘     │  (:8080) │                                             │
│                   └────┬─────┘                                             │
│                        │                                                    │
│          ┌─────────────┼─────────────┬──────────────┐                      │
│          ▼             ▼             ▼              ▼                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐              │
│  │  Auth    │  │  Card    │  │  Reward  │  │Recommendation│              │
│  │ Service  │  │ Service  │  │ Service  │  │   Service    │              │
│  │ (:8081)  │  │ (:8082)  │  │ (:8083)  │  │   (:8084)    │              │
│  └──────────┘  └──────────┘  └──────────┘  └──────┬───────┘              │
│                                                    │                       │
│                                          Feign Clients                     │
│                                          ┌─────┴──────┐                   │
│                                          ▼            ▼                   │
│                                    ┌──────────┐ ┌──────────┐             │
│                                    │  Card    │ │  Reward  │             │
│                                    │ Service  │ │ Service  │             │
│                                    └──────────┘ └──────────┘             │
│                                                                             │
│  NOTE: Recommendation Service calls Card + Reward Services internally      │
│        via OpenFeign. Frontend NEVER calls these directly for recs.        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.4 Recommendation Engine Logic

Verified from `RecommendationEngine.java`:

1. **Input:** List of `RewardResponseDto` + `availablePoints`
2. **Processing per option:**
   - Calculate `estimatedValue = availablePoints × valuePerPoint`
   - Determine eligibility: `availablePoints >= minimumRedemption`
   - If ineligible, generate reason: "Need X more points (minimum redemption: Y points)"
3. **Sorting:** Eligible first → Highest VPP first → Lower priority rank first
4. **Rank assignment:** Sequential 1, 2, 3... after sorting
5. **Best recommendation:** First eligible option after sorting (highest VPP)

---

## 3. Backend Verification Evidence

### 3.1 Verification Method

Every API endpoint listed in this document was verified by reading the actual Java source code files:

| Source File | Verified |
|-------------|----------|
| `auth-service/.../controller/AuthController.java` | ✅ |
| `auth-service/.../dto/request/LoginRequestDto.java` | ✅ |
| `auth-service/.../dto/request/RegisterRequestDto.java` | ✅ |
| `auth-service/.../dto/response/AuthResponseDto.java` | ✅ |
| `auth-service/.../entity/User.java` | ✅ |
| `auth-service/.../security/JwtTokenProvider.java` | ✅ |
| `auth-service/.../config/SecurityConfiguration.java` | ✅ |
| `card-service/.../controller/CardController.java` | ✅ |
| `card-service/.../service/CardService.java` | ✅ |
| `card-service/.../dto/request/CreateCardRequestDto.java` | ✅ |
| `card-service/.../dto/request/UpdateCardRequestDto.java` | ✅ |
| `card-service/.../dto/response/CardResponseDto.java` | ✅ |
| `card-service/.../entity/Card.java` | ✅ |
| `card-service/.../entity/Network.java` | ✅ |
| `card-service/.../entity/RewardType.java` | ✅ |
| `reward-service/.../controller/RewardController.java` | ✅ |
| `reward-service/.../service/RewardService.java` | ✅ |
| `reward-service/.../dto/request/CreateRewardRequestDto.java` | ✅ |
| `reward-service/.../dto/request/UpdateRewardRequestDto.java` | ✅ |
| `reward-service/.../dto/response/RewardResponseDto.java` | ✅ |
| `reward-service/.../entity/RewardOption.java` | ✅ |
| `reward-service/.../entity/RedemptionCategory.java` | ✅ |
| `recommendation-service/.../controller/RecommendationController.java` | ✅ |
| `recommendation-service/.../service/RecommendationService.java` | ✅ |
| `recommendation-service/.../engine/RecommendationEngine.java` | ✅ |
| `recommendation-service/.../dto/request/RecommendationRequestDto.java` | ✅ |
| `recommendation-service/.../dto/response/RecommendationResponseDto.java` | ✅ |
| `recommendation-service/.../dto/response/RedemptionOptionDto.java` | ✅ |
| `recommendation-service/.../dto/response/DashboardResponseDto.java` | ✅ |
| `recommendation-service/.../client/CardServiceClient.java` | ✅ |
| `recommendation-service/.../client/RewardServiceClient.java` | ✅ |
| `api-gateway/.../resources/application.yml` | ✅ |
| `auth-service/.../resources/application.yml` | ✅ |
| `card-service/.../resources/application.yml` | ✅ |
| `reward-service/.../resources/application.yml` | ✅ |
| `recommendation-service/.../resources/application.yml` | ✅ |
| `discovery-service/.../resources/application.yml` | ✅ |

### 3.2 Verified Enums

| Enum | Source | Values |
|------|--------|--------|
| `Network` | `card-service/.../entity/Network.java` | `VISA`, `MASTERCARD`, `RUPAY`, `AMEX` |
| `RewardType` | `card-service/.../entity/RewardType.java` | `CASHBACK`, `REWARD_POINTS`, `AIR_MILES`, `HOTEL_POINTS` |
| `RedemptionCategory` | `reward-service/.../entity/RedemptionCategory.java` | `FLIGHT`, `HOTEL`, `STATEMENT_CREDIT`, `VOUCHER`, `MERCHANDISE`, `AIR_MILES_TRANSFER`, `HOTEL_POINTS_TRANSFER`, `FUEL`, `OTHER` |

### 3.3 Verified Response Wrappers

All backend services return responses wrapped in `Map<String, Object>` structures. The consistent wrapper pattern is:

**Success (single resource):**
```json
{
  "message": "Resource retrieved successfully",
  "data": { ... }
}
```

**Success (list resource):**
```json
{
  "message": "Resources retrieved successfully",
  "data": [ ... ],
  "totalElements": 42
}
```

**Created:**
```json
{
  "message": "Resource created successfully",
  "data": { ... }
}
```

**Error:**
```json
{
  "timestamp": "2026-08-25T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Card not found with id: 999"
}
```

**Validation Error:**
```json
{
  "timestamp": "2026-08-25T10:30:00",
  "status": 400,
  "error": "Validation Error",
  "message": "Invalid input data",
  "details": {
    "cardName": "Card name is required",
    "bankName": "Bank name is required"
  }
}
```

---

## 4. Backend API Inventory

### 4.1 Auth Service Endpoints

| # | Service | Controller | Method | Endpoint | Request DTO | Response DTO | Validation | Frontend Usage |
|---|---------|-----------|--------|----------|-------------|--------------|------------|----------------|
| 1 | Auth Service | AuthController | POST | `/api/auth/register` | `RegisterRequestDto` | `Map<String, String>` (message only) | firstName: @NotBlank, @Size(2-50); lastName: @NotBlank, @Size(2-50); email: @NotBlank, @Email; password: @NotBlank, @Size(min=8); phoneNumber: @Pattern(`^\+?[0-9]{10,15}$`) — optional | NOT USED IN MVP |
| 2 | Auth Service | AuthController | POST | `/api/auth/login` | `LoginRequestDto` | `AuthResponseDto` | email: @NotBlank, @Email; password: @NotBlank | NOT USED IN MVP |

**Auth Endpoint Status:** The Auth Service is fully implemented with JWT generation (HS256, 24h expiry), BCrypt password encoding, and stateless session management. However, the frontend MVP follows a "Login Later" strategy and does NOT consume these endpoints.

### 4.2 Card Service Endpoints

| # | Service | Controller | Method | Endpoint | Request DTO | Response DTO | Validation | Frontend Usage |
|---|---------|-----------|--------|----------|-------------|--------------|------------|----------------|
| 3 | Card Service | CardController | POST | `/api/cards` | `CreateCardRequestDto` | `Map<String, Object>` (message + data) | cardName: @NotBlank, @Size(2-150); bankName: @NotBlank, @Size(2-150); network: @NotNull; rewardType: @NotNull; annualFee: @NotNull, @DecimalMin("0.0"); joiningFee: @NotNull, @DecimalMin("0.0") | NOT USED (Admin) |
| 4 | Card Service | CardController | GET | `/api/cards` | None | `Map<String, Object>` (message + data + totalElements) | None | ✅ PUBLIC — Card catalog listing |
| 5 | Card Service | CardController | GET | `/api/cards/{id}` | Path: id (Long) | `Map<String, Object>` (message + data) | None | ✅ PUBLIC — Card detail |
| 6 | Card Service | CardController | PUT | `/api/cards/{id}` | Path: id; Body: `UpdateCardRequestDto` | `Map<String, Object>` (message + data) | Same as CreateCardRequestDto | NOT USED (Admin) |
| 7 | Card Service | CardController | DELETE | `/api/cards/{id}` | Path: id (Long) | `Map<String, String>` (message) | None | NOT USED (Admin) |
| 8 | Card Service | CardController | GET | `/api/cards/search` | Query: bankName (optional), network (optional, enum), rewardType (optional, enum) | `Map<String, Object>` (message + data + totalElements) | None | ✅ PUBLIC — Card search with filters |

### 4.3 Reward Service Endpoints

| # | Service | Controller | Method | Endpoint | Request DTO | Response DTO | Validation | Frontend Usage |
|---|---------|-----------|--------|----------|-------------|--------------|------------|----------------|
| 9 | Reward Service | RewardController | POST | `/api/rewards` | `CreateRewardRequestDto` | `Map<String, Object>` (message + data) | cardId: @NotNull; redemptionCategory: @NotNull; conversionFormula: @Size(max=500); valuePerPoint: @NotNull, @DecimalMin("0.0"); minimumRedemption: @NotNull, @DecimalMin("0.0"); transferPartner: @Size(max=150); transferRatio: @DecimalMin("0.0"); priorityRank: @NotNull, @Min(1); recommendedFlag: optional (default false) | NOT USED (Admin) |
| 10 | Reward Service | RewardController | GET | `/api/rewards` | None | `Map<String, Object>` (message + data + totalElements) | None | ✅ PUBLIC — All active reward options |
| 11 | Reward Service | RewardController | GET | `/api/rewards/{id}` | Path: id (Long) | `Map<String, Object>` (message + data) | None | NOT USED DIRECTLY |
| 12 | Reward Service | RewardController | GET | `/api/rewards/card/{cardId}` | Path: cardId (Long) | `Map<String, Object>` (message + data + totalElements) | None | ✅ PUBLIC — Rewards by card |
| 13 | Reward Service | RewardController | PUT | `/api/rewards/{id}` | Path: id; Body: `UpdateRewardRequestDto` | `Map<String, Object>` (message + data) | Same as CreateRewardRequestDto | NOT USED (Admin) |
| 14 | Reward Service | RewardController | DELETE | `/api/rewards/{id}` | Path: id (Long) | `Map<String, String>` (message) | None | NOT USED (Admin) |

### 4.4 Recommendation Service Endpoints

| # | Service | Controller | Method | Endpoint | Request DTO | Response DTO | Validation | Frontend Usage |
|---|---------|-----------|--------|----------|-------------|--------------|------------|----------------|
| 15 | Recommendation Service | RecommendationController | POST | `/api/recommendations` | `RecommendationRequestDto` | `Map<String, Object>` (message + data) | cardId: @NotNull; availablePoints: @NotNull, @Min(1); categoryFilter: optional (String) | ✅ PUBLIC — Core recommendation |
| 16 | Recommendation Service | RecommendationController | GET | `/api/recommendations/dashboard` | Query: cardId (Long, required), availablePoints (Integer, required) | `Map<String, Object>` (message + data) | None (manual validation) | ✅ PUBLIC — Dashboard summary |
| 17 | Recommendation Service | RecommendationController | GET | `/api/recommendations/health` | None | `Map<String, Object>` (status + service + message) | None | NOT USED (Infrastructure) |

### 4.5 Health/Infrastructure Endpoints

| # | Service | Method | Endpoint | Notes |
|---|---------|--------|----------|-------|
| 18 | Auth Service | GET | `/actuator/health` | Spring Actuator, permitted without auth |
| 19 | Card Service | GET | `/actuator/health` | Spring Actuator |
| 20 | Reward Service | GET | `/actuator/health` | Spring Actuator |
| 21 | Recommendation Service | GET | `/actuator/health` | Spring Actuator |
| 22 | API Gateway | GET | `/actuator/health` | Spring Actuator |
| 23 | API Gateway | GET | `/actuator/gateway` | Gateway routes info |

---

## 5. API Classification

### 5.1 Classification Matrix

| # | Endpoint | Classification | Rationale | Frontend Consumes? |
|---|----------|---------------|-----------|-------------------|
| 1 | POST /api/auth/register | **Auth API** | User registration, JWT-based | ❌ No (MVP) |
| 2 | POST /api/auth/login | **Auth API** | User login, JWT token return | ❌ No (MVP) |
| 3 | POST /api/cards | **Admin API** | CRUD for card catalog management | ❌ No |
| 4 | GET /api/cards | **Public Frontend API** | List all active cards | ✅ Yes |
| 5 | GET /api/cards/{id} | **Public Frontend API** | Get card details | ✅ Yes |
| 6 | PUT /api/cards/{id} | **Admin API** | Update card catalog | ❌ No |
| 7 | DELETE /api/cards/{id} | **Admin API** | Soft delete card | ❌ No |
| 8 | GET /api/cards/search | **Public Frontend API** | Search/filter cards | ✅ Yes |
| 9 | POST /api/rewards | **Admin API** | Create reward option | ❌ No |
| 10 | GET /api/rewards | **Public Frontend API** | List all active reward options | ✅ Yes (optional) |
| 11 | GET /api/rewards/{id} | **Internal Service API** | Used by Recommendation Service | ❌ No |
| 12 | GET /api/rewards/card/{cardId} | **Internal Service API** | Used by Recommendation Service via Feign | ❌ No |
| 13 | PUT /api/rewards/{id} | **Admin API** | Update reward option | ❌ No |
| 14 | DELETE /api/rewards/{id} | **Admin API** | Soft delete reward option | ❌ No |
| 15 | POST /api/recommendations | **Public Frontend API** | Core recommendation engine | ✅ Yes |
| 16 | GET /api/recommendations/dashboard | **Public Frontend API** | Dashboard summary | ✅ Yes |
| 17 | GET /api/recommendations/health | **Health/Infrastructure** | Service health check | ❌ No |
| 18-23 | GET /actuator/** | **Health/Infrastructure** | Spring Actuator endpoints | ❌ No |

### 5.2 Frontend API Dependency Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     FRONTEND API DEPENDENCY MAP                              │
│                                                                             │
│  PHASE 1 (Marketing Site) — ZERO API calls                                  │
│  ┌─────────────────────────────────────────────────────┐                   │
│  │ Landing Page: Static content only                    │                   │
│  │ All sections: Hardcoded data, no fetch calls         │                   │
│  └─────────────────────────────────────────────────────┘                   │
│                                                                             │
│  PHASE 2 (Application) — 4 API calls                                        │
│                                                                             │
│  SearchPage                                                                 │
│  ┌─────────────────────────────────────────────────────┐                   │
│  │ GET /api/cards           → Load all cards            │                   │
│  │ GET /api/cards/search    → Filter by bank/network    │                   │
│  └─────────────────────────────────────────────────────┘                   │
│                                                                             │
│  PointsPage                                                                 │
│  ┌─────────────────────────────────────────────────────┐                   │
│  │ (No API calls — client-side input only)              │                   │
│  └─────────────────────────────────────────────────────┘                   │
│                                                                             │
│  ResultsPage                                                                │
│  ┌─────────────────────────────────────────────────────┐                   │
│  │ POST /api/recommendations → Core recommendations    │                   │
│  │ GET /api/recommendations/dashboard → Summary stats  │                   │
│  └─────────────────────────────────────────────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. DTO Analysis

### 6.1 Auth Service DTOs

#### LoginRequestDto (NOT USED IN MVP)

| Field | Type | Required | Validation | Example |
|-------|------|----------|------------|---------|
| `email` | String | Yes | @NotBlank, @Email | `"user@example.com"` |
| `password` | String | Yes | @NotBlank | `"SecurePass123"` |

**Example Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

#### RegisterRequestDto (NOT USED IN MVP)

| Field | Type | Required | Validation | Example |
|-------|------|----------|------------|---------|
| `firstName` | String | Yes | @NotBlank, @Size(2-50) | `"John"` |
| `lastName` | String | Yes | @NotBlank, @Size(2-50) | `"Doe"` |
| `email` | String | Yes | @NotBlank, @Email | `"user@example.com"` |
| `password` | String | Yes | @NotBlank, @Size(min=8) | `"SecurePass123"` |
| `phoneNumber` | String | No | @Pattern(`^\+?[0-9]{10,15}$`) | `"+919876543210"` |

#### AuthResponseDto (NOT USED IN MVP)

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `token` | String | Yes | `"eyJhbGciOiJIUzI1NiIs..."` |

---

### 6.2 Card Service DTOs

#### CreateCardRequestDto (Admin Only)

| Field | Type | Required | Validation | Example |
|-------|------|----------|------------|---------|
| `cardName` | String | Yes | @NotBlank, @Size(2-150) | `"HDFC Regalia"` |
| `bankName` | String | Yes | @NotBlank, @Size(2-150) | `"HDFC Bank"` |
| `network` | Network (enum) | Yes | @NotNull | `"VISA"` |
| `rewardType` | RewardType (enum) | Yes | @NotNull | `"REWARD_POINTS"` |
| `annualFee` | BigDecimal | Yes | @NotNull, @DecimalMin("0.0") | `5000.00` |
| `joiningFee` | BigDecimal | Yes | @NotNull, @DecimalMin("0.0") | `10000.00` |

**Network enum values:** `VISA`, `MASTERCARD`, `RUPAY`, `AMEX`
**RewardType enum values:** `CASHBACK`, `REWARD_POINTS`, `AIR_MILES`, `HOTEL_POINTS`

#### CardResponseDto (Public)

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `id` | Long | Yes | `1` |
| `cardName` | String | Yes | `"HDFC Regalia"` |
| `bankName` | String | Yes | `"HDFC Bank"` |
| `network` | Network (enum) | Yes | `"VISA"` |
| `rewardType` | RewardType (enum) | Yes | `"REWARD_POINTS"` |
| `annualFee` | BigDecimal | Yes | `5000.00` |
| `joiningFee` | BigDecimal | Yes | `10000.00` |
| `active` | Boolean | Yes | `true` |
| `createdAt` | LocalDateTime | Yes | `"2026-08-25T10:30:00"` |
| `updatedAt` | LocalDateTime | Yes | `"2026-08-25T10:30:00"` |

**Example Response (wrapped):**
```json
{
  "message": "Card retrieved successfully",
  "data": {
    "id": 1,
    "cardName": "HDFC Regalia",
    "bankName": "HDFC Bank",
    "network": "VISA",
    "rewardType": "REWARD_POINTS",
    "annualFee": 5000.00,
    "joiningFee": 10000.00,
    "active": true,
    "createdAt": "2026-08-25T10:30:00",
    "updatedAt": "2026-08-25T10:30:00"
  }
}
```

---

### 6.3 Reward Service DTOs

#### CreateRewardRequestDto (Admin Only)

| Field | Type | Required | Validation | Example |
|-------|------|----------|------------|---------|
| `cardId` | Long | Yes | @NotNull | `1` |
| `redemptionCategory` | RedemptionCategory (enum) | Yes | @NotNull | `"FLIGHT"` |
| `conversionFormula` | String | No | @Size(max=500) | `"5000 points = ₹250 Amazon voucher"` |
| `valuePerPoint` | BigDecimal | Yes | @NotNull, @DecimalMin("0.0") | `0.2500` |
| `minimumRedemption` | BigDecimal | Yes | @NotNull, @DecimalMin("0.0") | `1000.00` |
| `transferPartner` | String | No | @Size(max=150) | `"Singapore Airlines KrisFlyer"` |
| `transferRatio` | BigDecimal | No | @DecimalMin("0.0") | `2.0000` |
| `priorityRank` | Integer | Yes | @NotNull, @Min(1) | `1` |
| `recommendedFlag` | Boolean | No | default: false | `true` |

**RedemptionCategory enum values:** `FLIGHT`, `HOTEL`, `STATEMENT_CREDIT`, `VOUCHER`, `MERCHANDISE`, `AIR_MILES_TRANSFER`, `HOTEL_POINTS_TRANSFER`, `FUEL`, `OTHER`

#### RewardResponseDto (Internal — used by Recommendation Service via Feign)

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `id` | Long | Yes | `1` |
| `cardId` | Long | Yes | `1` |
| `redemptionCategory` | RedemptionCategory (enum) | Yes | `"FLIGHT"` |
| `conversionFormula` | String | No | `"5000 points = ₹250 voucher"` |
| `valuePerPoint` | BigDecimal | Yes | `0.2500` |
| `minimumRedemption` | BigDecimal | Yes | `1000.00` |
| `transferPartner` | String | No | `"Singapore Airlines KrisFlyer"` |
| `transferRatio` | BigDecimal | No | `2.0000` |
| `priorityRank` | Integer | Yes | `1` |
| `recommendedFlag` | Boolean | Yes | `true` |
| `active` | Boolean | Yes | `true` |
| `createdAt` | LocalDateTime | Yes | `"2026-08-25T10:30:00"` |
| `updatedAt` | LocalDateTime | Yes | `"2026-08-25T10:30:00"` |

---

### 6.4 Recommendation Service DTOs

#### RecommendationRequestDto (Public)

| Field | Type | Required | Validation | Example |
|-------|------|----------|------------|---------|
| `cardId` | Long | Yes | @NotNull | `1` |
| `availablePoints` | Integer | Yes | @NotNull, @Min(1) | `50000` |
| `categoryFilter` | String | No | None (case-insensitive string match) | `"FLIGHT"` |

**Example Request:**
```json
{
  "cardId": 1,
  "availablePoints": 50000,
  "categoryFilter": null
}
```

#### RecommendationResponseDto (Public)

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `cardId` | Long | Yes | `1` |
| `cardName` | String | Yes | `"HDFC Regalia"` |
| `bankName` | String | Yes | `"HDFC Bank"` |
| `network` | String | Yes | `"VISA"` |
| `rewardType` | String | Yes | `"REWARD_POINTS"` |
| `availablePoints` | Integer | Yes | `50000` |
| `totalEstimatedValue` | BigDecimal | Yes | `12500.00` |
| `bestRecommendation` | RedemptionOptionDto | No (null if no eligible) | See below |
| `recommendations` | List\<RedemptionOptionDto\> | Yes | `[...]` |
| `ineligibleOptions` | List\<RedemptionOptionDto\> | Yes | `[...]` |
| `generatedAt` | LocalDateTime | Yes | `"2026-08-25T10:30:00"` |

**Example Response (wrapped):**
```json
{
  "message": "Recommendations generated successfully",
  "data": {
    "cardId": 1,
    "cardName": "HDFC Regalia",
    "bankName": "HDFC Bank",
    "network": "VISA",
    "rewardType": "REWARD_POINTS",
    "availablePoints": 50000,
    "totalEstimatedValue": 12500.00,
    "bestRecommendation": {
      "id": 5,
      "name": "5000 points = ₹250 Amazon voucher",
      "category": "FLIGHT",
      "valuePerPoint": 0.2500,
      "pointsRequired": 1000,
      "estimatedValue": 12500.00,
      "minimumRedemption": 1000.00,
      "conversionFormula": "5000 points = ₹250 Amazon voucher",
      "transferPartner": null,
      "rank": 1,
      "isRecommended": true,
      "isEligible": true,
      "ineligibilityReason": null
    },
    "recommendations": [...],
    "ineligibleOptions": [...],
    "generatedAt": "2026-08-25T10:30:00"
  }
}
```

#### RedemptionOptionDto (Public — within RecommendationResponseDto)

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `id` | Long | Yes | `5` |
| `name` | String | Yes | `"5000 points = ₹250 Amazon voucher"` |
| `category` | String | Yes | `"FLIGHT"` |
| `valuePerPoint` | BigDecimal | Yes | `0.2500` |
| `pointsRequired` | Integer | Yes | `1000` |
| `estimatedValue` | BigDecimal | Yes | `12500.00` |
| `minimumRedemption` | BigDecimal | Yes | `1000.00` |
| `conversionFormula` | String | Yes | `"5000 points = ₹250 Amazon voucher"` |
| `transferPartner` | String | No | `"Singapore Airlines KrisFlyer"` |
| `rank` | Integer | Yes | `1` |
| `isRecommended` | Boolean | Yes | `true` |
| `isEligible` | Boolean | Yes | `true` |
| `ineligibilityReason` | String | No | `"Need 5000 more points (minimum redemption: 10000 points)"` |

#### DashboardResponseDto (Public)

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `cardId` | Long | Yes | `1` |
| `cardName` | String | Yes | `"HDFC Regalia"` |
| `bankName` | String | Yes | `"HDFC Bank"` |
| `network` | String | Yes | `"VISA"` |
| `rewardType` | String | Yes | `"REWARD_POINTS"` |
| `totalAvailablePoints` | Integer | Yes | `50000` |
| `estimatedMaxValue` | BigDecimal | Yes | `12500.00` |
| `averageValuePerPoint` | BigDecimal | Yes | `0.1500` |
| `totalRedemptionOptions` | Integer | Yes | `12` |
| `eligibleOptions` | Integer | Yes | `10` |
| `bestOption` | RedemptionOptionDto | No | See above |
| `generatedAt` | LocalDateTime | Yes | `"2026-08-25T10:30:00"` |

---

## 7. Frontend Data Contracts

### 7.1 TypeScript Interface Specifications

> **Note:** These are type definitions only. No implementation code.

```typescript
// ============================================================
// ENUMS — Matching backend Java enums exactly
// ============================================================

type Network = 'VISA' | 'MASTERCARD' | 'RUPAY' | 'AMEX';

type RewardType = 'CASHBACK' | 'REWARD_POINTS' | 'AIR_MILES' | 'HOTEL_POINTS';

type RedemptionCategory =
  | 'FLIGHT'
  | 'HOTEL'
  | 'STATEMENT_CREDIT'
  | 'VOUCHER'
  | 'MERCHANDISE'
  | 'AIR_MILES_TRANSFER'
  | 'HOTEL_POINTS_TRANSFER'
  | 'FUEL'
  | 'OTHER';

// ============================================================
// API RESPONSE WRAPPER
// ============================================================

interface ApiResponse<T> {
  message: string;
  data: T;
}

interface ApiResponseList<T> {
  message: string;
  data: T[];
  totalElements: number;
}

interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  details?: Record<string, string>;
}

// ============================================================
// CARD SERVICE CONTRACTS
// ============================================================

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

// ============================================================
// REWARD SERVICE CONTRACTS
// ============================================================

interface RewardResponse {
  id: number;
  cardId: number;
  redemptionCategory: RedemptionCategory;
  conversionFormula: string | null;
  valuePerPoint: number;
  minimumRedemption: number;
  transferPartner: string | null;
  transferRatio: number | null;
  priorityRank: number;
  recommendedFlag: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// RECOMMENDATION SERVICE CONTRACTS
// ============================================================

interface RecommendationRequest {
  cardId: number;
  availablePoints: number;
  categoryFilter?: string | null;
}

interface RedemptionOption {
  id: number;
  name: string;
  category: string;
  valuePerPoint: number;
  pointsRequired: number;
  estimatedValue: number;
  minimumRedemption: number;
  conversionFormula: string;
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
  totalEstimatedValue: number;
  bestRecommendation: RedemptionOption | null;
  recommendations: RedemptionOption[];
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

// ============================================================
// DOMAIN TYPES (Frontend-specific)
// ============================================================

type FlowStep = 'landing' | 'search' | 'points' | 'results';

interface FlowState {
  step: FlowStep;
  selectedCard: CardResponse | null;
  points: number | null;
}

// ============================================================
// CARD SEARCH FILTER (Client-side)
// ============================================================

interface CardSearchFilters {
  bankName?: string;
  network?: Network;
  rewardType?: RewardType;
}
```

### 7.2 Data Contract Mapping

| Frontend Interface | Backend Source | Mapping Notes |
|-------------------|---------------|---------------|
| `CardResponse` | `card-service/.../dto/response/CardResponseDto.java` | Direct 1:1 mapping |
| `RewardResponse` | `reward-service/.../dto/response/RewardResponseDto.java` | Direct 1:1 mapping |
| `RecommendationRequest` | `recommendation-service/.../dto/request/RecommendationRequestDto.java` | Direct 1:1 mapping |
| `RecommendationResponse` | `recommendation-service/.../dto/response/RecommendationResponseDto.java` | Direct 1:1 mapping |
| `RedemptionOption` | `recommendation-service/.../dto/response/RedemptionOptionDto.java` | Direct 1:1 mapping |
| `DashboardResponse` | `recommendation-service/.../dto/response/DashboardResponseDto.java` | Direct 1:1 mapping |

---

## 8. Frontend Feature Mapping

### 8.1 Feature-to-API Matrix

| Frontend Feature | APIs Consumed | Data Source | Notes |
|-----------------|---------------|-------------|-------|
| **Landing Page** | None | Static content | Phase 1 — zero API calls |
| **Card Search** | GET /api/cards, GET /api/cards/search | Card Service | Client-side filtering preferred |
| **Card Selection** | GET /api/cards/{id} | Card Service | Optional — data already from search |
| **Points Entry** | None | User input | Client-side only |
| **Estimated Value Preview** | None | Client-side calculation | Uses average VPP from local data |
| **Get Recommendations** | POST /api/recommendations | Recommendation Service | Core feature |
| **Dashboard Summary** | GET /api/recommendations/dashboard | Recommendation Service | Optional enhancement |
| **Category Filter** | POST /api/recommendations (categoryFilter param) | Recommendation Service | Backend supports it |

### 8.2 Feature Availability by Phase

| Feature | Phase 1 | Phase 2 |
|---------|---------|---------|
| Marketing landing page | ✅ | ✅ |
| Card search & selection | ❌ | ✅ |
| Points input | ❌ | ✅ |
| Recommendation display | ❌ | ✅ |
| Dashboard view | ❌ | ✅ (optional) |
| Category filtering | ❌ | ✅ |
| Auth/Login | ❌ | ❌ (future) |
| User profile | ❌ | ❌ (future) |

---

## 9. Page Inventory

### 9.1 Page Registry

| # | Page | Route | Purpose | APIs Consumed | Components Required | User Actions |
|---|------|-------|---------|---------------|--------------------|--------------| 
| 1 | **Landing Page** | `/` | Marketing page with value proposition, social proof, and CTA | None | Navbar, HeroSection, StatsBar, HowItWorksSection, BenefitsSection, ActionPreviewSection, TestimonialsSection, FAQSection, CTASection, Footer | Click CTA → navigate to `/search` |
| 2 | **Search Page** | `/search` | Search and select a credit card from the catalog | GET /api/cards, GET /api/cards/search | SearchBar, FilterChips, CardGrid, CardResultItem, SelectedCardPreview, StepIndicator, LoadingSkeleton, EmptyState | Type to search, filter by network/rewardType, select card → navigate to `/points` |
| 3 | **Points Page** | `/points` | Enter available reward point balance for selected card | None (client-side) | SelectedCardDisplay, PointsInput, QuickAmountChips, EstimatedValuePreview, StepIndicator | Enter points, click quick chip, click "Find Best Redemption" → navigate to `/results` |
| 4 | **Results Page** | `/results` | Display ranked redemption recommendations | POST /api/recommendations, GET /api/recommendations/dashboard | SummaryBanner, RecommendationCard, RankBadge, AllOptionsTable, SortControls, FilterControls, StepIndicator, ErrorState | View recommendations, sort/filter table, "Edit Points" → back to `/points`, "New Search" → reset to `/search` |
| 5 | **Not Found Page** | `/404`, `*` | 404 error page | None | ErrorIllustration, Button | Click "Go Home" → navigate to `/` |

### 9.2 Page Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PAGE FLOW DIAGRAM                                    │
│                                                                             │
│  ┌──────────────┐                                                          │
│  │              │                                                          │
│  │  / (Landing) │──── CTA Click ────┐                                      │
│  │              │                    │                                      │
│  └──────────────┘                    │                                      │
│                                      ▼                                      │
│  ┌──────────────┐     ┌──────────────────────┐                             │
│  │              │     │                      │                             │
│  │  /404        │◄────│    /search           │                             │
│  │  (Not Found) │     │                      │                             │
│  └──────────────┘     │  Search + Filter     │                             │
│                       │  Card Selection      │                             │
│                       │                      │                             │
│                       │  Card Selected ──────┤                             │
│                       └──────────────────────┘                             │
│                              │                                              │
│                              ▼                                              │
│               ┌──────────────────────┐                                     │
│               │                      │                                     │
│               │    /points           │                                     │
│               │                      │                                     │
│               │  Points Input        │                                     │
│               │  Quick Chips         │                                     │
│               │  Est. Value Preview  │                                     │
│               │                      │                                     │
│               │  Submit ─────────────┤                                     │
│               └──────────────────────┘                                     │
│                              │                                              │
│                              ▼                                              │
│               ┌──────────────────────┐                                     │
│               │                      │                                     │
│               │   /results           │                                     │
│               │                      │                                     │
│               │  Summary Banner      │                                     │
│               │  Top Recommendations │                                     │
│               │  All Options Table   │                                     │
│               │                      │                                     │
│               │  Edit Points ────────┤ (back to /points)                   │
│               │  New Search ─────────┤ (back to /search)                   │
│               └──────────────────────┘                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 9.3 Route Guards

| Guard | Description | Implementation |
|-------|-------------|----------------|
| **Points Guard** | `/points` requires a selected card in FlowContext; redirects to `/search` if absent | Check `FlowState.selectedCard !== null` |
| **Results Guard** | `/results` requires both selected card and points; redirects to `/search` if absent | Check `FlowState.selectedCard !== null && FlowState.points > 0` |
| **Completion Guard** | `/search` and `/points` redirect to `/results` if all data is already available | Check both card and points exist |

---

## 10. Component Inventory

### 10.1 Shared UI Components

| # | Component | Category | Variants | Key Props | Purpose |
|---|-----------|----------|----------|-----------|---------|
| 1 | **Button** | Primitive | `primary`, `secondary`, `ghost` | `variant`, `size`, `disabled`, `loading`, `onClick`, `children` | Interactive trigger |
| 2 | **Input** | Primitive | `default`, `error`, `disabled` | `label`, `error`, `placeholder`, `value`, `onChange`, `type` | Text/number input |
| 3 | **Card** | Primitive | `default`, `selected`, `hoverable` | `selected`, `onClick`, `children` | Container wrapper |
| 4 | **Badge** | Primitive | `category`, `rank`, `status` | `variant`, `children` | Inline label |
| 5 | **LoadingSpinner** | Feedback | `sm`, `md`, `lg` | `size`, `color` | Loading indicator |
| 6 | **SkeletonLoader** | Feedback | `card`, `text`, `circle`, `table-row` | `variant`, `count` | Content placeholder |
| 7 | **EmptyState** | Feedback | — | `icon`, `title`, `description`, `action` | No-data display |
| 8 | **ErrorState** | Feedback | — | `message`, `onRetry` | Error display |
| 9 | **Toast** | Feedback | `success`, `error`, `warning`, `info` | `type`, `message`, `duration` | Notification |
| 10 | **Modal** | Feedback | — | `isOpen`, `onClose`, `title`, `children` | Overlay dialog |
| 11 | **StepIndicator** | Layout | — | `currentStep`, `steps` | Progress visualization |
| 12 | **Container** | Layout | `sm`, `md`, `lg`, `xl` | `maxWidth`, `children` | Content width wrapper |
| 13 | **SectionHeader** | Layout | `center`, `left` | `badgeText`, `titleText`, `subtitleText`, `align` | Section title block |

### 10.2 Landing Page Components

| # | Component | Purpose | Key Props |
|---|-----------|---------|-----------|
| 14 | **Navbar** | Top navigation with logo, links, CTA | `logoText`, `navLinks`, `ctaButton` |
| 15 | **HeroSection** | Hero fold with headline, subhead, CTAs, trust indicators | `headline`, `subhead`, `ctaText`, `onCtaClick` |
| 16 | **StatsBar** | 4-column statistics bar | `stats: Array<{value, label}>` |
| 17 | **HowItWorksSection** | 3-step process cards | `steps: Array<{number, icon, title, description}>` |
| 18 | **BenefitsSection** | 3-column benefit cards | `benefits: Array<{icon, title, description}>` |
| 19 | **ActionPreviewSection** | Interactive dashboard preview with narrative | `features`, `dashboardData` |
| 20 | **TestimonialsSection** | 3-column testimonial cards | `testimonials: Array<{rating, quote, author}>` |
| 21 | **FAQSection** | Collapsible FAQ accordion | `faqs: Array<{question, answer}>` |
| 22 | **CTABanner** | Final dark-themed CTA block | `badgeText`, `titleText`, `buttonText` |
| 23 | **Footer** | Bottom legal/attribution bar | `links`, `attribution` |

### 10.3 Visual/Mockup Components

| # | Component | Purpose | Key Props |
|---|-----------|---------|-----------|
| 24 | **CreditCardMockup** | Hero visual card illustration | `bankName`, `cardModel`, `floatingBadges` |
| 25 | **RecommendationDashboardMockup** | Static preview of recommendation UI | `cardName`, `availablePoints`, `rows` |

### 10.4 Application Page Components

| # | Component | Purpose | Key Props |
|---|-----------|---------|-----------|
| 26 | **SearchBar** | Text input with debounce for card search | `value`, `onChange`, `placeholder` |
| 27 | **FilterChips** | Network/reward type filter chips | `filters`, `activeFilter`, `onFilterChange` |
| 28 | **CardResultItem** | Selectable card in search results | `card: CardResponse`, `selected`, `onSelect` |
| 29 | **SelectedCardDisplay** | Card display on Points page | `card: CardResponse`, `onChangeCard` |
| 30 | **PointsInput** | Number input with comma formatting | `value`, `onChange`, `error` |
| 31 | **QuickAmountChips** | Preset point amount buttons | `amounts`, `activeAmount`, `onSelect` |
| 32 | **EstimatedValuePreview** | Value range display | `minValue`, `maxValue`, `points` |
| 33 | **SummaryBanner** | Results page top stats | `points`, `bestValue`, `topVpp` |
| 34 | **RecommendationCard** | Ranked recommendation display | `option: RedemptionOption`, `isTop` |
| 35 | **RankBadge** | Rank indicator (#1, #2, #3) | `rank: number` |
| 36 | **AllOptionsTable** | Sortable/filterable options table | `options`, `sortField`, `filterCategory` |
| 37 | **CategoryBadge** | Category color badge | `category: string` |

### 10.5 Utility Components

| # | Component | Purpose | Key Props |
|---|-----------|---------|-----------|
| 38 | **CurrencyFormatter** | INR currency display | `value: number` |
| 39 | **PointsFormatter** | Comma-formatted points display | `value: number` |
| 40 | **AnimatedNumber** | Number count-up animation | `value: number`, `duration` |

---

## 11. Phase 1 Development Plan

### 11.1 Scope

Phase 1 delivers the **Marketing Landing Page** — a fully responsive, visually premium single-page marketing site that strictly follows the `REDEEMWISE_UI_DESIGN_SPEC.md`.

**No API integration. No authentication. No business logic.**

### 11.2 Page Structure (10 Sections)

Based on `REDEEMWISE_UI_DESIGN_SPEC.md` Section 2:

| # | Section | Component | Priority | Est. Hours |
|---|---------|-----------|----------|------------|
| 1 | Navigation Bar | `Navbar` | High | 3 |
| 2 | Hero Section | `HeroSection` + `CreditCardMockup` + `TrustIndicators` | High | 5 |
| 3 | Statistics Bar | `StatsBar` | High | 2 |
| 4 | How It Works | `HowItWorksSection` + 3× `StepCard` | High | 4 |
| 5 | Benefits | `BenefitsSection` + 3× `FeatureCard` | High | 4 |
| 6 | Action Preview | `ActionPreviewSection` + `RecommendationDashboardMockup` | High | 5 |
| 7 | Testimonials | `TestimonialsSection` + 3× `TestimonialCard` | Medium | 3 |
| 8 | FAQ | `FAQSection` + `FAQAccordionItem` | Medium | 3 |
| 9 | Final CTA | `CTABanner` | High | 1.5 |
| 10 | Footer | `Footer` | Medium | 1 |

**Phase 1 Total Estimated Hours: 31.5 hours (5-7 working days)**

### 11.3 Design System Requirements

From `REDEEMWISE_UI_DESIGN_SPEC.md`:

**Colors (Exact Values):**

| Token | HEX | Usage |
|-------|-----|-------|
| Primary Teal | `#14B8A6` | Buttons, active states, step badges, checkmarks |
| Primary Teal Dark | `#0D9488` | Button hover/active |
| Primary Teal Light | `#F0FDFA` | Highlighted rows, badge fills |
| Dark Slate/Navy | `#0F172A` | Headings, dark CTA bg |
| Dark Navy Surface | `#1E293B` | Card mockup container |
| Pure White | `#FFFFFF` | Page body, card bg |
| Off-White | `#F8FAFC` | Stats strip bg |
| Slate Muted Light | `#F1F5F9` | Icon container bg |
| Deep Midnight Navy | `#0A1128` | Final CTA section |
| Pure Black | `#000000` | Footer bar |
| Text Primary | `#0F172A` | Headings |
| Text Secondary | `#475569` | Body copy |
| Text Muted | `#64748B` | Captions, metadata |
| Border Default | `#E2E8F0` | Card borders, dividers |
| Success Emerald | `#10B981` | Checkmarks, positive values |
| Gold/Amber | `#FBBF24` | Star ratings, highlight pill |
| Soft Sky Blue | `#E0F2FE` | Icon container bg |
| Soft Amber Tint | `#FEF3C7` | Step 3 icon bg |

**Typography:**

| Role | Font Family | Size (Desktop) | Weight |
|------|-------------|---------------|--------|
| Hero H1 | Editorial Serif (Playfair Display) | 56-64px | Bold (700) |
| Section H2 | Editorial Serif | 36-40px | Bold (700) |
| Card H3 | Sans-Serif (Inter) | 20-22px | SemiBold (600) |
| Body | Sans-Serif (Inter) | 15-16px | Regular (400) |
| Button | Sans-Serif (Inter) | 14-15px | SemiBold (600) |
| Pre-Heading Badge | Sans-Serif (Inter) | 12-14px | Bold (700) |
| Stat Numbers | Sans-Serif (Inter) | 40-48px | ExtraBold (800) |

**Critical:** Headings MUST use editorial serif font. Body MUST use sans-serif.

**Spacing:**

| Context | Value |
|---------|-------|
| Content max-width | 1200px |
| Section vertical padding | 80-96px |
| Card padding | 28-32px |
| Grid gap (3-column) | 24-32px |
| Navbar height | 72-80px |
| Footer height | 56-64px |
| Screen gutter (desktop) | 32px |
| Screen gutter (mobile) | 16px |

**Card System:**

| Card Type | Border Radius | Border | Shadow |
|-----------|---------------|--------|--------|
| Step/Feature Card | 20-24px | 1px solid #E2E8F0 | `0 4px 20px -2px rgba(15, 23, 42, 0.04)` |
| Dashboard Preview | 24-28px | 1px solid #E2E8F0 | `0 10px 30px -4px rgba(15, 23, 42, 0.08)` |
| Testimonial Card | 20-24px | 1px solid #E2E8F0 | Same as Step Card |
| FAQ Item | 16px | 1px solid #E2E8F0 | None |

### 11.4 Static Data Content

All content for Phase 1 is stored in `data/landing-content.ts`:

**Stats Bar Data:**
- 50+ Supported Credit Cards
- 100+ Redemption Options
- 10+ Major Banks
- Instant Recommendations

**Step Cards:**
1. STEP 01 — Select Your Credit Card — Find your credit card by bank name
2. STEP 02 — Enter Your Points — Tell us how many reward points you have
3. STEP 03 — Get Best Option — See ranked recommendations with best value

**Benefit Cards:**
1. Maximize Reward Value — Know the real rupee value behind your points
2. Side-by-Side Comparison — Compare redemption options across categories
3. Privacy First — No login, no signup, no data capture required

**Testimonials:**
- Arjun Mehta, Bangalore — "Finally understood the real value of my HDFC Regalia points..."
- Naina Shah, Mumbai — "I was about to redeem 40,000 points for a ₹2,000 voucher..."
- Rohan Kapoor, Delhi — "As a frequent flyer, the flight redemption insights..."

**FAQ Items:** 7 questions covering what RedeemWise is, how it works, login requirements, data safety, supported cards, calculation method, and support.

### 11.5 Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| Mobile (<640px) | Single column, hamburger menu, stacked cards, full-width CTA |
| Tablet (640-1024px) | 2-column grids, inline nav, stacked hero |
| Desktop (>1024px) | 3-column grids, 4-column stats, 2-column hero, max-width 1200px |

### 11.6 Acceptance Criteria

| Criterion | Requirement |
|-----------|-------------|
| **Visual Fidelity** | All 10 sections match REDEEMWISE_UI_DESIGN_SPEC.md exactly |
| **Typography** | Serif headings + sans-serif body (Playfair Display + Inter) |
| **Color Accuracy** | All colors match exact HEX values from spec |
| **Responsive** | Mobile (375px), Tablet (768px), Desktop (1440px) |
| **No API Calls** | Zero fetch/axios calls in Phase 1 |
| **Performance** | Lighthouse Performance > 90 |
| **Accessibility** | ARIA labels, keyboard nav, contrast ratios |
| **Static Data** | All content in `landing-content.ts` data file |

---

## 12. Phase 2 Development Plan

### 12.1 Scope

Phase 2 delivers the **Application Experience** — the interactive card search, points entry, and recommendation results pages with full API integration through the API Gateway.

### 12.2 Pages & Components

#### Page 1: Search Page (`/search`)

| Component | Purpose | API Integration |
|-----------|---------|-----------------|
| `SearchBar` | Text input with 300ms debounce | Triggers card filtering |
| `FilterChips` | Network (VISA/MASTERCARD/RUPAY/AMEX) and RewardType (CASHBACK/REWARD_POINTS/AIR_MILES/HOTEL_POINTS) filters | Client-side filtering |
| `CardResultItem` | Selectable card display | Shows `CardResponse` data |
| `EmptyState` | No search results | — |
| `LoadingSkeleton` | Search loading | While fetching /api/cards |

**Data Flow:**
1. Page loads → fetch `GET /api/cards` → display all active cards
2. User types → debounce 300ms → filter client-side by `bankName` (case-insensitive contains)
3. User clicks filter chip → filter by `network` and/or `rewardType`
4. User clicks card → store in FlowContext → auto-navigate to `/points` after 500ms

**Alternative:** Use `GET /api/cards/search?bankName=X&network=Y&rewardType=Z` for server-side filtering. Recommendation: start with client-side, switch to server-side if card count exceeds 100.

#### Page 2: Points Page (`/points`)

| Component | Purpose | API Integration |
|-----------|---------|-----------------|
| `SelectedCardDisplay` | Shows selected card with "Change Card" link | None |
| `PointsInput` | Number input with comma formatting | None (client-side) |
| `QuickAmountChips` | Preset amounts: 5,000 / 10,000 / 25,000 / 50,000 | None |
| `EstimatedValuePreview` | Shows estimated value range | Client-side calculation |

**Estimated Value Calculation (Client-Side):**
- For preview purposes, use a hardcoded average VPP of ₹0.10
- Min = points × 0.08
- Max = points × 0.15
- Display as: "Estimated Value: ₹{min} - ₹{max}"

**Validation:**
- Points must be > 0
- Points must be a valid integer
- "Find Best Redemption" button disabled when points = 0 or empty

#### Page 3: Results Page (`/results`)

| Component | Purpose | API Integration |
|-----------|---------|-----------------|
| `SummaryBanner` | Top stats bar | Data from POST /api/recommendations |
| `RecommendationCard` | Ranked recommendation display | `RecommendationResponse.recommendations` |
| `RankBadge` | #1/#2/#3 rank indicator | `RedemptionOption.rank` |
| `AllOptionsTable` | Full sortable/filterable table | All options from response |
| `CategoryBadge` | Color-coded category tag | `RedemptionOption.category` |
| `ErrorState` | API error display | — |

**API Call:**
```
POST /api/recommendations
Body: {
  "cardId": <selectedCard.id>,
  "availablePoints": <points>,
  "categoryFilter": null
}
```

**Optional Dashboard Call:**
```
GET /api/recommendations/dashboard?cardId=<id>&availablePoints=<points>
```

**Data Display:**
- Summary Banner: card name, points, best value, top VPP
- Top 3 Recommendations: highlighted with gold/silver/bronze treatment
- #1 gets "RECOMMENDED" badge, teal border, light teal background
- All Options Table: sortable by VPP, points required, estimated value
- Filter by RedemptionCategory (using the 9 backend enum values)
- Ineligible options shown dimmed with ineligibility reason

### 12.3 State Management

**FlowContext (React Context):**

```typescript
interface FlowContextState {
  step: FlowStep;
  selectedCard: CardResponse | null;
  points: number | null;
}

interface FlowContextActions {
  selectCard: (card: CardResponse) => void;
  setPoints: (points: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetFlow: () => void;
}
```

**Persistence:** Flow state persisted to `localStorage` for page refresh resilience.

**ToastContext (React Context):**

```typescript
interface ToastContextState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}
```

### 12.4 API Integration Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     API INTEGRATION ARCHITECTURE                             │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         SERVICE LAYER                                │   │
│  │                                                                     │   │
│  │  services/                                                          │   │
│  │  ├── apiClient.ts          — Axios instance + interceptors          │   │
│  │  ├── cardService.ts        — getCards(), getCardById(), search()    │   │
│  │  ├── recommendationService.ts — getRecommendations(), getDashboard()│   │
│  │  └── errorHandler.ts       — Global error normalization             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          HOOKS LAYER                                 │   │
│  │                                                                     │   │
│  │  hooks/                                                             │   │
│  │  ├── useFlow.ts            — FlowContext consumer                   │   │
│  │  ├── useSearch.ts          — Debounced card search                  │   │
│  │  ├── useRecommendations.ts — Fetch + cache recommendations         │   │
│  │  ├── useDebounce.ts        — Generic debounce hook                  │   │
│  │  └── useLocalStorage.ts    — localStorage persistence              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        PAGE LAYER                                    │   │
│  │                                                                     │   │
│  │  pages/                                                             │   │
│  │  ├── SearchPage/           — Uses useSearch, cardService            │   │
│  │  ├── PointsPage/           — Uses useFlow (no API)                  │   │
│  │  └── ResultsPage/          — Uses useRecommendations                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 12.5 Error Handling Strategy

| Error Scenario | HTTP Status | Frontend Handling |
|---------------|-------------|-------------------|
| Card not found | 404 | Empty state: "Card not found" |
| No reward options for card | 404 | Empty state: "No redemption options available" |
| Validation error | 400 | Inline field errors from `details` map |
| Service unavailable (Feign) | 502 | Toast: "Service temporarily unavailable. Please try again." |
| Network error | — | Full-page error state with retry button |
| Rate limit | 429 | Toast: "Too many requests. Please wait a moment." |
| Generic server error | 500 | Error state: "Something went wrong" with retry |

### 12.6 Loading States

| Context | Indicator |
|---------|-----------|
| Search page initial load | 3-4 card skeleton grid |
| Search typing (debounced) | Existing results remain visible |
| Points page | None (no API calls) |
| Results page API call | 3 recommendation card skeletons |
| Results page API call | Table row skeletons |
| Button actions | Spinner + "Loading..." text |

### 12.7 Environment Configuration

```env
# .env.development
VITE_API_BASE_URL=http://localhost:8080

# .env.staging
VITE_API_BASE_URL=https://api-staging.redeemwise.com

# .env.production
VITE_API_BASE_URL=https://api.redeemwise.com
```

### 12.8 Acceptance Criteria

| Criterion | Requirement |
|-----------|-------------|
| **Card Search** | User can search cards by bank name with debounced input |
| **Card Filter** | User can filter by Network and RewardType |
| **Card Selection** | Selected card persists across page navigations |
| **Points Input** | Points input with comma formatting and validation |
| **Recommendations** | POST /api/recommendations returns ranked options |
| **Best Value** | #1 recommendation highlighted with gold treatment |
| **All Options** | Full sortable/filterable table of all options |
| **Ineligible** | Options below minimum redemption shown with reason |
| **Error Handling** | All failure scenarios handled gracefully |
| **Loading** | Skeleton loaders for all async operations |
| **Responsive** | Works on 375px, 768px, 1280px, 1440px |
| **State Persistence** | Flow state survives page refresh (localStorage) |
| **Back Navigation** | Edit Points → /points, New Search → /search |
| **API Gateway Only** | All requests go through localhost:8080 |

---

## 13. Recommended Frontend Architecture

### 13.1 Folder Structure

```
redeemwise-frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── ui/                          # Shared primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   └── index.ts                # Barrel export
│   │   │
│   │   ├── feedback/                    # Feedback components
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── SkeletonLoader.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/                      # Structural components
│   │   │   ├── Layout.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── StepIndicator.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── landing/                     # Landing page sections
│   │   │   ├── Navbar.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── BenefitsSection.tsx
│   │   │   ├── ActionPreviewSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── CTABanner.tsx
│   │   │   ├── CreditCardMockup.tsx
│   │   │   ├── RecommendationDashboardMockup.tsx
│   │   │   ├── TrustIndicators.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── search/                      # Search page components
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterChips.tsx
│   │   │   ├── CardResultItem.tsx
│   │   │   ├── CardGrid.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── points/                      # Points page components
│   │   │   ├── SelectedCardDisplay.tsx
│   │   │   ├── PointsInput.tsx
│   │   │   ├── QuickAmountChips.tsx
│   │   │   ├── EstimatedValuePreview.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── results/                     # Results page components
│   │       ├── SummaryBanner.tsx
│   │       ├── RecommendationCard.tsx
│   │       ├── RankBadge.tsx
│   │       ├── AllOptionsTable.tsx
│   │       ├── SortControls.tsx
│   │       ├── FilterControls.tsx
│   │       ├── CategoryBadge.tsx
│   │       └── index.ts
│   │
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── PointsPage.tsx
│   │   ├── ResultsPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── hooks/
│   │   ├── useFlow.ts
│   │   ├── useSearch.ts
│   │   ├── useRecommendations.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── useToast.ts
│   │
│   ├── context/
│   │   ├── FlowContext.tsx
│   │   ├── ToastContext.tsx
│   │   └── AppProviders.tsx
│   │
│   ├── services/
│   │   ├── apiClient.ts
│   │   ├── cardService.ts
│   │   ├── recommendationService.ts
│   │   └── errorHandler.ts
│   │
│   ├── types/
│   │   ├── api.ts                      # API response types
│   │   ├── domain.ts                   # Domain model types
│   │   └── index.ts
│   │
│   ├── data/
│   │   └── landing-content.ts          # Static landing page content
│   │
│   ├── utils/
│   │   ├── formatters.ts               # Currency, number formatters
│   │   ├── validators.ts               # Input validators
│   │   └── index.ts
│   │
│   ├── config/
│   │   └── env.ts                      # Environment variables
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .env.development
├── .env.staging
├── .env.production
├── .eslintrc.cjs
├── .prettierrc
└── README.md
```

### 13.2 Routing Structure

```typescript
// App.tsx route definitions
<Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/points" element={<PointsPage />} />
    <Route path="/results" element={<ResultsPage />} />
    <Route path="/404" element={<NotFoundPage />} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </Route>
</Routes>
```

### 13.3 State Management Strategy

| Scope | Mechanism | Purpose |
|-------|-----------|---------|
| **Flow State** | `FlowContext` (React Context + useReducer) | Track selected card, points, current step |
| **Toast State** | `ToastContext` (React Context) | Global notification management |
| **Server State** | Custom hooks (`useSearch`, `useRecommendations`) | API data fetching with loading/error states |
| **Form State** | Local `useState` | Points input, search query |
| **Persistence** | `useLocalStorage` hook | Flow state survives page refresh |
| **URL State** | React Router | Route-based step tracking |

### 13.4 API Layer Strategy

```
apiClient.ts
├── Base URL from env variable
├── Timeout: 10 seconds
├── Request Interceptor: (auth token stub for v2.0)
├── Response Interceptor: Error normalization
└── Error Handler: Toast notifications

cardService.ts
├── getCards(): GET /api/cards → CardResponse[]
├── getCardById(id): GET /api/cards/{id} → CardResponse
└── searchCards(filters): GET /api/cards/search → CardResponse[]

recommendationService.ts
├── getRecommendations(req): POST /api/recommendations → RecommendationResponse
└── getDashboard(cardId, points): GET /api/recommendations/dashboard → DashboardResponse
```

### 13.5 Component Organization Strategy

- **Atomic Design (simplified):** Primitives → Feedback → Layout → Domain → Pages
- **Co-location:** Components used by a single page are in `components/{page}/`
- **Barrel exports:** Each component directory has `index.ts` for clean imports
- **Composition pattern:** Pages compose components; components compose primitives

### 13.6 Reusable Component Strategy

| Component | Reuse Scope | Variants |
|-----------|-------------|----------|
| `Button` | Global | primary, secondary, ghost × sm, md, lg |
| `Input` | Global | default, error, disabled |
| `Card` | Global | default, selected, hoverable |
| `Badge` | Global | category, rank, status |
| `LoadingSpinner` | Global | sm, md, lg |
| `SkeletonLoader` | Global | card, text, circle, table-row |
| `EmptyState` | Global | Single variant with props |
| `ErrorState` | Global | Single variant with retry |
| `Toast` | Global | success, error, warning, info |
| `SectionHeader` | Landing only | center, left |

### 13.7 Error Handling Strategy

| Layer | Mechanism |
|-------|-----------|
| **API Client** | Response interceptor normalizes all errors to `ApiErrorResponse` |
| **Services** | Throw typed errors; return null on non-critical failures |
| **Hooks** | Expose `error` state + `retry` function |
| **Pages** | Render `ErrorState` or `EmptyState` based on hook state |
| **Global** | `ToastContext` for non-blocking error notifications |
| **Boundary** | React ErrorBoundary for unhandled rendering errors |

### 13.8 Environment Variable Strategy

| Variable | Dev | Staging | Production |
|----------|-----|---------|------------|
| `VITE_API_BASE_URL` | `http://localhost:8080` | `https://api-staging.redeemwise.com` | `https://api.redeemwise.com` |
| `VITE_APP_TITLE` | `RedeemWise (Dev)` | `RedeemWise (Staging)` | `RedeemWise` |

All env vars prefixed with `VITE_` for Vite client-side access.

---

## 14. Risks & Gaps

### 14.1 Identified Risks

| # | Risk | Probability | Impact | Mitigation |
|---|------|-------------|--------|------------|
| 1 | **API Gateway CORS misconfiguration** — Gateway allows `http://localhost:3000` but production domain may differ | High | High | Verify CORS config; add production origin to gateway |
| 2 | **No authentication on Card/Reward/Reward endpoints** — Backend has JWT auth configured but no explicit `permitAll()` for card/reward routes in gateway | Medium | High | Verify gateway security filter chain; test without JWT |
| 3 | **Recommendation Service has no database** — Stateless service with Feign clients; if Card or Reward Service is down, recommendations fail with 502 | Medium | High | Implement circuit breaker or graceful fallback UI |
| 4 | **Card search is in-memory only** — `CardRepository` uses Spring Data JPA queries; no full-text search index | Low | Medium | Client-side search sufficient for MVP catalog size |
| 5 | **No pagination on card/reward lists** — Backend returns all records in one response | Low | Medium | Seed data has ~49 cards; acceptable for MVP |
| 6 | **Enum mismatch between documentation and code** — Frontend docs reference `CardType` (PLATINUM/GOLD/SILVER) but backend uses `RewardType` (CASHBACK/REWARD_POINTS/AIR_MILES/HOTEL_POINTS) | High | Medium | **Use backend enums as source of truth** (see Section 15) |

### 14.2 Identified Gaps

| # | Gap | Description | Frontend Impact | Recommendation |
|---|-----|-------------|-----------------|----------------|
| 1 | **No user-specific card storage** | Backend `Card` entity has no `userId` field; cards are a global catalog | MVP: No "My Cards" feature | Accept for MVP; add user-card association in v2.0 |
| 2 | **No reward points storage per user** | Backend `RewardOption` is a catalog, not user-specific points | User must manually enter points every session | Accept for MVP; use localStorage to remember last points |
| 3 | **No dashboard persistence** | `DashboardResponseDto` is computed on-the-fly, not stored | No historical dashboard view | Accept for MVP; compute fresh on each request |
| 4 | **No user profile endpoint** | Auth Service has no `/api/auth/profile` or `/api/auth/me` | Cannot display user info in header | Accept for MVP; no auth in MVP |
| 5 | **No sharing endpoint** | No API for generating shareable recommendation links | Share feature is client-side only | Implement as copy-to-clipboard or URL parameter encoding |
| 6 | **`categoryFilter` is a raw string** | Recommendation endpoint accepts `categoryFilter` as String, not enum | Frontend must send exact enum value | Use RedemptionCategory enum values exactly |

### 14.3 Recommended Mitigations

1. **Test API Gateway without JWT first** — The gateway routes don't appear to enforce JWT for card/reward/recommendation routes. Verify with a curl test before frontend integration.
2. **Implement retry logic** — For Recommendation Service failures (502 from Feign), implement automatic retry with exponential backoff.
3. **Use categoryFilter with exact enum values** — The `categoryFilter` parameter must match `RedemptionCategory` enum values exactly (e.g., `"FLIGHT"`, `"STATEMENT_CREDIT"`).

---

## 15. Documentation vs Backend Discrepancies

### 15.1 Critical Discrepancies

| # | Documentation Claim | Backend Reality | Impact | Resolution |
|---|--------------------|-----------------|--------|-------------|
| 1 | **Card entity has `cardType` (PLATINUM/GOLD/SILVER)** | Card entity has `rewardType` (CASHBACK/REWARD_POINTS/AIR_MILES/HOTEL_POINTS) and `network` (VISA/MASTERCARD/RUPAY/AMEX). There is NO `cardType` field. | Frontend filter chips for "Platinum/Gold/Silver" are INVALID | **Remove card type filters. Use Network and RewardType filters instead.** |
| 2 | **Card entity has `cardNumber`, `rewardProgram`, `expiryDate`** | Card entity has `cardName`, `bankName`, `network`, `rewardType`, `annualFee`, `joiningFee`. No `cardNumber`, `rewardProgram`, or `expiryDate`. | Frontend card display must show different fields | **Show: cardName, bankName, network, rewardType, annualFee** |
| 3 | **API doc shows `GET /api/recommendations` (GET method)** | Backend uses `POST /api/recommendations` with `RecommendationRequestDto` body | Frontend must use POST, not GET | **Use POST with request body** |
| 4 | **API doc shows `GET /api/recommendations/value-per-point`** | This endpoint does NOT exist in backend source code | Feature unavailable | **Remove from frontend plan** |
| 5 | **API doc shows paginated responses (`content`, `page`, `size`)** | Backend returns flat lists with `data` and `totalElements` | Different response parsing | **Parse `data` array directly; use `totalElements` for count** |
| 6 | **API doc shows `GET /api/dashboard`** | Backend uses `GET /api/recommendations/dashboard` with query params `cardId` and `availablePoints` | Different endpoint and params | **Use correct endpoint with query params** |
| 7 | **API doc shows auth required for ALL endpoints** | Backend SecurityConfiguration only secures non-auth routes; gateway routes don't show JWT filter config | Auth may not be enforced | **Test without JWT first; add auth headers later if needed** |
| 8 | **Frontend docs reference `RedemptionCategory: GIFT_CARD, CASHBACK, TRAVEL, DINING`** | Backend `RedemptionCategory` enum: FLIGHT, HOTEL, STATEMENT_CREDIT, VOUCHER, MERCHANDISE, AIR_MILES_TRANSFER, HOTEL_POINTS_TRANSFER, FUEL, OTHER | Category labels don't match | **Use backend enum values for filter options** |
| 9 | **API doc shows `authService.getRecommendations()` returns `rank`, `redemptionOption`, `valuePerPoint`, `isRecommended`, `reason`** | Backend returns `RecommendationResponseDto` with different structure (card info + lists of `RedemptionOptionDto`) | Completely different response shape | **Use actual backend response structure** |
| 10 | **Frontend Architecture doc mentions `GET /api/rewards/options`** | This endpoint does NOT exist. Reward options are at `GET /api/rewards` and `GET /api/rewards/card/{cardId}` | Wrong endpoint reference | **Use `/api/rewards` or `/api/rewards/card/{cardId}`** |

### 15.2 Impact Assessment

The most critical discrepancy is **#1** — the card entity fields. The frontend documentation assumes cards have a "type" (Platinum/Gold/Silver), but the actual backend uses `network` (VISA/Mastercard) and `rewardType` (Cashback/Reward Points/Air Miles/Hotel Points). This fundamentally changes the search and filter UI.

**Frontend pages that MUST change from documentation:**

1. **Search Page:** Filter chips must be Network (VISA/Mastercard/RuPay/Amex) and RewardType (Cashback/Reward Points/Air Miles/Hotel Points), NOT card tier (Platinum/Gold/Silver)
2. **Card Display:** Show cardName, bankName, network, rewardType, annualFee — NOT cardType, cardNumber, rewardProgram
3. **Results Page Category Filter:** Use backend RedemptionCategory enum values (FLIGHT, HOTEL, STATEMENT_CREDIT, etc.) — NOT GIFT_CARD, CASHBACK, TRAVEL, DINING

---

## 16. Implementation Order

### 16.1 Recommended Build Sequence

```
PHASE 1: MARKETING SITE (Days 1-7)
═══════════════════════════════════════

Day 1-2: Project Setup
├── Initialize Vite + React + TypeScript
├── Install Tailwind CSS, React Router, Axios, React Icons
├── Configure custom Tailwind theme (colors, fonts, spacing)
├── Set up project folder structure
├── Create global CSS (font imports, resets)
├── Configure Vite proxy for API Gateway
└── Verify dev server runs

Day 2-3: Shared Primitives
├── Button component (primary, secondary, ghost)
├── Badge component
├── Card component
├── Container component
├── SectionHeader component
└── Landing page data file (landing-content.ts)

Day 3-4: Landing Page — Top Half
├── Navbar (logo, links, CTA)
├── HeroSection (headline, subhead, CTAs, trust indicators)
├── CreditCardMockup (visual illustration)
├── StatsBar (4-column metrics)
└── HowItWorksSection (3 step cards)

Day 4-5: Landing Page — Bottom Half
├── BenefitsSection (3 feature cards)
├── ActionPreviewSection + RecommendationDashboardMockup
├── TestimonialsSection (3 testimonial cards)
├── FAQSection (accordion items)
├── CTABanner (dark-themed CTA)
└── Footer

Day 5-6: Responsive & Polish
├── Mobile responsive (375px)
├── Tablet responsive (768px)
├── Desktop responsive (1440px)
├── Scroll animations (fade-in-up)
├── Hover effects on cards and buttons
└── Typography contrast audit

Day 6-7: Testing & QA
├── Cross-browser testing (Chrome, Firefox, Safari, Edge)
├── Lighthouse audit (target > 90)
├── Accessibility audit (keyboard nav, ARIA, contrast)
├── Final visual review against REDEEMWISE_UI_DESIGN_SPEC.md
└── Fix any discrepancies


PHASE 2: APPLICATION (Days 8-22)
═══════════════════════════════════════

Day 8-9: Foundation
├── FlowContext (state management for user flow)
├── ToastContext (notification system)
├── AppProviders wrapper
├── Layout component (header + content + footer)
├── StepIndicator component
├── NotFoundPage (404)
├── React Router setup with route guards
└── API client (apiClient.ts with interceptors)

Day 9-10: Service Layer & Types
├── TypeScript type definitions (api.ts, domain.ts)
├── cardService.ts (getCards, getCardById, searchCards)
├── recommendationService.ts (getRecommendations, getDashboard)
├── errorHandler.ts
├── useDebounce hook
├── useLocalStorage hook
└── useToast hook

Day 10-12: Search Page
├── SearchPage layout
├── SearchBar component with debounce
├── FilterChips (Network + RewardType filters)
├── CardResultItem component
├── CardGrid responsive layout
├── EmptyState (no search results)
├── LoadingSkeleton (card skeletons)
├── useSearch hook (API integration)
├── Card selection → FlowContext → auto-navigate
└── API integration test with backend

Day 12-14: Points Page
├── PointsPage layout
├── SelectedCardDisplay component
├── PointsInput with comma formatting
├── QuickAmountChips (5K, 10K, 25K, 50K)
├── EstimatedValuePreview calculation
├── Validation logic
├── "Change Card" navigation
└── "Find Best Redemption" → navigate to /results

Day 14-17: Results Page
├── ResultsPage layout
├── SummaryBanner component
├── RecommendationCard with rank treatment
├── RankBadge component (#1 gold, #2 silver, #3 bronze)
├── AllOptionsTable (sortable, filterable)
├── SortControls (VPP, Points, Value, Name)
├── FilterControls (RedemptionCategory)
├── CategoryBadge component
├── useRecommendations hook (POST /api/recommendations)
├── Optional: Dashboard API integration
├── ErrorState for API failures
├── SkeletonLoader for loading states
└── API integration test with backend

Day 17-19: UI Polish
├── Loading states for all async operations
├── Empty states for all edge cases
├── Error states for all failure scenarios
├── Hover/focus/active states on all components
├── Page transition animations
├── Card hover animations
├── Number count-up animations
├── Responsive layouts (mobile/tablet/desktop)
├── Touch targets ≥ 44px
├── Keyboard navigation
├── ARIA labels
├── Focus indicators
├── Skip navigation link

Day 19-21: Integration Testing
├── End-to-end flow test (Landing → Search → Points → Results)
├── API integration test with running backend
├── Error scenario testing (network failure, 404, 502)
├── Browser compatibility testing
├── Mobile device testing (375px, 414px)
├── Tablet testing (768px, 1024px)
├── Desktop testing (1280px, 1440px)

Day 21-22: Deployment Preparation
├── Production build verification
├── Environment variable configuration
├── Bundle size optimization (< 200KB gzipped)
├── Lighthouse audit (target > 90 all categories)
├── Final code review
├── Documentation update
└── Deployment setup (Vercel/Netlify)
```

### 16.2 Component Build Order (Dependency Graph)

```
Layer 1: Shared Primitives (no dependencies)
├── Button
├── Input
├── Card
├── Badge
├── Container
├── SectionHeader
└── LoadingSpinner

Layer 2: Feedback (depends on primitives)
├── SkeletonLoader
├── EmptyState
├── ErrorState
├── Toast
└── Modal

Layer 3: Layout (depends on primitives)
├── Header
├── Footer
├── Layout
└── StepIndicator

Layer 4: Landing Page (depends on all above)
├── Navbar
├── HeroSection + CreditCardMockup + TrustIndicators
├── StatsBar
├── HowItWorksSection + StepCard
├── BenefitsSection + FeatureCard
├── ActionPreviewSection + RecommendationDashboardMockup
├── TestimonialsSection + TestimonialCard
├── FAQSection + FAQAccordionItem
├── CTABanner
└── Footer

Layer 5: Application Pages (depends on all above)
├── SearchBar + FilterChips + CardResultItem + CardGrid
├── SelectedCardDisplay + PointsInput + QuickAmountChips + EstimatedValuePreview
├── SummaryBanner + RecommendationCard + RankBadge
├── AllOptionsTable + SortControls + FilterControls + CategoryBadge
└── NotFoundPage

Layer 6: Integration (depends on everything)
├── Services (apiClient, cardService, recommendationService)
├── Hooks (useFlow, useSearch, useRecommendations, useDebounce, useLocalStorage)
├── Context (FlowContext, ToastContext, AppProviders)
└── Pages (LandingPage, SearchPage, PointsPage, ResultsPage)
```

### 16.3 Critical Path Items

| Priority | Item | Why Critical |
|----------|------|-------------|
| **P0** | API Gateway connectivity test | Must verify endpoints work before frontend integration |
| **P0** | FlowContext implementation | All pages depend on flow state |
| **P0** | cardService + recommendationService | Core data layer |
| **P1** | Search Page with API integration | First interactive page |
| **P1** | Results Page with recommendations | Core value proposition |
| **P1** | Error handling for 502 (Feign failures) | Recommendation Service depends on Card + Reward Services |
| **P2** | Loading states | UX quality |
| **P2** | Responsive polish | Mobile-first requirement |
| **P3** | Animations | Visual polish |
| **P3** | Accessibility audit | WCAG compliance |

---

## Appendix A: API Gateway Route Mapping

Verified from `api-gateway/src/main/resources/application.yml`:

```yaml
routes:
  - id: auth-service
    uri: lb://auth-service
    predicates:
      - Path=/api/auth/**

  - id: card-service
    uri: lb://card-service
    predicates:
      - Path=/api/cards/**

  - id: reward-service
    uri: lb://reward-service
    predicates:
      - Path=/api/rewards/**

  - id: recommendation-service
    uri: lb://recommendation-service
    predicates:
      - Path=/api/recommendations/**, /api/dashboard/**

CORS:
  allowedOrigins: "http://localhost:3000"
  allowedMethods: [GET, POST, PUT, DELETE, PATCH, OPTIONS]
  allowedHeaders: [Authorization, Content-Type, Accept, Origin, X-Requested-With]
  allowCredentials: true
  maxAge: 3600
```

**Note:** The gateway routes `/api/dashboard/**` to the Recommendation Service, but the actual endpoint is `/api/recommendations/dashboard`. The `/api/dashboard/**` route may be unused or a legacy route.

---

## Appendix B: Backend Port Map

| Service | Port | Database Port | DB Name |
|---------|------|---------------|---------|
| Discovery Service | 8761 | — | — |
| API Gateway | 8080 | — | — |
| Auth Service | 8081 | 3306 | redeemwise_auth |
| Card Service | 8082 | 3306 | redeemwise_card |
| Reward Service | 8083 | 3306 | redeemwise_reward |
| Recommendation Service | 8084 | — | — (stateless) |
| Frontend (Vite dev) | 3000 | — | — |

---

## Appendix C: Seed Data Summary

From `database/generate_seed.py`:

| Entity | Count | Source |
|--------|-------|--------|
| Cards | 49 | Excel → Cards sheet |
| Reward Options | ~200+ | Excel → RedemptionOptions sheet |

**Card banks represented:** HDFC Bank, ICICI Bank, SBI Cards, Axis Bank, American Express, and others.

**Card networks (inferred):** Amex → AMEX, Diners → MASTERCARD, all others → VISA.

**Redemption categories:** FLIGHT, HOTEL, STATEMENT_CREDIT, VOUCHER, MERCHANDISE, AIR_MILES_TRANSFER, HOTEL_POINTS_TRANSFER, FUEL, OTHER.

---

*Document generated by Buffy (Principal Frontend Architect) on 2026-08-25.*
*All backend endpoints verified from source code. No inferences made without evidence.*
