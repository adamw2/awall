/**
 * Generic LLM Service
 * Supports multiple LLM providers (OpenAI, Anthropic, etc.)
 * Configure via environment variables
 */

type LLMProvider = 'openai' | 'anthropic' | 'custom';

interface LLMConfig {
  provider: LLMProvider;
  apiKey: string;
  model?: string;
  baseURL?: string;
}

export async function callLLM(prompt: string): Promise<string> {
  const config = getLLMConfig();

  switch (config.provider) {
    case 'openai':
      return callOpenAI(prompt, config);
    case 'anthropic':
      return callAnthropic(prompt, config);
    case 'custom':
      return callCustomLLM(prompt, config);
    default:
      throw new Error(`Unsupported LLM provider: ${config.provider}`);
  }
}

function getLLMConfig(): LLMConfig {
  const provider = (process.env.LLM_PROVIDER || 'openai') as LLMProvider;
  const apiKey = process.env.LLM_API_KEY;

  if (!apiKey) {
    throw new Error('LLM_API_KEY environment variable is required');
  }

  return {
    provider,
    apiKey,
    model: process.env.LLM_MODEL,
    baseURL: process.env.LLM_BASE_URL,
  };
}

async function callOpenAI(prompt: string, config: LLMConfig): Promise<string> {
  const model = config.model || 'gpt-3.5-turbo';
  const baseURL = config.baseURL || 'https://api.openai.com/v1';

  const response = await fetch(`${baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No response generated';
}

async function callAnthropic(prompt: string, config: LLMConfig): Promise<string> {
  const model = config.model || 'claude-3-5-sonnet-20241022';
  const baseURL = config.baseURL || 'https://api.anthropic.com/v1';

  const response = await fetch(`${baseURL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.content[0]?.text || 'No response generated';
}

async function callCustomLLM(prompt: string, config: LLMConfig): Promise<string> {
  if (!config.baseURL) {
    throw new Error('LLM_BASE_URL is required for custom LLM provider');
  }

  // Generic fetch for custom LLM endpoints
  // Adjust the request format based on your custom LLM API
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
    throw new Error(`Custom LLM API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  // Adjust based on your custom LLM response format
  return data.response || data.text || data.content || 'No response generated';
}

