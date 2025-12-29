import { api } from "@/redux/api/apiSlice";

const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (params) => ({
        url: "/categories",
        method: "GET",
        params,
      }),
      providesTags: ["categories"],
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "categories", id }],
    }),
    createCategory: builder.mutation({
      query: (payload) => ({
        url: "/categories",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "categories", id }],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
