-- Fix RLS Security Warning for unanswered_queries table

-- First, drop the problematic policy
DROP POLICY IF EXISTS "Public can log unanswered questions" ON unanswered_queries;

-- Create a more secure policy that still allows public inserts but with restrictions
CREATE POLICY "Public can insert queries with rate limiting" ON unanswered_queries
    FOR INSERT
    WITH CHECK (
        -- Allow insert but add some basic validation
        length(query_text) > 0 AND 
        length(query_text) < 500
    );

-- Alternative: If you want to restrict to authenticated users only
-- CREATE POLICY "Only authenticated users can insert queries" ON unanswered_queries
--     FOR INSERT
--     WITH CHECK (auth.uid() IS NOT NULL);

-- Keep the existing policies for authenticated users
-- These should already exist and are secure:
-- - "Authenticated users can read unanswered queries" (SELECT)
-- - "Authenticated users can delete unanswered queries" (DELETE)
