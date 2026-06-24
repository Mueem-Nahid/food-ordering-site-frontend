import React from "react";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about DeshiQ — your trusted online food ordering and delivery platform. Order fresh meals and get them delivered to your door.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: "About Us | DeshiQ",
    description:
      "Learn about DeshiQ — your trusted online food ordering and delivery platform.",
    url: absoluteUrl("/about"),
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
