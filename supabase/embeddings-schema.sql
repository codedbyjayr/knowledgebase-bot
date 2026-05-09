-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding column to faqs table
ALTER TABLE faqs 
ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- Create an index for faster similarity search
CREATE INDEX IF NOT EXISTS faqs_embedding_idx 
ON faqs 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create a function to search FAQs by similarity
CREATE OR REPLACE FUNCTION search_faqs_by_embedding(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  question text,
  answer text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    f.question,
    f.answer,
    1 - (f.embedding <=> query_embedding) AS similarity
  FROM faqs f
  WHERE f.embedding IS NOT NULL
    AND 1 - (f.embedding <=> query_embedding) > match_threshold
  ORDER BY f.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION search_faqs_by_embedding TO anon, authenticated;
