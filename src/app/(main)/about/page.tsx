import React from "react";
import type { Metadata } from "next";
import { Container, Typography, Box } from "@mui/material";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about DeshiQ — your trusted online food ordering and delivery platform. Order fresh meals and get them delivered to your door.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: "About Us | DeshiQ",
    description:
      "Learn about DeshiQ — your trusted online food ordering and delivery platform.",
    url: absoluteUrl("/about"),
  },
};

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6, minHeight: "60vh" }}>
      <Box sx={{ color: "white" }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          About DeshiQ
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          DeshiQ is an online food ordering and delivery platform dedicated to
          bringing fresh, delicious meals straight to your door. We partner with
          trusted kitchens and restaurants to offer a wide variety of dishes,
          deals, and addons so you can enjoy your favourite food without leaving
          home.
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Our mission is simple — make food ordering fast, affordable, and
          reliable. Whether you are craving a quick snack or planning a meal for
          the family, DeshiQ gives you a seamless experience from browsing to
          checkout to delivery.
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          Why Choose Us?
        </Typography>
        <Box component="ul" sx={{ pl: 3, lineHeight: 2 }}>
          <li>Wide selection of meals, deals, and addons</li>
          <li>Easy-to-use online ordering with secure checkout</li>
          <li>Flexible delivery options to fit your schedule</li>
          <li>Real-time order tracking and history</li>
          <li>Dedicated customer support</li>
        </Box>
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          How It Works
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Browse our menu, add items to your cart, choose your delivery day, and
          checkout. We handle the rest — preparing your order and delivering it
          fresh to your address. You can track your past orders anytime from
          your profile.
        </Typography>
      </Box>
    </Container>
  );
}
