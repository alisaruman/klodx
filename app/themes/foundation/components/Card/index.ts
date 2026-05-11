import { cardAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    rounded: "2xl",
    bg: "brandGray.bg.1000",
    _dark: {
      bg: "brandDark.bg.200",
    },
    overflow: "hidden",
  },
  body: {
    p: 6,
  },
})

const variants = {
  normal: {},
  information: definePartsStyle({
    container: {
      w: "full",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
    },
  }),
  auth: definePartsStyle({
    container: {
      alignItems: "center",
      shadow: "0px 6px 8px 0px #4752661A",
      w: ["100%", "75%", "66.6666667%", "50%", "33.3333334%", "25%"],
      h: ["100%", "auto"],
      rounded: [0, 30],
      _dark: {
        shadow: "unset",
      },
    },
  }),
}

export const CardTheme = defineMultiStyleConfig({
  baseStyle,
  defaultProps: {
    variant: "auth",
  },
  variants,
})
