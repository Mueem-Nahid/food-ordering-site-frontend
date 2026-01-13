"use client";

import OrderHistory from "@/components/MyKFC/OrderHistory";
import {Container} from "@mui/material";
import {useSession} from "next-auth/react";
import React from "react";


export default function OrderHistoryPage() {
  const {data: session, status} = useSession();

  if (status === "unauthenticated") {
    return (
      <Container>
        <div style={{textAlign: "center", marginTop: "2rem"}}>
          <h2>Please login to view your orders.</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {
        status === "loading" ? (
            <h2>Please wait...</h2>
          ) :
          <div className="order-history" style={{marginBottom: "8rem"}}>
            <OrderHistory showAllOrders/>
          </div>
      }
    </Container>
  );
}
