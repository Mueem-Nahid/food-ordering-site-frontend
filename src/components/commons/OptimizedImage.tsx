"use client";
import React from "react";
import NextImage from "next/image";
import { cloudinaryUrl, isCloudinaryUrl } from "@/utils/cloudinary";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * OptimizedImage — a reusable wrapper around next/image that:
 * - Applies Cloudinary f_auto/q_auto/w_{width} transformations for remote images
 * - Uses Next.js image optimizer for local /images/* assets (AVIF/WebP, srcset)
 * - Enables lazy loading by default (override with priority for above-the-fold)
 * - Accepts responsive `sizes` so the browser picks the smallest appropriate image
 *
 * Use `fill` for responsive images inside a positioned parent container.
 * Use `width`/`height` for fixed-size images (icons, thumbnails).
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes,
  className,
  style,
}) => {
  if (!src) {
    return null;
  }

  const isRemote = isCloudinaryUrl(src);
  // Always pass width to cloudinaryUrl (even in fill mode) for CDN sizing
  const optimizedSrc = isRemote ? cloudinaryUrl(src, width) : src;

  return (
    <NextImage
      src={optimizedSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority}
      sizes={sizes}
      className={className}
      style={style}
      unoptimized={isRemote}
    />
  );
};

export default OptimizedImage;
