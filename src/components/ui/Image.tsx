/**
 * Image Component
 * 
 * Wrapper around Expo Image with:
 * - Automatic caching
 * - Lazy loading
 * - Placeholder support
 * - Optimized performance
 * 
 * @see https://docs.expo.dev/versions/latest/sdk/image/
 */

import * as React from 'react';
import { Image as ExpoImage, ImageProps as ExpoImageProps } from 'expo-image';
import { cn } from '@/lib/utils';

/**
 * Image component props
 */
export interface ImageProps extends ExpoImageProps {
  /**
   * Custom className for styling with NativeWind
   */
  className?: string;
  
  /**
   * Enable blur hash placeholder (requires blurhash prop)
   */
  enablePlaceholder?: boolean;
}

/**
 * Optimized Image component using Expo Image
 * 
 * Features:
 * - Automatic disk and memory caching
 * - Lazy loading with placeholders
 * - Better performance than React Native Image
 * - Support for various formats (SVG, WebP, etc.)
 * 
 * @example
 * // Basic usage
 * <Image 
 *   source={{ uri: 'https://example.com/image.jpg' }}
 *   className="w-24 h-24 rounded-lg"
 *   contentFit="cover"
 * />
 * 
 * // With placeholder
 * <Image 
 *   source={{ uri: imageUrl }}
 *   placeholder={blurhash}
 *   enablePlaceholder
 *   className="w-full h-48"
 * />
 * 
 * // With transition
 * <Image 
 *   source={require('./assets/logo.png')}
 *   transition={{ duration: 300 }}
 *   className="w-32 h-32"
 * />
 */
export const Image = React.forwardRef<ExpoImage, ImageProps>(
  ({ className, ...props }, ref) => {
    return (
      <ExpoImage
        ref={ref}
        className={cn('bg-muted', className)}
        cachePolicy="memory-disk"
        transition={200}
        {...props}
      />
    );
  }
);

Image.displayName = 'Image';
