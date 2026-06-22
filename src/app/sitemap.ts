import type { MetadataRoute } from "next";
import { siteUrl, fetchProducts, fetchCategories } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/products`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cart`, lastModified: now, changeFrequency: "weekly", priority: 0.4 },
    { url: `${base}/auth/login`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${base}/category/${encodeURIComponent(cat.name)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((prod) => ({
    url: `${base}/product/${prod._id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
