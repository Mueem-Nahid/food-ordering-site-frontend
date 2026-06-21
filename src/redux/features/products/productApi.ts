import { api } from "@/redux/api/apiSlice";

const PAGE_SIZE = 12;

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params,
      }),
      providesTags: ["products"],
    }),
    // Infinite-scroll endpoint: merges pages into a single cache entry.
    // Uses the official RTK Query infinite-scroll pattern:
    //   - serializeQueryArgs returns endpointName so all pages share one cache key
    //   - merge mutates the immer draft (currentCache) with push, NOT newResponse
    //   - forceRefetch triggers when the page arg changes
    getProductsPage: builder.query({
      query: (page: number = 1) => ({
        url: "/products",
        method: "GET",
        params: { page, limit: PAGE_SIZE },
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newResponse) => {
        if (currentCache?.data && newResponse?.data) {
          const existingIds = new Set(
            currentCache.data.map((p: { _id?: string }) => p._id)
          );
          const uniqueNew = newResponse.data.filter(
            (p: { _id?: string }) => !existingIds.has(p._id)
          );
          currentCache.data.push(...uniqueNew);
        }
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      providesTags: ["products"],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "products", id }],
    }),
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "/products",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "products", id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsPageQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
