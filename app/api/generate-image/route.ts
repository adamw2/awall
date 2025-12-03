import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Wrapper to ensure all errors return JSON
async function safeHandler(request: NextRequest) {
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

    // Dynamically import to catch module loading errors
    let generateImage;
    try {
      const imageService = await import('@/lib/image-service');
      generateImage = imageService.generateImage;
    } catch (importError) {
      console.error('Failed to import image service:', importError);
      return NextResponse.json(
        { error: 'Failed to load image service module' },
        { status: 500 }
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('Error generating image:', errorMessage);
    if (errorStack) {
      console.error('Stack trace:', errorStack);
    }
    
    return NextResponse.json(
      { 
        error: errorMessage || 'Failed to generate image',
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

export async function POST(request: NextRequest) {
  try {
    return await safeHandler(request);
  } catch (error) {
    // Final fallback - if even the error handler fails, return basic JSON
    return NextResponse.json(
      { error: 'Internal server error' },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

