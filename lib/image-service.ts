/**
 * Image Generation Service
 * Supports multiple image generation providers (DALL-E, Stable Diffusion, etc.)
 * Configure via environment variables
 */

type ImageProvider = 'dalle' | 'stability' | 'replicate' | 'stable-diffusion' | 'mock' | 'custom';

interface ImageConfig {
  provider: ImageProvider;
  apiKey: string;
  model?: string;
  baseURL?: string;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  id: string;
}

export async function generateImage(prompt: string): Promise<GeneratedImage> {
  try {
    const config = getImageConfig();

    switch (config.provider) {
      case 'dalle':
        return await generateDALLEImage(prompt, config);
      case 'stability':
        return await generateStabilityImage(prompt, config);
      case 'replicate':
        return await generateReplicateImage(prompt, config);
      case 'stable-diffusion':
        return await generateStableDiffusionImage(prompt, config);
      case 'mock':
        return await generateMockImage(prompt, config);
      case 'custom':
        return await generateCustomImage(prompt, config);
      default:
        throw new Error(`Unsupported image provider: ${config.provider}`);
    }
  } catch (error) {
    // Re-throw with more context
    if (error instanceof Error) {
      throw new Error(`Image generation failed: ${error.message}`);
    }
    throw error;
  }
}

function getImageConfig(): ImageConfig {
  try {
    // In Edge Runtime, process.env should be available via Next.js
    // Access it with proper typing
    const env = (typeof process !== 'undefined' && process.env ? process.env : {}) as Record<string, string | undefined>;
    
    const provider = (env.IMAGE_PROVIDER || 'mock') as ImageProvider; // Default to mock for safety
    const apiKey = env.IMAGE_API_KEY || env.LLM_API_KEY;

    // Mock provider doesn't need an API key
    if (provider !== 'mock' && !apiKey) {
      throw new Error('IMAGE_API_KEY or LLM_API_KEY environment variable is required');
    }

    return {
      provider,
      apiKey: apiKey || '',
      model: env.IMAGE_MODEL,
      baseURL: env.IMAGE_BASE_URL,
    };
  } catch (error) {
    // If config fails, default to mock
    console.warn('Failed to get image config, defaulting to mock:', error);
    return {
      provider: 'mock',
      apiKey: '',
    };
  }
}

async function generateDALLEImage(prompt: string, config: ImageConfig): Promise<GeneratedImage> {
  const model = config.model || 'dall-e-3';
  const baseURL = config.baseURL || 'https://api.openai.com/v1';

  const response = await fetch(`${baseURL}/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model,
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`DALL-E API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const imageUrl = data.data[0]?.url;

  if (!imageUrl) {
    throw new Error('No image URL returned from DALL-E API');
  }

  return {
    url: imageUrl,
    prompt,
    id: `dalle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
}

async function generateMockImage(prompt: string, config: ImageConfig): Promise<GeneratedImage> {
  // Generate a simple placeholder image for development/testing
  // No API key needed - perfect for testing the UI without making real API calls
  
  try {
    // Create a simple SVG placeholder with the prompt text
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
      '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52BE80'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Escape HTML entities in prompt for safety
    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };
    
    const promptText = escapeHtml(prompt.substring(0, 50)) + (prompt.length > 50 ? '...' : '');
    
    // Create an SVG image with gradient and text
    const svg = `<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${color};stop-opacity:1" /><stop offset="100%" style="stop-color:${color}88;stop-opacity:1" /></linearGradient></defs><rect width="1024" height="1024" fill="url(#grad)"/><text x="50%" y="45%" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">Mock Image</text><text x="50%" y="55%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.9">${promptText}</text><text x="50%" y="70%" font-family="Arial, sans-serif" font-size="18" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.7">(Development Mode)</text></svg>`;
    
    // Convert SVG to data URL (Edge Runtime compatible - no Buffer)
    // Use encodeURIComponent instead of base64 for Edge Runtime compatibility
    const imageUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    
    // Generate ID without using Date.now() which might have issues
    const id = `mock-${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 9)}`;

    return {
      url: imageUrl,
      prompt,
      id,
    };
  } catch (error) {
    // If anything fails, return a simple fallback
    const fallbackUrl = `data:image/svg+xml,${encodeURIComponent('<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg"><rect width="1024" height="1024" fill="#FF6B6B"/><text x="50%" y="50%" font-size="32" fill="white" text-anchor="middle" dominant-baseline="middle">Mock Image</text></svg>')}`;
    return {
      url: fallbackUrl,
      prompt,
      id: `mock-fallback-${Math.random().toString(36).substr(2, 9)}`,
    };
  }
}

async function generateStabilityImage(prompt: string, config: ImageConfig): Promise<GeneratedImage> {
  // Stability AI API - simple API key authentication
  const model = config.model || 'stable-diffusion-xl-1024-v1-0';
  const baseURL = config.baseURL || 'https://api.stability.ai';

  const response = await fetch(`${baseURL}/v1/generation/${model}/text-to-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      text_prompts: [
        {
          text: prompt,
          weight: 1,
        },
      ],
      cfg_scale: 7,
      height: 1024,
      width: 1024,
      steps: 30,
      samples: 1,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Stability AI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  
  // Stability AI returns base64 encoded images
  const imageBase64 = data.artifacts?.[0]?.base64;
  
  if (!imageBase64) {
    throw new Error('No image data returned from Stability AI API');
  }

  // Convert base64 to data URL
  const imageUrl = `data:image/png;base64,${imageBase64}`;

  return {
    url: imageUrl,
    prompt,
    id: `stability-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
}

async function generateReplicateImage(prompt: string, config: ImageConfig): Promise<GeneratedImage> {
  // Replicate API - simple API key authentication
  // Default model: Stable Diffusion XL
  const model = config.model || 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b';
  const baseURL = config.baseURL || 'https://api.replicate.com';

  // Create a prediction
  const createResponse = await fetch(`${baseURL}/v1/predictions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${config.apiKey}`,
    },
    body: JSON.stringify({
      version: model.includes(':') ? model.split(':')[1] : model,
      input: {
        prompt: prompt,
        width: 1024,
        height: 1024,
      },
    }),
  });

  if (!createResponse.ok) {
    const error = await createResponse.text();
    throw new Error(`Replicate API error (create): ${createResponse.status} - ${error}`);
  }

  const prediction = await createResponse.json();
  const predictionId = prediction.id;

  if (!predictionId) {
    throw new Error('No prediction ID returned from Replicate API');
  }

  // Poll for completion (Vercel supports Node.js runtime with setTimeout)
  const maxAttempts = 60; // 5 minutes max (60 * 5 seconds)
  let attempts = 0;

  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

    const statusResponse = await fetch(`${baseURL}/v1/predictions/${predictionId}`, {
      headers: {
        'Authorization': `Token ${config.apiKey}`,
      },
    });

    if (!statusResponse.ok) {
      const error = await statusResponse.text();
      throw new Error(`Replicate API error (status): ${statusResponse.status} - ${error}`);
    }

    const statusData = await statusResponse.json();

    if (statusData.status === 'succeeded') {
      const imageUrl = statusData.output?.[0] || statusData.output;
      if (!imageUrl) {
        throw new Error('No image URL in Replicate response');
      }
      return {
        url: imageUrl,
        prompt,
        id: `replicate-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
    } else if (statusData.status === 'failed' || statusData.status === 'canceled') {
      throw new Error(`Replicate prediction failed: ${statusData.error || 'Unknown error'}`);
    }

    attempts++;
  }

  throw new Error('Replicate prediction timed out after 5 minutes');
}

async function generateStableDiffusionImage(
  prompt: string,
  config: ImageConfig
): Promise<GeneratedImage> {
  if (!config.baseURL) {
    throw new Error('IMAGE_BASE_URL is required for Stable Diffusion provider');
  }

  const response = await fetch(config.baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      prompt,
      model: config.model,
      width: 1024,
      height: 1024,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Stable Diffusion API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const imageUrl = data.image || data.url || data.output?.[0];

  if (!imageUrl) {
    throw new Error('No image URL returned from Stable Diffusion API');
  }

  return {
    url: imageUrl,
    prompt,
    id: `sd-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
}

async function generateCustomImage(prompt: string, config: ImageConfig): Promise<GeneratedImage> {
  if (!config.baseURL) {
    throw new Error('IMAGE_BASE_URL is required for custom image provider');
  }

  const response = await fetch(config.baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      prompt,
      model: config.model,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Custom Image API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const imageUrl = data.url || data.image || data.output || data.data?.[0]?.url;

  if (!imageUrl) {
    throw new Error('No image URL returned from custom image API');
  }

  return {
    url: imageUrl,
    prompt,
    id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
}

