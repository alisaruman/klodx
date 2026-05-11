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
import RegisterFormComponent from "./components/RegisterForm"

type OtpData = {
  temp_token: string
  email?: string
  phone?: string
  referrer_code?: string
}

type CompleteProfile = {
  email?: string
  phone?: string
  password?: string
}

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState("register")
  const [otpData, setOtpData] = useState<OtpData | null>(null)
  const [completeProfileData, setCompleteProfileData] =
    useState<CompleteProfile | null>(null)

  return (
    <Center w="full" minH="100vh" py={4}>
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
            {currentStep === "otp" && "ارسال کد تایید"}
            {currentStep === "register" && "ثبت نام"}
          </Text>
          {currentStep === "register" && (
            <RegisterFormComponent
              setCurrentStep={setCurrentStep}
              setOtpData={setOtpData}
            />
          )}
          {currentStep === "otp" && (
            <OtpVerifyComponent
              {...otpData}
              onEdit={() => setCurrentStep("register")}
              setCurrentStep={setCurrentStep}
              setCompleteProfileData={setCompleteProfileData}
              onSuccess={() => console.log("OTP sent")}
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

export default RegisterPage
