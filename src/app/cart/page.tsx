"use client";
import React, { useEffect } from "react";
import CartProdItem from "../../components/cart/CartProdItem";
import Stepper from "../../components/commons/Stepper";
import { Container, Grid } from "@mui/material";
import ProceedToCheckout from "../../components/cart/ProceedToCheckout";
import { useSelector } from "react-redux";

export default function CartPage() {
  const { cartItems } = useSelector((store: any) => store.cart);

  // In Next.js, we can't use useNavigate, so just show empty cart UI if needed
  useEffect(() => {
    // Optionally, you could redirect using next/navigation if cart is empty
    // For UI-only, do nothing
  }, [cartItems]);

  // document.title = "Bucket";

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
