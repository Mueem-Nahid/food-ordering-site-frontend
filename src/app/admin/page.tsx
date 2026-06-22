import React from "react";
import type { Metadata } from "next";
import { noindexMetadata } from "@/lib/seo";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "Admin",
  description: "DeshiQ admin dashboard for managing products, categories, and orders.",
  alternates: {
    canonical: "/admin",
  },
  ...noindexMetadata(),
};

export default function AdminPage() {
  return <AdminClient />;
}
