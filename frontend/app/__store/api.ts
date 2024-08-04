import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { TLoginInfo, TUserRepository } from "../__typings/api";


const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" },
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...headers,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

const AppApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000",
  }),
  tagTypes: [
    
  ], // Defines tags to be attached to end points for caching and refetching purposes
  reducerPath: "AppApi",
  endpoints: (builder) => ({
    //
    // CUSTOMER ENDPOINT
    //
    // getAllCustomers: builder.query<TAllCustomers, void>({
    //   query: () => ({
    //     url: "/api/Customer/all",
    //     method: "GET",
    //   }),
    //   providesTags: ["customer"],
    // }),
    // addCustomer: builder.mutation<TResponse, TAddCustomer>({
    //   query: (requestBody) => ({
    //     url: "/api/Customer/add",
    //     method: "POST",
    //     data: requestBody,
    //   }),
    //   invalidatesTags: ["customer"],
    // }),

    // LOGIN
    login: builder.mutation<TLoginInfo, {code: string}>({
      query: (requestBody) => ({
        url: "/github/login",
        method: "POST",
        data: requestBody,
      }),
    }),
    getUserRepositories: builder.query<TUserRepository[], {accessJwt: string}>({
      query: (requestBody) => ({
        url: "/github/user/repositories",
        method: "POST",
        data: requestBody,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserRepositoriesQuery
} = AppApi;
export default AppApi;