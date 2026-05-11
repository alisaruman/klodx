import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../base"
import {
  ServerPackageMeResponse,
  LocationResponse,
  ImageResponse,
  VoucherResponse,
  InvoiceResponse,
  getServersListResponse,
} from "./serverPackageApiTypes"

export const serverPackageApi = createApi({
  reducerPath: "serverPackageApi",
  baseQuery,
  tagTypes: ["SSHKeys", "Invoices"],
  endpoints: (builder) => ({
    getServerPackages: builder.query<
      ServerPackageMeResponse,
      { cpu_type?: string; cpu_architecture?: string; location?: string }
    >({
      query: ({ cpu_type = "", cpu_architecture = "", location = "" }) => ({
        url: "/services/server-package/",
        params: {
          cpu_type,
          cpu_architecture,
          location,
        },
      }),
    }),

    getServers: builder.query<getServersListResponse[], void>({
      query: () => "/cloud-server/",
    }),

    getLocations: builder.query<LocationResponse, void>({
      query: () => "/services/location/",
    }),

    getImages: builder.query<ImageResponse, void>({
      query: () => "/services/image/",
    }),

    getSSHKeys: builder.query<any, void>({
      query: () => ({
        url: "/cloud-server/ssh-key/",
      }),
      providesTags: ["SSHKeys"],
    }),

    addSSHKey: builder.mutation<void, any>({
      query: (body) => ({
        url: "/cloud-server/ssh-key/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SSHKeys"],
    }),

    createServerInvoice: builder.mutation<InvoiceResponse, any>({
      query: (body) => ({
        url: "/invoice/create-server/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Invoices"],
    }),

    payByWallet: builder.mutation<void, any>({
      query: (body) => ({
        url: "/invoice/pay-by-wallet/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Invoices"],
    }),

    getBankGatewayUrl: builder.mutation<{ pay_url: string }, any>({
      query: (body) => ({
        url: "/invoices/bank-gateway-url/",
        method: "POST",
        body,
      }),
    }),

    checkVoucher: builder.mutation<
      VoucherResponse,
      { invoice_code: string; voucher_code: string }
    >({
      query: (body) => ({
        url: "/voucher/check/",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const {
  useGetServersQuery,
  useGetServerPackagesQuery,
  useGetLocationsQuery,
  useGetImagesQuery,
  useGetSSHKeysQuery,
  useAddSSHKeyMutation,
  useCreateServerInvoiceMutation,
  usePayByWalletMutation,
  useGetBankGatewayUrlMutation,
  useCheckVoucherMutation,
} = serverPackageApi
