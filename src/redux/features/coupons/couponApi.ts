import { api } from "@/redux/api/apiSlice";

const couponApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: (params) => ({
        url: "/coupons",
        method: "GET",
        params,
      }),
      providesTags: ["coupons"],
    }),
    getCoupon: builder.query({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "coupons", id }],
    }),
    createCoupon: builder.mutation({
      query: (payload) => ({
        url: "/coupons",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["coupons"],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/coupons/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "coupons", id }],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupons"],
    }),
    applyCoupon: builder.mutation({
      query: (payload) => ({
        url: "/coupons/apply",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useGetCouponQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useApplyCouponMutation,
} = couponApi;
