import {
  Box,
  Circle,
  Container,
  Flex,
  GridItem,
  HStack,
  Image,
  Link,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
  VStack,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react"

const footerMenu = [
  {
    title: "اسم برند",
    list: [
      { label: "سرویس‌ها", url: "#" },
      { label: "درباره ما", url: "#" },
      { label: "راه‌های ارتباطی", url: "#" },
      { label: "امنیت", url: "#" },
    ],
  },
  {
    title: "ارتباطات",
    list: [
      { label: "پشتیبانی", url: "#" },
      { label: "ارسال تیکت", url: "#" },
      { label: "سوالات پرتکرار", url: "#" },
      { label: "راه‌های ارتباطی", url: "#" },
    ],
  },
]

const LandingFooterComponent = () => {
  const [isMobile] = useMediaQuery("(max-width: 992px)")

  return (
    <Box as="footer" pt={14} bg={useColorModeValue("#fff", "brandDark.bg.900")}>
      <Container>
        <SimpleGrid columns={isMobile ? 1 : 3} spacing={4}>
          <GridItem colSpan={2}>
            <SimpleGrid columns={isMobile ? 2 : 3} w="full">
              {footerMenu.map((item, i) => (
                <VStack key={i} spacing={8} align="start">
                  <Text as="h4">{item.title}</Text>
                  {item.list.length > 0 && (
                    <UnorderedList m={0} lineHeight={10}>
                      {item.list.map((listItem, i) => (
                        <ListItem key={i}>
                          <Link
                            href={listItem.url}
                            _hover={{ color: "brandRed.300" }}
                            variant="normal"
                          >
                            {listItem.label}
                          </Link>
                        </ListItem>
                      ))}
                    </UnorderedList>
                  )}
                </VStack>
              ))}
            </SimpleGrid>
          </GridItem>
          <Flex direction="column" align="end" justify="center">
            <VStack
              w="full"
              spacing={6}
              bg={useColorModeValue("brandGray.bg.500", "brandDark.bg.100")}
              rounded="2xl"
              p={6}
            >
              <VStack
                w="full"
                spacing={4}
                align="end"
                borderBottom="1px solid"
                borderColor={useColorModeValue(
                  "brandGray.bg.100",
                  "brandDark.bg.500",
                )}
                pb={6}
              >
                <Flex gap="10px" dir="ltr">
                  <Box as="i" className="icon-mail" boxSize={6} />
                  <Link href="mailto:info@duniar.com">Info@duniar.com</Link>
                </Flex>
                <Flex gap="10px" dir="ltr">
                  <Box as="i" className="icon-phone" boxSize={6} />
                  <Link href="tel:=98211234567">(405) 555-4444</Link>
                </Flex>
              </VStack>
              <HStack spacing={6}>
                <Link href="#">
                  <Box as="i" className="icon-x" boxSize={6} />
                </Link>
                <Link href="#">
                  <Circle bg="brandDark.bg.700" size={6}>
                    <Box
                      as="i"
                      className="icon-telegram"
                      boxSize={6}
                      filter={useColorModeValue("brightness(0) invert(1)", "")}
                    />
                  </Circle>
                </Link>
                <Link href="#">
                  <Box as="i" className="icon-whatsapp" boxSize={6} />
                </Link>
              </HStack>
            </VStack>
          </Flex>
        </SimpleGrid>
        <Flex
          justify="space-between"
          align="center"
          direction={isMobile ? "column" : "row"}
          gap={5}
          w="full"
          py={4}
          mt={12}
          borderTop="1px solid"
          borderColor={useColorModeValue(
            "brandGray.bg.100",
            "brandDark.bg.500",
          )}
        >
          <Text>تمامی حقوق متعلق به شرکت دانیار می‌باشد.</Text>
          <Link href="#">
            <Image
              src="images/landing/enamad.png"
              alt="enamad"
              maxW={100}
              h="auto"
            />
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}

export default LandingFooterComponent
