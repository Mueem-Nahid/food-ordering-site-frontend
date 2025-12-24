import "./globals.css";
import React from "react";

export const metadata = {
  title: "DeshiQ || Food Order and Delivery",
  description: "Food ordering website.",
};

import Providers from "./Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
