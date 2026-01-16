# Deployment Guide for Moodwiser Website

## 🚀 Deploy to Vercel (FREE & EASIEST)

### Step 1: Push to GitHub

1. Create a new repository on GitHub: https://github.com/new
   - Name it: `moodwiserweb`
   - Make it **Public** (required for free tier)
   - **Don't** initialize with README

2. Run these commands in your terminal:

```bash
cd /Users/apple/Desktop/moodwiserweb
git remote add origin https://github.com/YOUR_USERNAME/moodwiserweb.git
git branch -M main
git push -u origin main
```

(Replace `YOUR_USERNAME` with your GitHub username)

### Step 2: Deploy on Vercel

1. Go to https://vercel.com
2. Sign up/Login with your GitHub account
3. Click **"Add New Project"**
4. Import your `moodwiserweb` repository
5. Vercel will auto-detect Next.js settings
6. Click **"Deploy"** (no configuration needed!)
7. Wait 2-3 minutes
8. Your site will be live at: `https://moodwiserweb.vercel.app`

### Step 3: Custom Domain (Optional)

- In Vercel dashboard, go to your project → Settings → Domains
- Add your custom domain (e.g., `moodwiser.com`)
- Follow DNS instructions

---

## 🎯 Alternative: Deploy via CLI

If you prefer command line:

```bash
cd /Users/apple/Desktop/moodwiserweb
npx vercel
```

Follow the prompts:
- Login to Vercel
- Link/create project
- Deploy!

---

## 📝 Notes

- **Free Tier Includes:**
  - Unlimited deployments
  - Automatic HTTPS
  - Global CDN
  - Custom domains
  - Automatic deployments on git push

- **Your site will be live in ~3 minutes!**

---

## 🔄 Update Your Site

After pushing changes to GitHub:
```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically redeploy! ✨

