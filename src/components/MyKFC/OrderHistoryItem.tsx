import React from "react";
import { TableRow, TableCell } from "@mui/material";

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
    <TableRow>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{item.payment_method}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{item.address}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{item.totalItems}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>Rs {item.amount}</TableCell>
    </TableRow>
  );
};

export default OrderHistoryItem;
