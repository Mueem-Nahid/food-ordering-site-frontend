"use client";
import React, { useState, ReactNode } from "react";
import paymentContext from "./paymentContext";

interface PaymentStateProps {
  children: ReactNode;
}

interface PaymentMethod {
  value: string;
  index: string | number;
}

const PaymentState: React.FC<PaymentStateProps> = ({ children }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    value: "",
    index: "",
  });

  return (
    <paymentContext.Provider
      value={{
        paymentMethod,
        setPaymentMethod,
      }}
    >
      {children}
    </paymentContext.Provider>
  );
};

export default PaymentState;
