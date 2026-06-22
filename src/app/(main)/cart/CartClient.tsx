"use client";
import React, { useEffect } from "react";
import CartProdItem from "../../../components/cart/CartProdItem";
import Stepper from "../../../components/commons/Stepper";
import { Container, Grid } from "@mui/material";
import ProceedToCheckout from "../../../components/cart/ProceedToCheckout";
import { useAppSelector } from "@/redux/hook";

export default function CartClient() {
  const { cartItems } = useAppSelector((store) => store.cart);

  useEffect(() => {
  }, [cartItems]);

  return (
    <Container>
      <div className="cart">
        <Stepper step={1} />
        <Grid container columnSpacing={{ xs: 0, sm: 0, md: 3 }}>
          <Grid className="cart-prod-item" size={{xs: 12, sm: 12, md: 8}}>
            {cartItems.length === 0 ? (
              <div>No items in cart.</div>
            ) : (
              cartItems.map((item: any, index: number) => (
                <CartProdItem key={index} item={item} />
              ))
            )}
          </Grid>
          <Grid size={{xs: 12, sm: 12, md: 4}}>
            <ProceedToCheckout />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
