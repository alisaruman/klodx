import React from "react"
import { dashboardLinks } from "@/app/utils/constants/dashboardLinks"
import {
  Box,
  Divider,
  Flex,
  Link,
  Square,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { usePathname } from "next/navigation"

const DashboardSidebarComponent = () => {
  const pathname = usePathname()
  const bg = useColorModeValue("brandGray.1400", "brandDark.bg.200")
  const borderColor = useColorModeValue("brandGray.1100", "brandDark.1300")
  const iconFilter = useColorModeValue(
    "brightness(100) invert(1)",
    "brightness(0) invert(1)",
  )
  const activeBg = useColorModeValue("brandDark.1800", "brandDark.1900")
  const hoverBg = useColorModeValue("brandGray.1300", "brandDark.1600")
  const activeFilter =
    "brightness(0) saturate(100%) invert(60%) sepia(84%) saturate(829%) hue-rotate(189deg) brightness(96%) contrast(87%)"
  const activeColor = "brandDark.1700"
  const disabledColor = useColorModeValue("gray.400", "gray.600")

  return (
    <Flex
      direction="column"
      align="center"
      py={12}
      gap={4}
      as="aside"
      w="full"
      h="full"
      minH="calc(100vh - 84px)"
      px={6}
      bg={bg}
      borderLeft="1px solid"
      borderColor={borderColor}
    >
      {dashboardLinks.map((item) => {
        const isActive = pathname === item.url
        const isDisabled = item.disabled

        return (
          <React.Fragment key={item.url}>
            {item.url === "/dashboard/settings" && (
              <Divider borderColor={borderColor} />
            )}
            <Link
              display="flex"
              flexDir="column"
              alignItems="center"
              gap={2}
              href={isDisabled ? undefined : item.url}
              className="group"
              onClick={isDisabled ? (e) => e.preventDefault() : undefined}
              cursor={isDisabled ? "not-allowed" : "pointer"}
              _hover={isDisabled ? { textDecoration: "none" } : undefined}
            >
              <Square
                bg={isActive ? activeBg : "transparent"}
                transitionDuration="0.2s"
                _groupHover={!isDisabled ? { bg: hoverBg } : undefined}
                rounded="2xl"
                size={10}
              >
                <Box
                  as="i"
                  transitionDuration="0.2s"
                  className={item.icon}
                  boxSize={6}
                  filter={isActive ? activeFilter : iconFilter}
                  color={isDisabled ? disabledColor : undefined}
                />
              </Square>
              <Text
                fontSize="sm"
                color={
                  isActive
                    ? activeColor
                    : isDisabled
                    ? disabledColor
                    : undefined
                }
              >
                {item.label}
              </Text>
            </Link>
          </React.Fragment>
        )
      })}
    </Flex>
  )
}

export default DashboardSidebarComponent
