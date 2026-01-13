"use client";

import OrderHistory from "@/components/MyKFC/OrderHistory";
import Box from "@mui/material/Box";

export default function OrderHistoryPage() {
  return (
    <Box style={{ marginBottom: "10rem" }}>
      <OrderHistory showAllOrders/>
    </Box>
  );
}
