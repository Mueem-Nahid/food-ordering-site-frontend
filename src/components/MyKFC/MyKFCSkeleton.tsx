import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const MyKFCSkeleton: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt: 2 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            backgroundColor: "#1c1816",
            borderRadius: "12px",
            padding: "1rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Skeleton
              variant="circular"
              width={32}
              height={32}
              sx={{ backgroundColor: "#2a2421" }}
            />
            <Skeleton
              variant="text"
              width={120}
              height={24}
              sx={{ backgroundColor: "#2a2421" }}
            />
          </Box>
          <Skeleton
            variant="circular"
            width={24}
            height={24}
            sx={{ backgroundColor: "#2a2421" }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default MyKFCSkeleton;
