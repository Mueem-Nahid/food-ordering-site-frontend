import React from "react";
import { useTranslation } from "react-i18next";
import PaymentMethAvailable from "./PaymentMethAvailable";

interface PaymentMethodObj {
  value: string;
  index: number;
}
interface PaymentMethodProps {
  paymentMethod: PaymentMethodObj;
  setPaymentMethod: (value: PaymentMethodObj) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ paymentMethod, setPaymentMethod }) => {
  const { t } = useTranslation();
  return (
    <div className="checkout-item">
      <div
        className="delivery-head"
        style={{
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <strong>{t("paymentMethod")}</strong>
      </div>
      <PaymentMethAvailable
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
    </div>
  );
};

export default PaymentMethod;
