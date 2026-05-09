# Supabase Edge Functions

This directory contains Supabase Edge Functions for the KnowledgeBase Bot.

## Deploying the search-faqs Function

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Deploy the function:
   ```bash
   supabase functions deploy search-faqs
   ```

## Alternative: Direct Implementation

If you prefer not to use Edge Functions, you can implement the search directly in the frontend using Supabase queries. The Chatbot component has been designed to work with either approach.
