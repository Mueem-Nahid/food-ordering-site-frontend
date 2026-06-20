import React from "react";
import OrderItem from "./OrderItem";
import { useAppSelector } from "@/redux/hook";
import { useTranslation } from "react-i18next";

const OrderSummary: React.FC = () => {
  const { cartItems } = useAppSelector((store) => store.cart);
  const { t } = useTranslation();

  return (
    <div className="order-summary">
      <strong>{t("orderSummary")}</strong>
      {cartItems.map((item, index) => {
        return (
          <div key={index}>
            <OrderItem item={item} />
          </div>
        );
      })}
    </div>
  );
};

export default OrderSummary;
