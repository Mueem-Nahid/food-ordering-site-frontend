import React from "react";
import type { Metadata } from "next";
import { fetchProductsByCategory, absoluteUrl } from "@/lib/seo";
import CategoryClient from "./CategoryClient";

type Params = Promise<{ name: string }>;

function decodeNameParam(name: string): string {
  try {
    return decodeURIComponent(name);
  } catch {
    return name;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeNameParam(name);
  const products = await fetchProductsByCategory(decodedName);

  const categoryName = products[0]?.catId?.name || decodedName;
  const title = categoryName;
  const description = `Browse ${categoryName} on DeshiQ — order fresh ${categoryName.toLowerCase()} for delivery.`;
  const canonical = absoluteUrl(`/category/${name}`);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: `${title} | DeshiQ`,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | DeshiQ`,
      description,
    },
  };
}

export default async function CategoryPage() {
  return <CategoryClient />;
}
