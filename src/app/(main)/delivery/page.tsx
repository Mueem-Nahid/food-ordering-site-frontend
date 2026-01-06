"use client";
import React, {useEffect, useState} from "react";
import Stepper from "../../../components/commons/Stepper";
import {Container, Grid} from "@mui/material";
import OrderSummary from "../../../components/checkout/OrderSummary";
import PaymentMethod from "../../../components/checkout/PaymentMethod";
import PhoneNumber from "../../../components/checkout/PhoneNumber";
import DeliveryAddress from "../../../components/checkout/DeliveryAddress";
import ConfirmOrder from "../../../components/checkout/ConfirmOrder";
import OrderTotal from "../../../components/checkout/OrderTotal";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";

export default function DeliveryPage() {
  const {cartItems} = useSelector((store: any) => store.cart);
  const userInfo = useSelector((state: any) => state.user?.userInfo);
  const router = useRouter();
  const [phoneValue, setPhoneValue] = useState("");
  const [addressValue, setAddressValue] = useState("");

  useEffect(() => {
    if (!userInfo) {
      router.replace("/");
      return;
    }
    if (cartItems.length === 0) {
      router.replace("/cart");
      return;
    }
  }, [cartItems]);

  return (
    <Container>
      <div className="cart">
        <Stepper step={2}/>
        <Grid container display="flex" gap={{md: 4}}>
          <Grid
            display="flex"
            flexDirection="column"
            size={{xs: 12, sm: 12, md: 6}}
            columnSpacing={{xs: 3, sm: 3, md: 3}}
            gap={{md: 3, sm: 3, xs: 3}}
          >
            {/*<DeliveryDetails />*/}
            <DeliveryAddress
              addressValue={addressValue}
              setAddressValue={setAddressValue}
            />
            <PaymentMethod/>
            <PhoneNumber
              phoneValue={phoneValue}
              setPhoneValue={setPhoneValue}
            />
          </Grid>
          <Grid
            size={{xs: 12, sm: 12, md: 5}}
            display="flex"
            flexDirection="column"
            gap={{md: 4, sm: 4, xs: 3}}
          >
            <Grid className="checkout-item">
              <OrderSummary/>
            </Grid>
            <Grid className="checkout-item">
              <OrderTotal/>
            </Grid>
            <Grid>
              <ConfirmOrder phoneValue={phoneValue}/>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
