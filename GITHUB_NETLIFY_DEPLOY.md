# GitHub & Netlify Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Files to Include in GitHub:
```
✓ src/                    # All React components
✓ public/                 # Static assets
✓ netlify/               # Serverless functions
✓ supabase/              # Database schema
✓ .gitignore             # Git ignore rules
✓ .env.production        # Production config (no secrets)
✓ index.html             # Entry point
✓ package.json           # Dependencies
✓ package-lock.json      # Lock file
✓ vite.config.js         # Build config
✓ netlify.toml           # Netlify config
✓ server.js              # Backend (for reference)
✓ README.md              # Documentation
✓ All .md guides         # Help docs
✓ run-admin.bat          # Admin launcher
✓ FAQ import files       # CSV/SQL files
```

### ❌ Files NOT to Include:
```
✗ .env                   # Contains API keys!
✗ node_modules/          # Auto-installed
✗ dist/                  # Build output
```

## 🚀 Step-by-Step Deployment

### Step 1: Initialize Git
```bash
git init
git add .
git commit -m "Initial commit - KnowledgeBase Bot with SagotBuddy"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Name: `knowledgebase-bot`
3. Description: "AI-powered knowledge base with SagotBuddy chatbot"
4. Public or Private (your choice)
5. DON'T initialize with README (you have one)

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/knowledgebase-bot.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Netlify
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub
4. Select your `knowledgebase-bot` repository
5. Build settings will auto-detect from `netlify.toml`

### Step 5: Add Environment Variables in Netlify
Go to Site Settings → Environment Variables and add:

```
GOOGLE_API_KEY=AIzaSyCn9Nh3YI2v4Q7qEwX7wuG76qiDy_Z4vxM
VITE_SUPABASE_URL=https://gxcjmnbatoeeddosmbfg.supabase.co
VITE_SUPABASE_ANON_KEY=[YOUR_ANON_KEY_FROM_.env]
```

⚠️ **IMPORTANT**: Copy the VITE_SUPABASE_ANON_KEY value from your local .env file!

### Step 6: Deploy
1. Netlify will automatically build and deploy
2. You'll get a URL like: `amazing-bot-123.netlify.app`
3. Test your live site!

## 🔧 Post-Deployment

### Custom Domain (Optional)
1. In Netlify → Domain Settings
2. Add custom domain
3. Follow DNS instructions

### Continuous Deployment
Any push to GitHub main branch will auto-deploy!

```bash
git add .
git commit -m "Update features"
git push
```

## 📝 Final Notes

### What Users Can Access:
- ✅ Chat with SagotBuddy
- ✅ Browse FAQs
- ✅ All public features
- ❌ No admin access (redirects to home)

### What You Can Access Locally:
- ✅ Run `npm run dev`
- ✅ Access `/admin`
- ✅ Manage FAQs
- ✅ View unanswered queries

## 🎉 Success!
Your bot will be live at your Netlify URL!
