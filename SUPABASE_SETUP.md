# Supabase Setup Guide for KnowledgeBase Bot

Follow these steps to set up Supabase for your KnowledgeBase Bot application.

## Step 1: Create a Supabase Account and Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign up"
3. Create a new account (you can use GitHub, Google, or email)
4. Once logged in, click "New project"
5. Fill in the project details:
   - **Name**: KnowledgeBase Bot (or any name you prefer)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Select the closest region to you
   - **Pricing Plan**: Free tier is sufficient for this project
6. Click "Create new project" and wait for it to be provisioned (takes about 2 minutes)

## Step 2: Run the Database Schema

1. Once your project is ready, go to the **SQL Editor** (icon looks like `</>` in the left sidebar)
2. Click "New query"
3. Copy the entire contents of `supabase/schema.sql` from your project
4. Paste it into the SQL editor
5. Click "Run" or press `Ctrl+Enter`
6. You should see "Success. No rows returned" - this means the tables and policies were created successfully

## Step 3: Get Your API Keys

1. Go to **Settings** (gear icon in the left sidebar)
2. Click on **API** in the settings menu
3. You'll see two important values:
   - **Project URL**: Something like `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public**: A long string starting with `eyJ...`
4. Keep this page open, you'll need these values

## Step 4: Configure Environment Variables

1. In your project root, create a new file called `.env`
2. Copy these values into the file:

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your-anon-key-here...
```

Replace the values with your actual Project URL and anon key from Step 3.

## Step 5: Create an Admin User

1. In Supabase dashboard, go to **Authentication** (user icon in the left sidebar)
2. Click on **Users** tab
3. Click **Add user** → **Create new user**
4. Fill in:
   - **Email**: your-admin-email@example.com
   - **Password**: choose a secure password
   - Leave "Auto Confirm User?" checked
5. Click "Create user"

## Step 6: Restart Your Development Server

1. Stop the current dev server (Ctrl+C in the terminal)
2. Run `npm run dev` again
3. The application should now connect to Supabase successfully!

## Testing Your Setup

1. Go to http://localhost:5173/
2. You should see the homepage with:
   - FAQ section (empty initially)
   - Chat interface
3. Click "Admin Sign In" and use the credentials from Step 5
4. In the admin dashboard, try adding some FAQs
5. Go back to the homepage and test the chat with questions matching your FAQs

## Troubleshooting

- **"Missing Supabase environment variables" error**: Make sure your `.env` file is in the project root and contains the correct values
- **Authentication errors**: Double-check your admin email and password
- **Database errors**: Ensure the SQL schema was run successfully in Step 2
- **CORS errors**: Make sure you're using the correct Project URL (not the Studio URL)

## Next Steps

- Add more FAQs through the admin panel
- Test the chatbot with various questions
- Check the "Unanswered Queries" tab to see questions without matches
- Deploy your application when ready!
