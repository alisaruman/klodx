import { Box, Image, Text } from "@chakra-ui/react"
import Bubble from "./components/Bubble"

const WorldMapComponent = () => {
  return (
    <Box as="section" w="full">
      <Text as="h3" textAlign="center">
        گستره‌ای به وسعت جهان
      </Text>
      <Text textAlign="center">
        با توجه به آنکه پراکندگی محیط های ابری ارایه شده توسط ما گستره وسیعی را
        شامل می‌شود شما می‌توانید بسته به نیاز کسب و کار خود محیط ابری مناسب خود
        را در هر نقطه از جهان که لازم باشد انتخاب نمایید.
      </Text>
      <Box pos="relative" mt={16}>
        <Image
          src="/images/landing/world-map.svg"
          w="full"
          h="auto"
          alt="World"
          draggable={false}
        />
        <Bubble color="brandRed.300" size={5} top={5} left={20} />
        <Bubble color="brandRed.300" size={5} top={35} left={25} />
        <Bubble color="brandDark.bg.800" size={5} top={40} left={48} />
        <Bubble color="brandDark.bg.800" size={5} top={55} left={60} />
        <Bubble color="brandRed.300" size={5} top={25} left={65} />
        <Bubble color="brandDark.bg.800" size={5} top={35} left={75} />
      </Box>
    </Box>
  )
}

export default WorldMapComponent
