"use server"
import { signOut } from "@/auth"

export default async function logoutHandler() {
  await signOut({
    redirect: true,
  })
}
