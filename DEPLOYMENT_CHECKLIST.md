# ✅ Deployment Checklist

## Pre-Deployment
- [ ] Semua fitur sudah di-test di local
- [ ] Database sudah di-setup (PostgreSQL production)
- [ ] Semua environment variables sudah disiapkan
- [ ] Code sudah di-push ke GitHub/GitLab

## Netlify Setup
- [ ] Akun Netlify sudah dibuat
- [ ] Repository sudah di-connect ke Netlify
- [ ] Build settings sudah dikonfigurasi
- [ ] Environment variables sudah di-set di Netlify

## Post-Deployment
- [ ] Site sudah live dan bisa diakses
- [ ] Update `NEXT_PUBLIC_APP_URL` dengan URL Netlify
- [ ] Redeploy setelah update env var
- [ ] Update Stripe webhook URL ke production URL
- [ ] Update `STRIPE_WEBHOOK_SECRET` dengan secret baru
- [ ] Update Google OAuth redirect URLs
- [ ] Test login dengan Google
- [ ] Test checkout dengan Stripe
- [ ] Test dashboard untuk admin
- [ ] Custom domain setup (opsional)

## Testing
- [ ] Homepage loading dengan benar
- [ ] Products bisa di-browse
- [ ] Add to cart berfungsi
- [ ] Wishlist berfungsi
- [ ] Login/Register berfungsi
- [ ] Checkout flow complete
- [ ] Payment berhasil
- [ ] Order muncul di dashboard
- [ ] Admin bisa update order status

## Monitoring
- [ ] Setup Netlify Analytics (opsional)
- [ ] Setup error monitoring (Sentry, dll - opsional)
- [ ] Check deploy logs untuk error

---

**Catatan**: Simpan file ini dan centang setiap item saat Anda menyelesaikannya!
