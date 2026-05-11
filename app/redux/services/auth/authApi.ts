import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../base"
import {
  getMeResponse,
  patchCompleteProfilePayload,
  postForgetPasswordSendOtpPayload,
  postForgetPasswordSendOtpResponse,
  postForgetPasswordVerifyOtpPayload,
  postForgetPasswordVerifyOtpResponse,
  postNewPasswordPayload,
  postRegisterPayload,
  postRegisterResponse,
  postVerifyPayload,
  postVerifyResponse,
} from "./authApiTypes"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({
    postRegister: builder.mutation<postRegisterResponse, postRegisterPayload>({
      query: ({ email, phone, password, referrer_code }) => ({
        url: "/auth/register/",
        method: "POST",
        body: {
          ...(email && { email }),
          ...(phone && { phone }),
          password,
          ...(referrer_code && { referrer_code }),
        },
      }),
    }),

    postVerify: builder.mutation<postVerifyResponse, postVerifyPayload>({
      query: ({ otp, temp_token }) => ({
        url: "/auth/verify/",
        method: "POST",
        body: {
          otp,
          temp_token,
        },
      }),
    }),

    patchCompleteProfile: builder.mutation<{}, patchCompleteProfilePayload>({
      query: (body) => ({
        url: "/auth/me/",
        method: "PATCH",
        body,
      }),
    }),

    postForgetPasswordSendOtp: builder.mutation<
      postForgetPasswordSendOtpResponse,
      postForgetPasswordSendOtpPayload
    >({
      query: ({ email, phone }) => ({
        url: "/auth/reset-password/send-otp/",
        method: "POST",
        body: {
          phone,
          email,
        },
      }),
    }),

    postForgetPasswordVerifyOtp: builder.mutation<
      postForgetPasswordVerifyOtpResponse,
      postForgetPasswordVerifyOtpPayload
    >({
      query: ({ otp, temp_token }) => ({
        url: "/auth/reset-password/verify-otp/",
        method: "POST",
        body: {
          otp,
          temp_token,
        },
      }),
    }),

    postNewPassword: builder.mutation<void, postNewPasswordPayload>({
      query: ({ password, temp_token }) => ({
        url: "/auth/reset-password/change-password/",
        method: "POST",
        body: {
          password,
          temp_token,
        },
      }),
    }),

    getMe: builder.query<getMeResponse, void>({
      query: () => ({
        url: "/auth/me/",
      }),
    }),
  }),
})

export const {
  usePostRegisterMutation,
  usePostVerifyMutation,
  usePatchCompleteProfileMutation,
  usePostForgetPasswordSendOtpMutation,
  usePostForgetPasswordVerifyOtpMutation,
  usePostNewPasswordMutation,
  useGetMeQuery,
} = authApi
