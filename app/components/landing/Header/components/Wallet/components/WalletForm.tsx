/* eslint-disable react-hooks/rules-of-hooks */
import {
  usePostChargeWalletMutation,
  usePostGetPayUrlMutation,
  usePostVoucherCheckMutation,
} from "@/app/redux/services/invoices/invoicesApi"
import { postChargeWalletResponse } from "@/app/redux/services/invoices/invoicesApiTypes"
import { toPersianDigits } from "@/app/utils/constants/toPersianDigits"
import { walletSchema } from "@/app/validationSchema"
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  useColorModeValue,
  VStack,
  Text,
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { ZodError } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"

const WalletFormComponent = ({
  currency,
  onClose,
}: {
  currency: string | undefined
  onClose: () => void
}) => {
  const [postWallet, { isLoading: postChargeWalletLoading }] =
    usePostChargeWalletMutation()

  const [voucherCheck, { isLoading: voucherCheckLoading }] =
    usePostVoucherCheckMutation()

  const [getPayUrl, { isLoading: getPayUrlLoading }] =
    usePostGetPayUrlMutation()

  const [voucherSubmitted, setVoucherSubmitted] = useState(false)
  const [voucherAmount, setVoucherAmount] = useState(0)
  const [invoiceCodeState, setInvoiceCodeState] = useState("")

  return (
    <Box w="full">
      <Formik
        initialValues={{
          amount: "",
          voucher_code: "",
        }}
        validateOnMount={false}
        validationSchema={toFormikValidationSchema(walletSchema)}
        validate={(values) => {
          try {
            walletSchema.parse(values)
          } catch (error) {
            if (error instanceof ZodError) {
              return error.formErrors.fieldErrors
            }
          }
        }}
        onSubmit={(values) => {
          const handleFinalSubmit = async () => {
            try {
              if (voucherSubmitted && voucherAmount > 0) {
                getPayUrl({
                  invoice_id: invoiceCodeState,
                  voucher_code: values.voucher_code,
                })
                  .unwrap()
                  .then((response) => (window.location.href = response.pay_url))
                  .catch((err) => console.error(err))
              } else {
                const response = await postWallet(values).unwrap()
                getPayUrl({
                  invoice_id: response.code,
                  voucher_code: values.voucher_code,
                })
                  .unwrap()
                  .then((response) => (window.location.href = response.pay_url))
                  .catch((err) => console.error(err))
              }
            } catch (error) {
              console.error(error)
            }
          }

          handleFinalSubmit()
        }}
      >
        {({
          handleSubmit,
          errors,
          touched,
          setFieldValue,
          isSubmitting,
          values,
        }) => {
          const [voucherSubmitting, setVoucherSubmitting] = useState(false)
          const checkVoucher = (values: {
            amount: string
            voucher_code: string
          }) => {
            setVoucherSubmitting(true)
            postWallet(values)
              .unwrap()
              .then((res: postChargeWalletResponse) => {
                const invoiceCode = res.code
                setInvoiceCodeState(invoiceCode)
                voucherCheck({
                  invoice_code: invoiceCode,
                  voucher_code: values.voucher_code,
                })
                  .unwrap()
                  .then((res) => {
                    setVoucherSubmitted(true)
                    setVoucherAmount(res.discounted_total)
                    console.log(voucherSubmitted)
                    console.log(voucherAmount)
                  })
                  .catch((err) => console.log(err))
              })
              .catch((err) => {
                console.log(err)
              })
              .finally(() => setVoucherSubmitting(false))
          }

          return (
            <Form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                {/* Amount Field */}
                <FormControl
                  isInvalid={!!errors.amount && touched.amount}
                  variant="floating"
                >
                  <FormLabel htmlFor="amount">مبلغ (ریال)</FormLabel>
                  <Field
                    as={Input}
                    id="amount"
                    name="amount"
                    bg={useColorModeValue(
                      "brandGray.bg.1000",
                      "brandDark.bg.200",
                    )}
                    placeholder="مبلغ (ریال)"
                    color={useColorModeValue(
                      "brandGray.2000",
                      "brandGray.1000",
                    )}
                    borderColor={
                      touched.amount &&
                      errors.amount &&
                      "brandRed.1000 !important"
                    }
                  />
                  {touched.amount && errors.amount && (
                    <FormHelperText textAlign="start">
                      {errors.amount}
                    </FormHelperText>
                  )}
                </FormControl>

                {/* Voucher Field */}
                <FormControl
                  isInvalid={!!errors.voucher_code && touched.voucher_code}
                  variant="floating"
                  pos="relative"
                >
                  <FormLabel htmlFor="voucher_code">کد تخفیف</FormLabel>
                  <Field
                    as={Input}
                    id="voucher_code"
                    name="voucher_code"
                    bg={useColorModeValue(
                      "brandGray.bg.1000",
                      "brandDark.bg.200",
                    )}
                    placeholder="کد تخفیف"
                    color={useColorModeValue(
                      "brandGray.2000",
                      "brandGray.1000",
                    )}
                    {...(voucherSubmitted && {
                      borderColor: "ticket.400 !important",
                    })}
                  />
                  <Button
                    variant="normal"
                    pos="absolute"
                    bottom={0}
                    left={4}
                    fontSize="sm"
                    fontWeight="normal"
                    p={0}
                    onClick={() => checkVoucher(values)}
                    isLoading={
                      voucherSubmitting ||
                      voucherCheckLoading ||
                      postChargeWalletLoading
                    }
                    isDisabled={voucherSubmitted}
                  >
                    {voucherSubmitted ? (
                      <Text as="i" className="icon-voucher-checked w-5 h-5" />
                    ) : (
                      "ثبت"
                    )}
                  </Button>
                  {touched.voucher_code && errors.voucher_code && (
                    <FormHelperText textAlign="start">
                      {errors.voucher_code}
                    </FormHelperText>
                  )}
                </FormControl>
                {/* Voucher Field */}

                <HStack
                  justify="space-between"
                  gap={4}
                  w="full"
                  color={useColorModeValue("brandBlue.500", "ticket.400")}
                >
                  <Text as="span">مبلغ قابل پرداخت: </Text>
                  <Text as="span">
                    {voucherAmount !== 0
                      ? Number(voucherAmount).toLocaleString("fa-IR")
                      : Number(values.amount).toLocaleString("fa-IR")}
                    {` ${currency === "IRR" ? "ریال" : "$"}`}
                  </Text>
                </HStack>

                {/* Buttons */}
                <Flex align="center" justify="center" gap={4} mt={14} w="full">
                  <Button
                    type="button"
                    variant="outline"
                    rounded="lg"
                    minW={120}
                    onClick={onClose}
                  >
                    انصراف
                  </Button>
                  <Button
                    minW={120}
                    rounded="lg"
                    type="submit"
                    isLoading={postChargeWalletLoading || voucherCheckLoading}
                  >
                    پرداخت
                  </Button>
                </Flex>
              </VStack>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}

export default WalletFormComponent
