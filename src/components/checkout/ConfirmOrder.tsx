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

const ConfirmOrder: React.FC<ConfirmOrderProps> = ({ phoneValue }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();

  const { cartItems, totalItems, amount } = useSelector((store: RootState) => store.cart);

  // get logged in user locations and check whether it is added or not
  const location_context = useContext(locationContext);
  const { locations, radioValue } = location_context;

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
    if (locations.length < 1) {
      toast.error("Please Add Location To Continue!");
      return;
    } else if (radioValue.value === "") {
      toast.error("Please Choose Location To Continue!");
      return;
    } else if (paymentMethod.value === "") {
      toast.error("Please Choose Payment Method To Continue!");
      return;
    } else if (phoneValue === "") {
      toast.error("Please Enter Your Phone Number!");
      return;
    } else if (phoneValue.length !== 11) {
      toast.error("Phone Number Must Contain 11 Digits!");
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
      address: radioValue.value,
      phone_no: phoneValue,
    };
    // calling api
    await axios
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
      });
  };

  useEffect(() => {
    setStripeData([]);
    // custom object for stripe payment
    cartItems.forEach((cart) => {
      setStripeData((stripeData) => [
        ...stripeData,
        {
          title: cart.product.title,
          src: cart.product.src,
          price: cart.product.price,
          quantity: cart.quantity,
        },
      ]);
      cart.addons.forEach((addon) => {
        setStripeData((stripeData) => [
          ...stripeData,
          {
            title: addon.addon.name,
            src: addon.addon.pic,
            price: addon.addon.price,
            quantity: addon.quantity,
          },
        ]);
      });
      cart.softDrinks.forEach((soft) => {
        setStripeData((stripeData) => [
          ...stripeData,
          {
            title: soft.softDrink.name,
            src: soft.softDrink.pic,
            price: soft.softDrink.price,
            quantity: soft.quantity,
          },
        ]);
      });
    });
    setStripeData((stripeData) => [
      ...stripeData,
      {
        title: "Delivery Charges",
        src: "https://res.cloudinary.com/digaxe3sc/image/upload/v1661757053/kfc-clone/1_gpe30o.png",
        price: 50,
        quantity: 1,
      },
    ]);
    //eslint-disable-next-line
  }, [cartItems]);

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
