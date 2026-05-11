import {
  Box,
  Circle,
  Flex,
  Grid,
  Link,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react"

const whyBoxes = [
  {
    title: "خرید بر اساس مصرف",
    details: [
      "در این روش می‌توانید بر اساس ساعتهایی که محیط ابری را در اختیار دارید از خدمات بهره مند شوید",
      "پرداخت هزینه با شارژ کیف پول انجام خواهد شد و براساس مصرف از کیف پول شما کسر خواهد شد. ",
    ],
    url: "#",
  },
  {
    title: "سرویس ماهیانه",
    details: [
      "بر اساس نیاز می‌توانید از سرویس ماهانه استفاده نمایید.",
      "هنگام استفاده از این بسته شما از تخفیف مناسب بهره مند خواهید شد",
    ],
    url: "#",
  },
  {
    title: "سرویس های دراز مدت",
    details: [
      "در صورت نیاز به محیط ابری برای مدت طولانی‌تر دارید می‌توانید این بسته ها را انتخاب نمایید.",
      "با استفاده از بسته های دراز مدت امکان بهره مندی از تخفیفات بیشتری را خواهید داشت.",
    ],
    url: "#",
  },
]

const PlansComponent = () => {
  const bg = useColorModeValue("brandGray.bg.500", "brandDark.bg.100")
  const borderColor = useColorModeValue("brandGray.bg.100", "brandDark.bg.500")
  const borderBottomColor = useColorModeValue(
    "brandGray.bg.100",
    "brandDark.bg.500",
  )

  return (
    <VStack as="section" spacing={6}>
      <Text as="h3">روش‌های متنوع و گوناگون برای خرید خدمات از ما</Text>
      <Grid
        w="full"
        templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={{ base: 16, lg: 6 }}
        mt={20}
      >
        {whyBoxes.map((item, i) => (
          <VStack
            key={i}
            bg={bg}
            rounded={24}
            border="1px solid"
            borderColor={borderColor}
          >
            <Text
              as="h4"
              p={6}
              borderBottom="1px solid"
              borderColor={borderBottomColor}
            >
              {item.title}
            </Text>
            <VStack p={6} spacing={6} justifyContent="space-between" h="full">
              <Box>
                {item.details.map((detail, i) => (
                  <Flex gap={2} key={i}>
                    <Circle
                      size={6}
                      border="1px solid"
                      borderColor="brandDark.bg.700"
                      flexShrink={0}
                    >
                      <Box
                        as="i"
                        className="icon-select flex"
                        boxSize={3}
                        filter="brightness(0) saturate(100%) invert(64%) sepia(67%) saturate(238%) hue-rotate(179deg) brightness(86%) contrast(96%)"
                      />
                    </Circle>
                    <Text>{detail}</Text>
                  </Flex>
                ))}
              </Box>
              <Link
                href={item.url}
                variant="solid"
                w="full"
                textAlign="center"
                py={3}
              >
                خرید
              </Link>
            </VStack>
          </VStack>
        ))}
      </Grid>
    </VStack>
  )
}

export default PlansComponent
