import type { MetadataRoute } from "next";
import { BRAND_NAME, BRAND_TAGLINE, THEME_COLOR } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_NAME} | ${BRAND_TAGLINE}`,
    short_name: BRAND_NAME,
    description: `${BRAND_NAME} — online food order and delivery.`,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: THEME_COLOR,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: ["food", "shopping"],
  };
}
