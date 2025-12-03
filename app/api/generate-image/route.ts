import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/lib/image-service';

// Vercel supports both Edge and Node.js runtime
// Using Node.js runtime for full compatibility with all image providers
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const image = await generateImage(prompt);

    return NextResponse.json(image);
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to generate image'
      },
      { status: 500 }
    );
  }
}

