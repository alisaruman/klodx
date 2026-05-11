import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { mode } from "@chakra-ui/theme-tools"

const baseStyle = defineStyle({
  color: "brandDark.1200",
  fontSize: "sm",
  _dark: {
    color: "brandGray.1000",
  },
})

export const FormLabelTheme = defineStyleConfig({
  baseStyle,
})
