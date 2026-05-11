import {
  Box,
  Center,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import logoutHandler from "./Logout"

const ProfileMenu = () => {
  const session = useSession()

  return (
    <Menu isLazy>
      <MenuButton
        as="i"
        className="icon-profile"
        style={{
          width: "24px",
          height: "24px",
          filter: useColorModeValue("unset", "brightness(0) invert(1)"),
        }}
      />
      <Portal>
        <MenuList
          zIndex={999}
          py={4}
          bg={useColorModeValue("brandGray.1800", "brandDark.bg.100")}
        >
          <Center flexDirection="column" gap={1}>
            <Text color="white">
              {!session.data?.user.name?.includes("null")
                ? session.data?.user.name
                : "--------"}
            </Text>
            <Text dir="ltr" fontSize="sm">
              {session.data?.user.email
                ? session.data?.user.email
                : session.data?.user.phone}
            </Text>
          </Center>
          <MenuDivider />
          <MenuItem
            as={Link}
            href="/dashboard"
            rounded={0}
            shadow="unset !important"
            icon={
              <Box
                as="i"
                className="icon-profile"
                boxSize={4}
                filter={useColorModeValue(
                  "unset",
                  "brightness(0) saturate(100%) invert(86%) sepia(4%) saturate(2143%) hue-rotate(187deg) brightness(94%) contrast(90%);",
                )}
              />
            }
          >
            داشبورد
          </MenuItem>
          <MenuItem
            icon={
              <Box
                as="i"
                className="icon-logout"
                boxSize={4}
                filter={useColorModeValue(
                  "unset",
                  "brightness(0) saturate(100%) invert(86%) sepia(4%) saturate(2143%) hue-rotate(187deg) brightness(94%) contrast(90%);",
                )}
              />
            }
            onClick={() => logoutHandler()}
          >
            خروج
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}

export default ProfileMenu
