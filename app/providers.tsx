"use client"
import {
  ChakraProvider,
  cookieStorageManagerSSR,
  extendTheme,
  localStorageManager,
} from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useMemo, useRef } from "react"
import { Provider } from "react-redux"
import { AppStore, makeStore } from "./redux/store"
import "./styles/globals.css"
import dashboardStyles from "./themes/foundation/dashboardStyles"
import theme from "./themes/HcTheme"

export function Providers({
  children,
  cookies,
}: {
  children: React.ReactNode
  cookies: string
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager

  const pathname = usePathname()

  const currentTheme = useMemo(() => {
    if (
      pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/complete-profile") ||
      pathname.startsWith("/dashboard")
    ) {
      return extendTheme(theme, dashboardStyles)
    }
    return theme
  }, [pathname])

  return (
    <SessionProvider>
      <Provider store={storeRef.current}>
        <ChakraProvider
          theme={currentTheme}
          colorModeManager={colorModeManager}
        >
          {children}
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  )
}
