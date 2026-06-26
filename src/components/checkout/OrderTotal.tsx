import React from "react";
import { useAppSelector } from "@/redux/hook";
import { useTranslation } from "react-i18next";
import type { ICouponApplyResult } from "@/types/globalTypes";

interface OrderTotalProps {
  deliveryFee: number;
  couponResult?: ICouponApplyResult | null;
}

const OrderTotal: React.FC<OrderTotalProps> = ({deliveryFee, couponResult}) => {
  const { amount } = useAppSelector((store) => store.cart);

  const { t } = useTranslation();

  const discount = couponResult?.discount || 0;
  const total = amount + deliveryFee - discount;

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
      {discount > 0 && (
        <div className="total discount">
          <strong>Discount</strong>
          <span style={{ color: "#4caf50" }}>- $ {discount.toFixed(2)}</span>
        </div>
      )}
      <div className="total subtotal">
        <strong>{t("total")}</strong>
        <span>$ {total > 0 ? total.toFixed(2) : "0.00"}</span>
      </div>
    </div>
  );
};

export default OrderTotal;
