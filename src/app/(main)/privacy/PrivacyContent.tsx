"use client";

import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function PrivacyContent() {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ py: {xs: 4, md: 6}, minHeight: "60vh" }}>
      <Box sx={{ color: "white" }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          {t("privacyTitle")}
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }} paragraph>
          {t("lastUpdated")} {new Date().getFullYear()}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("privacySection1")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("privacyDesc1")}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("privacySection2")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("privacyDesc2")}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("privacySection3")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("privacyDesc3")}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("privacySection4")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("privacyDesc4")}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("privacySection5")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("privacyDesc5")}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("privacySection6")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("privacyDesc6")}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("privacySection7")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("privacyDesc7")}
        </Typography>
      </Box>
    </Container>
  );
}
