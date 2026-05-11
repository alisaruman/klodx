import {
  Circle,
  Grid,
  GridItem,
  Square,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react"

const whyBoxes = [
  {
    icon: "icon-speed",
    title: "سرعت بالا",
    description:
      "بهره گیری از  سخت‌افزار مناسب  امکان ارائه خدمات با سرعت بالا را فراهم نموده است. شما می‌توانید در انتظار سرعتی بین ۳۰۰ تا ۵۰۰ مگابیت در ثانیه باشید.",
  },
  {
    icon: "icon-secure",
    title: "امنیت",
    description:
      "با بهره گیری از ابزارهای لازم و ساختار مناسب، امکان محافظت از  داده‌ها و برنامه‌های کاربردی شما در مقابل حملات مختلف فراهم گردیده است. به این ترتیب تقریباً تمامی حملات بر اساس الگوهای از پیش تعیین شده شناسایی و متوقف خواهند شد.",
  },
  {
    icon: "icon-cloud",
    title: "پوشش بالای شبکه",
    description:
      "با توجه به اینکه هر یک از سرور ها دارای IP مجزایی خواهند بود که در اینترنت نیست ارتباط متقابل بین سرور ها به سادگی صورت خواهد پذیرفت. اما این باعث عدم دسترسی سرور ها به اینترنت نخواهد بود چرا که سرور ها با استفاده از IP های عمومی به راحتی در بستر شبکه اینترنت قابل دستیابی هستند. توزیع یکنواخت بار بر سرورها امکان  دوری از تنگناها را فراهم خواهد نمود تا پوشش بهتری از شبکه را فراهم نماید.",
  },
]

const WhyComponent = () => {
  const bg = useColorModeValue("brandGray.bg.500", "brandDark.bg.100")
  const borderColor = useColorModeValue("brandGray.bg.100", "brandDark.bg.500")
  const circleBg = useColorModeValue("brandGray.bg.600", "brandDark.bg.400")

  return (
    <VStack as="section" spacing={6}>
      <Text as="h3">چرا برند تجاری</Text>
      <Grid
        w="full"
        templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={{ base: 16, lg: 6 }}
        mt={20}
      >
        {whyBoxes.map((item) => (
          <GridItem
            key={item.title}
            py={16}
            px={6}
            bg={bg}
            rounded={24}
            border="1px solid"
            borderColor={borderColor}
            pos="relative"
          >
            <Circle
              rounded="full"
              size={20}
              pos="absolute"
              bg={circleBg}
              top={-10}
              right={4}
            >
              <Square as="i" className={item.icon} size={12} />
            </Circle>
            <Text as="h4">{item.title}</Text>
            <Text>{item.description} </Text>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  )
}

export default WhyComponent
