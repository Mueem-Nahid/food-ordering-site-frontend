import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {RootState} from "@/redux/store";

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const {user} = getState() as RootState
      headers.set("authorization", user?.accessToken ? "Bearer " + user.accessToken : "")
      return headers
    }
  }),
  tagTypes: ['newPost', 'fetchAfterDelete', 'comments', 'login', 'fetchAfterReact', 'products', 'categories', 'orders', 'addons', 'user'],
  keepUnusedDataFor: 300,
  endpoints: () => ({}),
});
