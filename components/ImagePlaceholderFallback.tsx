/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Image from "next/image";
import ExportedImage from "next-image-export-optimizer";
interface ImagePlaceholderFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const ImagePlaceholderFallback: React.FC<ImagePlaceholderFallbackProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Show placeholder while loading or on error */}
      {(isLoading || hasError) && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200/20 to-gray-300/20 animate-pulse"
          style={{ 
            backgroundSize: '200% 100%',
            animation: 'gradient-shift 2s ease-in-out infinite'
          }}
        />
      )}

      <ExportedImage
        src={hasError ? '/images/placeholder.jpg' : src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
};

export default ImagePlaceholderFallback;
