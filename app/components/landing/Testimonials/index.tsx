import { Box, Text } from "@chakra-ui/react"
import TestiSlider from "./components/TestiSlider"

const TestimonialsComponent = () => {
  return (
    <Box as="section" w="full">
      <Text as="h3" textAlign="center">
        نظرات کاربران
      </Text>
      <TestiSlider />
    </Box>
  )
}

export default TestimonialsComponent
