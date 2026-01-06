import React, { useContext } from "react";
import paymentContext from "../../context/paymentContext";
import RadioBtn from "../commons/RadioBtn";

interface PaymentMethod {
  value: string;
  index: number;
}

const PaymentMethAvailable: React.FC = () => {
  const context = useContext(paymentContext);

  const { setPaymentMethod, paymentMethod } = context;
  const methods = [
    {
      value: "COD",
      disabled: false,
    },
    {
      value: "Credit/Debit Card",
      disabled: true,
    },
  ];
  // handle when clicked on radio button in payment method section
  const handleClick = (index: number) => {
    if (methods[index].disabled) return;
    setPaymentMethod({ value: methods[index].value, index: index });
  };

  return (
    <>
      {methods.map((method, index) => {
        return (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <RadioBtn
              value={paymentMethod}
              handleClick={handleClick}
              index={index}
              disabled={method.disabled}
            />
            <span style={method.disabled ? { color: "#aaa" } : {}}>{method.value}</span>
          </div>
        );
      })}
    </>
  );
};

export default PaymentMethAvailable;
