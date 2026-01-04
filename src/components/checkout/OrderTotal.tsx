import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {deliveryFee} from "@/constants/constants";

interface RootState {
  cart: {
    amount: number;
  };
}

const OrderTotal: React.FC = () => {
  //to fetch total amount
  const { amount } = useSelector((store: RootState) => store.cart);

  const { t } = useTranslation();

  return (
    <div className="order-total">
      <div className="total">
        <strong>{t("deliveryBtn")}</strong>
        <span>$ {deliveryFee}</span>
      </div>
      <div className="total order-items">
        <strong>{t("items")}</strong>
        <span>$ {amount}</span>
      </div>
      <div className="total subtotal">
        <strong>{t("total")}</strong>
        <span>$ {amount + deliveryFee}</span>
      </div>
    </div>
  );
};

export default OrderTotal;
