import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react"
import { useState } from "react"
import {
  useCheckVoucherMutation,
  useGetBankGatewayUrlMutation,
  usePayByWalletMutation,
} from "@/app/redux/services/server-packages/serverPackageApi"
import WalletComponent from "@/app/components/landing/Header/components/Wallet"
import WalletFormComponent from "@/app/components/landing/Header/components/Wallet/components/WalletForm"

interface PaymentMethodProps {
  serviceCost: string
  discount: string
  tax: string
  totalAmount: string
  invoiceId: string
  onBack: () => void
  onPay: () => void
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  serviceCost,
  discount,
  tax,
  totalAmount,
  invoiceId,
  onBack,
  onPay,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null)
  const [voucherCode, setVoucherCode] = useState<string>("")
  const [voucherError, setVoucherError] = useState<string | null>(null)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const radioBorderColor = useColorModeValue("#D8DDE5", "#2F415E")
  const radioSelectedBorderColor = useColorModeValue("#476BB1", "#739FE5")
  const payButtonDisabled = selectedPaymentMethod === null

  const [smallDevice] = useMediaQuery(["(max-width: 1024px)"], {
    fallback: false,
  })

  const [checkVoucher, { isLoading: checkVoucherLoading }] =
    useCheckVoucherMutation()
  const [getBankGatewayUrl] = useGetBankGatewayUrlMutation()
  const [payByWallet] = usePayByWalletMutation()

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method)
    setPaymentError(null)
  }

  const handleCheckVoucher = async () => {
    try {
      await checkVoucher({
        invoice_code: invoiceId,
        voucher_code: voucherCode,
      }).unwrap()
      setVoucherError(null)
    } catch (error) {
      setVoucherError("کد تخفیف معتبر نیست")
    }
  }

  const handlePayClick = async () => {
    if (!selectedPaymentMethod) {
      setPaymentError("ابتدا روش پرداخت را انتخاب کنید.")
      return
    }

    onPay()

    try {
      if (selectedPaymentMethod === "direct") {
        const response = await getBankGatewayUrl({
          invoice_id: invoiceId,
          voucher_code: voucherCode || undefined,
        }).unwrap()
        window.location.href = response.pay_url
      } else if (selectedPaymentMethod === "wallet") {
        await payByWallet({
          invoice_id: invoiceId,
          voucher_code: voucherCode || undefined,
        }).unwrap()
      }
    } catch (error) {
      setPaymentError("پرداخت ناموفق بود. لطفاً مجدداً تلاش کنید.")
    }
  }

  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={smallDevice ? "sm" : "2xl"}
      >
        <ModalOverlay />
        <ModalContent {...(smallDevice && { px: 0, py: 6 })}>
          <ModalHeader>شارژ کیف پول</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WalletFormComponent currency={"IRR"} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex direction={["column", "column", "row"]} gap={8}>
        <Box
          flex={1}
          border="1px solid"
          borderColor={radioBorderColor}
          borderRadius="12px"
          p={6}
        >
          <Text as="h6" textAlign="center" mb={6}>
            روش پرداخت خود را انتخاب کنید
          </Text>
          <Flex direction="column" gap={4}>
            <Box
              as="button"
              onClick={() => handlePaymentMethodSelect("direct")}
              border={
                selectedPaymentMethod === "direct"
                  ? `2px solid ${radioSelectedBorderColor}`
                  : `1px solid ${radioBorderColor}`
              }
              borderRadius="12px"
              p={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex alignItems="start" gap={4}>
                <Box
                  as="i"
                  className="icon-credit-card"
                  boxSize={6}
                  filter={useColorModeValue(
                    "unset",
                    "brightness(0) saturate(100%) invert(97%) sepia(4%) saturate(199%) hue-rotate(186deg) brightness(95%) contrast(94%)",
                  )}
                />
                <Box>
                  <Text>پرداخت مستقیم</Text>
                  <Text fontSize="sm">پرداخت آنلاین با کارت بانکی</Text>
                </Box>
              </Flex>
              <input
                type="radio"
                checked={selectedPaymentMethod === "direct"}
                readOnly
              />
            </Box>

            <Box
              as="button"
              onClick={() => handlePaymentMethodSelect("wallet")}
              border={
                selectedPaymentMethod === "wallet"
                  ? `2px solid ${radioSelectedBorderColor}`
                  : `1px solid ${radioBorderColor}`
              }
              borderRadius="12px"
              p={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex alignItems="start" gap={4}>
                <Box
                  as="i"
                  className="icon-wallet"
                  boxSize={6}
                  filter={useColorModeValue(
                    "unset",
                    "brightness(0) saturate(100%) invert(97%) sepia(4%) saturate(199%) hue-rotate(186deg) brightness(95%) contrast(94%)",
                  )}
                />
                <Box>
                  <Text>پرداخت از کیف پول</Text>
                  <Text fontSize="sm">پرداخت از کیف پول</Text>
                </Box>
              </Flex>
              <input
                type="radio"
                checked={selectedPaymentMethod === "wallet"}
                readOnly
              />
            </Box>
          </Flex>

          {selectedPaymentMethod === "wallet" && (
            <Flex justifyContent="space-between" mt={4}>
              <Button
                variant="outline"
                bg="transparent"
                borderRadius="6px"
                borderColor="#EE4747"
                color="#EE4747"
                onClick={onOpen}
              >
                شارژ کیف پول
              </Button>
            </Flex>
          )}

          {paymentError && (
            <Text color="red.500" mt={4}>
              {paymentError}
            </Text>
          )}

          <Box mt={8}>
            <Flex alignItems="center" gap={2} position="relative">
              <input
                placeholder="کد تخفیف"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                style={{
                  flex: "1",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  border: `1px solid ${radioBorderColor}`,
                }}
              />
              <Button
                onClick={handleCheckVoucher}
                borderRadius="18px"
                bg="transparent"
                color="#62718C"
                position="absolute"
                left="0"
                height="100%"
                borderLeft={`1px solid ${radioBorderColor}`}
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                disabled={checkVoucherLoading}
                isLoading={checkVoucherLoading}
              >
                ثبت
              </Button>
            </Flex>

            {voucherError && (
              <Text color="red.500" mt={2}>
                {voucherError}
              </Text>
            )}
          </Box>
        </Box>

        <Box
          flex={1}
          border="1px solid"
          borderColor={radioBorderColor}
          borderRadius="12px"
          p={6}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text>هزینه سرویس</Text>
            <Text>{serviceCost} ریال</Text>
          </Flex>
          <Divider my={4} />
          <Flex justifyContent="space-between" alignItems="center">
            <Text>تخفیف</Text>
            <Text>{discount} ریال</Text>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center">
            <Text>مالیات بر ارزش افزوده</Text>
            <Text>{tax} ریال</Text>
          </Flex>
          <Divider my={4} />
          <Flex
            justifyContent="space-between"
            alignItems="center"
            fontWeight="bold"
          >
            <Text>مبلغ کل</Text>
            <Text>{serviceCost} ریال</Text>
          </Flex>
          <Flex justifyContent="center" gap={4} mt={6}>
            <Button
              variant="outline"
              bg="transparent"
              borderColor="#EE4747"
              borderRadius="6px"
              color="#EE4747"
              onClick={onBack}
            >
              بازگشت
            </Button>
            <Button
              colorScheme="red"
              bg="#EE4747"
              color="white"
              borderRadius="6px"
              onClick={handlePayClick}
              disabled={payButtonDisabled}
            >
              پرداخت
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default PaymentMethod
