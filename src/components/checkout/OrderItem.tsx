import React from "react";
import { Grid } from "@mui/material";

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
        <img src={item.product.src} width={100} alt="Order" />
      </div>
      <div className="order-item">
        <strong>{item.product.title}</strong>
        <span>
          Rs {item.product.price} x {item.quantity}
        </span>
      </div>
      <div className="order-price">
        <strong>Rs {item.product.price * item.quantity}</strong>
      </div>
    </Grid>
  );
};

export default OrderItem;
