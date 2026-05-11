import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../base"
import { getWalletResponse } from "./paymentApiTypes"

export const paymentApi = createApi({
  reducerPath: "payment",
  baseQuery,
  endpoints: (builder) => ({
    getWallet: builder.query<getWalletResponse, void>({
      query: () => ({
        url: "/payment/wallet/",
      }),
    }),
  }),
})

export const { useLazyGetWalletQuery } = paymentApi
