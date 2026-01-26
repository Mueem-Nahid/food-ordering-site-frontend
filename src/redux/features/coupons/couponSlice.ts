import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface CouponState {
  code: string;
  discount: number;
  discountedAmount: number;
  coupon: any;
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  code: "",
  discount: 0,
  discountedAmount: 0,
  coupon: null,
  loading: false,
  error: null,
};

// Async thunk to apply coupon
export const applyCoupon = createAsyncThunk(
  "coupon/applyCoupon",
  async (
    { code, orderAmount }: { code: string; orderAmount: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080/api/v1"}/coupons/apply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, orderAmount }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to apply coupon");
      }
      return await res.json();
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to apply coupon");
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    resetCoupon: (state) => {
      state.code = "";
      state.discount = 0;
      state.discountedAmount = 0;
      state.coupon = null;
      state.loading = false;
      state.error = null;
    },
    setCouponCode: (state, action) => {
      state.code = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.discount = action.payload.discount;
        state.discountedAmount = action.payload.discountedAmount;
        state.coupon = action.payload.coupon;
        state.code = action.payload.coupon.code;
        state.error = null;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.discount = 0;
        state.discountedAmount = 0;
        state.coupon = null;
      });
  },
});

export const { resetCoupon, setCouponCode } = couponSlice.actions;
export default couponSlice.reducer;
