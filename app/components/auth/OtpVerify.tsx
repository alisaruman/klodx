import {
  usePostForgetPasswordVerifyOtpMutation,
  usePostRegisterMutation,
  usePostVerifyMutation,
} from "@/app/redux/services/auth/authApi"
import { otpVerifySchema } from "@/app/validationSchema"
import {
  Button,
  Collapse,
  FormControl,
  FormHelperText,
  HStack,
  PinInput,
  PinInputField,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ZodError } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"
import AlertComponent from "../utils/AlertComponent"

interface Props {
  email?: string
  phone?: string
  temp_token?: string
  password?: string
  referrer_code?: string
  onEdit: () => void
  onSuccess: () => void
  isLoginStep?: boolean
  setCurrentStep?: (step: string) => void
  setCompleteProfileData?: (data: {
    email?: string
    phone?: string
    password?: string
  }) => void
}

const OtpVerifyComponent = ({
  email,
  phone,
  temp_token,
  password,
  referrer_code,
  onEdit,
  onSuccess,
  isLoginStep,
  setCurrentStep,
  setCompleteProfileData,
}: Props) => {
  const [sendData, { isLoading: registerLoading }] = usePostVerifyMutation()
  const [sendForgetPasswordData, { isLoading: forgetPasswordLoading }] =
    usePostForgetPasswordVerifyOtpMutation()
  const [resendOtpCode, { isLoading: otpLoading }] = usePostRegisterMutation()
  const [timer, setTimer] = useState(120)
  const [showResendButton, setShowResendButton] = useState(false)

  const {
    onOpen: onErrorOpen,
    isOpen: isErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure()
  const {
    onOpen: onWarningOpen,
    isOpen: isWarningOpen,
    onClose: onWarningClose,
  } = useDisclosure()

  const router = useRouter()

  const textColor = useColorModeValue("brandDark.1200", "brandGray.1000")
  const timerColor = useColorModeValue("brandDark.1200", "brandGray.1000")

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(countdown)
    } else {
      setShowResendButton(true)
    }
  }, [timer])

  const resendOtpHandler = async () => {
    await resendOtpCode({
      email,
      phone: phone?.replace("0", "+98"),
      password: password!,
      referrer_code,
    })
      .unwrap()
      .then(() => {
        setTimer(120)
        setShowResendButton(false)
      })
      .catch((err) => console.log(err))
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`
  }

  return (
    <>
      <Collapse in={isErrorOpen} animateOpacity>
        <AlertComponent
          status="error"
          title="کد وارد شده اشتباه است."
          onClose={onErrorClose}
        />
      </Collapse>
      <Collapse in={isWarningOpen} animateOpacity>
        <AlertComponent
          status="warning"
          title="مشکلی پیش آمد ... دوباره تلاش کنید"
          onClose={onWarningClose}
        />
      </Collapse>
      <Formik
        initialValues={{ otpCode: "" }}
        validateOnMount={true}
        validate={(values) => {
          try {
            otpVerifySchema.parse(values)
          } catch (error) {
            if (error instanceof ZodError) {
              return error.formErrors.fieldErrors
            }
          }
        }}
        validationSchema={toFormikValidationSchema(otpVerifySchema)}
        onSubmit={async (values) => {
          const data = {
            ...(email && { email }),
            ...(phone && { phone }),
            ...(isLoginStep ? { temp_token } : { password: password! }),
          }
          const sendOtpVerification = isLoginStep
            ? sendForgetPasswordData
            : sendData

          await sendOtpVerification({ otp: values.otpCode, temp_token })
            .unwrap()
            .then(async (res: { temp_token?: string }) => {
              if (!isLoginStep) {
                const result = await signIn("credentials", {
                  ...data,
                  redirect: false,
                  callbackUrl: "/complete-profile",
                })
                if (setCompleteProfileData) setCompleteProfileData(data)
                if (result?.ok) router.push("/complete-profile")
              } else {
                router.push("/login/new-password?temp_token=" + res.temp_token)
              }
              onSuccess()
            })
            .catch((err) => {
              if (err.status === 406) onErrorOpen()
              else onWarningOpen()
            })
        }}
      >
        {({ handleSubmit, errors, touched, isValid, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <Text fontSize="sm" color={textColor}>
                کد ارسال شده به {email ? "ایمیل " + email : "شماره " + phone}{" "}
                وارد کنید
              </Text>
              <Button
                type="button"
                variant="normal"
                fontSize="sm"
                color="brandRed.1000"
                mt={-6}
                minW="unset"
                justifyContent="start"
                p={0}
                onClick={onEdit}
              >
                ویرایش
              </Button>
              <HStack
                as={FormControl}
                variant="floating"
                dir="ltr"
                justify="center"
                gap={10}
              >
                <PinInput
                  id="otpCode"
                  onChange={(value) => setFieldValue("otpCode", value)}
                  otp
                  placeholder=""
                >
                  <PinInputField w={16} h={16} />
                  <PinInputField w={16} h={16} />
                  <PinInputField w={16} h={16} />
                  <PinInputField w={16} h={16} />
                </PinInput>
                {touched.otpCode && errors.otpCode && (
                  <FormHelperText>{errors.otpCode}</FormHelperText>
                )}
              </HStack>
              <Button
                type="submit"
                rounded="2xl"
                mt={10}
                isLoading={
                  isLoginStep ? forgetPasswordLoading : registerLoading
                }
                isDisabled={!isValid}
              >
                ادامه
              </Button>
              <Button
                type="button"
                variant="outline"
                rounded="2xl"
                onClick={onEdit}
              >
                بازگشت
              </Button>
              {!showResendButton ? (
                <Text textAlign="center" fontSize="sm" color={timerColor}>
                  ارسال مجدد کد: <Text as="span">{formatTime(timer)}</Text>
                </Text>
              ) : (
                <Button
                  variant="outline"
                  rounded="2xl"
                  colorScheme="brandDark"
                  onClick={resendOtpHandler}
                  isLoading={otpLoading}
                >
                  ارسال مجدد
                </Button>
              )}
            </VStack>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default OtpVerifyComponent
