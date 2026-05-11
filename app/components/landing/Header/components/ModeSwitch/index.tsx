import {
  Box,
  Center,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import ModeSwitchLoading from "./loading"

const ModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const initialBg = useColorModeValue("brandGray.bg.300", "brandDark.bg.300")
  const [activeMode, setActiveMode] = useState<string>()

  useEffect(() => {
    if (colorMode === "light") {
      setActiveMode("sun")
    } else if (colorMode === "dark") {
      setActiveMode("moon")
    }
  }, [colorMode])

  const handleClick = (mode: string) => {
    if (mode === "sun" && colorMode !== "light") {
      toggleColorMode()
      setActiveMode("sun")
    } else if (mode === "moon" && colorMode !== "dark") {
      toggleColorMode()
      setActiveMode("moon")
    }
  }

  const sunActive = activeMode === "sun"
  const moonActive = activeMode === "moon"

  if (!activeMode) return <ModeSwitchLoading />

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      bg={initialBg}
      w={20}
      h={4}
    >
      <Center
        w={10}
        h={10}
        borderRadius="full"
        bg={sunActive ? "white" : initialBg}
        ms="-12px"
        cursor="pointer"
        onClick={() => handleClick("sun")}
      >
        <Box
          as="i"
          className={`icon-sun${sunActive ? "-active" : ""}`}
          w={6}
          h={6}
        />
      </Center>
      <Center
        w={10}
        h={10}
        borderRadius="full"
        bg={moonActive ? "white" : initialBg}
        me="-12px"
        cursor="pointer"
        onClick={() => handleClick("moon")}
      >
        <Box
          as="i"
          className={`icon-moon${moonActive ? "-active" : ""}`}
          w={6}
          h={6}
        />
      </Center>
    </Flex>
  )
}

export default ModeSwitch
