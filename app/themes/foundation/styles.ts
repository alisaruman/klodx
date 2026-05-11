import { ThemeOverride } from "@chakra-ui/react"
import { mode, GlobalStyleProps } from "@chakra-ui/theme-tools"

type GlobalStyles = Pick<ThemeOverride, "styles">

export default {
  global: (props: GlobalStyleProps) => ({
    body: {
      bg: mode(
        "linear-gradient(134.41deg, #C7D5F0 13.47%, #F7F9FC 56.64%, #C7D5F0 90.93%)",
        "linear-gradient(134.41deg, #060D1A 13.47%, #0F1C33 56.64%, #060D1A 90.93%)",
      )(props),
      backgroundAttachment: "fixed",
    },
    "& h1, & h2, & h3, & h4, & h5, & h6": {
      color: mode("brandDark.300", "brandGray.300")(props),
    },
    h3: {
      fontSize: ["20px", "32px"],
      fontWeight: "semibold",
      lineHeight: "42px",
      mb: 2,
    },
    h4: {
      fontSize: ["18px", "20px"],
      fontWeight: "medium",
      lineHeight: ["24px", "26px"],
      mb: 2,
    },
    p: {
      fontSize: ["14px", "16px"],
      color: mode("brandDark.300", "#c0c5cd")(props),
      lineHeight: ["24px", "26px"],
    },
    ul: {
      listStyle: "none !important",
    },
  }),
} as GlobalStyles
