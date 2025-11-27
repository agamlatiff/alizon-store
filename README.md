# Alizon Store - Stripe Integration Update

## 🚀 Recent Changes (Stripe Integration)

We have successfully migrated the payment gateway from Xendit to **Stripe**. Here is a summary of the changes:

### 1. Dependencies & Configuration
- **Removed**: `xendit-node` and related configuration files (`src/lib/xendit.ts`).
- **Added**: `stripe` and `@stripe/stripe-js` packages.
- **New Config**: Created `src/lib/stripe.ts` to initialize the Stripe client.

### 2. Checkout Flow (`storeOrder` Action)
- Refactored `src/app/(customers)/carts/lib/actions.ts`.
- Replaced Xendit payment request logic with **Stripe Checkout Sessions**.
- Added proper error handling and validation (fixed "Invalid input" bugs).
- Fixed `NEXT_REDIRECT` error by ensuring redirects happen outside `try/catch` blocks.

### 3. Webhook Handling
- Created a new endpoint: `src/app/api/webhooks/stripe/route.ts`.
- This webhook listens for `checkout.session.completed` events.
- Automatically updates the order status in the database from `pending` to `success` upon successful payment.

### 4. UI Updates
- **Success Page**: Added `src/app/checkout/success/page.tsx` to display order confirmation.
- **Cancel Page**: Added `src/app/checkout/cancel/page.tsx` for cancelled payments.
- **Checkout Form**: Added error alerts to `CheckoutForm.tsx` to display validation or payment errors to the user.

---

## 🛠️ Stripe Setup Guide

Follow these steps to set up Stripe for this project:

### 1. Get API Keys
1.  Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
2.  Go to **Developers** > **API keys**.
3.  Copy the **Publishable key** (`pk_test_...`) and **Secret key** (`sk_test_...`).

### 2. Configure Environment Variables
Create or update your `.env` (or `.env.local`) file with the following:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# App URL (Required for Stripe Redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Get Webhook Secret (For Local Development)
To test payments locally, you need to forward Stripe events to your localhost.

1.  **Install Stripe CLI**:
    - [Download Stripe CLI](https://docs.stripe.com/stripe-cli) for your OS.
    - Or use a package manager (e.g., `scoop install stripe` on Windows).

2.  **Login**:
    ```bash
    stripe login
    ```

3.  **Start Listening**:
    Run this command in your terminal:
    ```bash
    stripe listen --forward-to localhost:3000/api/webhooks/stripe
    ```

4.  **Copy Secret**:
    The CLI will output a signing secret (starts with `whsec_...`). Copy this value to `STRIPE_WEBHOOK_SECRET` in your `.env` file.

### 4. Restart Server
**Crucial Step**: After updating `.env`, you MUST restart your Next.js server.

```bash
# Stop server (Ctrl + C)
npm run dev
```

---

## 🧪 How to Test Payment

1.  Add items to your cart.
2.  Proceed to checkout.
3.  Fill in the shipping details.
4.  Click **Checkout Now**.
5.  You will be redirected to Stripe's hosted payment page.
6.  Use a **Test Card**:
    - **Card Number**: `4242 4242 4242 4242`
    - **Expiry**: Any future date (e.g., 12/30)
    - **CVC**: Any 3 digits (e.g., 123)
7.  After payment, you should be redirected to the Success Page, and the order status in your database will update to `success`.
