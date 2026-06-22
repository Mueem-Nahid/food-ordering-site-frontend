import React from "react";
import type { Metadata } from "next";
import { Container, Typography, Box, Grid } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import { absoluteUrl } from "@/lib/seo";

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
  return (
    <Container maxWidth="md" sx={{ py: 6, minHeight: "60vh" }}>
      <Box sx={{ color: "text.primary" }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Have a question, feedback, or need help with an order? We are here to
          help. Reach out to us through any of the channels below.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box sx={{ textAlign: "center", p: 3 }}>
              <Email sx={{ fontSize: 40, color: "#ff741f" }} />
              <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                Email
              </Typography>
              <Typography variant="body2">
                support@deshiq.com
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box sx={{ textAlign: "center", p: 3 }}>
              <Phone sx={{ fontSize: 40, color: "#ff741f" }} />
              <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                Phone
              </Typography>
              <Typography variant="body2">
                +1 (000) 000-0000
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box sx={{ textAlign: "center", p: 3 }}>
              <LocationOn sx={{ fontSize: 40, color: "#ff741f" }} />
              <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                Address
              </Typography>
              <Typography variant="body2">
                DeshiQ Headquarters
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h2" sx={{ mt: 6, mb: 2, fontWeight: 600 }}>
          Follow Us
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Stay connected on social media for the latest deals, updates, and
          food news. Find us on Instagram and Facebook using the links in the
          footer below.
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          Business Hours
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Our support team is available Monday through Sunday to assist you
          with your orders and enquiries.
        </Typography>
      </Box>
    </Container>
  );
}
