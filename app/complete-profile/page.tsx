"use client"
import { usePatchCompleteProfileMutation } from "@/app/redux/services/auth/authApi"
import { completeProfileSchema } from "@/app/validationSchema"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/navigation"
import { useRef, useState, useCallback } from "react"
import { ZodError } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"

const CompleteProfile = () => {
  const router = useRouter()
  const [userType, setUserType] = useState("national")
  const [fileUploadStatus, setFileUploadStatus] = useState("idle")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [patchData, { isLoading }] = usePatchCompleteProfileMutation()

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => void,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileUploadStatus("uploading")

      await new Promise((resolve) => setTimeout(resolve, 2000))

      setFileUploadStatus("uploaded")
      setFieldValue("file", file)
    }
  }

  const vstackColor = useColorModeValue("brandDark.1200", "brandGray.1000")
  const uploadColorScheme = useColorModeValue("gray", "brandDark")
  const uploadBgColor = useColorModeValue("brandGray.bg.400", "brandDark.1400")

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
            تکمیل اطلاعات
          </Text>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              nationalCode: "",
              foreignCode: "",
              file: null,
              companyName: "",
              legalCode: "",
              postalCode: "",
              address: "",
            }}
            validateOnMount={false}
            validationSchema={toFormikValidationSchema(
              completeProfileSchema(userType),
            )}
            validate={(values) => {
              try {
                completeProfileSchema(userType).parse(values)
              } catch (error) {
                if (error instanceof ZodError) {
                  return error.formErrors.fieldErrors
                }
              }
            }}
            onSubmit={async (values) => {
              const data = {
                first_name: values.firstName,
                last_name: values.lastName,
                ncode: values.nationalCode,
                is_foreign_nation: userType === "foreign" ? true : false,
              }
              await patchData(data)
                .unwrap()
                .then(() => {
                  router.push("/")
                })
                .catch((err) => console.log("error is: ", err))
            }}
          >
            {({
              handleSubmit,
              errors,
              validateForm,
              isValid,
              setFieldValue,
            }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="stretch">
                    <FormControl variant="floating">
                      <FormLabel htmlFor="firstName">نام</FormLabel>
                      <Field
                        as={Input}
                        id="firstName"
                        name="firstName"
                        type="text"
                      />
                      <FormHelperText>{errors.firstName}</FormHelperText>
                    </FormControl>
                    <FormControl variant="floating">
                      <FormLabel htmlFor="lastName">نام خانوادگی</FormLabel>
                      <Field
                        as={Input}
                        id="lastName"
                        name="lastName"
                        type="text"
                      />
                      <FormHelperText>{errors.lastName}</FormHelperText>
                    </FormControl>
                    {(userType === "national" || userType === "legal") && (
                      <FormControl variant="floating">
                        <FormLabel htmlFor="nationalCode">کد ملی</FormLabel>
                        <Field
                          as={Input}
                          id="nationalCode"
                          name="nationalCode"
                          type="text"
                        />
                        <FormHelperText>{errors.nationalCode}</FormHelperText>
                      </FormControl>
                    )}
                    {userType === "foreign" && (
                      <FormControl variant="floating">
                        <FormLabel htmlFor="foreignCode">
                          کد اتباع و بارگذاری صفحه اول گذرنامه / گواهی موقت
                        </FormLabel>
                        <InputGroup>
                          <Field
                            as={Input}
                            id="foreignCode"
                            name="foreignCode"
                            type="text"
                          />
                          <InputLeftElement w="auto" left={4} h="full">
                            <Button
                              type="button"
                              colorScheme={uploadColorScheme}
                              bg={uploadBgColor}
                              color="white"
                              size="sm"
                              py={0}
                              onClick={() => fileInputRef.current?.click()}
                            >
                              {fileUploadStatus === "uploading"
                                ? "در حال آپلود ..."
                                : fileUploadStatus === "uploaded"
                                ? "فایل بارگذاری شد"
                                : "بارگذاری"}
                            </Button>
                            <input
                              type="file"
                              ref={fileInputRef}
                              style={{ display: "none" }}
                              onChange={(event) =>
                                handleFileUpload(event, setFieldValue)
                              }
                            />
                          </InputLeftElement>
                        </InputGroup>
                        <FormHelperText>{errors.foreignCode}</FormHelperText>
                      </FormControl>
                    )}
                    <VStack spacing={4} align="stretch" color={vstackColor}>
                      <Checkbox
                        colorScheme="brandRed"
                        isChecked={userType === "foreign"}
                        onChange={(e) => {
                          setUserType(
                            e.currentTarget.checked ? "foreign" : "national",
                          )
                          validateForm()
                        }}
                      >
                        <Text fontSize="sm">جزو اتباع خارجی هستم</Text>
                      </Checkbox>
                      <Checkbox
                        colorScheme="brandRed"
                        isChecked={userType === "legal"}
                        onChange={(e) => {
                          setUserType(
                            e.currentTarget.checked ? "legal" : "national",
                          )
                          validateForm()
                        }}
                      >
                        <Text fontSize="sm">کاربر حقوقی هستم</Text>
                      </Checkbox>
                    </VStack>
                    {userType === "legal" && (
                      <>
                        <FormControl variant="floating">
                          <FormLabel htmlFor="companyName">نام شرکت</FormLabel>
                          <Field
                            as={Input}
                            id="companyName"
                            name="companyName"
                            type="text"
                          />
                          <FormHelperText>{errors.companyName}</FormHelperText>
                        </FormControl>
                        <FormControl variant="floating">
                          <FormLabel htmlFor="legalCode">شناسه ملی</FormLabel>
                          <Field
                            as={Input}
                            id="legalCode"
                            name="legalCode"
                            type="text"
                          />
                          <FormHelperText>{errors.legalCode}</FormHelperText>
                        </FormControl>
                        <FormControl variant="floating">
                          <FormLabel htmlFor="postalCode">کد پستی</FormLabel>
                          <Field
                            as={Input}
                            id="postalCode"
                            name="postalCode"
                            type="text"
                          />
                          <FormHelperText>{errors.postalCode}</FormHelperText>
                        </FormControl>
                        <FormControl variant="floating">
                          <FormLabel htmlFor="address">آدرس کد پستی</FormLabel>
                          <Field
                            as={Textarea}
                            id="address"
                            name="address"
                            type="text"
                            height={32}
                            variant="normal"
                          />
                          <FormHelperText>{errors.address}</FormHelperText>
                        </FormControl>
                      </>
                    )}
                    <Text fontSize="sm">
                      با ثبت نام در یو ابر
                      <Link
                        href="#"
                        textDecor="underline"
                        display="inline-flex"
                        px={1}
                        target="_blank"
                      >
                        قوانین
                      </Link>
                      و
                      <Link
                        href="#"
                        textDecor="underline"
                        display="inline-flex"
                        px={1}
                        target="_blank"
                      >
                        حریم شخصی
                      </Link>
                      آن را نیز پذیرفته‌ام.
                    </Text>
                    <Button
                      type="submit"
                      rounded="2xl"
                      mt={10}
                      isDisabled={!isValid}
                      isLoading={isLoading}
                    >
                      ساخت حساب
                    </Button>
                  </VStack>
                </Form>
              )
            }}
          </Formik>
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

export default CompleteProfile
