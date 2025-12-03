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

    // For Cloudflare Pages Edge Runtime, only mock provider is supported
    // Other providers require Node.js APIs that aren't available in Edge Runtime
    // Generate mock image inline to avoid any module imports that might cause issues
    let image;
    try {
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52BE80'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const promptText = prompt.substring(0, 50) + (prompt.length > 50 ? '...' : '');
      const svg = `<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${color};stop-opacity:1"/><stop offset="100%" style="stop-color:${color}88;stop-opacity:1"/></linearGradient></defs><rect width="1024" height="1024" fill="url(#g)"/><text x="50%" y="45%" font-family="Arial" font-size="32" font-weight="bold" fill="white" text-anchor="middle">Mock Image</text><text x="50%" y="55%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" opacity="0.9">${promptText.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</text><text x="50%" y="70%" font-family="Arial" font-size="18" fill="white" text-anchor="middle" opacity="0.7">(Development Mode)</text></svg>`;
      const imageUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      image = {
        url: imageUrl,
        prompt,
        id: `mock-${Math.random().toString(36).substring(2, 11)}`,
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

