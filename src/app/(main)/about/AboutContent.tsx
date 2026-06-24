"use client";

import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function AboutContent() {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ py: {xs: 4, md: 6}, minHeight: "60vh" }}>
      <Box sx={{ color: "white" }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          {t("aboutTitle")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("aboutDesc")}
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("ourMission")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("missionDesc")}
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("whyChooseUs")}
        </Typography>
        <Box component="ul" sx={{ pl: 3, lineHeight: 2 }}>
          <li>{t("chooseUs1")}</li>
          <li>{t("chooseUs2")}</li>
          <li>{t("chooseUs3")}</li>
          <li>{t("chooseUs4")}</li>
          <li>{t("chooseUs5")}</li>
        </Box>
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("howItWorks")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("howItWorksDesc")}
        </Typography>
      </Box>
    </Container>
  );
}
