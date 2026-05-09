import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing Google Gemini API...');
console.log('API Key exists:', !!process.env.GOOGLE_API_KEY);

if (!process.env.GOOGLE_API_KEY) {
  console.error('ERROR: GOOGLE_API_KEY not found in .env file');
  console.log('\nPlease add your Google API key to .env:');
  console.log('GOOGLE_API_KEY=AIza...');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function testGemini() {
  try {
    console.log('\nTesting Gemini 2.5 Flash model...');
    
    const prompt = "Say hello and tell me you're working!";
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    console.log('\n✅ SUCCESS! Gemini responded:');
    console.log(response);
    
    // Test with a more complex prompt
    console.log('\n\nTesting with FAQ context...');
    const faqPrompt = `You are a helpful customer support assistant. 
    
Here's an FAQ:
Q: What are your hours?
A: We're open Monday to Friday, 9 AM to 5 PM.

User asks: When are you open?

Please answer based on the FAQ.`;
    
    const faqResult = await model.generateContent(faqPrompt);
    console.log('\n✅ FAQ Response:');
    console.log(faqResult.response.text());
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nPossible issues:');
    console.error('1. Invalid API key');
    console.error('2. API key not activated');
    console.error('3. Network issues');
  }
}

testGemini();
