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
import CouponInput from "../../../components/checkout/CouponInput";
import {useAppSelector} from "@/redux/hook";
import {useRouter} from "next/navigation";
import type { ICouponApplyResult } from "@/types/globalTypes";

export default function DeliveryClient() {
  const {cartItems} = useAppSelector((store) => store.cart);
  const { amount } = useAppSelector((store) => store.cart);
  const userInfo = useAppSelector((state) => state.user?.userInfo);
  const router = useRouter();
  const [phoneValue, setPhoneValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState({ value: "COD", index: 0 });
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState<ICouponApplyResult | null>(null);

  useEffect(() => {
    if (!userInfo) {
      router.replace("/");
      return;
    }
    if (cartItems.length === 0) {
      router.replace("/cart");
      return;
    }
  }, []);

  const productIds = cartItems.map((item: any) => item.prod_id || item.product?._id || item.product?.id);

  return (
    <Container>
      <div className="cart">
        <Stepper step={2}/>
        <Grid container display="flex" gap={{xs: 1.5, sm: 2, md: 4}}>
          <Grid
            display="flex"
            flexDirection="column"
            size={{xs: 12, sm: 12, md: 6}}
            columnSpacing={{xs: 3, sm: 3, md: 3}}
            gap={{md: 3, sm: 3, xs: 3}}
          >
            <DeliveryAddress
              addressValue={addressValue}
              setAddressValue={setAddressValue}
              setDeliveryFee={setDeliveryFee}
            />
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
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
              <OrderTotal deliveryFee={deliveryFee} couponResult={couponResult}/>
            </Grid>
            <Grid>
              <CouponInput
                orderAmount={amount}
                productIds={productIds}
                couponCode={couponCode}
                couponResult={couponResult}
                setCouponCode={setCouponCode}
                setCouponResult={setCouponResult}
              />
            </Grid>
            <Grid>
              <ConfirmOrder phoneValue={phoneValue} addressValue={addressValue} paymentMethod={paymentMethod.value} deliveryFee={deliveryFee} couponCode={couponCode} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
