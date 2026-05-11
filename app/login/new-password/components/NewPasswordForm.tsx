import AlertComponent from "@/app/components/utils/AlertComponent"
import { usePostNewPasswordMutation } from "@/app/redux/services/auth/authApi"
import { newPasswordSchema } from "@/app/validationSchema"
import {
  AbsoluteCenter,
  Box,
  Button,
  Collapse,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { ZodError } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"

const NewPasswordForm = () => {
  const [isPassword, setIsPassword] = useState(true)
  const [isConfirmPassword, setIsConfirmPassword] = useState(true)
  const [sendNewPassword, { isLoading }] = usePostNewPasswordMutation()
  const router = useRouter()
  const params = useSearchParams()

  const {
    onOpen: onSuccessOpen,
    isOpen: isSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure()
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

  return (
    <>
      <Collapse in={isSuccessOpen} animateOpacity>
        <AlertComponent
          status="success"
          title="رمز عبور با موفقیت تغییر کرد."
          onClose={onSuccessClose}
        />
      </Collapse>
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
        initialValues={{ password: "", confirmPassword: "" }}
        validateOnMount={true}
        validationSchema={toFormikValidationSchema(newPasswordSchema)}
        validate={(values) => {
          try {
            newPasswordSchema.parse(values)
          } catch (error) {
            if (error instanceof ZodError) {
              return error.formErrors.fieldErrors
            }
          }
        }}
        onSubmit={async ({ password }) => {
          const temp_token = params.get("temp_token")!
          await sendNewPassword({ password, temp_token })
            .unwrap()
            .then(() => {
              onSuccessOpen()
              router.push("/login")
            })
            .catch((err) => {
              if (err.status === 400) onErrorOpen()
              else onWarningOpen()
            })
        }}
      >
        {({ handleSubmit, errors, touched, isValid }) => (
          <Form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
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
                <FormHelperText flexDirection="column" alignItems="start">
                  {Array.isArray(errors.password)
                    ? errors.password.map((error, idx) => (
                        <Text as="div" key={idx}>
                          {error}
                        </Text>
                      ))
                    : errors.password}
                </FormHelperText>
              </FormControl>
              <FormControl
                isInvalid={
                  !!errors.confirmPassword && !!touched.confirmPassword
                }
                variant="floating"
              >
                <FormLabel htmlFor="confirmPassword">تکرار رمز عبور</FormLabel>
                <Box pos="relative">
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={isConfirmPassword ? "password" : "text"}
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
                <FormHelperText>{errors.confirmPassword}</FormHelperText>
              </FormControl>
              <Button type="submit" rounded="2xl" mt={10} isDisabled={!isValid}>
                تغییر رمز عبور
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default NewPasswordForm
