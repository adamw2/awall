'use client';

import { useState, useEffect, useRef } from 'react';
import { GeneratedImage } from '@/lib/image-service';

type WallTexture = 'none' | 'brick' | 'wood' | 'plaster' | 'concrete' | 'lines';

interface WallSettings {
  backgroundColor: string;
  texture: WallTexture;
}

interface PictureWithPosition extends GeneratedImage {
  x: number;
  y: number;
  width: number;
  height: number;
}

const defaultSettings: WallSettings = {
  backgroundColor: '#FEF3C7', // amber-50
  texture: 'lines',
};

const DEFAULT_PICTURE_SIZE = 250;
const MIN_SIZE = 150;
const MAX_SIZE = 500;

type AddMode = 'generate' | 'upload';

export default function Home() {
  const [pictures, setPictures] = useState<PictureWithPosition[]>([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPrompt, setShowPrompt] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [wallSettings, setWallSettings] = useState<WallSettings>(defaultSettings);
  const [addMode, setAddMode] = useState<AddMode>('generate');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved pictures and settings from localStorage on mount
  useEffect(() => {
    const savedPictures = localStorage.getItem('wall-pictures');
    if (savedPictures) {
      try {
        const parsed = JSON.parse(savedPictures);
        // Ensure all pictures have position and size
        const picturesWithPosition = parsed.map((pic: any) => ({
          ...pic,
          x: pic.x ?? Math.random() * (window.innerWidth - DEFAULT_PICTURE_SIZE),
          y: pic.y ?? Math.random() * (window.innerHeight - DEFAULT_PICTURE_SIZE),
          width: pic.width ?? DEFAULT_PICTURE_SIZE,
          height: pic.height ?? DEFAULT_PICTURE_SIZE,
        }));
        setPictures(picturesWithPosition);
      } catch (e) {
        console.error('Failed to load saved pictures:', e);
      }
    }

    const savedSettings = localStorage.getItem('wall-settings');
    if (savedSettings) {
      try {
        setWallSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to load saved settings:', e);
      }
    }
  }, []);

  // Save pictures to localStorage whenever they change
  useEffect(() => {
    if (pictures.length > 0) {
      localStorage.setItem('wall-pictures', JSON.stringify(pictures));
    }
  }, [pictures]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wall-settings', JSON.stringify(wallSettings));
  }, [wallSettings]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image file size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError('');

    try {
      // Convert file to data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        // Create picture object from uploaded file
        const newPicture: PictureWithPosition = {
          url: imageUrl,
          prompt: selectedFile.name,
          id: `upload-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
          x: Math.random() * Math.max(100, window.innerWidth - DEFAULT_PICTURE_SIZE - 100),
          y: Math.random() * Math.max(100, window.innerHeight - DEFAULT_PICTURE_SIZE - 100),
          width: DEFAULT_PICTURE_SIZE,
          height: DEFAULT_PICTURE_SIZE,
        };

        setPictures((prev) => [...prev, newPicture]);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setShowPrompt(false);
        setLoading(false);
      };
      reader.onerror = () => {
        setError('Failed to read image file');
        setLoading(false);
      };
      reader.readAsDataURL(selectedFile);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('Error uploading image:', err);
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (addMode === 'upload') {
      await handleUpload();
      return;
    }

    if (!prompt.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      // Check if response is JSON
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      // Add new picture with random position and default size
      const newPicture: PictureWithPosition = {
        ...data,
        x: Math.random() * Math.max(100, window.innerWidth - DEFAULT_PICTURE_SIZE - 100),
        y: Math.random() * Math.max(100, window.innerHeight - DEFAULT_PICTURE_SIZE - 100),
        width: DEFAULT_PICTURE_SIZE,
        height: DEFAULT_PICTURE_SIZE,
      };

      setPictures((prev) => [...prev, newPicture]);
      setPrompt('');
      setShowPrompt(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('Error generating image:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const removePicture = (id: string) => {
    setPictures((prev) => prev.filter((pic) => pic.id !== id));
  };

  const updatePicturePosition = (id: string, x: number, y: number) => {
    setPictures((prev) =>
      prev.map((pic) => (pic.id === id ? { ...pic, x, y } : pic))
    );
  };

  const updatePictureSize = (id: string, width: number, height: number) => {
    setPictures((prev) =>
      prev.map((pic) => (pic.id === id ? { ...pic, width, height } : pic))
    );
  };

  const getTextureStyle = (texture: WallTexture) => {
    switch (texture) {
      case 'brick':
        return {
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 18px,
              rgba(0, 0, 0, 0.1) 18px,
              rgba(0, 0, 0, 0.1) 19px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 48px,
              rgba(0, 0, 0, 0.15) 48px,
              rgba(0, 0, 0, 0.15) 49px
            )
          `,
        };
      case 'wood':
        return {
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(139, 69, 19, 0.1) 2px,
              rgba(139, 69, 19, 0.1) 4px
            ),
            linear-gradient(
              90deg,
              rgba(101, 67, 33, 0.05) 0%,
              transparent 50%,
              rgba(101, 67, 33, 0.05) 100%
            )
          `,
        };
      case 'plaster':
        return {
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.05) 1px, transparent 0),
            radial-gradient(circle at 8px 8px, rgba(0, 0, 0, 0.03) 1px, transparent 0)
          `,
          backgroundSize: '16px 16px, 32px 32px',
        };
      case 'concrete':
        return {
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.02) 0px,
              transparent 1px,
              transparent 2px,
              rgba(0, 0, 0, 0.02) 2px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.02) 0px,
              transparent 1px,
              transparent 2px,
              rgba(0, 0, 0, 0.02) 2px
            )
          `,
        };
      case 'lines':
        return {
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(139, 69, 19, 0.1) 2px,
              rgba(139, 69, 19, 0.1) 4px
            )
          `,
        };
      case 'none':
      default:
        return {};
    }
  };

  return (
    <div
      className="relative min-h-screen transition-colors duration-300"
      style={{ backgroundColor: wallSettings.backgroundColor }}
    >
      {/* Wall texture background */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20 transition-opacity duration-300"
        style={getTextureStyle(wallSettings.texture)}
      />

      {/* Floating action buttons */}
      {!showPrompt && !showSettings && (
        <>
          <button
            onClick={() => setShowSettings(true)}
            className="fixed bottom-8 right-24 z-50 h-14 w-14 rounded-full bg-zinc-700 hover:bg-zinc-800 text-white shadow-2xl flex items-center justify-center text-xl transition-all hover:scale-110"
            aria-label="Wall settings"
            title="Wall Settings"
          >
            ⚙️
          </button>
          <button
            onClick={() => setShowPrompt(true)}
            className="fixed bottom-8 right-8 z-50 h-14 w-14 rounded-full bg-amber-700 hover:bg-amber-800 text-white shadow-2xl flex items-center justify-center text-2xl transition-all hover:scale-110"
            aria-label="Add new picture"
          >
            +
          </button>
        </>
      )}

      {/* Settings overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border-2 border-zinc-300 dark:border-zinc-700 p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Wall Settings
            </h2>

            <div className="space-y-6">
              {/* Background Color */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={wallSettings.backgroundColor}
                    onChange={(e) =>
                      setWallSettings((prev) => ({ ...prev, backgroundColor: e.target.value }))
                    }
                    className="h-12 w-24 rounded-lg border-2 border-zinc-300 dark:border-zinc-700 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={wallSettings.backgroundColor}
                    onChange={(e) =>
                      setWallSettings((prev) => ({ ...prev, backgroundColor: e.target.value }))
                    }
                    className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                    placeholder="#FEF3C7"
                  />
                </div>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  Choose a color for your wall background
                </p>
              </div>

              {/* Texture/Pattern */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Wall Texture/Pattern
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(
                    [
                      { value: 'none', label: 'None', emoji: '⬜' },
                      { value: 'brick', label: 'Brick', emoji: '🧱' },
                      { value: 'wood', label: 'Wood', emoji: '🪵' },
                      { value: 'plaster', label: 'Plaster', emoji: '🧱' },
                      { value: 'concrete', label: 'Concrete', emoji: '🏗️' },
                      { value: 'lines', label: 'Lines', emoji: '📏' },
                    ] as const
                  ).map((texture) => (
                    <button
                      key={texture.value}
                      onClick={() =>
                        setWallSettings((prev) => ({ ...prev, texture: texture.value as WallTexture }))
                      }
                      className={`p-4 rounded-lg border-2 transition-all ${
                        wallSettings.texture === texture.value
                          ? 'border-amber-600 bg-amber-50 dark:bg-amber-900/20'
                          : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600'
                      }`}
                    >
                      <div className="text-2xl mb-1">{texture.emoji}</div>
                      <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {texture.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preset Colors */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Preset Colors
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[
                    { name: 'Cream', color: '#FEF3C7' },
                    { name: 'White', color: '#FFFFFF' },
                    { name: 'Beige', color: '#F5F5DC' },
                    { name: 'Gray', color: '#E5E7EB' },
                    { name: 'Light Blue', color: '#DBEAFE' },
                    { name: 'Light Green', color: '#D1FAE5' },
                    { name: 'Light Pink', color: '#FCE7F3' },
                    { name: 'Lavender', color: '#E9D5FF' },
                  ].map((preset) => (
                    <button
                      key={preset.color}
                      onClick={() =>
                        setWallSettings((prev) => ({ ...prev, backgroundColor: preset.color }))
                      }
                      className="h-10 rounded-lg border-2 border-zinc-300 dark:border-zinc-700 hover:scale-110 transition-transform"
                      style={{ backgroundColor: preset.color }}
                      title={preset.name}
                      aria-label={preset.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSettings(false)}
                className="px-6 py-3 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-900 dark:text-zinc-50 font-medium rounded-lg transition-colors duration-200"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prompt form overlay */}
      {showPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border-2 border-amber-800 dark:border-amber-700 p-6 sm:p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Add a Picture to Your Wall
            </h2>

            {/* Mode toggle */}
            <div className="mb-6 flex gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setAddMode('generate');
                  setError('');
                  setSelectedFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                  addMode === 'generate'
                    ? 'bg-amber-700 text-white'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                🎨 Generate
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddMode('upload');
                  setError('');
                  setPrompt('');
                }}
                className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                  addMode === 'upload'
                    ? 'bg-amber-700 text-white'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                📤 Upload
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {addMode === 'generate' ? (
                <>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    Describe the image you'd like to generate and add to your wall
                  </p>
                  <div>
                    <label
                      htmlFor="prompt"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                    >
                      Image Prompt
                    </label>
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g., a serene mountain landscape at sunset, oil painting style..."
                      rows={4}
                      className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 resize-none"
                      disabled={loading}
                      autoFocus
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    Upload an image from your device to add to your wall
                  </p>
                  <div>
                    <label
                      htmlFor="file-upload"
                      className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                    >
                      Image File
                    </label>
                    <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-6 text-center hover:border-amber-500 dark:hover:border-amber-600 transition-colors">
                      <input
                        ref={fileInputRef}
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        disabled={loading}
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer block"
                      >
                        {selectedFile ? (
                          <div className="space-y-2">
                            <div className="text-4xl">✅</div>
                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                              {selectedFile.name}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedFile(null);
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = '';
                                }
                              }}
                              className="text-xs text-amber-700 dark:text-amber-400 hover:underline"
                            >
                              Change file
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="text-4xl">📤</div>
                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                              Click to select an image
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              PNG, JPG, GIF up to 10MB
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </>
              )}

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-200 text-sm">
                    {error}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={
                    loading ||
                    (addMode === 'generate' && !prompt.trim()) ||
                    (addMode === 'upload' && !selectedFile)
                  }
                  className="flex-1 px-6 py-3 bg-amber-700 hover:bg-amber-800 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
                >
                  {loading
                    ? addMode === 'generate'
                      ? 'Generating...'
                      : 'Uploading...'
                    : 'Add to Wall'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPrompt(false);
                    setError('');
                    setPrompt('');
                    setSelectedFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="px-6 py-3 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-900 dark:text-zinc-50 font-medium rounded-lg transition-colors duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Wall */}
      <div className="relative z-10 min-h-screen p-8 sm:p-12">
        {pictures.length === 0 ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-4">
                Your Gallery Wall
              </h1>
              <p className="text-lg text-amber-700 dark:text-amber-300 mb-8">
                Start by adding your first picture!
              </p>
              <button
                onClick={() => setShowPrompt(true)}
                className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-lg transition-colors"
              >
                Add First Picture
              </button>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full min-h-screen">
            {pictures.map((picture) => (
              <PictureFrame
                key={picture.id}
                picture={picture}
                onRemove={removePicture}
                onPositionChange={updatePicturePosition}
                onSizeChange={updatePictureSize}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface PictureFrameProps {
  picture: PictureWithPosition;
  onRemove: (id: string) => void;
  onPositionChange: (id: string, x: number, y: number) => void;
  onSizeChange: (id: string, width: number, height: number) => void;
}

function PictureFrame({ picture, onRemove, onPositionChange, onSizeChange }: PictureFrameProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.resize-handle')) return;
    if ((e.target as HTMLElement).closest('button')) return;
    
    setIsDragging(true);
    const rect = frameRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    e.preventDefault();
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: picture.width,
      height: picture.height,
    });
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (!isDragging && !isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(e.clientX - dragStart.x, window.innerWidth - picture.width));
        const newY = Math.max(0, Math.min(e.clientY - dragStart.y, window.innerHeight - picture.height));
        onPositionChange(picture.id, newX, newY);
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        const newWidth = Math.max(MIN_SIZE, Math.min(MAX_SIZE, resizeStart.width + deltaX));
        const newHeight = Math.max(MIN_SIZE, Math.min(MAX_SIZE, resizeStart.height + deltaY));
        onSizeChange(picture.id, newWidth, newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, picture, onPositionChange, onSizeChange]);

  return (
    <div
      ref={frameRef}
      className="absolute group cursor-move select-none"
      style={{
        left: `${picture.x}px`,
        top: `${picture.y}px`,
        width: `${picture.width}px`,
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onMouseDown={handleMouseDown}
    >
      {/* Frame */}
      <div className="relative bg-amber-800 dark:bg-amber-900 p-3 sm:p-4 shadow-2xl">
        {/* Inner mat */}
        <div className="bg-amber-50 dark:bg-amber-950 p-2 sm:p-3">
          {/* Picture */}
          <div
            className="relative bg-zinc-200 dark:bg-zinc-800 overflow-hidden"
            style={{ height: `${picture.height}px` }}
          >
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse text-zinc-400 text-sm">Loading...</div>
              </div>
            )}
            <img
              src={picture.url}
              alt={picture.prompt}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ height: '100%' }}
              onLoad={() => setImageLoaded(true)}
              draggable={false}
            />
          </div>
        </div>

        {/* Remove button */}
        {showControls && (
          <button
            onClick={() => onRemove(picture.id)}
            className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg flex items-center justify-center text-lg transition-all z-20"
            aria-label="Remove picture"
            onMouseDown={(e) => e.stopPropagation()}
          >
            ×
          </button>
        )}

        {/* Resize handle */}
        {showControls && (
          <div
            className="resize-handle absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-20 flex items-end justify-end"
            onMouseDown={handleResizeStart}
          >
            <div className="w-4 h-4 border-2 border-amber-600 dark:border-amber-400 bg-amber-100 dark:bg-amber-900 rounded-sm">
              <div className="w-full h-full flex items-end justify-end p-0.5">
                <div className="w-2 h-2 border-r-2 border-b-2 border-amber-600 dark:border-amber-400"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Prompt tooltip */}
      {showControls && (
        <div className="mt-2 text-xs text-amber-900 dark:text-amber-100 text-center line-clamp-2 px-2 bg-white/80 dark:bg-zinc-900/80 rounded">
          {picture.prompt}
        </div>
      )}
    </div>
  );
}
