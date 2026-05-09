-- Drop existing policies
DROP POLICY IF EXISTS "Public can read FAQs" ON faqs;
DROP POLICY IF EXISTS "Authenticated users can insert FAQs" ON faqs;
DROP POLICY IF EXISTS "Authenticated users can update FAQs" ON faqs;
DROP POLICY IF EXISTS "Authenticated users can delete FAQs" ON faqs;

-- Create new, simpler policies for development
-- Allow authenticated users to do everything with FAQs
CREATE POLICY "Authenticated users can do everything" ON faqs
    FOR ALL
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- Allow public to read FAQs
CREATE POLICY "Public can read FAQs" ON faqs
    FOR SELECT
    USING (true);

-- For unanswered_queries
DROP POLICY IF EXISTS "Public can log unanswered questions" ON unanswered_queries;
DROP POLICY IF EXISTS "Authenticated users can read unanswered queries" ON unanswered_queries;
DROP POLICY IF EXISTS "Authenticated users can delete unanswered queries" ON unanswered_queries;

-- Allow authenticated users to manage unanswered queries
CREATE POLICY "Authenticated users can manage queries" ON unanswered_queries
    FOR ALL
    USING (auth.uid() IS NOT NULL)
    WITH CHECK (auth.uid() IS NOT NULL);

-- Allow public to insert unanswered queries
CREATE POLICY "Public can insert queries" ON unanswered_queries
    FOR INSERT
    WITH CHECK (true);
