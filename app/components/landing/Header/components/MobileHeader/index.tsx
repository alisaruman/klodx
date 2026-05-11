"use client"

import React from "react"
import { dashboardLinks } from "@/app/utils/constants/dashboardLinks"
import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  Square,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import ModeSwitch from "../ModeSwitch"
import ProfileLoadingComponent from "../Profile/loading"
import WalletComponent from "../Wallet"

const ProfileComponent = dynamic(
  () => import("../../components/Profile/index"),
  {
    ssr: false,
    loading: () => <ProfileLoadingComponent />,
  },
)

interface Props {
  headerMenuItems: {
    label: string
    url: string
  }[]
  currentPath: string
  bg?: boolean
}

const MobileHeaderComponent = ({ headerMenuItems, currentPath, bg }: Props) => {
  const [smallDevice, mobile] = useMediaQuery([
    "(min-width: 500px) and (max-width:1024px)",
    "(max-width: 500px)",
  ])

  const { status } = useSession()
  const pathname = usePathname()
  const dashboardUrl = pathname.startsWith("/dashboard")

  const headerBg = useColorModeValue(
    bg ? "brandGray.1400" : "brandGray.bg.200",
    "brandDark.bg.200",
  )
  const borderColor = useColorModeValue("brandGray.1100", "brandDark.1300")
  const iconFilter = useColorModeValue("unset", "brightness(0) invert(1)")
  const activeIconFilter =
    "brightness(0) saturate(100%) invert(60%) sepia(84%) saturate(829%) hue-rotate(189deg) brightness(96%) contrast(87%)"
  const activeTextColor = "brandDark.1700"
  const linkBg = useColorModeValue("brandDark.1800", "brandDark.1900")
  const hoverBg = useColorModeValue("brandGray.1300", "brandDark.1600")
  const logoFilter = useColorModeValue("invert(1)", "")

  if (status !== "authenticated") return null

  const mobileMenuLinks = [
    { label: "خانه", url: "#" },
    { label: "خدمات", url: "#" },
    { label: "امنیت", url: "#" },
    { label: "تماس با ما", url: "#" },
  ]

  if (status !== "authenticated") return

  return (
    <Container
      as="header"
      maxW="full"
      py={6}
      bg={headerBg}
      borderBottom={dashboardUrl ? "1px solid" : undefined}
      borderColor={borderColor}
      pos="sticky"
      top={0}
      zIndex={999}
    >
      <Grid
        w="full"
        templateColumns="repeat(3, 1fr)"
        alignItems="center"
        gap={14}
      >
        <Menu>
          <MenuButton
            as="i"
            className="icon-hamburger"
            style={{
              width: "36px",
              height: "36px",
              filter: iconFilter,
            }}
          />
          <Portal>
            <MenuList
              zIndex={999}
              w="calc(100vw - 3rem)"
              {...(dashboardUrl && { bg: "white" })}
            >
              <WalletComponent />
              {!dashboardUrl
                ? mobileMenuLinks.map((item) => (
                    <MenuItem key={item.url}>
                      <Link href={item.url}>{item.label}</Link>
                    </MenuItem>
                  ))
                : dashboardLinks.map((item) => (
                    <React.Fragment key={item.url}>
                      {item.url === "/dashboard/settings" && (
                        <Divider w="full" borderColor={borderColor} />
                      )}
                      <MenuItem>
                        <Link
                          display="flex"
                          flexDir={dashboardUrl ? "row" : "column"}
                          alignItems="center"
                          gap={2}
                          href={item.url}
                          className="group"
                        >
                          <Square
                            bg="transparent"
                            {...(pathname === item.url && {
                              bg: linkBg,
                            })}
                            transitionDuration="0.2s"
                            _groupHover={{
                              bg: hoverBg,
                            }}
                            rounded="2xl"
                            size={10}
                          >
                            <Box
                              as="i"
                              transitionDuration="0.2s"
                              className={item.icon}
                              boxSize={6}
                              filter={
                                pathname === item.url
                                  ? activeIconFilter
                                  : iconFilter
                              }
                            />
                          </Square>
                          <Text
                            fontSize="sm"
                            color={
                              pathname === item.url
                                ? activeTextColor
                                : undefined
                            }
                          >
                            {item.label}
                          </Text>
                        </Link>
                      </MenuItem>
                    </React.Fragment>
                  ))}
              <MenuDivider />
              <Flex mt={6} justify="center">
                <ModeSwitch />
              </Flex>
            </MenuList>
          </Portal>
        </Menu>
        <Link href="#">
          <Image
            src="/images/global/logo.svg"
            alt="Logo"
            maxW={130}
            h="auto"
            filter={logoFilter}
          />
        </Link>
        {status === "authenticated" && <ProfileComponent />}
      </Grid>
    </Container>
  )
}

export default MobileHeaderComponent
