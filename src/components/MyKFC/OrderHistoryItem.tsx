import React from "react";
import { Grid } from "@mui/material";

interface OrderHistoryItemProps {
  item: {
    payment_method: string;
    address: string;
    totalItems: number;
    amount: number;
  };
}

const OrderHistoryItem: React.FC<OrderHistoryItemProps> = ({ item }) => {
  return (
    <Grid
      container
      display="flex"
      justifyContent="space-around"
      marginTop="1rem"
    >
      <div style={{ textAlign: "center" }}>
        <span>{item.payment_method}</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <span>{item.address.substr(0, 30)}...</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <span>{item.totalItems}</span>
      </div>
      <div style={{ textAlign: "center" }}>
        <span>Rs {item.amount}</span>
      </div>
    </Grid>
  );
};

export default OrderHistoryItem;
