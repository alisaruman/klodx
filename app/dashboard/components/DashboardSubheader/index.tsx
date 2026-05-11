import { dashboardLinks } from "@/app/utils/constants/dashboardLinks"
import { Flex, Text, useColorModeValue } from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

interface Props {
  leftElement?: ReactNode
  centerElement?: ReactNode
}

const DashboardSubheaderComponent = ({ leftElement, centerElement }: Props) => {
  const pathname = usePathname()
  const pageTitle = dashboardLinks.map((item) => {
    return item.url === pathname ? item.label : null
  })

  return (
    <Flex
      align="center"
      justify="space-between"
      p={6}
      gap={4}
      w="full"
      bg={useColorModeValue("brandGray.1400", "brandDark.bg.200")}
      borderBottom="1px solid"
      borderColor={useColorModeValue("brandGray.1100", "brandDark.1300")}
    >
      {centerElement ? (
        centerElement
      ) : (
        <>
          <Text as="h4" m={0}>
            {pageTitle}
          </Text>
          {leftElement}
        </>
      )}
    </Flex>
  )
}

export default DashboardSubheaderComponent
