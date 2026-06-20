import React from "react";
import { Box, Typography } from "@mui/material";

export default function NotFound() {
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
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The page you are looking for does not exist.
      </Typography>
    </Box>
  );
}
