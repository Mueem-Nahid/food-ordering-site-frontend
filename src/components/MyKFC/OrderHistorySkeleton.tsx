import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useTheme, useMediaQuery } from "@mui/material";

const OrderHistorySkeleton: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const rows = [0, 1, 2];

  if (isMobile) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {rows.map((i) => (
          <Box
            key={i}
            className="order-card"
            sx={{ padding: "1rem" }}
          >
            {[0, 1, 2, 3, 4].map((row) => (
              <Box
                key={row}
                className="order-card-row"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid #48413e",
                }}
              >
                <Skeleton
                  variant="text"
                  width={80}
                  height={16}
                  sx={{ backgroundColor: "#2a2421" }}
                />
                <Skeleton
                  variant="text"
                  width={100}
                  height={16}
                  sx={{ backgroundColor: "#2a2421" }}
                />
              </Box>
            ))}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "0.75rem",
              }}
            >
              <Skeleton
                variant="rounded"
                width={100}
                height={36}
                sx={{ borderRadius: "8px", backgroundColor: "#2a2421" }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#1c1816",
        borderRadius: "12px",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "1rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #48413e",
          marginBottom: "1rem",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6].map((h) => (
          <Skeleton
            key={h}
            variant="text"
            height={20}
            sx={{ backgroundColor: "#2a2421" }}
          />
        ))}
      </Box>
      {rows.map((i) => (
        <Box
          key={i}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "1rem",
            padding: "0.75rem 0",
            borderBottom: i < rows.length - 1 ? "1px solid #48413e" : "none",
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((c) => (
            <Skeleton
              key={c}
              variant="text"
              height={20}
              sx={{ backgroundColor: "#2a2421" }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default OrderHistorySkeleton;
