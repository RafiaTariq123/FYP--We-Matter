import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Simple test to verify Gemini API works
const testGemini = async () => {
  try {
    console.log('Environment variables loaded:');
    console.log('GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
    console.log('GEMINI_API_KEY value:', process.env.GEMINI_API_KEY?.substring(0, 20) + '...');
    
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY is not defined in environment variables');
      console.log('Available env vars starting with GEMINI:', Object.keys(process.env).filter(k => k.startsWith('GEMINI')));
      return;
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try without specifying model (use default)
    try {
      console.log('Trying without model specification...');
      const model = genAI.getGenerativeModel({ });
      
      const result = await model.generateContent('Hello, how are you?');
      const response = await result.response;
      const text = response.text();
      
      console.log('✅ Success with default model! Response:', text);
      return;
      
    } catch (error) {
      console.log('❌ Default model failed:', error.message);
    }
    
    // Try different model names to find one that works
    const modelNames = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro', 'gemini-pro-latest', 'gemini-pro'];
    
    for (const modelName of modelNames) {
      try {
        console.log(`Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const result = await model.generateContent('Hello, how are you?');
        const response = await result.response;
        const text = response.text();
        
        console.log(`✅ Success with ${modelName}! Response:`, text);
        return; // Stop at first working model
        
      } catch (error) {
        console.log(`❌ ${modelName} failed: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  }
};

testGemini();
