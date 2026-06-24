import React from "react";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the DeshiQ Terms & Conditions governing your use of our food ordering and delivery platform.",
  alternates: {
    canonical: absoluteUrl("/terms"),
  },
  openGraph: {
    title: "Terms & Conditions | DeshiQ",
    description:
      "The terms governing your use of the DeshiQ food ordering and delivery platform.",
    url: absoluteUrl("/terms"),
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
