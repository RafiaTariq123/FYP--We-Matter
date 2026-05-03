import { GoogleGenerativeAI } from '@google/generative-ai';

// Test script to find available Gemini models
const testGeminiModels = async () => {
  try {
    console.log('Testing Gemini models...');
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // List available models
    console.log('Available models:');
    // Note: This would require the listModels method, but let's try common model names
    
    const modelNames = [
      'gemini-pro',
      'gemini-1.0-pro',
      'gemini-1.5-flash',
      'gemini-1.5-pro'
    ];
    
    for (const modelName of modelNames) {
      try {
        console.log(`Testing model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Hello');
        const response = await result.response;
        console.log(`✅ ${modelName} works: ${response.text().substring(0, 50)}...`);
        break; // Stop at first working model
      } catch (error) {
        console.log(`❌ ${modelName} failed: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
};

testGeminiModels();
