import { usePostMessageMutation } from "@/app/redux/services/tickets/ticketsApi"
import { ticketMessageSchema } from "@/app/validationSchema"
import {
  Box,
  FormControl,
  FormHelperText,
  Text,
  FormLabel,
  Textarea,
  useColorModeValue,
  VStack,
  Button,
  Flex,
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { Dispatch, SetStateAction } from "react"
import { ZodError } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"

interface Props {
  ticket_id: string
  cancelMessage: (value: boolean) => void
}

const MessageFormComponent = ({ ticket_id, cancelMessage }: Props) => {
  const [sendMessage, { isLoading: messagesIsLoading }] =
    usePostMessageMutation()

  return (
    <Box w="full">
      <Formik
        initialValues={{
          message: "",
          attachments: [],
        }}
        validateOnMount={false}
        validationSchema={toFormikValidationSchema(ticketMessageSchema)}
        validate={(values) => {
          try {
            ticketMessageSchema.parse(values)
          } catch (error) {
            if (error instanceof ZodError) {
              return error.formErrors.fieldErrors
            }
          }
        }}
        onSubmit={(values, { resetForm }) => {
          const formattedData = {
            ticket_id,
            message: values.message,
            attachments: values.attachments?.map((file: File) => ({
              file: `ticket-picture/${file.name}`,
            })),
          }

          sendMessage(formattedData)
            .unwrap()
            .then(() => {
              alert("پاسخ با موفقیت ارسال شد")
              resetForm()
              cancelMessage(false)
            })
            .catch((err) => console.log(err))
        }}
      >
        {({ handleSubmit, errors, touched, setFieldValue, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              {/* Description Field */}
              <FormControl
                isInvalid={!!errors.message && touched.message}
                variant="floating"
              >
                <FormLabel htmlFor="message">متن تیکت</FormLabel>
                <Field
                  as={Textarea}
                  id="message"
                  name="message"
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  bg={useColorModeValue(
                    "brandGray.bg.1000",
                    "brandDark.bg.200",
                  )}
                  placeholder="نوشتن متن"
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  color={useColorModeValue("brandGray.2000", "brandGray.1000")}
                  minH={210}
                />
                {touched.message && errors.message && (
                  <FormHelperText textAlign="start">
                    {errors.message}
                  </FormHelperText>
                )}
              </FormControl>

              {/* File Upload Field */}
              <FormControl variant="floating">
                <FormLabel htmlFor="attachments">پیوست</FormLabel>
                <Field name="attachments">
                  {({ field, form }: { field: any; form: any }) => (
                    <Box
                      w="full"
                      minH={72.75}
                      border="2px dashed"
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      borderColor={useColorModeValue(
                        "brandGray.1100",
                        "brandDark.1300",
                      )}
                      rounded="lg"
                      display="flex"
                      gap={{ base: 8, lg: 2 }}
                      flexDir={{ base: "column", lg: "row" }}
                      alignItems="center"
                      justifyContent="space-between"
                      p={4}
                      cursor="pointer"
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      bg={useColorModeValue(
                        "brandGray.bg.1000",
                        "brandDark.bg.200",
                      )}
                      onClick={() =>
                        document.getElementById("attachments")?.click()
                      }
                    >
                      <input
                        type="file"
                        id="attachments"
                        style={{ display: "none" }}
                        multiple // Allow multiple file selection
                        onChange={(event) => {
                          const selectedFiles = Array.from(
                            event.target.files || [],
                          )
                          const validFiles = selectedFiles.filter(
                            (file) => file.size <= 30 * 1024 * 1024,
                          )
                          const oversizedFiles = selectedFiles.filter(
                            (file) => file.size > 30 * 1024 * 1024,
                          )

                          if (oversizedFiles.length) {
                            form.setFieldError(
                              field.name,
                              "برخی فایل‌ها بیش از 30 مگابایت هستند و انتخاب نشدند",
                            )
                          }

                          form.setFieldValue(field.name, validFiles)
                        }}
                      />
                      <VStack align="start" spacing={1} flex="1">
                        <Text fontSize="sm" color="gray.500">
                          فایل‌های خود را درون کادر بکشید یا برای انتخاب{" "}
                          <span
                            style={{
                              color: "#476BB1",
                              borderBottom: "2px solid #476BB1",
                            }}
                          >
                            کلیک کنید
                          </span>
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                          Pdf, MP3, MP4 (هر فایل نهایت 30 مگابایت)
                        </Text>
                      </VStack>
                      {field.value && field.value.length > 0 ? (
                        <VStack align="end" spacing={1}>
                          {field.value.map((file: File, index: number) => (
                            <Box
                              key={index}
                              dir="ltr"
                              bg="gray.100"
                              px={3}
                              py={1}
                              rounded="full"
                              textOverflow="ellipsis"
                              overflow="hidden"
                              whiteSpace="nowrap"
                            >
                              <Text fontSize="sm" color="gray.700">
                                {file.name.length > 30
                                  ? `${file.name.slice(0, 30)}...`
                                  : file.name}
                              </Text>
                            </Box>
                          ))}
                        </VStack>
                      ) : null}
                    </Box>
                  )}
                </Field>
              </FormControl>

              {/* Buttons */}
              <Flex align="center" justify="center" gap={4} w="full">
                <Button
                  type="button"
                  variant="outline"
                  rounded="lg"
                  minW={120}
                  onClick={() => cancelMessage(false)}
                >
                  لغو
                </Button>
                <Button
                  minW={120}
                  rounded="lg"
                  type="submit"
                  isLoading={messagesIsLoading}
                  disabled={messagesIsLoading}
                >
                  ارسال
                </Button>
              </Flex>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default MessageFormComponent
