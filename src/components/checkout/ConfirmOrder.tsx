import React, {useState} from "react";
import {Button} from "@mui/material";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {deliveryFee} from "@/constants/constants";
import { useCreateOrderMutation } from "@/redux/features/orders/orderApi";

interface ConfirmOrderProps {
  phoneValue: string;
  addressValue: string;
  paymentMethod: string
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

const ConfirmOrder: React.FC<ConfirmOrderProps> = ({phoneValue, addressValue, paymentMethod}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.user?.userInfo);
  const router = useRouter();

  const {cartItems, totalItems, amount} = useSelector((store: RootState) => store.cart);

  // use the below state for stripe payment data
  const [stripeData, setStripeData] = useState<any[]>([]);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  // handle when clicked on back
  const handleBack = () => {
    router.push("/cart");
  };

  // handle when clicked on confirm order
  const handleConfirm = async (stripeData: any[]) => {
    if (!addressValue || addressValue.trim() === "") {
      toast.error("Please enter or select a delivery/pickup address!");
      return;
    } else if (paymentMethod === "") {
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

    //add delivery charges in amount
    let total = amount + deliveryFee;

    // call the api and save the order in mongodb
    const data = {
      product: cartItems.map((item: any) => ({
        product: {
          ...item.product,
        },
        quantity: item.quantity,
        addons: item.addons,
        prod_id: item.prod_id,
      })),
      user: userInfo._id,
      email: userInfo.email,
      payment_status: "pending",
      amount: total,
      total_items: totalItems,
      payment_method: paymentMethod,
      delivery_address: addressValue,
      phone_no: phoneValue,
      // order_status is set server-side (default: PENDING)
    };

    try {
      const res = await createOrder(data).unwrap();
      dispatch({ type: "cart/clearCart" });
      toast.success("Order Placed!");
      router.push("/order-history");
    } catch (error: any) {
      toast.error(error?.data?.message || "Order failed. Please try again.");
    }
  };

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
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
        disabled={isLoading}
      >
        {t("confirmOrder")}
      </Button>
    </div>
  );
};

export default ConfirmOrder;
