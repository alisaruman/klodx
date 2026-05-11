import { tabsAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys)

const baseStyle = definePartsStyle({
  tablist: {
    color: "brandGray.2000",
  },
})

export const TabsTheme = defineMultiStyleConfig({ baseStyle })
