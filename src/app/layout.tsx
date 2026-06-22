import React from "react";
import { Poppins } from "next/font/google";
import Providers from "./Providers";
import { baseMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata = baseMetadata();

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationJsonLd(),
              websiteJsonLd(),
            ]),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
