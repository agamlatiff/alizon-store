# 🔧 Troubleshooting Guide - AlizonStore

## 🖼️ Logo & Favicon Tidak Muncul di Netlify

### **Masalah:**
Logo di navbar dan favicon tidak muncul saat deploy ke Netlify, padahal di localhost berfungsi normal.

### **Penyebab:**
1. **Path favicon salah** - File yang ada adalah `favicon.png` tapi di metadata menggunakan `favicon.ico`
2. **Case sensitivity** - Netlify (Linux-based) case-sensitive, localhost Windows tidak
3. **Redirect rules** - Redirect SPA-style di `netlify.toml` konflik dengan Next.js routing

### **Solusi:**

#### 1. Fix Favicon Path
Di `src/app/layout.tsx`, pastikan path sesuai dengan file yang ada:
```tsx
export const metadata = {
  title: "AlizonStore - Your Premium E-Commerce Destination",
  description: "Discover amazing products at AlizonStore.",
  icons: {
    icon: "/favicon.png",      // ✅ Gunakan .png
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};
```

#### 2. Fix Netlify Config
Di `netlify.toml`, hapus redirect yang konflik:
```toml
# Netlify Configuration
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

# ❌ JANGAN gunakan redirect ini untuk Next.js
# [[redirects]]
#   from = "/*"
#   to = "/index.html"
#   status = 200
```

#### 3. Pastikan File Ada di Public
Cek struktur folder `public/`:
```
public/
├── favicon.png          ✅ Ada
├── brand-logo.png       ✅ Ada
└── assets/
    └── ...
```

#### 4. Redeploy ke Netlify
```bash
git add .
git commit -m "Fix favicon and logo paths for Netlify"
git push
```

### **Verifikasi:**
Setelah deploy selesai:
1. ✅ Buka site di browser
2. ✅ Cek favicon di tab browser
3. ✅ Cek logo di navbar
4. ✅ Inspect element untuk lihat path yang dimuat

---

## 🚫 Build Failed di Netlify

### **Error: Module not found**
```
Error: Cannot find module 'xyz'
```

**Solusi:**
```bash
# Install dependency yang hilang
npm install xyz

# Commit dan push
git add package.json package-lock.json
git commit -m "Add missing dependency"
git push
```

### **Error: Prisma Client not generated**
```
Error: @prisma/client did not initialize yet
```

**Solusi:**
Tambahkan postinstall script di `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

---

## 🔐 Environment Variables Tidak Bekerja

### **Masalah:**
API calls gagal atau authentication error di production.

### **Solusi:**
1. Buka Netlify Dashboard → Site settings → Environment variables
2. Pastikan SEMUA env vars sudah di-set:
   ```
   DATABASE_URL
   AUTH_SECRET
   AUTH_GOOGLE_ID
   AUTH_GOOGLE_SECRET
   PASSWORD_PEPPER
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   STRIPE_SECRET_KEY
   STRIPE_WEBHOOK_SECRET
   NEXT_PUBLIC_APP_URL
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```
3. **PENTING:** Setelah update env vars, harus **redeploy**:
   - Klik "Deploys" → "Trigger deploy" → "Clear cache and deploy site"

---

## 💳 Stripe Webhook Tidak Jalan

### **Masalah:**
Payment berhasil tapi order status tidak update.

### **Solusi:**
1. Buka [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Tambah endpoint baru untuk production:
   ```
   https://your-site.netlify.app/api/webhooks/stripe
   ```
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy webhook secret yang baru
5. Update `STRIPE_WEBHOOK_SECRET` di Netlify
6. Redeploy site

---

## 🔄 Google OAuth Redirect Error

### **Masalah:**
```
Error 400: redirect_uri_mismatch
```

### **Solusi:**
1. Buka [Google Cloud Console](https://console.cloud.google.com)
2. APIs & Services → Credentials
3. Pilih OAuth 2.0 Client ID
4. Tambahkan di **Authorized redirect URIs**:
   ```
   https://your-site.netlify.app/api/auth/callback/google
   ```
5. Tambahkan di **Authorized JavaScript origins**:
   ```
   https://your-site.netlify.app
   ```

---

## 🖼️ Image Tidak Muncul

### **Masalah:**
Gambar dari external sources tidak muncul.

### **Solusi:**
Tambahkan domain di `next.config.ts`:
```tsx
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-image-domain.com",
      },
    ],
  },
};
```

---

## 🐌 Site Lambat / Performance Issues

### **Checklist Optimasi:**
- [ ] Enable image optimization (Next.js Image component)
- [ ] Minimize bundle size (check `npm run build` output)
- [ ] Use dynamic imports untuk heavy components
- [ ] Enable caching headers di Netlify
- [ ] Compress images di Supabase storage

### **Netlify Caching:**
Tambahkan di `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 📱 Mobile View Broken

### **Masalah:**
Layout berantakan di mobile.

### **Solusi:**
1. Pastikan viewport meta tag ada di `layout.tsx`:
   ```tsx
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```
2. Test responsive di browser DevTools
3. Gunakan Tailwind responsive classes: `sm:`, `md:`, `lg:`

---

## 🔍 Debugging Tips

### **1. Check Build Logs**
Netlify Dashboard → Deploys → [Latest Deploy] → Deploy log

### **2. Check Function Logs**
Netlify Dashboard → Functions → [Function Name] → Logs

### **3. Test Locally dengan Production Build**
```bash
npm run build
npm start
```

### **4. Clear Cache dan Rebuild**
Netlify Dashboard → Deploys → Trigger deploy → "Clear cache and deploy site"

---

## 📞 Masih Ada Masalah?

1. **Check Netlify Status**: https://www.netlifystatus.com/
2. **Netlify Community**: https://answers.netlify.com/
3. **Next.js Docs**: https://nextjs.org/docs
4. **Netlify Docs**: https://docs.netlify.com/

---

**Last Updated:** 2025-11-27
