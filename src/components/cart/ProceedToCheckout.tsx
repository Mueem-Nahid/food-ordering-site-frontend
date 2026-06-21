"use client";
import React from "react";
import { Button } from "@mui/material";
import { useAppSelector } from "@/redux/hook";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const ProceedToCheckout: React.FC = () => {
  const { t } = useTranslation();
  const amount = useAppSelector((store) => store.cart.amount);
  const userInfo = useAppSelector((store) => store.user.userInfo);
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
        <strong className="subtotal">$ {amount}</strong>
      </div>
      <Button variant="contained" onClick={handleProceed}>
        {t("proceedToCheckout")}
      </Button>
    </div>
  );
};

export default ProceedToCheckout;
