import {
  Box,
  Card,
  CardBody,
  Flex,
  Text,
  Button,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { useState } from "react"
import { RootState } from "@/app/redux/store"
import {
  useGetLocationsQuery,
  useCreateServerInvoiceMutation,
} from "@/app/redux/services/server-packages/serverPackageApi"
import PriceBox from "./PriceBox"
import LocationBox from "./LocationBox"
import OsImageBox from "./OsImageBox"
import ServerNameInput from "./ServerNameInput"
import PaymentMethod from "./PaymentMethod"
import { InvoiceResponse } from "@/app/redux/services/server-packages/serverPackageApiTypes"

interface DataCenter {
  id: number
  city: string
  country: string
  description: string
  latitude: number
  longitude: number
  name: string
  network_zone: string
}

interface ReviewAndBuyComponentProps {
  activeStep: number
  setShowStepper: (show: boolean) => void
  setActiveStep: (step: number) => void
}

const ReviewAndBuyComponent: React.FC<ReviewAndBuyComponentProps> = ({
  activeStep,
  setShowStepper,
  setActiveStep,
}) => {
  const [tablet] = useMediaQuery("(max-width: 1024px)")
  const [mobile] = useMediaQuery("(max-width: 768px)")
  const [showPayment, setShowPayment] = useState(false)
  const [invoiceData, setInvoiceData] = useState<InvoiceResponse | null>(null)

  const serverName = useSelector((state: RootState) => state.createServer.name)
  const selectedLocation = useSelector(
    (state: RootState) => state.createServer.location,
  )
  const selectedOsImage = useSelector(
    (state: RootState) => state.createServer.os_image,
  )
  const priceType = useSelector(
    (state: RootState) => state.createServer.price_type,
  )
  const priceOverride = useSelector(
    (state: RootState) => state.createServer.price_override,
  )
  const selectedPackage = useSelector(
    (state: RootState) => state.createServer.server_type,
  )
  const selectedSshKey = useSelector(
    (state: RootState) => state.createServer.ssh_key,
  )
  const selectedPackageDetails = useSelector(
    (state: RootState) => state.createServer.selectedPackageDetails,
  )
  const ipv4Checked = useSelector((state: RootState) => state.createServer.ipv4)
  const ipv6Checked = useSelector((state: RootState) => state.createServer.ipv6)

  const { data: locationsData, error, isLoading } = useGetLocationsQuery()
  const [
    createServerInvoice,
    { isLoading: isInvoiceLoading, error: invoiceError },
  ] = useCreateServerInvoiceMutation()

  const selectedLocationDetails = locationsData?.locations?.locations?.length
    ? locationsData.locations.locations.find(
        (location: DataCenter) => location.name === selectedLocation,
      )
    : undefined

  const iconFilter = useColorModeValue(
    "unset",
    "brightness(0) saturate(100%) invert(97%) sepia(4%) saturate(199%) hue-rotate(186deg) brightness(95%) contrast(94%)",
  )

  const selectedPrice = priceOverride?.find(
    (price: any) => price.location === selectedLocation,
  )

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("fa-IR").format(Number(price))
  }

  const priceData =
    selectedPrice && priceType !== null
      ? {
          priceType,
          price: (() => {
            switch (priceType) {
              case 1:
                return formatPrice(selectedPrice.price_hourly) || "N/A"
              case 2:
                return formatPrice(selectedPrice.price_monthly) || "N/A"
              case 3:
                return formatPrice(selectedPrice.price_three_months) || "N/A"
              case 4:
                return formatPrice(selectedPrice.price_six_months) || "N/A"
              case 5:
                return formatPrice(selectedPrice.price_yearly) || "N/A"
              default:
                return "N/A"
            }
          })(),
        }
      : null

  const handleNext = async () => {
    try {
      const response = await createServerInvoice({
        name: serverName,
        location: selectedLocation,
        server_type: selectedPackage,
        os_image: selectedOsImage,
        price_type: priceType,
        ipv4: ipv4Checked,
        ipv6: ipv6Checked,
        ssh_key: selectedSshKey,
      }).unwrap()

      setInvoiceData(response.data)
      setShowPayment(true)
    } catch (err) {
      console.error("Failed to create server invoice: ", err)
    }
  }

  const handleBack = () => {
    setShowStepper(false)
  }

  const handlePay = () => {
    console.log("Paying...")
  }

  if (isLoading || isInvoiceLoading) return <Spinner />
  if (error || invoiceError)
    return <Text color="red.500">خطا در بارگذاری داده‌ها</Text>

  return (
    <Card variant="normal">
      <CardBody
        as={Flex}
        direction="column"
        gap={tablet ? 8 : 4}
        py={10}
        px={tablet ? 4 : 12}
      >
        {!showPayment ? (
          <>
            <Text as="h4" textAlign="center" mb={10}>
              برسی و خرید
            </Text>

            <Flex direction={tablet ? "column" : "row"} gap={4}>
              <Box flex={1}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text as="h5">نوع بسته:</Text>
                  <IconButton
                    icon={
                      <Box
                        as="i"
                        className="icon-edit"
                        boxSize={6}
                        filter={iconFilter}
                      />
                    }
                    aria-label="ویرایش پلن"
                    variant="ghost"
                    onClick={() => setActiveStep(3)}
                  />
                </Flex>
                {priceData ? (
                  <PriceBox
                    priceType={priceData.priceType}
                    price={priceData.price}
                  />
                ) : (
                  <Text color="red.500">هیچ پلنی انتخاب نشده است</Text>
                )}
              </Box>

              <Box flex={1}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text as="h5">دیتاسنتر:</Text>
                  <IconButton
                    icon={
                      <Box
                        as="i"
                        className="icon-edit"
                        boxSize={6}
                        filter={iconFilter}
                      />
                    }
                    aria-label="ویرایش موقعیت سرور"
                    variant="ghost"
                    onClick={() => setActiveStep(0)}
                  />
                </Flex>
                {selectedLocationDetails ? (
                  <LocationBox
                    country={selectedLocationDetails.country}
                    name={selectedLocationDetails.name}
                    city={selectedLocationDetails.city}
                  />
                ) : (
                  <Text color="red.500">هیچ موقعیتی انتخاب نشده است</Text>
                )}
              </Box>

              <Box flex={1}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text as="h5">سیستم عامل:</Text>
                  <IconButton
                    icon={
                      <Box
                        as="i"
                        className="icon-edit"
                        boxSize={6}
                        filter={iconFilter}
                      />
                    }
                    aria-label="ویرایش سیستم عامل"
                    variant="ghost"
                    onClick={() => setActiveStep(1)}
                  />
                </Flex>
                {selectedOsImage ? (
                  <OsImageBox
                    osFlavor={selectedOsImage.split("-")[0]}
                    osVersion={selectedOsImage.split("-")[1]}
                  />
                ) : (
                  <Text color="red.500">هیچ سیستم عاملی انتخاب نشده است</Text>
                )}
              </Box>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center" mt={8}>
              <Text as="h5">مشخصات سرور</Text>
              <IconButton
                icon={
                  <Box
                    as="i"
                    className="icon-edit"
                    boxSize={6}
                    filter={iconFilter}
                  />
                }
                aria-label="ویرایش مشخصات سرور"
                variant="ghost"
                onClick={() => setActiveStep(2)}
              />
            </Flex>
            {selectedPackageDetails && (
              <Box borderWidth="1px" borderRadius="md" padding="4">
                <Table
                  variant="simple"
                  width="100%"
                  size={mobile ? "sm" : "md"}
                >
                  <Thead>
                    <Tr>
                      <Th textAlign="right" px={2}>
                        نام
                      </Th>
                      <Th textAlign="right" px={2}>
                        پردازنده
                      </Th>
                      <Th textAlign="right" px={2}>
                        حافظه
                      </Th>
                      <Th textAlign="right" px={2}>
                        دیسک
                      </Th>
                      <Th textAlign="right" px={2}>
                        ترافیک
                      </Th>
                      <Th textAlign="right" px={2}>
                        قیمت (ریال)
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr key={selectedPackageDetails.name}>
                      <Td textAlign="right" px={2}>
                        {selectedPackageDetails.name}
                      </Td>
                      <Td textAlign="right" px={2}>
                        {selectedPackageDetails.cpu}
                      </Td>
                      <Td textAlign="right" px={2}>
                        {selectedPackageDetails.memory}
                      </Td>
                      <Td textAlign="right" px={2}>
                        {selectedPackageDetails.disk}
                      </Td>
                      <Td textAlign="right" px={2}>
                        {selectedPackageDetails.traffic}
                      </Td>
                      <Td textAlign="right" px={2}>
                        {selectedPackageDetails.price}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            )}

            <Box mt={8} width="100%">
              <Flex justifyContent="space-between" alignItems="center" mt={8}>
                <Text as="h5">نام سرور:</Text>
                <IconButton
                  icon={
                    <Box
                      as="i"
                      className="icon-edit"
                      boxSize={6}
                      filter={iconFilter}
                    />
                  }
                  aria-label="نام سرور"
                  variant="ghost"
                  onClick={() => setActiveStep(4)}
                />
              </Flex>
              <ServerNameInput
                serverName={serverName}
                iconFilter={iconFilter}
              />
              <Flex justifyContent="end" gap={4} mt={4}>
                <Button
                  variant="outline"
                  color="#FA6465"
                  borderColor="#FA6465"
                  borderRadius="6px"
                  onClick={handleBack}
                >
                  بازگشت
                </Button>
                <Button
                  bg="#FA6465"
                  color="white"
                  borderRadius="6px"
                  onClick={handleNext}
                >
                  تایید و خرید ابرک
                </Button>
              </Flex>
            </Box>
          </>
        ) : (
          <PaymentMethod
            serviceCost={invoiceData?.items[0]?.price || "N/A"}
            discount={invoiceData?.discount || "0"}
            tax={invoiceData?.tax_rate || "0"}
            totalAmount={invoiceData?.total || "N/A"}
            invoiceId={invoiceData?.code || ""}
            onBack={handleBack}
            onPay={handlePay}
          />
        )}
      </CardBody>
    </Card>
  )
}

export default ReviewAndBuyComponent
