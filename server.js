import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize clients
console.log('Initializing with environment variables:');
console.log('GOOGLE_API_KEY exists:', !!process.env.GOOGLE_API_KEY);
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL);

if (!process.env.GOOGLE_API_KEY) {
  console.error('ERROR: GOOGLE_API_KEY is not set in environment variables!');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

app.post('/api/chat', async (req, res) => {
  try {
    const { message, faqs } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create context from FAQs
    const faqContext = faqs && faqs.length > 0 
      ? `Here are some frequently asked questions and answers that might be relevant:\n\n${
          faqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')
        }\n\n`
      : '';

    // Call Gemini API with enhanced instructions
    const prompt = `You are a helpful customer support assistant for a knowledge base system.

${faqContext ? `First, check if any of these FAQs answer the user's question:\n${faqContext}` : 'No FAQs are available yet.'}

Instructions:
1. If an FAQ directly answers the question, use that information
2. If FAQs are related but not exact, synthesize a helpful answer using them
3. If no FAQs are relevant, provide a general helpful response
4. Be concise and friendly

User's question: ${message}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    res.json({ response });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      status: error.status
    });
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.message 
    });
  }
});

// Helper function for Gemini (if needed later)
async function generateResponse(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// Endpoint to generate and store embedding for a FAQ
app.post('/api/generate-embedding', async (req, res) => {
  try {
    const { faqId, question, answer } = req.body;

    if (!faqId || !question) {
      return res.status(400).json({ error: 'FAQ ID and question are required' });
    }

    // Generate embedding for the question and answer combined
    const textToEmbed = `Question: ${question}\nAnswer: ${answer || ''}`;
    const embedding = await generateEmbedding(textToEmbed);

    // Store embedding in database
    const { error } = await supabase
      .from('faqs')
      .update({ embedding })
      .eq('id', faqId);

    if (error) throw error;

    res.json({ success: true, message: 'Embedding generated and stored' });
  } catch (error) {
    console.error('Error generating embedding:', error);
    res.status(500).json({ error: 'Failed to generate embedding' });
  }
});

// Endpoint for semantic search
app.post('/api/search-semantic', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);

    // Search for similar FAQs using the Supabase function
    const { data, error } = await supabase.rpc('search_faqs_by_embedding', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: 5
    });

    if (error) throw error;

    res.json({ results: data || [] });
  } catch (error) {
    console.error('Error in semantic search:', error);
    res.status(500).json({ error: 'Failed to perform semantic search' });
  }
});

// Updated chat endpoint to use semantic search
app.post('/api/chat-semantic', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // First, perform semantic search
    const queryEmbedding = await generateEmbedding(message);
    const { data: relevantFaqs } = await supabase.rpc('search_faqs_by_embedding', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: 3
    });

    // Create context from relevant FAQs
    const faqContext = relevantFaqs && relevantFaqs.length > 0 
      ? `Here are the most relevant FAQs from our knowledge base:\n\n${
          relevantFaqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')
        }\n\n`
      : '';

    // Call Claude API with relevant context
    const completion = await anthropic.messages.create({
      model: 'claude-instant-1.2',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `You are a helpful customer support assistant for a knowledge base system. ${faqContext}Please provide a helpful and concise answer to the following question: ${message}`
      }]
    });

    const response = completion.content[0].text;
    res.json({ response, relevantFaqs });

  } catch (error) {
    console.error('Error in semantic chat:', error);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.message 
    });
  }
});

// Test endpoint to verify Google Gemini API
app.get('/api/test', async (req, res) => {
  try {
    console.log('Testing API key:', process.env.GOOGLE_API_KEY ? 'Key exists' : 'No key found');
    console.log('API key length:', process.env.GOOGLE_API_KEY?.length);
    
    const result = await model.generateContent('Say hello in a friendly way');
    const response = result.response.text();
    
    res.json({ 
      success: true, 
      response: response
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    
    res.status(500).json({ 
      error: 'API test failed', 
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
