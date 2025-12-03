import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/lib/image-service';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const image = await generateImage(prompt);

    return NextResponse.json(image, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Ensure we always return valid JSON, even for unexpected errors
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('Error generating image:', errorMessage, errorStack);
    
    return NextResponse.json(
      { 
        error: errorMessage,
        ...(process.env.NODE_ENV === 'development' && errorStack ? { stack: errorStack } : {})
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

