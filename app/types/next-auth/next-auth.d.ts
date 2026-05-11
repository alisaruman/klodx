import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      email?: string
      phone?: string
      name?: string
      refresh_token?: string
      isVerifiedEmail?: string
      isVerifiedPhone?: string
      access_token?: string
    }
  }

  interface User {
    ncode?: string
    user_code?: string
    phone?: string
    email?: string
    first_name?: string
    last_name?: string
    access?: string
    refresh?: string
    is_verified_email?: boolean
    is_verified_phone?: boolean
    is_complete_verification?: boolean
  }
}
