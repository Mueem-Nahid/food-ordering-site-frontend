import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/auth", "/cart", "/delivery", "/success", "/fail", "/my-profile", "/order-history"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
