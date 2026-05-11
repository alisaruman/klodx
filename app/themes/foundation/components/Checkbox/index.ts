import { checkboxAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
  control: {
    rounded: 4,
    borderWidth: 1,
    boxSize: 5,
  },
})

export const CheckboxTheme = defineMultiStyleConfig({ baseStyle })
