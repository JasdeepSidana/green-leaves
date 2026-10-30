import React, { useState } from 'react';
import { Leaf } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackText?: string;
}

// Fallback high-reliability images
const DEFAULT_PLANT_FALLBACK = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80';

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = DEFAULT_PLANT_FALLBACK,
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError && !fallbackSrc) {
    return (
      <div className={`flex flex-col items-center justify-center bg-botanical-100 text-emerald-800 p-4 ${className}`}>
        <Leaf className="w-8 h-8 text-emerald mb-1 animate-pulse" />
        <span className="text-[11px] font-bold text-center">{fallbackText || alt || 'Green Leaves Organics'}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <Leaf className="w-6 h-6 text-emerald-300 animate-spin" />
        </div>
      )}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        {...props}
      />
    </div>
  );
};
