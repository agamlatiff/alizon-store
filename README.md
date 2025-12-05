# Alizon Store

**Alizon Store** is a full‑stack e‑commerce project that combines a modern Next.js frontend with API integrations such as Stripe, authentication, and a modular architecture built for real‑world usage.

Live Demo: [https://alizonstore.netlify.app/](https://alizonstore.netlify.app/)

---

## Overview

* **Tech Stack:** Next.js (App Router) + TypeScript, Prisma, PostgreSQL, Tailwind CSS, Supabase (optional), NextAuth v5, Stripe.
* **Architecture:** Modern frontend with API routes and integrations for payments, authentication, and database operations.
* **Goal:** A clean, scalable e‑commerce template for production use or portfolio showcase.

---

## Features

* Product catalog & product detail pages
* Shopping cart system
* Stripe Checkout payment integration
* Stripe webhook handler for order confirmation
* Success / Cancel payment pages
* User authentication (NextAuth v5 / Supabase config depending on setup)
* Address management & order information
* Modular, scalable code structure using Prisma ORM

---

## Requirements

* Node.js v18+
* pnpm / npm / yarn
* PostgreSQL (or any compatible provider via `DATABASE_URL`)
* Stripe account (test keys supported)
* (Optional) Supabase project for storage/auth

---

## Environment Setup

Copy `.env.example` (or provided env example file) to `.env.local` and fill in required values:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname

# NextAuth / Supabase (if used)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
SUPABASE_URL=https://your-supabase-url
SUPABASE_ANON_KEY=anon-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Restart your dev server after editing `.env.local`.

---

## Run Locally

1. Install dependencies:

```bash
npm install
# or
pnpm install
yarn install
```

2. Run Prisma migration (if used):

```bash
npx prisma migrate dev
```

3. Start the development server:

```bash
npm run dev
pnpm dev
yarn dev
```

4. Visit [http://localhost:3000](http://localhost:3000)

---

## Testing Stripe Payments (Local)

1. Ensure Stripe keys are properly configured.
2. Use Stripe CLI to forward webhooks:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

3. Use test card number `4242 4242 4242 4242` for testing checkout.

---

## Deployment

You can deploy this project to Vercel, Netlify, or any platform that supports Next.js. Make sure all environment variables (DATABASE_URL, NEXTAUTH_SECRET, Stripe keys, etc.) are correctly set in the hosting dashboard.

---

## Folder Structure (Quick Overview)

```
├─ src/
│  ├─ app/           # Next.js pages & API routes
│  ├─ lib/           # helpers (stripe, db, auth)
│  └─ components/    # UI components
├─ prisma/           # schema & migrations
├─ public/
├─ package.json
└─ README.md
```

---

If you'd like, I can also add badges (CI, stars), Docker setup, API documentation, or a cleaner architecture diagram.
