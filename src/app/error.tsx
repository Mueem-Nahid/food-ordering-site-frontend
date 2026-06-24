"use client";

import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();
  useEffect(() => {
    console.error(error);
  }, [error]);

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
      <Typography variant="h4" component="h1">
        {t("somethingWentWrong")}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {t("unexpectedError")}
      </Typography>
      <Button variant="contained" color="primary" onClick={reset}>
        {t("tryAgain")}
      </Button>
    </Box>
  );
}
