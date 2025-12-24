import React from "react";
import OrderItem from "./OrderItem";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface Product {
  src: string;
  title: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface RootState {
  cart: {
    cartItems: CartItem[];
  };
}

const OrderSummary: React.FC = () => {
  // to fetch cart items
  const { cartItems } = useSelector((store: RootState) => store.cart);
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
