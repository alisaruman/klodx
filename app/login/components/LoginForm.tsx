import AlertComponent from "@/app/components/utils/AlertComponent"
import { loginSchema } from "@/app/validationSchema"
import {
  AbsoluteCenter,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  CloseButton,
  Collapse,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { z, ZodError } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"

const LoginFormComponent = ({
  onForgetPassword,
}: {
  onForgetPassword: () => void
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isPassword, setIsPassword] = useState(true)
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

  return (
    <>
      <Collapse in={isErrorOpen} animateOpacity>
        <AlertComponent
          status="error"
          title="اطلاعات وارد شده اشتباه است."
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
        initialValues={{ emailOrPhone: "", password: "" }}
        validateOnMount={false}
        validationSchema={toFormikValidationSchema(loginSchema)}
        validate={(values) => {
          try {
            loginSchema.parse(values)
          } catch (error) {
            if (error instanceof ZodError) {
              return error.formErrors.fieldErrors
            }
          }
        }}
        onSubmit={async (values) => {
          setIsLoading(true)
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
          }
          await signIn("credentials", {
            ...data,
            redirect: false,
            callbackUrl: "/",
          })
            .then((res) => {
              setIsLoading(false)
              res?.url ? router.push("/") : onErrorOpen()
            })
            .catch(() => {
              onWarningOpen()
            })
        }}
      >
        {({ handleSubmit, errors, touched, isValid }) => (
          <Form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl
                isInvalid={!!errors.emailOrPhone && touched.emailOrPhone}
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
                {touched.emailOrPhone && errors.emailOrPhone && (
                  <FormHelperText>{errors.emailOrPhone}</FormHelperText>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.password && touched.password}>
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
                {touched.password && errors.password && (
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
              <Button
                type="button"
                variant="normal"
                fontSize="sm"
                color="brandRed.1000"
                mt={-6}
                minW="unset"
                justifyContent="start"
                p={0}
                onClick={onForgetPassword}
              >
                رمز را فراموش کرده‌اید؟
              </Button>
              <Button
                type="submit"
                rounded="2xl"
                mt={10}
                isDisabled={!isValid}
                isLoading={isLoading}
              >
                ورود
              </Button>
              <Center gap={2} fontSize="sm">
                <Text>حساب کاربری ندارید؟</Text>
                <Link href="/register" color="brandRed.1000">
                  ثبت نام کنید
                </Link>
              </Center>
            </VStack>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default LoginFormComponent
