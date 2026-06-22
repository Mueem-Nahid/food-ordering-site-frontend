import React from "react";
import Skeleton from "@mui/material/Skeleton";

const DealSkeleton: React.FC = () => {
  const items = [0, 1, 2, 3, 4, 5];
  return (
    <div
      className="deal-container"
      style={{
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
    >
      {items.map((i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Skeleton
            variant="circular"
            width={70}
            height={70}
            sx={{ backgroundColor: "#2a2421" }}
          />
          <Skeleton
            variant="text"
            width={50}
            height={14}
            sx={{ backgroundColor: "#2a2421" }}
          />
        </div>
      ))}
    </div>
  );
};

export default DealSkeleton;
