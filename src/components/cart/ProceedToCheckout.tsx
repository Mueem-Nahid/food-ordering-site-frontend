import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface RootState {
  cart: {
    amount: number;
  };
}

const ProceedToCheckout: React.FC = () => {
  const { t } = useTranslation();
  const amount = useSelector((store: RootState) => store.cart.amount);

  return (
    <div className="proceed-to-checkout">
      <div className="subtotal-parent">
        <span>{t("subTotal")}</span>
        <strong className="subtotal">Rs {amount}</strong>
      </div>
      <Link href="/delivery" style={{ textDecoration: "none" }}>
        <Button variant="contained">{t("proceedToCheckout")}</Button>
      </Link>
    </div>
  );
};

export default ProceedToCheckout;
