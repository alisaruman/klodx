import {
  Center,
  Flex,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react"
import ProfileMenu from "./components/ProfileMenu"

const ProfileComponent = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px")
  const lightBg = isMobile === true ? "transparent" : "brandGray.1300"

  return (
    <Flex justify="end">
      <Center
        w={10}
        h={10}
        borderRadius="full"
        bg={useColorModeValue(lightBg, "brandDark.1500")}
        cursor="pointer"
      >
        <ProfileMenu />
      </Center>
    </Flex>
  )
}

export default ProfileComponent
