import { defineStyleConfig } from "@chakra-ui/react"

export const LinkTheme = defineStyleConfig({
  baseStyle: {
    fontWeight: "normal",
    borderRadius: 30,
    textDecor: "none !important",
    "&.active": {
      color: "brandRed.300",
    },
  },
  variants: {
    normal: {},
    solid: (props) => {
      return {
        bg: props.colorMode === "light" ? "brandRed.200" : "brandRed.300",
        color: props.colorMode === "light" ? "#fff" : "brandDark.bg.100",
        _hover: {
          bg: props.colorMode === "light" ? "brandRed.400" : "brandRed.500",
        },
        _active: {
          bg: props.colorMode === "light" ? "brandRed.600" : "brandRed.700",
        },
      }
    },
  },
  defaultProps: {
    variant: "normal",
  },
})
