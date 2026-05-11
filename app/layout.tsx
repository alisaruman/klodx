import { ColorModeScript } from "@chakra-ui/react"
import type { Metadata } from "next"
import { headers } from "next/headers"
import { Providers } from "./providers"
import "./styles/globals.css"
import theme from "./themes/HcTheme"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = headers()
  const cookies = headersList.get("cookie") ?? ""

  return (
    <html lang="fa" dir="rtl">
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Providers cookies={cookies}>{children}</Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: "HC",
  description: "Easily but products and services from Hetzner",
}
