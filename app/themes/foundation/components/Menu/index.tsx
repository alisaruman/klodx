import { menuAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {},
  list: {
    py: 6,
    bg: "brandGray.bg.200",
    rounded: "2xl",
    borderColor: "brandGray.bg.800",
    shadow: "none",
    _dark: {
      bg: "brandDark.bg.100",
      borderColor: "brandDark.bg.500",
    },
  },
  item: {
    py: 3,
    px: 4,
    bg: "transparent",
    transition: ".2s all ease-in-out",
    _hover: {
      bg: "brandGray.bg.700",
    },
    _active: {
      bg: "brandGray.bg.700",
    },
    _dark: {
      _hover: {
        bg: "brandDark.1000",
      },
      _active: {
        bg: "brandDark.1000",
      },
    },
  },
  groupTitle: {
    // this will style the text defined by the title prop
    // in the MenuGroup and MenuOptionGroup components
    textTransform: "uppercase",
    color: "white",
    textAlign: "center",
    letterSpacing: "wider",
    opacity: "0.7",
  },
  command: {
    // this will style the text defined by the command
    // prop in the MenuItem and MenuItemOption components
    opacity: "0.8",
    fontFamily: "mono",
    fontSize: "sm",
    letterSpacing: "tighter",
    pl: "4",
  },
  divider: {
    // this will style the MenuDivider component
    my: "4",
    borderColor: "brandGray.bg.800",
    borderBottom: "1px solid",
    _dark: {
      borderColor: "brandDark.bg.500",
    },
  },
})
// export the base styles in the component theme
export const MenuTheme = defineMultiStyleConfig({ baseStyle })
