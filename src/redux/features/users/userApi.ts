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
  })
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useGoogleAuthUpsertMutation
} = userApi;
