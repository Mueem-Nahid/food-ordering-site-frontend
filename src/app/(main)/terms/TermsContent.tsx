"use client";

import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function TermsContent() {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ py: {xs: 4, md: 6}, minHeight: "60vh" }}>
      <Box sx={{ color: "white" }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          {t("termsTitle")}
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }} paragraph>
          {t("lastUpdated")} {new Date().getFullYear()}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("termsSection1")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("termsDesc1")}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("termsSection2")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("termsDesc2")}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("termsSection3")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("termsDesc3")}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("termsSection4")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("termsDesc4")}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("termsSection5")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("termsDesc5")}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("termsSection6")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("termsDesc6")}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("termsSection7")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("termsDesc7")}
        </Typography>
      </Box>
    </Container>
  );
}
