# Gallery Wall

A Next.js application where you can create a virtual gallery wall by generating AI images through prompts. Add framed pictures to your wall and build your own collection!

## Features

- 🖼️ **Gallery Wall Interface** - Full-screen wall with framed pictures
- 🎨 **AI Image Generation** - Generate images using DALL-E, Stability AI, Replicate, or custom providers
- ☁️ **Cloudflare Pages Ready** - Works perfectly with API key-based authentication
- 💾 **Local Storage** - Your pictures are saved locally in your browser
- 🎯 **Simple Prompting** - Just describe what you want to see
- 📱 **Responsive Design** - Works beautifully on all devices
- 🌓 **Dark Mode** - Automatic dark mode support

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   Create a `.env.local` file in the root directory with the following:

   ```env
   # Image Generation Configuration
   # Set the provider: 'mock', 'dalle', 'stability', 'replicate', 'stable-diffusion', or 'custom'
   # For development/testing: 'mock' (no API key needed!)
   # Recommended for Cloudflare Pages: 'dalle', 'stability', or 'replicate'
   IMAGE_PROVIDER=mock

   # Your API key (required for most providers, NOT needed for 'mock')
   # For DALL-E: OpenAI API key from https://platform.openai.com/api-keys
   # For Stability AI: API key from https://platform.stability.ai/account/keys
   # For Replicate: API key from https://replicate.com/account/api-tokens
   # IMAGE_API_KEY=your_api_key_here

   # Optional: Model name (defaults to provider-specific defaults)
   # For DALL-E: dall-e-3, dall-e-2
   # For Stability AI: stable-diffusion-xl-1024-v1-0, stable-diffusion-xl-base-1.0
   # For Replicate: stability-ai/sdxl, stability-ai/flux-1.1-pro
   # IMAGE_MODEL=dall-e-3

   # Optional: Custom base URL (only needed for 'stable-diffusion' or 'custom' provider)
   # IMAGE_BASE_URL=
   ```

3. **Run the development server:**
```bash
npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Supported Image Providers

### Mock (Development/Testing) 🧪
- Set `IMAGE_PROVIDER=mock`
- **No API key required!** Perfect for testing the UI without making real API calls
- Generates a simple placeholder image with your prompt text
- Great for development, demos, or when you don't want to spend API credits
- Example: `IMAGE_PROVIDER=mock` (no other config needed)

### DALL-E (OpenAI) ⭐ Recommended for Cloudflare Pages
- Set `IMAGE_PROVIDER=dalle`
- Get your API key from [OpenAI](https://platform.openai.com/api-keys)
- Default model: `dall-e-3`
- Uses the same API key as OpenAI's chat models
- Simple API key authentication - perfect for Cloudflare Pages
- Example: `IMAGE_MODEL=dall-e-2` (for older model)

### Stability AI ⭐ Recommended for Cloudflare Pages
- Set `IMAGE_PROVIDER=stability`
- Get your API key from [Stability AI](https://platform.stability.ai/account/keys)
- Default model: `stable-diffusion-xl-1024-v1-0`
- Simple API key authentication - perfect for Cloudflare Pages
- High-quality Stable Diffusion models
- Example: `IMAGE_MODEL=stable-diffusion-xl-1024-v1-0`

### Replicate ⭐ Recommended for Cloudflare Pages
- Set `IMAGE_PROVIDER=replicate`
- Get your API key from [Replicate](https://replicate.com/account/api-tokens)
- Default model: `stability-ai/sdxl` (Stable Diffusion XL)
- Simple API key authentication - perfect for Cloudflare Pages
- Access to many different models (Stable Diffusion, Flux, etc.)
- Example: `IMAGE_MODEL=stability-ai/flux-1.1-pro`

### Stable Diffusion (Generic)
- Set `IMAGE_PROVIDER=stable-diffusion`
- Requires `IMAGE_BASE_URL` pointing to your Stable Diffusion API endpoint
- Get API access from providers like [Replicate](https://replicate.com), [Stability AI](https://platform.stability.ai), or self-hosted
- Example: `IMAGE_BASE_URL=https://api.replicate.com/v1/predictions`

### Custom Image Provider
- Set `IMAGE_PROVIDER=custom`
- Requires `IMAGE_BASE_URL` with your custom endpoint
- Adjust the request/response format in `lib/image-service.ts` as needed

## How to Use

1. **Add a Picture**: Click the "+" button (or "Add First Picture" if your wall is empty)
2. **Enter a Prompt**: Describe the image you want to generate (e.g., "a serene mountain landscape at sunset, oil painting style")
3. **Generate**: Click "Add to Wall" and wait for your image to be generated
4. **View Your Gallery**: Your pictures appear as framed artwork on the wall
5. **Remove Pictures**: Hover over a picture and click the "×" button to remove it

## Project Structure

```
wall/
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts           # API route for LLM interactions (legacy)
│   │   └── generate-image/
│   │       └── route.ts           # API route for image generation
│   ├── page.tsx                   # Gallery wall interface
│   └── layout.tsx                  # Root layout
├── lib/
│   ├── image-service.ts           # Image generation service
│   └── llm-service.ts             # LLM service (legacy, for text generation)
└── .env.local                     # Environment variables (create this)
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Data Storage

Pictures are stored in your browser's `localStorage`. This means:
- ✅ Your gallery persists between sessions
- ✅ No server-side storage needed
- ⚠️ Clearing browser data will remove your gallery
- ⚠️ Gallery is specific to each browser/device

## Deploying to Cloudflare Pages

This app is perfect for Cloudflare Pages! Here's how to deploy:

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect to Cloudflare Pages**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) > Pages
   - Click "Create a project" > "Connect to Git"
   - Select your repository

3. **Configure Build Settings**:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`

4. **Add Environment Variables**:
   - In Cloudflare Pages settings, go to "Environment variables"
   - Add your image generation API key:
     - `IMAGE_PROVIDER` = `dalle` (or `stability` or `replicate`)
     - `IMAGE_API_KEY` = `your_api_key_here`
     - Optionally: `IMAGE_MODEL` = `dall-e-3` (or your preferred model)

5. **Deploy!**
   - Cloudflare will automatically build and deploy your app
   - Your gallery wall will be live with API key authentication

**Recommended Providers for Cloudflare Pages:**
- ✅ **DALL-E** - Simple, reliable, great quality
- ✅ **Stability AI** - High-quality Stable Diffusion models
- ✅ **Replicate** - Access to many different models
- ✅ **Mock** - Perfect for testing (no API key needed)

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your API keys secure
- Image generation APIs may have usage costs - check your provider's pricing
- Consider implementing rate limiting for production use

## Tips for Better Images

- Be specific about style, mood, and composition
- Include artistic style keywords (e.g., "oil painting", "watercolor", "photorealistic")
- Mention lighting and atmosphere (e.g., "golden hour", "dramatic lighting")
- Specify subject details (e.g., "a red barn", "snowy mountains")
