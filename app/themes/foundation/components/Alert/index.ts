import { alertAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    rounded: "lg",
    mb: 6,
  },
  title: {
    fontSize: "sm",
    fontWeight: "normal",
  },
})

const variants = {
  warning: definePartsStyle({
    container: {
      bg: "alert.warning.100",
      _dark: {
        bg: "alert.bg.500",
      },
    },
    title: {
      color: "alert.warning.700",
      _dark: {
        color: "alert.warning.400",
      },
    },
  }),
  success: definePartsStyle({
    container: {
      bg: "alert.success.100",
      _dark: {
        bg: "alert.bg.500",
      },
    },
    title: {
      color: "alert.success.800",
      _dark: {
        color: "alert.success.400",
      },
    },
  }),
  error: definePartsStyle({
    container: {
      bg: "alert.error.100",
      _dark: {
        bg: "alert.bg.500",
      },
    },
    title: {
      color: "alert.error.800",
      _dark: {
        color: "alert.error.500",
      },
    },
  }),
}

const alertTheme = defineMultiStyleConfig({
  baseStyle,
  defaultProps: {
    variant: "warning",
  },
  variants,
})

export const AlertTheme = alertTheme
