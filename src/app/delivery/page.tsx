"use client";
import React, { useContext, useState, useEffect } from "react";
import Stepper from "../../components/commons/Stepper";
import { Container, Grid } from "@mui/material";
import DeliveryDetails from "../../components/checkout/DeliveryDetails";
import OrderSummary from "../../components/checkout/OrderSummary";
import locationContext from "../../context/locationContext";
import PaymentMethod from "../../components/checkout/PaymentMethod";
import PhoneNumber from "../../components/checkout/PhoneNumber";
import ConfirmOrder from "../../components/checkout/ConfirmOrder";
import OrderTotal from "../../components/checkout/OrderTotal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function DeliveryPage() {
  const context = useContext(locationContext);
  const { getLocations } = context;
  const { cartItems } = useSelector((store: any) => store.cart);

  const [phoneValue, setPhoneValue] = useState("");

  const getUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  useEffect(() => {
    // In Next.js, we can't use useNavigate, so just show empty cart or login prompt if needed
    if (cartItems.length === 0) {
      // Optionally, show a message or redirect using next/navigation
      return;
    }
    if (getUser === null) {
      toast.error("Please Login To Checkout!");
      // Optionally, show a message or redirect using next/navigation
      return;
    }

    getLocations(getUser.email);
    //eslint-disable-next-line
  }, [cartItems]);

  useEffect(() => {
    if (getUser !== null) {
      cartItems.forEach((item: any) => {
        item.email = getUser.email;
      });
    }
    //eslint-disable-next-line
  }, []);

  // document.title = "Checkout";

  return (
    <Container>
      <div className="cart">
        <Stepper step={2} />
        <Grid container display="flex" gap={{ md: 4 }}>
          <Grid
            item
            display="flex"
            flexDirection="column"
            md={7}
            sm={12}
            xs={12}
            columnSpacing={{ xs: 3, sm: 3, md: 3 }}
            gap={{ md: 3, sm: 3, xs: 3 }}
          >
            <DeliveryDetails />
            <PaymentMethod />
            <PhoneNumber
              phoneValue={phoneValue}
              setPhoneValue={setPhoneValue}
            />
          </Grid>
          <Grid
            item
            md={4}
            sm={12}
            xs={12}
            display="flex"
            flexDirection="column"
            gap={{ md: 4, sm: 4, xs: 3 }}
          >
            <Grid item className="checkout-item">
              <OrderSummary />
            </Grid>
            <Grid item className="checkout-item">
              <OrderTotal />
            </Grid>
            <Grid item>
              <ConfirmOrder phoneValue={phoneValue} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
