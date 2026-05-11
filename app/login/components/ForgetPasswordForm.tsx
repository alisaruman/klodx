import AlertComponent from "@/app/components/utils/AlertComponent"
import { usePostForgetPasswordSendOtpMutation } from "@/app/redux/services/auth/authApi"
import { forgetPasswordSchema } from "@/app/validationSchema"
import {
  Button,
  Collapse,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { z, ZodError } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"

interface OtpData {
  email?: string
  phone?: string
}

const ForgetPasswordFormComponent = ({
  onForgetPassword,
  onSuccess,
  setOtpData,
}: {
  onForgetPassword: () => void
  onSuccess: (tempToken: string) => void
  setOtpData: (data: OtpData) => void
}) => {
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
  const [sendData, { isLoading }] = usePostForgetPasswordSendOtpMutation()

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
        initialValues={{ emailOrPhone: "" }}
        validateOnMount={true}
        validationSchema={toFormikValidationSchema(forgetPasswordSchema)}
        validate={(values) => {
          try {
            forgetPasswordSchema.parse(values)
          } catch (error) {
            if (error instanceof ZodError) {
              return error.formErrors.fieldErrors
            }
          }
        }}
        onSubmit={async (values) => {
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
          }
          await sendData(data)
            .unwrap()
            .then((res) => {
              setOtpData({
                ...(isEmail
                  ? { email: values.emailOrPhone }
                  : { phone: values.emailOrPhone }),
              })
              onSuccess(res.temp_token)
            })
            .catch((err) => {
              if (err.status === 404) onErrorOpen()
              else onWarningOpen()
            })
        }}
      >
        {({ handleSubmit, errors, touched, isValid }) => (
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
                <FormHelperText>{errors.emailOrPhone}</FormHelperText>
              </FormControl>
              <Button
                type="submit"
                rounded="2xl"
                mt={10}
                isDisabled={!isValid}
                isLoading={isLoading}
              >
                ارسال کد
              </Button>
              <Button
                type="button"
                variant="outline"
                rounded="2xl"
                onClick={onForgetPassword}
              >
                بازگشت
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ForgetPasswordFormComponent
