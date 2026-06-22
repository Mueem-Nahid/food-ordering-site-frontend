import React from "react";
import type { Metadata } from "next";
import { Container, Typography, Box } from "@mui/material";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the DeshiQ Terms & Conditions governing your use of our food ordering and delivery platform.",
  alternates: {
    canonical: absoluteUrl("/terms"),
  },
  openGraph: {
    title: "Terms & Conditions | DeshiQ",
    description:
      "The terms governing your use of the DeshiQ food ordering and delivery platform.",
    url: absoluteUrl("/terms"),
  },
};

export default function TermsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6, minHeight: "60vh" }}>
      <Box sx={{ color: "text.primary" }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Terms &amp; Conditions
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Last updated: {new Date().getFullYear()}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          By accessing or using the DeshiQ platform, you agree to be bound by
          these Terms &amp; Conditions. If you do not agree with any part of
          these terms, please do not use our service.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          2. Use of Our Service
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          You agree to use DeshiQ only for lawful purposes. You must not use the
          platform to place fraudulent orders, misuse the service, or violate
          any applicable laws or regulations. You are responsible for maintaining
          the confidentiality of your account credentials.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          3. Orders and Payments
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          When you place an order, you agree to pay the total amount shown at
          checkout, including any delivery fees. Prices are listed in the
          currency displayed on the platform. We reserve the right to refuse or
          cancel any order at our discretion.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          4. Delivery
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          We strive to deliver your order on the selected delivery day. However,
          delivery times may be affected by factors beyond our control. We are
          not liable for delays caused by weather, traffic, or other
          unforeseen circumstances.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          5. Cancellations and Refunds
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Orders may be cancelled before they are prepared. Refunds, where
          applicable, will be processed through the original payment method.
          Please contact our support team for cancellation requests.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          6. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          DeshiQ shall not be liable for any indirect, incidental, or
          consequential damages arising from your use of the platform or the
          food delivered through it.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          7. Changes to These Terms
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          We may update these Terms &amp; Conditions at any time. Continued use
          of the platform after changes are posted constitutes your acceptance
          of the revised terms.
        </Typography>
      </Box>
    </Container>
  );
}
