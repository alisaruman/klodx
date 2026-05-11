import {
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  Image,
  Link,
  ListItem,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import ModeSwitch from "../ModeSwitch"
import { Suspense } from "react"
import ProfileLoadingComponent from "../Profile/loading"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import WalletComponent from "../Wallet"
import NotificationsLoadingComponent from "../Notifications/loading"

const ProfileComponent = dynamic(
  () => import("../../components/Profile/index"),
  {
    ssr: false,
    loading: () => <ProfileLoadingComponent />,
  },
)

const NotificationsComponent = dynamic(
  () => import("../../components/Notifications"),
  {
    ssr: false,
    loading: () => <NotificationsLoadingComponent />,
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

const DesktopHeaderComponent = ({
  headerMenuItems,
  currentPath,
  bg,
}: Props) => {
  const { status } = useSession()
  const pathname = usePathname()
  const dashboardUrl = pathname.startsWith("/dashboard") ? true : false

  const backgroundColor = useColorModeValue(
    bg ? "brandGray.1400" : "brandGray.bg.200",
    "brandDark.bg.200",
  )
  const logoFilter = useColorModeValue("invert(1)", "")

  return (
    <Container
      as="header"
      maxW="full"
      px={10}
      py="17.5px"
      bg={backgroundColor}
      pos="sticky"
      top={0}
      borderBottom={dashboardUrl ? "1px solid" : undefined}
      borderColor={useColorModeValue("brandGray.1100", "brandDark.1300")}
      zIndex={999}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap={14}>
          <Link href="#">
            <Image
              src="/images/global/logo.svg"
              alt="Logo"
              filter={logoFilter}
            />
          </Link>
          {!dashboardUrl && (
            <UnorderedList>
              <HStack spacing={14}>
                {headerMenuItems.map((item, i) => (
                  <ListItem key={i}>
                    <Link
                      href={item.url}
                      className={currentPath === item.url ? "active" : ""}
                      _hover={{ color: "brandRed.300" }}
                      variant="normal"
                    >
                      {item.label}
                    </Link>
                  </ListItem>
                ))}
              </HStack>
            </UnorderedList>
          )}
        </Flex>
        <Flex alignItems="center" justifyContent="end" gap={8}>
          {status === "unauthenticated" && (
            <Button as={Link} href="/login">
              ورود
            </Button>
          )}
          {status === "authenticated" && (
            <>
              <WalletComponent />
              <Divider orientation="vertical" h={6} />
            </>
          )}
          <ModeSwitch />
          {status === "authenticated" && (
            <>
              <Divider orientation="vertical" h={6} />
              <NotificationsComponent />
              <ProfileComponent />
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  )
}

export default DesktopHeaderComponent
