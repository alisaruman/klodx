"use client"

import { useGetServersQuery } from "@/app/redux/services/server-packages/serverPackageApi"
import { usePostTicketMutation } from "@/app/redux/services/tickets/ticketsApi"
import { ticketSchema } from "@/app/validationSchema"
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react"
import { ChakraStylesConfig, Select } from "chakra-react-select"
import { Field, Form, Formik } from "formik"
import { useMemo } from "react"
import { ZodError } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"
import TicketLayout from "../TicketLayout"

interface OptionType {
  label: string
  value: string
}

enum typeEnums {
  TECHNICAL = 1,
  FINANCIAL = 2,
}

const typesValues = [
  {
    value: String(typeEnums.TECHNICAL),
    label: "پشتیبان فنی",
  },
  {
    value: String(typeEnums.FINANCIAL),
    label: "امور مالی",
  },
]

const NewTicket = () => {
  const [tablet] = useMediaQuery("(max-width: 1024px)")

  const { data: serversList, error, isLoading } = useGetServersQuery()
  const [postTicket, { isLoading: postTicketLoading }] = usePostTicketMutation()

  const cloudServerOptions = useMemo(() => {
    return (
      serversList?.map((server) => ({
        label: server.name,
        value: server.id,
      })) || []
    )
  }, [serversList])

  const selectChakraStyles: ChakraStylesConfig<OptionType, false, never> = {
    control: (provided, { selectProps }) => ({
      ...provided,
      p: 2.5,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "brandGray.1700",
    }),
    valueContainer: (provided) => ({
      ...provided,
      p: 0,
    }),
    option: (provided) => ({
      ...provided,
      rounded: "2xl",
    }),
    menuList: (provided) => ({
      ...provided,
      px: 2,
    }),
  }

  return (
    <TicketLayout>
      <Card maxW={{ base: "100%", lg: "60%" }} variant="normal" mx="auto">
        <CardBody
          as={Flex}
          direction="column"
          gap={tablet ? 8 : 4}
          py={10}
          px={tablet ? 4 : 12}
        >
          <Box>
            <Text as="h4" textAlign="center" mb={10}>
              ثبت تیکت
            </Text>
          </Box>
          <Formik
            initialValues={{
              title: "",
              priority: 1,
              type: "",
              cloud_server: "",
              message: "",
              attachments: [],
            }}
            validateOnMount={false}
            validationSchema={toFormikValidationSchema(ticketSchema)}
            validate={(values) => {
              try {
                ticketSchema.parse(values)
              } catch (error) {
                if (error instanceof ZodError) {
                  return error.formErrors.fieldErrors
                }
              }
            }}
            onSubmit={(values, { resetForm }) => {
              const formattedData = {
                title: values.title,
                priority: 1,
                type: parseInt(values.type, 10),
                cloud_server: parseInt(values.cloud_server, 10),
                message: values.message,
                attachments: values.attachments?.map((file: File) => ({
                  file: `ticket-picture/${file.name}`,
                })),
              }

              postTicket(formattedData)
                .unwrap()
                .then(() => {
                  alert("ثبت تیکت با موفقیت انجام شد")
                  resetForm()
                  window.location.href = "/dashboard"
                })
                .catch((err) => console.log(err))
            }}
          >
            {({
              handleSubmit,
              errors,
              touched,
              setFieldValue,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                  {/* Title Field */}
                  <FormControl
                    isInvalid={!!errors.title && touched.title}
                    variant="floating"
                  >
                    <FormLabel htmlFor="title">عنوان</FormLabel>
                    <Field
                      as={Input}
                      id="title"
                      name="title"
                      type="text"
                      bg="transparent"
                      placeholder="عنوان"
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      color={useColorModeValue(
                        "brandGray.2000",
                        "brandGray.1000",
                      )}
                    />
                    {touched.title && errors.title && (
                      <FormHelperText>{errors.title}</FormHelperText>
                    )}
                  </FormControl>

                  {/* Type Field */}
                  <FormControl
                    isInvalid={!!errors.type && touched.type}
                    variant="floating"
                  >
                    <FormLabel htmlFor="type">واحد</FormLabel>
                    <Field name="type">
                      {({ field, form }: { field: any; form: any }) => (
                        <Select
                          id="type"
                          menuPosition="fixed"
                          placeholder="انتخاب واحد"
                          chakraStyles={selectChakraStyles}
                          options={typesValues}
                          onChange={(option: any) =>
                            form.setFieldValue(field.name, option.value)
                          }
                          value={
                            typesValues.find(
                              (option) => option.value === field.value,
                            ) || ""
                          }
                        />
                      )}
                    </Field>
                  </FormControl>

                  {/* Cloud Server Field */}
                  <FormControl
                    isInvalid={!!errors.cloud_server && touched.cloud_server}
                    variant="floating"
                  >
                    <FormLabel htmlFor="cloud_server">ابرک</FormLabel>
                    <Field name="cloud_server">
                      {({ field, form }: { field: any; form: any }) => (
                        <Select
                          id="cloud_server"
                          menuPosition="fixed"
                          placeholder="انتخاب ابرک"
                          chakraStyles={selectChakraStyles}
                          options={cloudServerOptions}
                          onChange={(option: any) =>
                            form.setFieldValue(field.name, option.value)
                          }
                          value={
                            cloudServerOptions.find(
                              (option) => option.value === field.value,
                            ) || ""
                          }
                        />
                      )}
                    </Field>
                  </FormControl>

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
                      bg="transparent"
                      placeholder="نوشتن متن"
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      color={useColorModeValue(
                        "brandGray.2000",
                        "brandGray.1000",
                      )}
                      minH={210}
                    />
                    {touched.message && errors.message && (
                      <FormHelperText>{errors.message}</FormHelperText>
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
                          alignItems="center"
                          justifyContent="space-between"
                          flexDir={{ base: "column", lg: "row" }}
                          gap={{ base: 8, lg: 2 }}
                          p={4}
                          cursor="pointer"
                          onClick={() =>
                            document.getElementById("attachments")?.click()
                          }
                        >
                          <input
                            type="file"
                            id="attachments"
                            style={{ display: "none" }}
                            multiple
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
                    >
                      بازگشت
                    </Button>
                    <Button
                      rounded="lg"
                      type="submit"
                      isLoading={postTicketLoading}
                      disabled={postTicketLoading}
                      minW={120}
                    >
                      ارسال
                    </Button>
                  </Flex>
                </VStack>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </TicketLayout>
  )
}

export default NewTicket
