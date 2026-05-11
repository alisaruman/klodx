"use client"
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Image,
  Link,
  useColorModeValue,
} from "@chakra-ui/react"
import NewPasswordForm from "./components/NewPasswordForm"

const NewPasswordPage = () => {
  return (
    <Center w="full" h="100vh">
      <Card>
        <CardHeader mt={12}>
          <Image
            src="/images/global/logo.svg"
            alt="Logo"
            filter={useColorModeValue(
              "brightness(0) saturate(100%) invert(29%) sepia(7%) saturate(2260%) hue-rotate(182deg) brightness(99%) contrast(92%)",
              "",
            )}
          />
        </CardHeader>
        <CardBody textAlign="right" w="full" p={8}>
          <NewPasswordForm />
        </CardBody>
        <Divider
          borderColor={useColorModeValue("brandGray.1100", "brandDark.1300")}
        />
        <CardFooter>
          <Link
            href="/"
            fontSize={14}
            color={useColorModeValue("brandDark.1200", "brandGray.1000")}
          >
            بازگشت به صفحه اصلی
          </Link>
        </CardFooter>
      </Card>
    </Center>
  )
}

export default NewPasswordPage
