"use client";

import OrderHistory from "@/components/MyKFC/OrderHistory";
import { Container } from "@mui/material";


export default function OrderHistoryPage() {
  return (
    <Container>
      <div className="order-history" style={{ marginBottom: "8rem" }}>
        <OrderHistory showAllOrders/>
      </div>
    </Container>
  );
}
