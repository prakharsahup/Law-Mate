import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI('AIzaSyBoG7Vtk6d1_K81DyXPkUzJhresbbEELCQ');

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = messages[messages.length - 1].content;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Error in chat route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 