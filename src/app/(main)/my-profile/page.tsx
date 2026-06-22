import React from "react";
import type { Metadata } from "next";
import { noindexMetadata } from "@/lib/seo";
import MyProfileClient from "./MyProfileClient";

export const metadata: Metadata = {
  title: "My Profile",
  description: "View your DeshiQ profile, past orders, and favourites.",
  alternates: {
    canonical: "/my-profile",
  },
  ...noindexMetadata(),
};

export default function MyProfilePage() {
  return <MyProfileClient />;
}
