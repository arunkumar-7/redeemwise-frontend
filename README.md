# RedeemWise Frontend

> A modern fintech web application that helps credit card users maximize the value of their reward points.

![Status](https://img.shields.io/badge/Status-In%20Development-blue)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-61DAFB)
![Build](https://img.shields.io/badge/Build-Vite-646CFF)
![License](https://img.shields.io/badge/License-Academic%20Project-green)

---

## Overview

RedeemWise helps users discover the most valuable way to redeem their existing credit card reward points.

Many cardholders accumulate reward points but redeem them through low-value options because they are unaware of better alternatives.

RedeemWise analyzes available redemption methods and recommends the option that provides the highest value for the user's points.

---

## Problem Statement

Credit card reward programs offer multiple redemption options such as:

- Cashback
- Statement Credit
- Gift Vouchers
- Product Catalogs
- Travel Redemptions
- Transfer Partners

However, the value received per reward point varies significantly across these options.

RedeemWise solves this problem by helping users identify the redemption option that maximizes the value of their reward points.

---

## MVP Features

### Card Selection

- Search supported credit cards
- Select a card from the available catalog

### Reward Point Analysis

- Enter available reward points manually
- Validate user input

### Recommendation Engine Integration

- Get the highest-value redemption option
- View estimated redemption value
- Compare alternative redemption methods
- View ranked redemption recommendations

### Modern User Experience

- Dark fintech-inspired design
- Mobile-first responsive layout
- Fast and intuitive workflow
- Minimal user friction

---

## Product Philosophy

### Login Later Approach

RedeemWise follows a **Login Later** strategy.

Users should receive value immediately without creating an account.

### Current MVP Flow

```text
Homepage
    ↓
Search Credit Card
    ↓
Enter Available Reward Points
    ↓
Find Best Redemption
    ↓
View Recommendations
```

No login is required.

No signup is required.

No account creation is required.

Authentication and user accounts will be introduced in future versions for users who want advanced features.

---

## Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Icons

### Development Tools

- ESLint
- Prettier
- Git
- GitHub

---

## Backend Architecture

The frontend communicates exclusively through an API Gateway.

### Microservices

- Discovery Service (Eureka)
- API Gateway
- Card Service
- Reward Service
- Recommendation Service

### Communication Flow

```text
Frontend
    ↓
API Gateway
    ↓
Card Service
Reward Service
Recommendation Service
```

The frontend never communicates directly with individual microservices.

---

## Project Architecture

```text
redeemwise-frontend
│
├── docs/
│   ├── FRONTEND_CONTEXT.md
│   ├── FRONTEND_ARCHITECTURE.md
│   ├── UI_FLOW_MVP.md
│   ├── DESIGN_SYSTEM.md
│   ├── FRONTEND_TASKS_MVP.md
│   └── IMPLEMENTATION_PHASES.md
│
├── src/
│
├── public/
│
└── README.md
```

---

## Documentation

Detailed project planning and architecture documents are available in the `/docs` directory.

### Available Documents

| Document                 | Purpose                                    |
| ------------------------ | ------------------------------------------ |
| FRONTEND_CONTEXT.md      | Product vision, goals, personas, MVP scope |
| FRONTEND_ARCHITECTURE.md | Technical architecture and frontend design |
| UI_FLOW_MVP.md           | Screen flows and user journeys             |
| DESIGN_SYSTEM.md         | UI design guidelines and visual system     |
| FRONTEND_TASKS_MVP.md    | Development roadmap and task breakdown     |
| IMPLEMENTATION_PHASES.md | Step-by-step implementation strategy       |

---

## Development Roadmap

### Phase 1

Project Setup

- React + TypeScript + Vite
- Tailwind CSS
- Routing
- Project structure

### Phase 2

Layout Foundation

- Application shell
- Responsive layout
- Shared components

### Phase 3

Core User Flow

- Card selection
- Points input
- Form validation

### Phase 4

API Integration

- Card catalog integration
- Recommendation API integration
- Error handling

### Phase 5

UI Polish

- Loading states
- Empty states
- Animations
- Accessibility improvements

### Phase 6

Deployment

- Production build
- Environment configuration
- Hosting setup

---

## Future Roadmap

Planned future enhancements include:

### User Features

- Login
- Signup
- Saved Cards
- User Profiles

### Portfolio Features

- Multiple Card Management
- Reward Portfolio Dashboard
- Reward Tracking

### Engagement Features

- Notifications
- Expiry Alerts
- Personalized Recommendations

### Intelligence Features

- Analytics Dashboard
- AI-Powered Redemption Insights

---

## Current Status

```text
✔ Frontend Planning Completed
✔ Frontend Architecture Completed
✔ Design System Completed
✔ Development Roadmap Completed

⏳ Frontend Development Starting
```

---

## Author

**Arun Kumar**

Master of Computer Applications (MCA)

Academic Project – RedeemWise

---

## Repository

Frontend Repository:

```text
https://github.com/arunkumar-7/redeemwise-frontend
```

Backend Repository:

```text
https://github.com/arunkumar-7/redeem-wise
```
