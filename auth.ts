import NextAuth, { Session } from "next-auth"
import Credentials from "next-auth/providers/credentials"

const options = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        phone: { label: "Phone or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(
          `${process.env.PUBLIC_BACKEND_API}/api/v1/auth/login-password/`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        const user = await res.json()
        if (res.ok && user) {
          return user.data
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ trigger, token, user }) {
      if (trigger === "signIn") {
        token.ncode = user.ncode
        token.user_code = user.user_code
        token.phone = user.phone
        token.email = user.email
        token.first_name = user.first_name
        token.last_name = user.last_name
        token.accessToken = user.access
        token.refreshToken = user.refresh
        token.isVerifiedEmail = user.is_verified_email
        token.isVerifiedPhone = user.is_verified_phone
        token.isCompleteVerification = user.is_complete_verification
      }
      return token
    },
    session: async ({ session, token }: { session: Session; token: any }) => {
      session.user.id = token.id
      session.user.email = token.email
      session.user.phone = token.phone
      session.user.name = token.first_name + " " + token.last_name
      session.user.access_token = token.accessToken
      session.user.refresh_token = token.refreshToken
      session.user.isVerifiedEmail = token.isVerifiedEmail
      session.user.isVerifiedPhone = token.isVerifiedPhone
      return session
    },
  },
  secret: process.env.AUTH_SECRET || "secret",
})

export const { handlers, signIn, signOut, auth } = options
