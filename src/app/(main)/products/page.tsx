import React from "react";
import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse all food products available on DeshiQ. Order meals, deals, and addons for delivery.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
