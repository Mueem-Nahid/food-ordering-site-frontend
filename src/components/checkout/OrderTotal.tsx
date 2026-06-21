import React from "react";
import { useAppSelector } from "@/redux/hook";
import { useTranslation } from "react-i18next";

interface OrderTotalProps {
  deliveryFee: number;
}

const OrderTotal: React.FC<OrderTotalProps> = ({deliveryFee}) => {
  const { amount } = useAppSelector((store) => store.cart);

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
