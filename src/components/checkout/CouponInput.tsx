import React from "react";
import { TextField, Button, CircularProgress, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon, resetCoupon } from "@/redux/features/coupons/couponSlice";
import { useTranslation } from "react-i18next";

interface CouponInputProps {
  orderAmount: number;
}

const CouponInput: React.FC<CouponInputProps> = ({ orderAmount }) => {
  const [couponInput, setCouponInput] = React.useState("");
  const dispatch = useDispatch();
  const couponState = useSelector((state: any) => state.coupon);
  const { t } = useTranslation();

  const handleApply = () => {
    if (couponInput) {
      dispatch(applyCoupon({ code: couponInput, orderAmount }) as any);
    }
  };

  return (
    <div className="checkout-item" style={{ marginBottom: "2rem" }}>
      <div
        className="delivery-head"
        style={{
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <strong>{t("Coupon") || "Coupon"}</strong>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <TextField
          id="coupon-code"
          label={t("Coupon Code") || "Coupon Code"}
          variant="filled"
          value={couponInput}
          onChange={e => setCouponInput(e.target.value)}
          required={false}
          disabled={couponState.loading}
          sx={{
            backgroundColor: "#343434",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            fontWeight: "bolder",
            marginBottom: "1rem",
            paddingRight: "0",
            width: "99%",
          }}
          inputProps={{ className: "floatingInput" }}
          InputLabelProps={{
            className: "floatingLabel",
          }}
          color="error"
        />
        <Button
          variant="contained"
          onClick={handleApply}
          disabled={couponState.loading || !couponInput}
          sx={{ minWidth: 90, height: 40 }}
        >
          {couponState.loading ? <CircularProgress size={20} /> : t("Apply") || "Apply"}
        </Button>
        {couponState.coupon && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              dispatch(resetCoupon());
              setCouponInput("");
            }}
            size="small"
            sx={{ height: 40 }}
          >
            {t("Remove") || "Remove"}
          </Button>
        )}
      </div>
      {couponState.error && (
        <Alert severity="error" sx={{ mt: 1 }}>{couponState.error}</Alert>
      )}
      {couponState.coupon && (
        <Alert severity="success" sx={{ mt: 1 }}>
          {t("Coupon")} <b>{couponState.coupon.code}</b> {t("applied!")} {t("Discount")}: {couponState.discount}
        </Alert>
      )}
    </div>
  );
};

export default CouponInput;
