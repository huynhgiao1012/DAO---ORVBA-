import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IP, KEY_TOKEN } from "../Utils/constants";

// Define a service using a base URL and expected endpoints

export const accountantApi = createApi({
  reducerPath: "accountantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${IP}:3000/api/v1/accountant`,
    prepareHeaders: async (headers, query) => {
      const Token = localStorage.getItem("token");
      if (Token) {
        headers.set("authorization", `Bearer ${Token}`);
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCarSpares: builder.mutation({
      query: () => ({
        url: "/getAllCarSpares",
      }),
    }),
    addCarSpares: builder.mutation({
      query: (payload) => ({
        url: `/addCarSpares`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    addSubCarSpares: builder.mutation({
      query: (payload) => ({
        url: `/addSubCarSpares`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllCarSparesMutation,
  useAddCarSparesMutation,
  useAddSubCarSparesMutation,
} = accountantApi;
