import React from "react";
import Skeleton from "@mui/material/Skeleton";

const HeroSkeleton: React.FC = () => {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      sx={{
        aspectRatio: "2.79 / 1",
        borderRadius: "10px",
        minHeight: { xs: "180px", sm: "300px", md: "auto" },
      }}
    />
  );
};

export default HeroSkeleton;
