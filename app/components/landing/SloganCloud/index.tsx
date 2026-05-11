import {
  Button,
  Flex,
  Grid,
  Image,
  Text,
  VStack,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react"

const SloganCloudComponent = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)")

  return (
    <Grid
      as="section"
      gap={28}
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      alignItems="center"
    >
      <VStack spacing={4} align="start" order={isMobile ? 1 : 0}>
        <Text as="h3">همه چیز روی ابر</Text>
        <Text>
          برنامه کاربردی خود را روی یک محیط ابری که از امنیت لازم برخوردار است
          بسازید، اجرا مایید و توسعه دهید. شما می‌توانید تمامی نیازمندیهای لازم
          برای یک برنامه کاربردی آنلاین راروی یک سرور ابری امن در دسترس داشته
          باشید.
        </Text>
        <Flex
          align="center"
          gap={4}
          w="full"
          maxW={96}
          direction={{ base: "column", md: "row" }}
        >
          <Button as="a" href="#" w="full">
            تست رایگان
          </Button>
          <Button
            as="a"
            href="#"
            w="full"
            variant="outline"
            colorScheme={useColorModeValue("brandRed", "brandGray")}
          >
            تماس با کارشناسان
          </Button>
        </Flex>
      </VStack>
      <Image
        src="/images/landing/slogan-cloud-section.svg"
        alt="همه چیز روی ابر اسلوگان"
      />
    </Grid>
  )
}

export default SloganCloudComponent
