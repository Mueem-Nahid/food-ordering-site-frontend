import React, {useState} from "react";
import {Button} from "@mui/material";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {useTranslation} from "react-i18next";
import { useCreateOrderMutation } from "@/redux/features/orders/orderApi";

interface ConfirmOrderProps {
  phoneValue: string;
  addressValue: string;
  paymentMethod: string;
  deliveryFee: number;
  couponCode: string;
}

const ConfirmOrder: React.FC<ConfirmOrderProps> = ({phoneValue, addressValue, paymentMethod, deliveryFee, couponCode}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {cartItems, totalItems, amount} = useAppSelector((store) => store.cart);

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
      toast.error(t("enterAddress"));
      return;
    } else if (paymentMethod === "") {
      toast.error(t("choosePayment"));
      return;
    } else if (phoneValue === "") {
      toast.error(t("enterPhone"));
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
      toast.error(t("validPhone"));
      return;
    }

    //add delivery charges in amount
    const total = amount + deliveryFee;

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
      payment_status: "PENDING",
      amount: total,
      total_items: totalItems,
      payment_method: paymentMethod,
      delivery_address: addressValue,
      delivery_fee: deliveryFee,
      phone_no: phoneValue,
      ...(couponCode ? { couponCode } : {}),
      // order_status is set server-side (default: PENDING)
    };

    try {
      const res = await createOrder(data).unwrap();
      dispatch({ type: "cart/clearCart" });
      toast.success(t("orderPlaced"));
      router.push("/order-history");
    } catch (error: any) {
      toast.error(error?.data?.message || t("orderFailed"));
    }
  };

  return (
    <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem"}}>
      <Button
        sx={{
          borderColor: "white !important",
          color: "white !important",
          borderRadius: "8px",
          padding: {xs: "0.6rem 1.5rem", sm: "0.7rem 2.6rem"},
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
          padding: {xs: "0.6rem 1.5rem", sm: "0.8rem 2.6rem"},
          backgroundColor: "#e4002b !important",
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
