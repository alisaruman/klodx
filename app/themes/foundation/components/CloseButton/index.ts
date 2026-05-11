import { defineStyle, defineStyleConfig } from "@chakra-ui/react"

const baseStyle = defineStyle({
  position: "absolute",
  left: 4,
  width: 6,
  height: 6,
})

const variants = {
  warning: defineStyle({
    color: "alert.warning.700",
    _dark: {
      color: "alert.warning.400",
    },
  }),
  success: defineStyle({
    color: "alert.success.800",
    _dark: {
      color: "alert.success.400",
    },
  }),
  error: defineStyle({
    color: "alert.error.800",
    _dark: {
      color: "alert.error.500",
    },
  }),
}

export const CloseButtonTheme = defineStyleConfig({
  baseStyle,
  variants,
})
