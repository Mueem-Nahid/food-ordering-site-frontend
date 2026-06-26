import React, { useState } from "react";
import { TextField, Button, CircularProgress, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useApplyCouponMutation } from "@/redux/features/coupons/couponApi";
import type { ICouponApplyResult } from "@/types/globalTypes";

interface CouponInputProps {
  orderAmount: number;
  productIds: string[];
  couponCode: string;
  couponResult: ICouponApplyResult | null;
  setCouponCode: (code: string) => void;
  setCouponResult: (result: ICouponApplyResult | null) => void;
}

const CouponInput: React.FC<CouponInputProps> = ({
  orderAmount,
  productIds,
  couponResult,
  setCouponCode,
  setCouponResult,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [applyCoupon, { isLoading }] = useApplyCouponMutation();

  const handleApply = async () => {
    const code = inputValue.trim();
    if (!code) {
      toast.error("Please enter a coupon code.");
      return;
    }

    try {
      const res = await applyCoupon({
        code,
        orderAmount,
        productIds,
      }).unwrap();

      setCouponCode(code);
      setCouponResult(res.data || res);
      toast.success(`Coupon applied! You saved $${(res.data || res).discount.toFixed(2)}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Invalid or expired coupon code.");
    }
  };

  const handleRemove = () => {
    setCouponCode("");
    setCouponResult(null);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };

  if (couponResult) {
    return (
      <Box
        sx={{
          backgroundColor: "#1b5e20",
          borderRadius: "8px",
          padding: "0.8rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Box>
          <Typography variant="body2" sx={{ color: "#a5d6a7", fontWeight: 500 }}>
            Coupon <strong>{couponResult.coupon.code}</strong> applied
          </Typography>
          <Typography variant="body2" sx={{ color: "#fff" }}>
            - ${couponResult.discount.toFixed(2)} off
          </Typography>
        </Box>
        <IconButton size="small" onClick={handleRemove} sx={{ color: "#a5d6a7" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
      }}
    >
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value.toUpperCase())}
        onKeyDown={handleKeyDown}
        placeholder="Enter coupon code"
        variant="filled"
        size="small"
        sx={{
          flex: 1,
          backgroundColor: "#343434",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          "& .MuiInputBase-input": { color: "white", textTransform: "uppercase" },
        }}
        InputLabelProps={{ style: { color: "white" } }}
        color="error"
      />
      <Button
        onClick={handleApply}
        disabled={isLoading || !inputValue.trim()}
        variant="contained"
        sx={{
          backgroundColor: "#e4002b",
          "&:hover": { backgroundColor: "#c40022" },
          minWidth: "80px",
          textTransform: "none",
        }}
      >
        {isLoading ? <CircularProgress size={20} color="inherit" /> : "Apply"}
      </Button>
    </Box>
  );
};

export default CouponInput;
