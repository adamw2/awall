import { NextRequest, NextResponse } from 'next/server';
import { callLLM } from '@/lib/llm-service';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    const response = await callLLM(message);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error calling LLM:', error);
    return NextResponse.json(
      { error: 'Failed to get response from LLM' },
      { status: 500 }
    );
  }
}

