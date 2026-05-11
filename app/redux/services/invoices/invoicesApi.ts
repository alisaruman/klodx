import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../base"
import {
  postChargeWalletRequest,
  postChargeWalletResponse,
  postGetPayUrlRequest,
  postGetPayUrlResponse,
  postVoucherCheckRequest,
  postVoucherCheckResponse,
} from "./invoicesApiTypes"

export const invoicesApi = createApi({
  reducerPath: "invoices",
  baseQuery,
  endpoints: (builder) => ({
    postGetPayUrl: builder.mutation<
      postGetPayUrlResponse,
      postGetPayUrlRequest
    >({
      query: ({ invoice_id, voucher_code }) => {
        const body: Record<string, any> = { invoice_id }

        if (voucher_code !== "") {
          body.voucher_code = voucher_code
        }

        return {
          url: "/invoices/bank-gateway-url/",
          method: "POST",
          body,
        }
      },
    }),

    postChargeWallet: builder.mutation<
      postChargeWalletResponse,
      postChargeWalletRequest
    >({
      query: ({ amount, voucher_code }) => ({
        url: "/invoices/bank-gateway-url/charge-wallet/",
        method: "POST",
        body: {
          amount: amount + ".00",
          voucher_code,
        },
      }),
    }),

    postVoucherCheck: builder.mutation<
      postVoucherCheckResponse,
      postVoucherCheckRequest
    >({
      query: ({ invoice_code, voucher_code }) => ({
        url: "/voucher/check/",
        method: "POST",
        body: {
          invoice_code,
          voucher_code,
        },
      }),
    }),
  }),
})

export const {
  usePostChargeWalletMutation,
  usePostVoucherCheckMutation,
  usePostGetPayUrlMutation,
} = invoicesApi
