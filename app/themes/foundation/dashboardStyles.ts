import { ThemeOverride } from "@chakra-ui/react"
import { mode, GlobalStyleProps } from "@chakra-ui/theme-tools"

const dashboardStyles: ThemeOverride = {
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        bg: mode("brandGray.bg.900", "brandDark.1100")(props),
      },
    }),
  },
}

export default dashboardStyles
