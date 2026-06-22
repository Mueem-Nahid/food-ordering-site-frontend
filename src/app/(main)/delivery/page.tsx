import React from "react";
import type { Metadata } from "next";
import { noindexMetadata } from "@/lib/seo";
import DeliveryClient from "./DeliveryClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your DeshiQ order — delivery address, payment method, and order confirmation.",
  alternates: {
    canonical: "/delivery",
  },
  ...noindexMetadata(),
};

export default function DeliveryPage() {
  return <DeliveryClient />;
}
