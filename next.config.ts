import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude problematic modules from Edge Runtime bundling
  experimental: {
    serverComponentsExternalPackages: [],
  },
  webpack: (config, { isServer, webpack }) => {
    // For Edge Runtime, exclude Node.js built-in modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Ignore async_hooks in Edge Runtime builds
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^async_hooks$/,
      })
    );
    
    return config;
  },
};

export default nextConfig;
