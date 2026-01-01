import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const {user} = getState()
      headers.set("authorization", user?.accessToken ? "Bearer " + user.accessToken : "")
      return headers
    }
  }),
  tagTypes: ['newPost', 'fetchAfterDelete', 'comments', 'login', 'fetchAfterReact', 'products', 'categories', 'orders', 'addons', 'user'],
  endpoints: () => ({}),
});
