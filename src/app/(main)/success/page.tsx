import React from "react";
import type { Metadata } from "next";
import { noindexMetadata } from "@/lib/seo";
import SuccessClient from "./SuccessClient";

export const metadata: Metadata = {
  title: "Order Successful",
  description: "Your DeshiQ order was placed successfully.",
  alternates: {
    canonical: "/success",
  },
  ...noindexMetadata(),
};

export default function SuccessPage() {
  return <SuccessClient />;
}
