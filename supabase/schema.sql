-- Create faqs table
CREATE TABLE faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL
);

-- Create unanswered_queries table
CREATE TABLE unanswered_queries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    query_text TEXT NOT NULL
);

-- Enable Row Level Security (RLS) on both tables
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE unanswered_queries ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Policy: Public can read FAQs
CREATE POLICY "Public can read FAQs" ON faqs
    FOR SELECT
    USING (true);

-- Policy: Only authenticated users can insert/update/delete FAQs
CREATE POLICY "Authenticated users can insert FAQs" ON faqs
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update FAQs" ON faqs
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete FAQs" ON faqs
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- Policy: Public can insert unanswered queries
CREATE POLICY "Public can log unanswered questions" ON unanswered_queries
    FOR INSERT
    WITH CHECK (true);

-- Policy: Only authenticated users can read/delete unanswered queries
CREATE POLICY "Authenticated users can read unanswered queries" ON unanswered_queries
    FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete unanswered queries" ON unanswered_queries
    FOR DELETE
    USING (auth.role() = 'authenticated');
