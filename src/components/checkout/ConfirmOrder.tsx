import React, { useContext, useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import locationContext from "../../context/locationContext";
import paymentContext from "../../context/paymentContext";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "../../redux/cart/cartSlice";
import { useTranslation } from "react-i18next";

interface ConfirmOrderProps {
  phoneValue: string;
  addressValue: string;
}

interface CartItem {
  product: {
    title: string;
    src: string;
    price: number;
  };
  quantity: number;
  addons: any[];
  softDrinks: any[];
}

interface RootState {
  cart: {
    cartItems: CartItem[];
    totalItems: number;
    amount: number;
  };
}

const ConfirmOrder: React.FC<ConfirmOrderProps> = ({ phoneValue, addressValue }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();

  const { cartItems, totalItems, amount } = useSelector((store: RootState) => store.cart);

  // get payment method and check whether it is selected or not
  const payment_context = useContext(paymentContext);
  const { paymentMethod } = payment_context;

  // use the below state for stripe payment data
  const [stripeData, setStripeData] = useState<any[]>([]);

  // handle when clicked on back
  const handleBack = () => {
    router.push("/cart");
  };

  // handle when clicked on confirm order
  const handleConfirm = async (stripeData: any[]) => {
    if (!addressValue || addressValue.trim() === "") {
      toast.error("Please enter or select a delivery/pickup address!");
      return;
    } else if (paymentMethod.value === "") {
      toast.error("Please Choose Payment Method To Continue!");
      return;
    } else if (phoneValue === "") {
      toast.error("Please Enter Your Phone Number!");
      return;
    }
    // Australian phone validation (same as PhoneNumber component)
    const cleaned = phoneValue.replace(/[\s\-()]/g, "");
    const isMobile = /^04\d{8}$/.test(cleaned);
    const isLandline = /^(02|03|07|08)\d{8}$/.test(cleaned);
    const isIntlMobile = /^\+614\d{8}$/.test(cleaned);
    const isIntlLandline = /^\+61([2378])\d{8}$/.test(cleaned);
    if (
      !isMobile &&
      !isLandline &&
      !isIntlMobile &&
      !isIntlLandline
    ) {
      toast.error("Please enter a valid Australian phone number!");
      return;
    }

    toast.warning("Please Wait....");

    const getUser = JSON.parse(localStorage.getItem("user") || "{}");

    //add delivery charges in amount
    let total = amount + 50;

    // call the api and save the order in mongodb
    const data = {
      product: cartItems,
      email: getUser.email,
      amount: total,
      totalItems,
      stripeData,
      payment_method: paymentMethod.value,
      address: addressValue,
      phone_no: phoneValue,
    };
    // calling api
    /*await axios
      .post(process.env.NEXT_PUBLIC_BACKEND + "/api/order/addOrder", data)
      .then((res) => {
        if (res.data.error === false) {
          if (res.data.url) {
            localStorage.setItem("payment", JSON.stringify(res.data.data));
            window.open(res.data.url, "_self");
            return;
          }
          dispatch(clearCart());
          toast.success("Order Placed!");
        }
      });*/
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        sx={{
          borderColor: "white !important",
          color: "white !important",
          borderRadius: "8px",
          padding: ".7rem 2.6rem",
        }}
        variant="outlined"
        onClick={handleBack}
      >
        {t("back")}
      </Button>
      <Button
        sx={{
          borderColor: "white !important",
          color: "white !important",
          borderRadius: "8px",
          padding: ".8rem 2.6rem",
          backgroundColor: "#e4002b !important",
          margin: "0 1rem",
          marginRight: "0",
        }}
        variant="contained"
        onClick={() => handleConfirm(stripeData)}
      >
        {t("confirmOrder")}
      </Button>
    </div>
  );
};

export default ConfirmOrder;
