"use client";

import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        Something went wrong!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        An unexpected error occurred. Please try again.
      </Typography>
      <Button variant="contained" color="primary" onClick={reset}>
        Try again
      </Button>
    </Box>
  );
}
