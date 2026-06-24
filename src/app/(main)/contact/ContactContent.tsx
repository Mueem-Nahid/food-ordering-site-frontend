"use client";

import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function ContactContent() {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ py: {xs: 4, md: 6}, minHeight: "60vh" }}>
      <Box sx={{ color: "white" }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          {t("contactTitle")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("contactDesc")}
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box sx={{ textAlign: "center", p: 3 }}>
              <Email sx={{ fontSize: 40, color: "#ff741f" }} />
              <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                {t("email")}
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
                {t("phone")}
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
                {t("address")}
              </Typography>
              <Typography variant="body2">
                {t("deshiqHQ")}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h2" sx={{ mt: 6, mb: 2, fontWeight: 600 }}>
          {t("followUs")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("followUsDesc")}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          {t("businessHours")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          {t("businessHoursDesc")}
        </Typography>
      </Box>
    </Container>
  );
}
