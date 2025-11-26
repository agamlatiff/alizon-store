# 🚀 Quick Start - Stripe Integration

## ✅ Checklist Setup

### 1. Install Dependencies
```bash
npm install stripe @stripe/stripe-js
```

### 2. Setup Environment Variables

Copy `env.example.txt` ke `.env.local` dan isi dengan values yang benar:

```env
# Stripe Keys (dapatkan dari https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Jalankan Development Server
```bash
npm run dev
```

### 4. Test Payment Flow

1. Tambahkan produk ke cart
2. Klik "Checkout Now"
3. Isi shipping address
4. Akan redirect ke Stripe Checkout
5. Gunakan test card: `4242 4242 4242 4242`
6. Setelah berhasil, akan redirect ke success page

## 📁 File Structure

```
src/
├── lib/
│   └── stripe.ts                    # Stripe client instance
├── app/
│   ├── (customers)/
│   │   └── carts/
│   │       └── lib/
│   │           └── actions.ts       # Checkout logic dengan Stripe
│   ├── checkout/
│   │   ├── success/
│   │   │   └── page.tsx            # Success page
│   │   └── cancel/
│   │       └── page.tsx            # Cancel page
│   └── api/
│       └── webhooks/
│           └── stripe/
│               └── route.ts        # Webhook handler
```

## 🔄 Payment Flow

1. **User clicks Checkout** → `storeOrder()` action dipanggil
2. **Create Order** → Order disimpan ke database dengan status "pending"
3. **Create Stripe Session** → Stripe Checkout Session dibuat
4. **Redirect to Stripe** → User diredirect ke Stripe Checkout page
5. **User pays** → User melakukan pembayaran di Stripe
6. **Webhook triggered** → Stripe mengirim webhook ke `/api/webhooks/stripe`
7. **Update order** → Order status diupdate menjadi "paid"
8. **Redirect to success** → User diredirect ke success page

## 🧪 Testing

### Test Cards
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

### Test Webhook Locally
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy webhook secret yang muncul ke .env.local
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 📚 Documentation

Lihat `STRIPE_SETUP.md` untuk dokumentasi lengkap setup Stripe.

## 🆘 Troubleshooting

### Error: "Invalid API Key"
- Pastikan `STRIPE_SECRET_KEY` sudah diset di `.env.local`
- Pastikan menggunakan test key (dimulai dengan `sk_test_`)

### Webhook tidak terdeteksi
- Pastikan Stripe CLI running: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Pastikan `STRIPE_WEBHOOK_SECRET` sudah diset

### Order tidak update setelah payment
- Cek webhook logs di Stripe Dashboard
- Cek console log di terminal untuk error

## 🎯 Next Steps

1. ✅ Setup Stripe account
2. ✅ Dapatkan API keys
3. ✅ Test payment flow
4. ✅ Setup webhook untuk production
5. ✅ Deploy ke production
6. ✅ Update ke Live API keys

---

**Happy Coding! 🚀**
