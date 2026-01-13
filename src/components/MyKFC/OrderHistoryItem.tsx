import React from "react";
import { TableRow, TableCell } from "@mui/material";
import {Order} from "@/types/globalTypes";

// Accept orderStatus as a prop and use real API fields
// Add onView prop for modal trigger
interface OrderHistoryItemProps {
  item: Order;
  orderStatus: string;
  onView?: (order: Order) => void;
}

const OrderHistoryItem: React.FC<OrderHistoryItemProps> = ({ item, orderStatus, onView }) => {
  return (
    <TableRow>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{item._id}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{item.payment_method}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{item.delivery_address}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{item.total_items}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>Rs {item.amount}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{orderStatus}</TableCell>
      <TableCell
        align="center"
        sx={{ color: "white", backgroundColor: "#1c1816", cursor: "pointer", textDecoration: "underline" }}
        onClick={() => onView && onView(item)}
      >
        View
      </TableCell>
    </TableRow>
  );
};

export default OrderHistoryItem;
