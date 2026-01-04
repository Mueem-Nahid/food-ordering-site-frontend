"use client";
import React from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

interface RootState {
  cart: {
    amount: number;
  };
  user: {
    userInfo: any;
  };
}

const ProceedToCheckout: React.FC = () => {
  const { t } = useTranslation();
  const amount = useSelector((store: RootState) => store.cart.amount);
  const userInfo = useSelector((store: RootState) => store.user.userInfo);
  const router = useRouter();

  const handleProceed = () => {
    if (userInfo) {
      router.push("/delivery");
    } else {
      router.push("/auth/login?redirect=/delivery");
    }
  };

  return (
    <div className="proceed-to-checkout">
      <div className="subtotal-parent">
        <span>{t("subTotal")}</span>
        <strong className="subtotal">Rs {amount}</strong>
      </div>
      <Button variant="contained" onClick={handleProceed}>
        {t("proceedToCheckout")}
      </Button>
    </div>
  );
};

export default ProceedToCheckout;
