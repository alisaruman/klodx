import { usePostRegisterMutation } from "@/app/redux/services/auth/authApi"
import { registerSchema } from "@/app/validationSchema"
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Field, Form, Formik, FormikValues } from "formik"
import { useState } from "react"
import { z, ZodError } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"

type OtpData = {
  temp_token: string
  email?: string
  phone?: string
  password: string
}

type RegisterFormComponentProps = {
  setCurrentStep: (step: string) => void
  setOtpData: (data: OtpData) => void
}

const RegisterFormComponent = ({
  setCurrentStep,
  setOtpData,
}: RegisterFormComponentProps) => {
  const [isPassword, setIsPassword] = useState(true)
  const [isConfirmPassword, setIsConfirmPassword] = useState(true)

  const [postRegisterData, { isLoading }] = usePostRegisterMutation()

  const submitHandler = async (values: FormikValues) => {
    const literalSchema = z.string().email()
    let isEmail = true
    try {
      literalSchema.parse(values.emailOrPhone)
    } catch (err) {
      isEmail = false
    }
    const data = {
      ...(isEmail
        ? { email: values.emailOrPhone }
        : { phone: values.emailOrPhone.replace("0", "+98") }),
      password: values.password,
      referrer_code: values.referralCode,
    }
    await postRegisterData(data)
      .unwrap()
      .then((res) => {
        setOtpData({
          ...(isEmail
            ? { email: values.emailOrPhone }
            : { phone: values.emailOrPhone }),
          temp_token: res.temp_token,
          password: values.password,
          ...(values.refferalCode && { referrer_code: values.refferalCode }),
        })

        setCurrentStep("otp")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Formik
      initialValues={{
        emailOrPhone: "",
        password: "",
        confirmPassword: "",
        referralCode: "",
      }}
      validateOnMount={true}
      validationSchema={toFormikValidationSchema(registerSchema)}
      validate={(values) => {
        try {
          registerSchema.parse(values)
        } catch (error) {
          if (error instanceof ZodError) {
            return error.formErrors.fieldErrors
          }
        }
      }}
      onSubmit={(values) => {
        submitHandler(values)
      }}
    >
      {({
        handleSubmit,
        errors,
        touched,
        handleChange,
        setFieldValue,
        isValid,
      }) => (
        <Form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl
              isInvalid={!!errors.emailOrPhone && !!touched.emailOrPhone}
              variant="floating"
            >
              <FormLabel htmlFor="emailOrPhone">
                شماره همراه یا آدرس ایمیل
              </FormLabel>
              <Field
                as={Input}
                id="emailOrPhone"
                name="emailOrPhone"
                type="text"
              />
              {touched.emailOrPhone && (
                <FormHelperText>{errors.emailOrPhone}</FormHelperText>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.password && !!touched.password}>
              <FormLabel htmlFor="password">رمز عبور</FormLabel>
              <Box pos="relative">
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type={isPassword ? "password" : "text"}
                />
                <AbsoluteCenter
                  as="i"
                  className="icon-password"
                  w={6}
                  h={6}
                  left={4}
                  axis="vertical"
                  cursor="pointer"
                  onClick={() => setIsPassword(!isPassword)}
                />
              </Box>
              {touched.password && (
                <FormHelperText flexDirection="column" alignItems="start">
                  {Array.isArray(errors.password)
                    ? errors.password.map((error, idx) => (
                        <Text as="div" key={idx}>
                          {error}
                        </Text>
                      ))
                    : errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              isInvalid={!!errors.confirmPassword && !!touched.confirmPassword}
            >
              <FormLabel htmlFor="confirmPassword">تکرار رمز عبور</FormLabel>
              <Box pos="relative">
                <Field
                  as={Input}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={isConfirmPassword ? "password" : "text"}
                  onChange={handleChange}
                />
                <AbsoluteCenter
                  as="i"
                  className="icon-password"
                  w={6}
                  h={6}
                  left={4}
                  axis="vertical"
                  cursor="pointer"
                  onClick={() => setIsConfirmPassword(!isConfirmPassword)}
                />
              </Box>
              {touched.confirmPassword && (
                <FormHelperText flexDirection="column" alignItems="start">
                  {Array.isArray(errors.confirmPassword)
                    ? errors.confirmPassword.map((error, idx) => (
                        <Text as="div" key={idx}>
                          {error}
                        </Text>
                      ))
                    : errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              isInvalid={!!errors.referralCode && !!touched.referralCode}
              variant="floating"
            >
              <FormLabel htmlFor="referralCode">کد معرف</FormLabel>
              <Field
                as={Input}
                id="referralCode"
                name="referralCode"
                type="text"
              />
              {touched.referralCode && (
                <FormHelperText>{errors.referralCode}</FormHelperText>
              )}
            </FormControl>
            <Button
              type="submit"
              rounded="2xl"
              mt={10}
              isDisabled={!isValid}
              isLoading={isLoading}
            >
              ادامه
            </Button>
            <Center gap={2} fontSize="sm">
              <Text>حساب کاربری دارید؟</Text>
              <Link href="/login" color="brandRed.1000">
                ورود
              </Link>
            </Center>
          </VStack>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterFormComponent
