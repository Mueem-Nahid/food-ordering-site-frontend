import React from "react";
import { Grid } from "@mui/material";
import OptimizedImage from "../commons/OptimizedImage";

interface Product {
  src: string;
  title: string;
  price: number;
}

interface OrderItemProps {
  item: {
    product: Product;
    quantity: number;
  };
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <Grid
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginTop={2}
    >
      <div className="order-img">
        <OptimizedImage src={item.product.src} alt="Order" fill width={100} sizes="100px" />
      </div>
      <div className="order-item">
        <strong>{item.product.title}</strong>
        <span>
          $ {item.product.price} x {item.quantity}
        </span>
      </div>
      <div className="order-price">
        <strong>$ {item.product.price * item.quantity}</strong>
      </div>
    </Grid>
  );
};

export default OrderItem;
