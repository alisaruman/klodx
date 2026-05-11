import { createMultiStyleConfigHelpers } from "@chakra-ui/react"
import { CSSProperties } from "react"
import { formAnatomy as parts } from "@chakra-ui/anatomy"

const activeLabelStyles: CSSProperties = {
  transform: "scale(0.85) translateY(-24px)",
  opacity: "1",
}

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  container: {
    _invalid: { borderColor: "brandRed.1000" },
  },
  helperText: {
    fontSize: "xs",
    color: "brandRed.1000",
    lineHeight: 6,
  },
})

export const FormTheme = defineMultiStyleConfig({
  baseStyle,
})
