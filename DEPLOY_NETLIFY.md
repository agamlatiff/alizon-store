# 🚀 Deploy ke Netlify - Panduan Lengkap

## 📋 Persiapan Sebelum Deploy

### 1. Install Netlify CLI (Opsional, untuk deploy dari terminal)
```bash
npm install -g netlify-cli
```

### 2. Pastikan Project Sudah di Git
```bash
# Inisialisasi git (jika belum)
git init

# Add semua file
git add .

# Commit
git commit -m "Ready for deployment"

# Push ke GitHub/GitLab (recommended)
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

---

## 🌐 Cara Deploy ke Netlify

### **Metode 1: Deploy via Netlify Dashboard (Recommended)**

#### Step 1: Buat Akun Netlify
1. Kunjungi [https://www.netlify.com](https://www.netlify.com)
2. Sign up dengan GitHub/GitLab/Bitbucket atau email

#### Step 2: Connect Repository
1. Klik **"Add new site"** → **"Import an existing project"**
2. Pilih **GitHub/GitLab/Bitbucket**
3. Authorize Netlify untuk akses repository
4. Pilih repository `alizon-store`

#### Step 3: Configure Build Settings
Netlify akan otomatis detect Next.js, tapi pastikan settingnya:
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Branch to deploy**: `main` (atau `master`)

#### Step 4: Set Environment Variables
Klik **"Advanced"** → **"New variable"**, lalu tambahkan semua env vars:

```
DATABASE_URL=your_database_url
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
PASSWORD_PEPPER=your_pepper_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

⚠️ **PENTING**: 
- Gunakan **Live API Keys** untuk production (bukan test keys)
- `NEXT_PUBLIC_APP_URL` harus URL Netlify Anda (akan dapat setelah deploy)

#### Step 5: Deploy!
1. Klik **"Deploy site"**
2. Tunggu proses build (5-10 menit)
3. Site akan live di `https://random-name.netlify.app`

#### Step 6: Custom Domain (Opsional)
1. Di Netlify dashboard → **Domain settings**
2. Klik **"Add custom domain"**
3. Ikuti instruksi untuk setup DNS

---

### **Metode 2: Deploy via Netlify CLI**

```bash
# Login ke Netlify
netlify login

# Deploy (draft)
netlify deploy

# Deploy ke production
netlify deploy --prod
```

---

## 🔧 Post-Deployment Setup

### 1. Update Stripe Webhook URL
1. Buka [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Tambah endpoint baru: `https://your-site.netlify.app/api/webhooks/stripe`
3. Copy webhook secret yang baru
4. Update `STRIPE_WEBHOOK_SECRET` di Netlify environment variables

### 2. Update Google OAuth Redirect URLs
1. Buka [Google Cloud Console](https://console.cloud.google.com)
2. Credentials → OAuth 2.0 Client IDs
3. Tambahkan:
   - **Authorized JavaScript origins**: `https://your-site.netlify.app`
   - **Authorized redirect URIs**: `https://your-site.netlify.app/api/auth/callback/google`

### 3. Update Database Prisma
Jika ada perubahan schema:
```bash
# Generate Prisma Client
npx prisma generate

# Push schema ke database
npx prisma db push
```

### 4. Test Website
- ✅ Login/Register
- ✅ Add to cart
- ✅ Checkout dengan Stripe
- ✅ Dashboard (untuk admin)

---

## 🐛 Troubleshooting

### Build Failed
**Error**: `Module not found`
- **Fix**: Pastikan semua dependencies ada di `package.json`
- Run: `npm install` lalu commit & push

**Error**: `Prisma Client not generated`
- **Fix**: Tambahkan `postinstall` script di `package.json`:
  ```json
  "scripts": {
    "postinstall": "prisma generate"
  }
  ```

### Environment Variables Not Working
- **Fix**: Pastikan semua env vars yang dimulai dengan `NEXT_PUBLIC_` sudah di-set
- Redeploy setelah update env vars

### Stripe Webhook Tidak Jalan
- **Fix**: 
  1. Pastikan webhook URL benar
  2. Pastikan `STRIPE_WEBHOOK_SECRET` sudah di-update dengan secret dari production endpoint

---

## 📊 Monitoring & Analytics

### Netlify Analytics
- Aktifkan di **Site settings** → **Analytics**
- Lihat traffic, performance, dll

### Deploy Logs
- Klik **Deploys** → Pilih deploy → **Deploy log**
- Lihat error jika ada masalah

---

## 🔄 Auto-Deploy

Setelah setup awal, setiap kali Anda push ke GitHub:
```bash
git add .
git commit -m "Update feature"
git push
```

Netlify akan otomatis:
1. Detect perubahan
2. Build ulang
3. Deploy ke production

---

## 💡 Tips

1. **Use Environment-Specific Keys**: Test keys untuk development, Live keys untuk production
2. **Enable Deploy Previews**: Setiap PR akan dapat preview URL
3. **Set up Notifications**: Slack/Email notification untuk deploy status
4. **Use Branch Deploys**: Deploy branch lain untuk testing

---

## 📞 Support

Jika ada masalah:
- [Netlify Docs](https://docs.netlify.com)
- [Netlify Community](https://answers.netlify.com)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)

---

**Happy Deploying! 🚀**
