# Project File Cleanup Guide

## ✅ Files to KEEP

### Core Application Files
- `index.html` - Entry point
- `package.json` & `package-lock.json` - Dependencies
- `vite.config.js` - Build configuration
- `server.js` - Backend server
- `.gitignore` - Git configuration

### Source Code
- `src/` - All application code
- `public/` - Public assets
- `supabase/` - Database schema

### Environment & Deployment
- `.env` - Local development config
- `.env.production` - Production config
- `netlify.toml` - Netlify deployment
- `netlify/functions/` - Serverless functions

### Documentation
- `README.md` - Project documentation
- `ADMIN_ACCESS.md` - Admin guide
- `ADMIN_SEPARATION_GUIDE.md` - Security guide
- `FAQ_MANAGEMENT_GUIDE.md` - FAQ guide
- `GOOGLE_GEMINI_SETUP.md` - AI setup
- `NETLIFY_DEPLOYMENT.md` - Deploy guide
- `SUPABASE_SETUP.md` - Database guide

### Utility Files
- `run-admin.bat` - Admin launcher
- `setup-sample-faqs.js` - FAQ seeder
- `faqs-import.csv` - Sample FAQs
- `insert-faqs-directly.sql` - SQL imports
- `fix-rls-policies.sql` - Database fixes
- `create-admin-user.js` - Admin creation
- `test-gemini.js` - API tester

## ❌ Files to REMOVE

### Old Environment Files
- `.env.backup`
- `.env.example`
- `.env.new`
- `.env.template`
- `.env.updated`

### Anthropic/Old AI Files
- `ANTHROPIC_SETUP.md`
- `test-api.js`
- `EMBEDDINGS_SETUP.md`

### Debug/Test Files
- `test-all-models.js`
- `list-models.js`
- `check-api-key.js`
- `check-rls-policies.js`

### Setup Scripts (Already Used)
- `create-env.js`
- `setup-env.ps1`

### Old Planning Files
- `masterplan.md`
- `tasks.md`
- `supabase-api-keys-guide.md`

## 🧹 To Clean Up

Run the cleanup script:
```bash
cleanup-files.bat
```

Or manually delete the files listed above.

## 📁 Final Structure

After cleanup, your project will have:
- Clean, organized file structure
- Only necessary files
- Clear documentation
- No redundant configs
