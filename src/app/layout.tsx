import React from "react";
import { Poppins } from "next/font/google";
import Providers from "./Providers";
import "./globals.css";

export const metadata = {
  title: "DeshiQ || Food Order and Delivery",
  description: "Food ordering website.",
};

// Configure Poppins font with desired weights and subsets
const poppins = Poppins({
  weight: [
    "100", "200", "300", "400", "500", "600", "700", "800", "900"
  ],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
