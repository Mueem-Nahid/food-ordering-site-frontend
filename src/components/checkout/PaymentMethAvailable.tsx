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
    },
    {
      value: "Credit/Debit Card",
    },
  ];
  // handle when clicked on radio button in payment method section
  const handleClick = (index: number) => {
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
            />
            <span>{method.value}</span>
          </div>
        );
      })}
    </>
  );
};

export default PaymentMethAvailable;
