"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 2,
      }}
    >
      <Typography variant="h1" component="h1" sx={{ fontSize: "4rem", fontWeight: 700 }}>
        404
      </Typography>
      <Typography variant="h5" component="h2">
        {t("pageNotFound")}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {t("pageNotFoundDesc")}
      </Typography>
    </Box>
  );
}
