import { defineStyle, defineStyleConfig, cssVar } from "@chakra-ui/react"

const $startColor = cssVar("skeleton-start-color")
const $endColor = cssVar("skeleton-end-color")

export const SkeletonTheme = defineStyleConfig({
  baseStyle: {
    [$startColor.variable]: "colors.brandGray.200",
    [$endColor.variable]: "colors.brandGray.500",
    _dark: {
      [$startColor.variable]: "colors.brandDark.400",
      [$endColor.variable]: "colors.brandDark.500",
    },
  },
})
