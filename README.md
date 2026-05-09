# KnowledgeBase Bot

An intelligent chatbot that provides instant answers to frequently asked questions from a managed knowledge base. Unanswered user queries are automatically captured for admin review, ensuring the bot's knowledge continually improves.

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Once your project is created, go to the SQL Editor
3. Copy and paste the contents of `supabase/schema.sql` and run it
4. Go to Settings > API and copy your:
   - Project URL
   - Anon/Public API Key

### 2. Environment Setup

1. Create a `.env` file in the root directory:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Create Admin User

1. Go to Authentication > Users in your Supabase dashboard
2. Click "Invite User" or "Create User"
3. Enter an email and password for your admin account

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Development Server

```bash
npm run dev
```

## Project Structure

- `/src/lib/supabaseClient.js` - Supabase client configuration
- `/src/pages/SignIn.jsx` - Admin authentication page
- `/src/pages/AdminDashboard.jsx` - Admin dashboard for managing FAQs
- `/src/pages/HomePage.jsx` - Public-facing page with FAQ list and chatbot
- `/src/components/Chatbot.jsx` - Chat interface component

## Features

- **Admin Panel**: Secure authentication and full CRUD operations for FAQs
- **Public Chat Interface**: Interactive chatbot that searches FAQs
- **Unanswered Query Logging**: Automatically captures questions without answers
- **Admin Review**: Dashboard section to review unanswered queries
