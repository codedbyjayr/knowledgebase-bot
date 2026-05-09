# Setting up Google Gemini API (FREE)

Google Gemini offers a **generous free tier** with no credit card required!

## Free Tier Limits
- ✅ **60 requests per minute**
- ✅ **1,500 requests per day**
- ✅ **1 million tokens per minute**
- ✅ No credit card needed

## Step 1: Get Your Google API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Choose **"Create API key in new project"** (or select existing project)
5. Copy your API key (starts with `AIza...`)

## Step 2: Add to Your .env File

Add this line to your `.env` file:
```
GOOGLE_API_KEY=AIza...your-key-here
```

## Step 3: Restart Your Servers

1. Stop all running servers (Ctrl+C)
2. Start the API server: `npm run server`
3. Start the frontend: `npm run dev`

## Testing Your Setup

1. Test the API directly:
   ```
   http://localhost:3001/api/test
   ```

2. Try the chatbot at http://localhost:5173/

## Gemini Models Available

- **gemini-pro**: Best for text generation (what we're using)
- **gemini-pro-vision**: For image + text inputs

## Benefits Over Other APIs

- **No payment required** - Completely free to start
- **High rate limits** - 60 requests/minute is very generous
- **Quality responses** - Gemini Pro provides excellent results
- **Easy setup** - Just need a Google account

## Troubleshooting

- **"API key not valid"**: Make sure you copied the complete key
- **Rate limit errors**: You're making too many requests (unlikely with 60/min limit)
- **CORS errors**: Make sure both servers are running

## Cost After Free Tier (Optional)

If you exceed the free tier (unlikely for a small app):
- $0.00025 per 1K characters input
- $0.0005 per 1K characters output

But the free tier is more than enough for most applications!
