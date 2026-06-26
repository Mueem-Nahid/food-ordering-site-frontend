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
  const discount = item.discount || 0;
  const finalAmount = item.discountedAmount ?? (item.amount - discount);

  return (
    <TableRow>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{item._id}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{item.payment_method}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{item.delivery_address}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{item.total_items}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{discount > 0 ? <><del style={{ opacity: 0.6 }}>$ {item.amount.toFixed(2)}</del> <span style={{ color: "#4caf50" }}>$ {finalAmount.toFixed(2)}</span></> : <span>$ {item.amount.toFixed(2)}</span>}</TableCell>
      <TableCell align="center" sx={{ color: "white", backgroundColor: "#1c1816" }}>{discount > 0 ? <span style={{ color: "#4caf50" }}>- $ {discount.toFixed(2)}</span> : "-"}</TableCell>
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
