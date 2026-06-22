import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const ProductPageSkeleton: React.FC = () => {
  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={{ xs: 0, sm: 2, md: 3 }}
      sx={{ width: "100%", marginBottom: { xs: "2rem", md: "5rem" } }}
    >
      <Grid
        size={{ xs: 12, sm: 12, md: 6 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            maxWidth: 300,
            aspectRatio: "1 / 1",
            borderRadius: "12px",
            backgroundColor: "#2a2421",
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Skeleton
            variant="text"
            width="60%"
            height={40}
            sx={{ backgroundColor: "#2a2421" }}
          />
          <Skeleton
            variant="text"
            width="90%"
            height={20}
            sx={{ backgroundColor: "#2a2421" }}
          />
          <Skeleton
            variant="text"
            width="80%"
            height={20}
            sx={{ backgroundColor: "#2a2421" }}
          />
          <Box sx={{ mt: 1 }}>
            <Skeleton
              variant="text"
              width={120}
              height={24}
              sx={{ backgroundColor: "#2a2421" }}
            />
          </Box>
          <Skeleton
            variant="text"
            width={80}
            height={32}
            sx={{ backgroundColor: "#2a2421" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "center" },
              gap: "1rem",
              mt: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}>
              <Skeleton
                variant="rounded"
                width={44}
                height={44}
                sx={{ borderRadius: "10px", backgroundColor: "#2a2421" }}
              />
              <Skeleton
                variant="text"
                width={30}
                height={24}
                sx={{ backgroundColor: "#2a2421" }}
              />
              <Skeleton
                variant="rounded"
                width={44}
                height={44}
                sx={{ borderRadius: "10px", backgroundColor: "#2a2421" }}
              />
            </Box>
            <Skeleton
              variant="rounded"
              sx={{ width: { xs: "100%", md: 200 }, borderRadius: "10px", backgroundColor: "#2a2421" }}
              height={44}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductPageSkeleton;
