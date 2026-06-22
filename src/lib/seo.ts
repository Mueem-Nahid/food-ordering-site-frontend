import type { Metadata } from "next";
import type { IProduct } from "@/types/globalTypes";

export const BRAND_NAME = "DeshiQ";
export const BRAND_TAGLINE = "Food Order and Delivery";
export const THEME_COLOR = "#ff741f";
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

const FALLBACK_SITE_URL = "http://localhost:3000";

function normalizeUrl(url: string): string {
  if (!url) return FALLBACK_SITE_URL;
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL);
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (baseUrl) {
    try {
      return new URL(baseUrl).origin;
    } catch {
      return FALLBACK_SITE_URL;
    }
  }
  return FALLBACK_SITE_URL;
}

export function absoluteUrl(path = ""): string {
  const base = siteUrl();
  if (!path) return base;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080/api/v1";

async function serverFetch<T>(endpoint: string): Promise<T | null> {
  try {
    const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

interface ApiResponse<T> {
  data?: T;
  meta?: { total?: number };
}

export async function fetchProduct(id: string): Promise<IProduct | null> {
  const json = await serverFetch<ApiResponse<IProduct>>(`/products/${id}`);
  return json?.data ?? null;
}

export async function fetchProducts(): Promise<IProduct[]> {
  const json = await serverFetch<ApiResponse<IProduct[]>>(`/products?limit=1000`);
  return json?.data ?? [];
}

export async function fetchCategories(): Promise<{ _id: string; name: string }[]> {
  const json = await serverFetch<ApiResponse<{ _id: string; name: string }[]>>(
    `/categories?limit=100`
  );
  return json?.data ?? [];
}

export async function fetchProductsByCategory(
  name: string
): Promise<IProduct[]> {
  const json = await serverFetch<ApiResponse<IProduct[]>>(
    `/products?categoryName=${encodeURIComponent(name)}`
  );
  return json?.data ?? [];
}

export function baseMetadata(): Metadata {
  const url = siteUrl();
  const description = `${BRAND_NAME} — order fresh food online and get it delivered to your door. Browse meals, deals, and addons, then checkout in minutes.`;

  return {
    metadataBase: new URL(url),
    title: {
      default: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
      template: `%s | ${BRAND_NAME}`,
    },
    description,
    applicationName: BRAND_NAME,
    keywords: [
      "DeshiQ",
      "food order",
      "food delivery",
      "online food ordering",
      "meal delivery",
      "deals",
      "addons",
      "food near me",
    ],
    authors: [{ name: BRAND_NAME }],
    creator: BRAND_NAME,
    publisher: BRAND_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: BRAND_NAME,
      title: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
      description,
      images: [
        {
          url: DEFAULT_OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: BRAND_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
      description,
      images: [DEFAULT_OG_IMAGE_PATH],
    },
    icons: {
      icon: "/favicon.ico",
    },
    manifest: "/manifest.webmanifest",
    category: "food",
  };
}

export function noindexMetadata(): Pick<Metadata, "robots"> {
  return {
    robots: {
      index: false,
      follow: false,
    },
  };
}

export function organizationJsonLd() {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url,
    slogan: BRAND_TAGLINE,
    description: `${BRAND_NAME} — online food order and delivery.`,
    sameAs: [url],
  };
}

export function websiteJsonLd() {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/products?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function productJsonLd(product: IProduct) {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.desc,
    image: [product.productImage].filter(Boolean),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${url}/product/${product._id}`,
    },
  };
}
