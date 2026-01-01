import {api} from "@/redux/api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (payload) => ({
        url: '/auth/login',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['login'],
    }),
    signupUser: builder.mutation({
      query: (payload) => ({
        url: '/auth/signup',
        method: 'POST',
        body: payload
      })
    }),
    googleAuthUpsert: builder.mutation({
      query: (payload) => ({
        url: '/users/google-auth',
        method: 'POST',
        body: payload
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ['user'],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ['user'],
    }),
  })
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useGoogleAuthUpsertMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} = userApi;
