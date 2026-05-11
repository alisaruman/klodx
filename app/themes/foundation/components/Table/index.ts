import { tableAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys)

const baseStyle = definePartsStyle({
  th: {
    textAlign: "center",
  },
  td: {
    textAlign: "center",
  },
})

const variantRounded = definePartsStyle((props) => {
  const similarStyles = {
    letterSpacing: 0,
    borderColor: "brandGray.1100",
    "&:last-child": {
      borderWidth: 0,
    },
    _dark: {
      borderColor: "brandDark.1300",
    },
  }

  return {
    tr: {
      borderBottom: "1px solid",
      ...similarStyles,
    },
    td: {
      borderLeft: "1px solid",
      ...similarStyles,
      py: 3,
      px: 3,
    },
    thead: {
      tr: {
        bg: "brandGray.1500",
        _dark: {
          bg: "brandDark.2000",
        },
      },
      th: {
        borderLeft: "1px solid",
        ...similarStyles,
        fontSize: "sm",
        fontWeight: "medium",
        color: "brandDark.2100",
        py: 5,
        px: 3,
        _dark: {
          color: "brandGray.1600",
          borderColor: "brandDark.1300",
        },
      },
    },
  }
})

export const TableTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { variantRounded },
  defaultProps: {
    variant: "variantRounded",
  },
})
