import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  // Use Response directly to ensure we always return JSON
  try {
    let body: any;
    try {
      body = await request.json();
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Prompt is required and must be a string' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check provider - if mock, generate inline to avoid import issues
    const provider = (process.env.IMAGE_PROVIDER || 'mock') as string;
    
    let image;
    if (provider === 'mock') {
      // Inline mock image generation to avoid import issues
      try {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52BE80'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const promptText = prompt.substring(0, 50) + (prompt.length > 50 ? '...' : '');
        const svg = `<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${color};stop-opacity:1"/><stop offset="100%" style="stop-color:${color}88;stop-opacity:1"/></linearGradient></defs><rect width="1024" height="1024" fill="url(#g)"/><text x="50%" y="45%" font-family="Arial" font-size="32" font-weight="bold" fill="white" text-anchor="middle">Mock Image</text><text x="50%" y="55%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" opacity="0.9">${promptText.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</text><text x="50%" y="70%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" opacity="0.7">(Development Mode)</text></svg>`;
        const imageUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
        image = {
          url: imageUrl,
          prompt,
          id: `mock-${Math.random().toString(36).substr(2, 9)}`,
        };
      } catch (mockError: any) {
        return new Response(
          JSON.stringify({ 
            error: 'Failed to generate mock image',
            details: mockError?.message,
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    } else {
      // For other providers, use the image service
      let generateImage: (prompt: string) => Promise<any>;
      try {
        const imageService = await import('@/lib/image-service');
        generateImage = imageService.generateImage;
      } catch (importError: any) {
        const errorMsg = importError?.message || 'Unknown import error';
        console.error('Failed to import image service:', errorMsg);
        return new Response(
          JSON.stringify({ 
            error: 'Failed to load image service module',
            details: errorMsg,
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      try {
        image = await generateImage(prompt);
      } catch (genError: any) {
        const errorMsg = genError?.message || 'Unknown generation error';
        console.error('Error in generateImage:', errorMsg);
        return new Response(
          JSON.stringify({ 
            error: 'Failed to generate image',
            details: errorMsg,
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }

    return new Response(
      JSON.stringify(image),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    // Final fallback - ensure we always return JSON
    const errorMsg = error?.message || String(error) || 'Unknown error';
    console.error('Unexpected error in POST handler:', errorMsg);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: errorMsg,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

