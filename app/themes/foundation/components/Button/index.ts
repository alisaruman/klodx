import { defineStyleConfig } from "@chakra-ui/react"

export const ButtonTheme = defineStyleConfig({
  baseStyle: {
    fontWeight: "normal",
    borderRadius: 30,
  },
  sizes: {
    md: {
      px: "2rem",
      minH: "3rem",
    },
  },
  variants: {
    solid: (props) => {
      return {
        bg: `${props.colorScheme}.200`,
        _hover: {
          bg: `${props.colorScheme}.500`,
        },
        _active: {
          bg: `${props.colorScheme}.700`,
        },
        // color: "#fff",
      }
    },
  },
  defaultProps: {
    size: "md",
    variant: "solid",
    colorScheme: "brandRed",
  },
})
