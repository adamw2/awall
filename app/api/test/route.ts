export const runtime = 'edge';

export async function GET() {
  return new Response(
    JSON.stringify({ message: 'API route is working', timestamp: Date.now() }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return new Response(
      JSON.stringify({ 
        message: 'POST is working', 
        received: body,
        timestamp: Date.now() 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ 
        error: 'Failed to parse request',
        details: error?.message 
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

