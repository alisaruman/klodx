"use client"
import { Box, Button, useColorModeValue, useMediaQuery } from "@chakra-ui/react"
import { usePathname, useRouter } from "next/navigation"
import { PropsWithChildren } from "react"
import DashboardLayout from "../DashboardLayout"

const TicketLayout = ({ children }: PropsWithChildren) => {
  const [tablet] = useMediaQuery("(max-width: 1024px)")
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = () => {
    if (!pathname.endsWith("/new")) {
      router.push(pathname + "/new")
    }
  }

  const TicketButton = (
    <Button
      rounded="lg"
      {...(tablet && { p: 4 })}
      leftIcon={
        <Box
          as="i"
          className="icon-plus"
          boxSize={4}
          filter={useColorModeValue("unset", "invert(1)")}
        />
      }
      onClick={handleNavigation}
    >
      ارسال تیکت
    </Button>
  )

  return (
    <DashboardLayout leftElement={TicketButton}>{children}</DashboardLayout>
  )
}

export default TicketLayout
