import React from "react";
import type { Metadata } from "next";
import {
  fetchProduct,
  productJsonLd,
  absoluteUrl,
} from "@/lib/seo";
import ProductClient from "./ProductClient";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = product.name;
  const description =
    product.desc || `Order ${product.name} on DeshiQ for $${product.price}.`;
  const canonical = absoluteUrl(`/product/${id}`);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: `${title} | DeshiQ`,
      description,
      url: canonical,
      images: product.productImage
        ? [{ url: product.productImage, alt: product.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | DeshiQ`,
      description,
      images: product.productImage ? [product.productImage] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const product = await fetchProduct(id);

  return (
    <>
      {product && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
        />
      )}
      <ProductClient />
    </>
  );
}
