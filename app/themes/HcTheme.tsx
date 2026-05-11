import { ThemeConfig, extendTheme } from "@chakra-ui/react"
import colors from "./foundation/colors"
import { config } from "./foundation/config"
import fontSizes from "./foundation/fontSizes"
import fonts from "./foundation/fonts"
import styles from "./foundation/styles"
import components from "./foundation/components/"

const overrides = {
  config,
  styles,
  colors,
  fonts,
  fontSizes,
  components,
} as ThemeConfig

const theme = extendTheme({
  ...overrides,
  config,
})

export default theme
