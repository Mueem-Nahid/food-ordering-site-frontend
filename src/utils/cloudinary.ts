const CLOUDINARY_HOST = "res.cloudinary.com";

/**
 * Transforms a Cloudinary image URL to apply automatic format conversion,
 * quality optimization, and width-based resizing.
 *
 * - f_auto: serves WebP/AVIF based on the browser's Accept header
 * - q_auto: Cloudinary analyzes image content and picks optimal quality
 * - w_{width}: resizes to the exact display width (device optimization)
 *
 * Non-Cloudinary URLs (e.g. local /images/* paths) pass through unchanged.
 */
export function cloudinaryUrl(
  url: string,
  width?: number
): string {
  if (!url || !url.includes(CLOUDINARY_HOST)) {
    return url;
  }

  // Already has transformations — avoid double-applying
  if (/\/upload\/(f_|q_|w_)/.test(url)) {
    return url;
  }

  const transformations = [
    "f_auto",
    "q_auto",
    width ? `w_${width}` : null,
  ]
    .filter(Boolean)
    .join(",");

  return url.replace("/upload/", `/upload/${transformations}/`);
}

/**
 * Returns true if the URL is a Cloudinary image URL.
 */
export function isCloudinaryUrl(url: string): boolean {
  return !!url && url.includes(CLOUDINARY_HOST);
}
