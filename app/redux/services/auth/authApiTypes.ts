export interface postRegisterPayload {
  email?: string
  phone?: string
  password: string
  referrer_code?: string
}

export interface postRegisterResponse {
  temp_token: string
}

export interface postVerifyPayload {
  otp: string
  temp_token?: string
}

export interface postVerifyResponse {
  ncode: string | null
  user_code: string
  phone: string | null
  email: string | null
  first_name: string | null
  last_name: string | null
  access: string
  refresh: string
  is_verified_email: boolean
  is_verified_phone: boolean
  is_complete_verification: boolean
}

export interface patchCompleteProfilePayload {
  first_name: string
  last_name: string
  ncode?: string
  address?: string
  postal_code?: string
  date_of_birth?: string
  landline_phone?: string
  is_foreign_nation: boolean
}

export interface postForgetPasswordSendOtpPayload {
  phone?: string
  email?: string
}

export interface postForgetPasswordSendOtpResponse {
  success?: boolean
  temp_token: string
}

export interface postForgetPasswordVerifyOtpPayload {
  otp: string
  temp_token?: string
}

export interface postForgetPasswordVerifyOtpResponse {
  temp_token: string
}

export interface postNewPasswordPayload {
  password: string
  temp_token: string
}

export interface getMeResponse {
  phone: string | null
  first_name: string | null
  last_name: string | null
  email: string | null
  ncode: string | null
  address: string | null
  postal_code: string | null
  landline_phone: string | null
  is_verified_email: boolean
  is_verified_phone: boolean
  is_complete_verification: boolean
  user_type: number
  user_limits: {}
  is_foreign_nation: boolean
  date_of_birth: string | null
}
