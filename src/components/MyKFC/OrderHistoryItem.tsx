import React from "react";
import { TableRow, TableCell } from "@mui/material";

// Accept orderStatus as a prop and use real API fields
interface OrderHistoryItemProps {
  item: {
    payment_method: string;
    delivery_address: string;
    total_items: number;
    amount: number;
  };
  orderStatus: string;
}

const OrderHistoryItem: React.FC<OrderHistoryItemProps> = ({ item, orderStatus }) => {
  return (
    <TableRow>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{item.payment_method}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{item.delivery_address}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{item.total_items}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>Rs {item.amount}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{orderStatus}</TableCell>
    </TableRow>
  );
};

export default OrderHistoryItem;
