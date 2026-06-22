import React from "react";
import type { Metadata } from "next";
import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review the items in your DeshiQ cart before checkout.",
  alternates: {
    canonical: "/cart",
  },
};

export default function CartPage() {
  return <CartClient />;
}
