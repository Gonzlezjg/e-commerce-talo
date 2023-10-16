import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = import.meta.env.MELI_TOKEN;
const baseUrl = import.meta.env.MELI_BASE_URL;

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.mutation({
      query: () => ({
        url: 'indexes/maestra/search?q=&sort=name%3Aasc',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }),
    }),
  }),
});

export const { useGetProductsMutation } = productsApi;
