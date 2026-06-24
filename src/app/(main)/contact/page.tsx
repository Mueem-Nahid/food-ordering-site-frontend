import React from "react";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with DeshiQ for any questions, feedback, or support regarding your food orders and deliveries.",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    title: "Contact Us | DeshiQ",
    description:
      "Get in touch with DeshiQ for any questions, feedback, or support.",
    url: absoluteUrl("/contact"),
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
