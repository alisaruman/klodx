import { Box, Circle, useMediaQuery } from "@chakra-ui/react"
import "./Bubble.css"

interface Props {
  size: number
  color: string
  top: number
  left: number
}

const Bubble = ({ size, color, top, left }: Props) => {
  const [mobile] = useMediaQuery("(max-width: 501px")

  return (
    <Box pos="absolute" top={`${top}%`} left={`${left}%`}>
      <Box
        pos="relative"
        w={!mobile ? size : size / 2}
        h={!mobile ? size : size / 2}
      >
        <Circle size="full" bg={color} pos="absolute" />
        <Circle size="full" className="bubble" bg={color} pos="absolute" />
      </Box>
    </Box>
  )
}

export default Bubble
