import { api } from "@/redux/api/apiSlice";

const addonApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAddons: builder.query({
      query: (params) => ({
        url: "/addons",
        method: "GET",
        params,
      }),
      providesTags: ["addons"],
    }),
    getAddon: builder.query({
      query: (id) => ({
        url: `/addons/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "addons", id }],
    }),
    createAddon: builder.mutation({
      query: (payload) => ({
        url: "/addons",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["addons"],
    }),
    updateAddon: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/addons/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "addons", id }],
    }),
    deleteAddon: builder.mutation({
      query: (id) => ({
        url: `/addons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["addons"],
    }),
  }),
});

export const {
  useGetAddonsQuery,
  useGetAddonQuery,
  useCreateAddonMutation,
  useUpdateAddonMutation,
  useDeleteAddonMutation,
} = addonApi;
