import React from "react";
import type { Metadata } from "next";
import { noindexMetadata } from "@/lib/seo";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to DeshiQ to order food and track deliveries.",
  alternates: {
    canonical: "/auth/login",
  },
  ...noindexMetadata(),
};

export default function LoginPage() {
  return <LoginClient />;
}
