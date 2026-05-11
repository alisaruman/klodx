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
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useState } from "react"
import OtpVerifyComponent from "../components/auth/OtpVerify"
import ForgetPasswordFormComponent from "./components/ForgetPasswordForm"
import LoginFormComponent from "./components/LoginForm"

interface OtpData {
  email?: string
  phone?: string
}

const LoginPage = () => {
  const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(false)
  const [showOtpVerifyForm, setShowOtpVerifyForm] = useState(false)
  const [tempToken, setTempToken] = useState("")
  const [otpData, setOtpData] = useState<OtpData | null>(null)

  const handleForgetPasswordSuccess = (tempToken: string) => {
    setTempToken(tempToken)
    setShowForgetPasswordForm(false)
    setShowOtpVerifyForm(true)
  }

  const handleOtpVerifySuccess = () => setShowOtpVerifyForm(false)

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
          <Text as="h4" mb={12}>
            {showOtpVerifyForm
              ? "ارسال کد تایید"
              : showForgetPasswordForm
              ? "بازیابی رمز عبور"
              : "ورود"}
          </Text>
          {showOtpVerifyForm ? (
            <OtpVerifyComponent
              temp_token={tempToken}
              onEdit={() => setShowOtpVerifyForm(false)}
              onSuccess={handleOtpVerifySuccess}
              isLoginStep={true}
              {...otpData}
            />
          ) : showForgetPasswordForm ? (
            <ForgetPasswordFormComponent
              onForgetPassword={() => setShowForgetPasswordForm(false)}
              onSuccess={handleForgetPasswordSuccess}
              setOtpData={setOtpData}
            />
          ) : (
            <LoginFormComponent
              onForgetPassword={() => setShowForgetPasswordForm(true)}
            />
          )}
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

export default LoginPage
