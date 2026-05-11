import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getSession } from "next-auth/react"

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.PUBLIC_BACKEND_API + "api/v1",
  prepareHeaders: async (headers) => {
    const session = await getSession()
    if (session?.user?.access_token) {
      headers.set("Authorization", `Bearer ${session.user.access_token}`)
    }
    return headers
  },
  responseHandler: async (response: Response) => {
    if (response.status === 204) {
      return {}
    }

    const text = await response.text()
    const data = text ? JSON.parse(text) : null

    if (response.ok) {
      return data ? data.data : null
    } else {
      return data ? data.error : { error: "An unknown error occurred" }
    }
  },
})

const baseQueryWith204Handler = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 204) {
    return { data: {} }
  }

  return result
}

export { baseQueryWith204Handler as baseQuery }
