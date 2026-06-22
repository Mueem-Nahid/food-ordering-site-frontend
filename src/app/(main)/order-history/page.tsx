import React from "react";
import type { Metadata } from "next";
import { noindexMetadata } from "@/lib/seo";
import OrderHistoryClient from "./OrderHistoryClient";

export const metadata: Metadata = {
  title: "Order History",
  description: "Review your past DeshiQ orders and their status.",
  alternates: {
    canonical: "/order-history",
  },
  ...noindexMetadata(),
};

export default function OrderHistoryPage() {
  return <OrderHistoryClient />;
}
