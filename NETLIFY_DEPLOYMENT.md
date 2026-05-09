# Netlify Deployment Guide

## 📋 Pre-Deployment Checklist

- [x] Netlify configuration file created (`netlify.toml`)
- [x] Serverless function created for chat API
- [x] Frontend updated to use correct API endpoints
- [ ] Environment variables ready

## 🚀 Deployment Steps

### Option 1: Deploy via Netlify CLI (Recommended)

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Login to Netlify**:
```bash
netlify login
```

3. **Initialize and Deploy**:
```bash
netlify init
netlify deploy --prod
```

### Option 2: Deploy via GitHub

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Connect to Netlify**:
- Go to https://app.netlify.com
- Click "Add new site" → "Import an existing project"
- Choose GitHub and select your repo
- Deploy settings will auto-configure from `netlify.toml`

### Option 3: Drag & Drop

1. **Build locally**:
```bash
npm run build
```

2. **Deploy**:
- Go to https://app.netlify.com
- Drag the `dist` folder to Netlify

## 🔐 Environment Variables

Add these in Netlify Dashboard → Site Settings → Environment Variables:

```
GOOGLE_API_KEY=your-google-api-key
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## ⚠️ Important Notes

1. **API Keys**: Never commit `.env` file to GitHub
2. **CORS**: Already configured in the serverless function
3. **Functions**: Netlify will auto-detect functions in `netlify/functions`

## 🧪 Post-Deployment Testing

1. Visit your Netlify URL
2. Test the chatbot
3. Check browser console for errors
4. Verify FAQ loading

## 🔧 Troubleshooting

### Chat not working?
- Check Environment Variables in Netlify
- View Function logs in Netlify Dashboard

### FAQs not loading?
- Verify Supabase URL and keys
- Check browser network tab

### Build failing?
- Check build logs in Netlify
- Ensure all dependencies are in `package.json`

## 📊 Monitoring

- View function logs: Netlify Dashboard → Functions
- Check analytics: Netlify Dashboard → Analytics
- Monitor errors: Browser console

Your app is now ready for Netlify! 🎉
