import React from "react";
import type { Metadata } from "next";
import { Container, Typography, Box } from "@mui/material";
import { absoluteUrl } from "@/lib/seo";

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
  return (
    <Container maxWidth="md" sx={{ py: {xs: 4, md: 6}, minHeight: "60vh" }}>
      <Box sx={{ color: "white" }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Privacy Policy
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }} paragraph>
          Last updated: {new Date().getFullYear()}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          When you use DeshiQ, we may collect the following types of
          information: your name, email address, phone number, delivery address,
          and order history. We also collect technical data such as your IP
          address and browser type to improve our service.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          We use your information to process orders, arrange deliveries,
          communicate with you about your orders, improve our platform, and
          provide customer support. We do not sell your personal data to third
          parties.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          3. Data Security
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          We implement appropriate technical and organisational measures to
          protect your personal information from unauthorised access, alteration,
          or disclosure. Your payment information is processed through secure
          payment gateways and is not stored on our servers.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          4. Cookies
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          We use cookies and similar technologies to enhance your browsing
          experience, remember your preferences, and analyse site traffic. You
          can control cookies through your browser settings.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          5. Your Rights
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          You have the right to access, correct, or delete your personal
          information. You can also opt out of marketing communications at any
          time. To exercise these rights, please contact us through our contact
          page.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          6. Third-Party Services
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          We may use third-party services such as payment processors, delivery
          partners, and analytics providers. These providers have their own
          privacy policies governing how they handle your data.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          7. Changes to This Policy
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated revision date.
        </Typography>
      </Box>
    </Container>
  );
}
