import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const listAvailableModels = async () => {
  try {
    console.log('🔍 Listing available Gemini models...');
    console.log('API Key:', process.env.GEMINI_API_KEY?.substring(0, 20) + '...');
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try to list models using the API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + process.env.GEMINI_API_KEY);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Available models:');
      
      if (data.models) {
        data.models.forEach(model => {
          console.log(`- ${model.name} (${model.displayName})`);
          console.log(`  Supported methods: ${model.supportedGenerationMethods?.join(', ') || 'None'}`);
        });
      } else {
        console.log('No models found in response');
      }
    } else {
      console.log('❌ Error listing models:', response.status, response.statusText);
      const errorText = await response.text();
      console.log('Error details:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

listAvailableModels();
