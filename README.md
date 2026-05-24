<div align="center">

# HC / Klodx ☁️

### Persian cloud server dashboard built with Next.js

A localized frontend for browsing cloud server packages in Hetzner datacenter (Germany), configuring a server, creating invoices, charging a wallet, and handling user authentication/support flows.

<img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
<img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
<img src="https://img.shields.io/badge/Redux-Toolkit-purple?style=for-the-badge&logo=redux" />
<img src="https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakraui" />

</div>

---

## Overview

This repository is a **Next.js App Router** project for a Persian cloud hosting dashboard. The app is focused on the frontend experience and connects to a backend through `PUBLIC_BACKEND_API`.

The current implementation includes:

- Landing page sections for product introduction, plans, testimonials, and datacenter map visuals
- Register, login, OTP verification, password reset, and complete-profile flows
- Auth sessions through **NextAuth credentials provider**
- Dashboard shell with sidebar/subheader navigation
- Cloud server purchase stepper: location, OS image, package size, final settings, and review/payment
- Wallet charge, voucher check, bank gateway URL, and pay-by-wallet integrations
- Ticket list, ticket details, new ticket, and ticket message flows
- Chakra UI theme customization with Persian typography and RTL-oriented UI content

---

## Tech Stack

| Technology                | Usage                                                      |
| ------------------------- | ---------------------------------------------------------- |
| Next.js 14                | App Router, pages, middleware, API auth route              |
| React 18                  | Client-side UI components                                  |
| TypeScript                | Type-safe app code and API contracts                       |
| Chakra UI                 | Component system and custom theme foundation               |
| Redux Toolkit + RTK Query | API services, cache/middleware setup, create-server state  |
| React Redux               | Store provider and typed hooks                             |
| NextAuth v5               | Credentials login and session management                   |
| Formik + Zod              | Forms and validation schemas                               |
| Chakra React Select       | OS/image select UI                                         |
| Framer Motion             | Chakra UI animation dependency                             |
| Swiper                    | Testimonials slider                                        |
| Persian Tools             | Persian utilities and formatting support                   |
| Tailwind CSS              | Configured in the project, while UI is mainly Chakra-based |

---

## Main Routes

| Route                            | Purpose                                             |
| -------------------------------- | --------------------------------------------------- |
| `/`                              | Landing page                                        |
| `/login`                         | Login and forgot-password entry                     |
| `/login/new-password`            | Password reset form                                 |
| `/register`                      | User registration and OTP verification              |
| `/complete-profile`              | Complete user profile data                          |
| `/dashboard`                     | Dashboard overview with static summary cards/log UI |
| `/dashboard/cloud-server`        | Cloud server creation flow                          |
| `/dashboard/ticket`              | Support tickets                                     |
| `/dashboard/ticket/new`          | Create support ticket                               |
| `/dashboard/cart/payment/result` | Payment result screen                               |
| `/api/auth/[...nextauth]`        | NextAuth route handlers                             |

`/dashboard/settings` and `/dashboard/analytics` are present in the sidebar config but are currently marked as disabled links.

---

## Backend Integration

All RTK Query services share `app/redux/services/base.ts`, which builds requests from:

```bash
PUBLIC_BACKEND_API + "api/v1"
```

Authenticated requests attach the session access token as a Bearer token.

Implemented API areas:

- `authApi`: register, verify OTP, complete profile, reset password, get current user
- `serverPackageApi`: server packages, locations, images, SSH keys, server invoice creation, wallet payment, bank gateway URL, voucher check
- `paymentApi`: wallet information
- `invoicesApi`: wallet charge, bank gateway URL, voucher check
- `ticketsApi`: create ticket, list tickets, ticket detail, ticket messages

---

## Project Structure

```bash
hc/
├── app/
│   ├── api/auth/[...nextauth]/     # NextAuth route handler
│   ├── components/                 # Landing, auth, and shared app components
│   ├── complete-profile/           # Complete-profile page
│   ├── dashboard/                  # Dashboard, cloud-server, payment, and ticket pages
│   ├── login/                      # Login and reset-password pages/components
│   ├── redux/                      # Store, RTK Query services, and create-server slice
│   ├── register/                   # Register page/components
│   ├── styles/                     # Global CSS
│   ├── themes/                     # Chakra theme foundation and component variants
│   ├── types/                      # NextAuth type augmentation
│   ├── utils/constants/            # Dashboard links and Persian digit helper
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Landing page
│   ├── providers.tsx               # Chakra, Redux, and session providers
│   └── validationSchema.ts         # Zod validation schemas
├── components/ui/                  # Extra generated UI primitives
├── public/                         # Fonts, icons, and images
├── .gitlab-ci/                     # GitLab CI includes
├── auth.ts                         # NextAuth credentials configuration
├── middleware.ts                   # Route protection middleware
├── next.config.mjs                 # Next.js environment config
├── tailwind.config.ts              # Tailwind config
├── Dockerfile                      # Production container build
├── compose.yml                     # Docker Compose service definition
└── package.json                    # Scripts and dependencies
```

---

## Environment Variables

Create a local env file such as `.env.local`:

```bash
PUBLIC_BACKEND_API=https://your-backend.example.com/
AUTH_SECRET=your-auth-secret
```

Notes:

- `auth.ts` posts credentials to `${PUBLIC_BACKEND_API}/api/v1/auth/login-password/`.
- RTK Query requests use `PUBLIC_BACKEND_API + "api/v1"`; keep the trailing slash behavior consistent with your backend URL.

---

## Getting Started

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Docker

The repository includes a production `Dockerfile` and a `compose.yml` that runs a prebuilt GitLab registry image.

Build the app image manually:

```bash
docker build -t hc .
```

Run the configured Compose service:

```bash
TAG_NAME=your-tag EXPOSED_PORT=3000 DEPLOY_NAME=dev docker compose up
```

The Compose service expects `variables.env` and external Docker networks named `dev`, `stage`, or `prod`.

---

## Current Notes

- Most UI text is Persian and the dashboard is designed for a localized cloud hosting workflow.
- The dashboard overview contains some static placeholder values, while cloud-server, wallet, invoice, auth, and ticket areas are wired to API services.
- The project uses Chakra UI as the primary styling system; Tailwind is configured but is not the main component styling approach.
- The app name in `package.json` is `hc`, while the product branding shown in the UI/README is `Klodx`.

---

## Developer

Ali Heydari

- GitHub: [github.com/alisaruman](https://github.com/alisaruman)
- LinkedIn: [Ali Heydari](https://www.linkedin.com/in/ali-h3ydari)
- Email: a.heydari.dev@gmail.com
