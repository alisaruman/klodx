import { Box, Text, useMediaQuery, VStack } from "@chakra-ui/react"
import StepsCircle from "./components/StepsCircle"
import StepsLineComponent from "./components/StepsLineComponent"

const stepCircles = [
  { label: "ثبت نام", iconClass: "icon-landing-signup" },
  { label: "انتخاب پکیج", iconClass: "icon-select" },
  { label: "تنظیمات منابع", iconClass: "icon-www" },
]

const StepsComponent = () => {
  const [mobile] = useMediaQuery("(max-width: 500px)")

  return (
    <VStack as="section">
      <Text as="h3">در سه مرحله سرورت آمادست</Text>
      <Text textAlign="center">
        پس از آنکه در سامانه ثبت نام کردی میتونی بسته مورد نظرت رو انتخاب کنی
        بعد هم با انتخاب منابع مورد نیاز سرورت آماده استفاده است.
      </Text>
      <Box
        w="full"
        h="200px"
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap={mobile ? 16 : 20}
        px={mobile ? 16 : 0}
        pos="relative"
      >
        <StepsLineComponent />
        <Box
          pos="absolute"
          w="full"
          h="full"
          display="flex"
          mt={8}
          alignItems="center"
          justifyContent="space-between"
          px={6}
        >
          {stepCircles.map((item) => (
            <StepsCircle
              key={item.label}
              label={item.label}
              iconClass={item.iconClass}
            />
          ))}
        </Box>
      </Box>
    </VStack>
  )
}

export default StepsComponent
