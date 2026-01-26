import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface RootState {
  cart: {
    amount: number;
  };
}

interface OrderTotalProps {
  deliveryFee: number;
  total?: number;
  discount?: number;
}

const OrderTotal: React.FC<OrderTotalProps> = ({ deliveryFee, total, discount }) => {
  //to fetch total amount
  const { amount } = useSelector((store: RootState) => store.cart);

  const { t } = useTranslation();

  // If total is provided, use it; otherwise, fallback to amount + deliveryFee
  const finalTotal = typeof total === "number" ? total : amount + deliveryFee;
  const showDiscount = typeof discount === "number" && discount > 0;

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
      {showDiscount && (
        <div className="total discount">
          <strong>{t("Discount") || "Discount"}</strong>
          <span style={{ color: "#e53935" }}>- $ {discount}</span>
        </div>
      )}
      <div className="total subtotal">
        <strong>{t("total")}</strong>
        <span>$ {finalTotal}</span>
      </div>
    </div>
  );
};

export default OrderTotal;
