import React from "react";
import type { Metadata } from "next";
import { noindexMetadata } from "@/lib/seo";
import FailClient from "./FailClient";

export const metadata: Metadata = {
  title: "Order Failed",
  description: "Your DeshiQ payment was not successful.",
  alternates: {
    canonical: "/fail",
  },
  ...noindexMetadata(),
};

export default function FailPage() {
  return <FailClient />;
}
