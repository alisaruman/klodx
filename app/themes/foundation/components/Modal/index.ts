import { modalAnatomy as parts } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const base = definePartsStyle({
  overlay: {
    bg: "rgba(0, 0, 0, 0.5)",
  },
  dialog: {
    borderRadius: "lg",
    py: 10,
    px: 6,
    bg: "brandGray.bg.1000",
    _dark: {
      bg: "brandDark.bg.200",
    },
  },
  header: {
    textAlign: "center",
    color: "brandDark.2400",
    fontSize: "xl",
    _dark: {
      color: "brandGray.2200",
    },
  },
  footer: {
    mt: 14,
    justifyContent: "center",
  },
})

export const ModalTheme = defineMultiStyleConfig({
  variants: { base },
  defaultProps: {
    variant: "base",
  },
})
