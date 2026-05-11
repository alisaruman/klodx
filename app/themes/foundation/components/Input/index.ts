import { inputAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const base = definePartsStyle({
  field: {
    py: 6,
    px: 4,
    rounded: "2xl",
    border: "1px solid",
    borderColor: "brandGray.1100",
    _invalid: {
      borderColor: "brandRed.1000",
    },
    _dark: {
      borderColor: "brandDark.1300",
    },
  },
})

export const InputTheme = defineMultiStyleConfig({
  variants: { base },
  defaultProps: {
    variant: "base",
  },
})
