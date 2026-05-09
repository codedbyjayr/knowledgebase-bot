@echo off
echo Cleaning up unnecessary files...
echo.

REM Remove old .env files (keeping only .env and .env.production)
del .env.backup 2>nul
del .env.example 2>nul
del .env.new 2>nul
del .env.template 2>nul
del .env.updated 2>nul

REM Remove Anthropic-related files (we're using Gemini now)
del ANTHROPIC_SETUP.md 2>nul
del test-api.js 2>nul

REM Remove old embedding setup (not using embeddings)
del EMBEDDINGS_SETUP.md 2>nul

REM Remove test files that were for debugging
del test-all-models.js 2>nul
del list-models.js 2>nul
del check-api-key.js 2>nul
del check-rls-policies.js 2>nul

REM Remove setup scripts that have been run
del create-env.js 2>nul
del setup-env.ps1 2>nul

REM Remove old planning files
del masterplan.md 2>nul
del tasks.md 2>nul
del supabase-api-keys-guide.md 2>nul

echo.
echo Cleanup complete! Removed unnecessary files.
echo.
echo Keeping:
echo - .env (your configuration)
echo - .env.production (for deployment)
echo - Source code (src/)
echo - Server files
echo - Deployment configs
echo - Documentation guides
echo - FAQ import files
pause
