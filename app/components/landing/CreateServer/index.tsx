import { Grid, Image, Text, useMediaQuery, VStack } from "@chakra-ui/react"

const CreateServerComponent = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)")

  return (
    <Grid
      as="section"
      gap={28}
      templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      alignItems="center"
    >
      <VStack spacing={4} align="start" order={isMobile ? 1 : 0}>
        <Text as="h3">سریع و آسان یک سرور بسازید</Text>
        <Text>
          سادگی و سرعت عمل در به راه اندازی و استقرار یک سرور بر روی محیط ابری
          را با ما تجربه نمایید. این کار تنها با طی سه مرحله ساده قابل انجام
          است.
        </Text>
      </VStack>
      <Image
        src="/images/landing/server-create-section.svg"
        alt="سریع و آسان سرور بسازید"
      />
    </Grid>
  )
}

export default CreateServerComponent
