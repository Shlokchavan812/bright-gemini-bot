import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyCxElpRYzCP2q5yUT80MylOQHRXEeHa3sQ";

const genAI = new GoogleGenerativeAI(API_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export async function sendMessage(message: string): Promise<string> {
  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    throw new Error('Failed to get response from AI');
  }
}