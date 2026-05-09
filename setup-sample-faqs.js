import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const sampleFAQs = [
  {
    question: "What is SagotBuddy?",
    answer: "SagotBuddy is your AI-powered assistant that helps you find answers quickly from our knowledge base. It uses advanced AI to understand your questions and provide accurate, helpful responses."
  },
  {
    question: "How do I use the chatbot?",
    answer: "Simply type your question in the chat box and press Enter or click Send. SagotBuddy will analyze your question and provide the best answer from our knowledge base."
  },
  {
    question: "What are your business hours?",
    answer: "Our AI assistant SagotBuddy is available 24/7 to answer your questions. For human support, we're available Monday to Friday, 9 AM to 5 PM EST."
  },
  {
    question: "How accurate are the answers?",
    answer: "SagotBuddy uses Google's Gemini AI combined with our curated FAQ database to provide highly accurate answers. The system learns from your FAQs to give contextual responses."
  },
  {
    question: "Can I update the FAQs?",
    answer: "Yes! Administrators can add, edit, or delete FAQs through the Admin panel. Simply log in with your admin credentials to manage the knowledge base."
  }
];

async function setupSampleFAQs() {
  console.log('Setting up sample FAQs...\n');

  for (const faq of sampleFAQs) {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .insert([faq])
        .select();

      if (error) {
        console.error(`❌ Error adding FAQ: "${faq.question}"`);
        console.error(error.message);
      } else {
        console.log(`✅ Added FAQ: "${faq.question}"`);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  }

  console.log('\n✨ Sample FAQs setup complete!');
  console.log('Visit http://localhost:5173/admin to manage your FAQs');
}

// Run the setup
setupSampleFAQs();
