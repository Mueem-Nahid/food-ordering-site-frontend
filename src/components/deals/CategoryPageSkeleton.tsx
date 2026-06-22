import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const CategoryPageSkeleton: React.FC = () => {
  const cards = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <Skeleton
        variant="text"
        height={32}
        sx={{ mb: 2, width: { xs: "60%", sm: 200 }, backgroundColor: "#2a2421" }}
      />
      <Grid
        container
        columnGap={{ xs: 1, sm: 2, md: 2 }}
        rowSpacing={2}
        justifyContent={{ xs: "center", md: "flex-start" }}
      >
        {cards.map((i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 2.8 }}>
            <Box
              sx={{
                backgroundColor: "#1c1816",
                borderRadius: "12px",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                overflow: "hidden",
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                sx={{
                  aspectRatio: "4 / 3",
                  borderRadius: "10px",
                  backgroundColor: "#2a2421",
                }}
              />
              <Skeleton
                variant="text"
                width="70%"
                height={24}
                sx={{ backgroundColor: "#2a2421" }}
              />
              <Box sx={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <Skeleton
                  variant="text"
                  width="100%"
                  height={16}
                  sx={{ backgroundColor: "#2a2421" }}
                />
                <Skeleton
                  variant="text"
                  width="80%"
                  height={16}
                  sx={{ backgroundColor: "#2a2421" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Skeleton
                  variant="text"
                  width={50}
                  height={28}
                  sx={{ backgroundColor: "#2a2421" }}
                />
                <Skeleton
                  variant="circular"
                  width={32}
                  height={32}
                  sx={{ backgroundColor: "#2a2421" }}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CategoryPageSkeleton;
