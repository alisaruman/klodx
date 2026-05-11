import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import { auth } from "./auth"

export async function middleware(req: any) {
  const token = await auth()
  if (!token) return NextResponse.redirect(new URL("/login", req.url))
  return NextResponse.next()
}

export const config = {
  matcher: ["/complete-profile", "/login/new-password"],
}
