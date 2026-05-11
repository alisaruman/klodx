import { AbsoluteCenter, Box, Circle } from "@chakra-ui/react"

interface Props {
  iconClass: string
  label: string
}

const StepsCircle = ({ iconClass, label }: Props) => {
  return (
    <Box pos="relative">
      <Circle size={16} bg="brandDark.bg.600">
        <Box as="i" className={iconClass} boxSize="2.5rem" />
      </Circle>
      <AbsoluteCenter
        axis="horizontal"
        whiteSpace="nowrap"
        textAlign="center"
        pt={3}
      >
        {label}
      </AbsoluteCenter>
    </Box>
  )
}

export default StepsCircle
