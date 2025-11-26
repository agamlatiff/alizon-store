# 🔐 Stripe Setup Guide - Alizon Store

## 📝 Langkah-langkah Setup Stripe

### 1️⃣ Daftar Akun Stripe

1. Kunjungi [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Daftar dengan email Anda
3. Verifikasi email Anda
4. Login ke Stripe Dashboard

### 2️⃣ Dapatkan API Keys

1. Setelah login, klik **Developers** di menu atas
2. Klik **API keys** di sidebar
3. Anda akan melihat dua jenis keys:
   - **Publishable key** (dimulai dengan `pk_test_...` untuk test mode)
   - **Secret key** (dimulai dengan `sk_test_...` untuk test mode)

### 3️⃣ Setup Webhook (Untuk Production)

1. Di Stripe Dashboard, klik **Developers** → **Webhooks**
2. Klik **Add endpoint**
3. Masukkan URL endpoint Anda: `https://yourdomain.com/api/webhooks/stripe`
4. Pilih events yang ingin Anda listen:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy **Webhook signing secret** (dimulai dengan `whsec_...`)

### 4️⃣ Tambahkan ke Environment Variables

Buat atau update file `.env.local` di root project Anda:

```env
# Stripe API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Stripe Webhook Secret (untuk production)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5️⃣ Testing dengan Stripe Test Cards

Gunakan test card berikut untuk testing:

| Card Number         | Brand      | Result  |
|---------------------|------------|---------|
| 4242 4242 4242 4242 | Visa       | Success |
| 4000 0000 0000 0002 | Visa       | Decline |
| 4000 0025 0000 3155 | Visa       | 3D Secure |

**Detail Tambahan untuk Testing:**
- **Expiry Date**: Gunakan tanggal di masa depan (contoh: 12/34)
- **CVC**: Gunakan 3 digit angka apapun (contoh: 123)
- **ZIP**: Gunakan 5 digit angka apapun (contoh: 12345)

### 6️⃣ Mode Production

Ketika siap untuk production:

1. Di Stripe Dashboard, toggle dari **Test mode** ke **Live mode** (di pojok kanan atas)
2. Dapatkan Live API keys (dimulai dengan `pk_live_...` dan `sk_live_...`)
3. Update `.env.local` dengan Live keys
4. Setup webhook untuk production URL
5. Lengkapi business verification di Stripe

### 7️⃣ Fitur Stripe yang Diimplementasikan

✅ **Checkout Session** - Hosted payment page dari Stripe
✅ **Payment Intent** - Tracking payment status
✅ **Webhook Handler** - Otomatis update order status
✅ **Success/Cancel Pages** - Redirect setelah payment
✅ **Order History** - Lihat riwayat transaksi

### 8️⃣ Testing Webhook di Local Development

Untuk testing webhook di local:

1. Install Stripe CLI:
   ```bash
   # Windows (via Scoop)
   scoop install stripe
   
   # Mac (via Homebrew)
   brew install stripe/stripe-cli/stripe
   ```

2. Login ke Stripe CLI:
   ```bash
   stripe login
   ```

3. Forward webhook ke local:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. Copy webhook signing secret yang muncul dan tambahkan ke `.env.local`

### 📚 Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

### 🆘 Troubleshooting

**Problem**: "Invalid API Key"
- **Solution**: Pastikan Anda menggunakan key yang benar (test vs live mode)

**Problem**: Webhook tidak terdeteksi
- **Solution**: Pastikan endpoint URL benar dan webhook secret sudah di-set

**Problem**: Payment berhasil tapi order tidak update
- **Solution**: Cek webhook logs di Stripe Dashboard → Developers → Webhooks

---

**Note**: Jangan pernah commit API keys ke Git! Pastikan `.env.local` ada di `.gitignore`
