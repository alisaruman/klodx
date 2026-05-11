import { defineStyleConfig } from "@chakra-ui/react"

export const TextareaTheme = defineStyleConfig({
  baseStyle: {
    p: 4,
    rounded: "2xl",
    border: "1px solid",
    borderColor: "brandGray.1100",
    _invalid: {
      borderColor: "brandRed.1000",
    },
    _dark: {
      borderColor: "brandDark.1300",
    },
    variants: {
      normal: {
        borderWidth: 0,
        boxShadow: "unset",
      },
    },
  },
})
