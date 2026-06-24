import React from "react";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the DeshiQ Privacy Policy to understand how we collect, use, and protect your personal information when you use our food ordering platform.",
  alternates: {
    canonical: absoluteUrl("/privacy"),
  },
  openGraph: {
    title: "Privacy Policy | DeshiQ",
    description:
      "Understand how DeshiQ collects, uses, and protects your personal information.",
    url: absoluteUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
