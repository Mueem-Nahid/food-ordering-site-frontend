import React from "react";
import RadioBtn from "../commons/RadioBtn";
import {methods} from "@/constants/constants";

interface PaymentMethodObj {
  value: string;
  index: number;
}
interface PaymentMethodProps {
  paymentMethod: PaymentMethodObj;
  setPaymentMethod: (value: PaymentMethodObj) => void;
}

const PaymentMethAvailable: React.FC<PaymentMethodProps> = ({ paymentMethod, setPaymentMethod }) => {
  // handle when clicked on radio button in payment method section
  const handleClick = (index: number) => {
    if (methods[index].disabled) return;
    setPaymentMethod({ value: methods[index].value, index: index });
  };

  return (
    <>
      {methods.map((method, index) => {
        return (
          <div key={index} style={{display: "flex", alignItems: "center"}}>
            <RadioBtn
              value={paymentMethod}
              handleClick={handleClick}
              index={index}
              disabled={method.disabled}
            />
            <span style={method.disabled ? {color: "#aaa"} : {}}>{method.value}</span>
          </div>
        );
      })}
    </>
  );
};

export default PaymentMethAvailable;
