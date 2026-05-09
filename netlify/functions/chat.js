// Use require for Netlify functions
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');

exports.handler = async function(event, context) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Debug: Check if environment variables are available
    if (!process.env.GOOGLE_API_KEY) {
      console.error('GOOGLE_API_KEY not found in environment');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API configuration error' })
      };
    }

    const { message, faqs } = JSON.parse(event.body);

    // Initialize clients
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    );

    // Create context from FAQs
    let context = "You are SagotBuddy, a helpful AI assistant. ";
    if (faqs && faqs.length > 0) {
      context += "Here are some FAQs you can reference:\n\n";
      faqs.forEach(faq => {
        context += `Q: ${faq.question}\nA: ${faq.answer}\n\n`;
      });
    }
    context += `\nUser question: ${message}\n\nProvide a helpful response. If the question matches an FAQ, use that information. Otherwise, provide a general helpful response.`;

    // Generate response
    const result = await model.generateContent(context);
    const response = result.response.text();

    // Log unanswered query if no FAQ match
    const faqMatch = faqs?.some(faq => 
      message.toLowerCase().includes(faq.question.toLowerCase()) ||
      faq.question.toLowerCase().includes(message.toLowerCase())
    );

    if (!faqMatch && faqs?.length > 0) {
      await supabase
        .from('unanswered_queries')
        .insert([{ query_text: message }]);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response })
    };
  } catch (error) {
    console.error('Error in chat function:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to get AI response',
        details: error.message,
        type: error.constructor.name
      })
    };
  }
}
