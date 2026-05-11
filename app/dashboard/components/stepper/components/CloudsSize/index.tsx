"use client";

import {
  Box,
  Card,
  CardBody,
  Flex,
  Text,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Radio,
  RadioGroup,
  Stack,
  Badge,
  Button,
  useColorModeValue,
  Tooltip,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useGetServerPackagesQuery } from "@/app/redux/services/server-packages/serverPackageApi";
import { useDispatch, useSelector } from "react-redux";
import { setServerType, setSelectedPackage, setPriceOverride, setSelectedPackageDetails } from "@/app/redux/slices/createServerSlice";
import { RootState } from "@/app/redux/store";

interface CloudsSizeComponentProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

const CloudsSizeComponent: React.FC<CloudsSizeComponentProps> = ({ activeStep, setActiveStep }) => {
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [isItemSelected, setIsItemSelected] = useState<boolean>(false); // state جدید برای مدیریت انتخاب آیتم
  const selectedPackage = useSelector((state: RootState) => state.createServer.server_type);
  const selectedLocation = useSelector((state: RootState) => state.createServer.location);
  const dispatch = useDispatch();

  const { data, error, isLoading, refetch } = useGetServerPackagesQuery({
    cpu_type: selectedBox ? selectedBox.split("-")[0] : "",
    cpu_architecture: selectedBox ? selectedBox.split("-")[1] : "",
    location: selectedLocation || "",
  });

  useEffect(() => {
    if (selectedLocation) {
      refetch();
    }
  }, [selectedLocation, refetch]);

  const isBoxSelected = (boxId: string) => {
    return selectedBox && selectedBox.startsWith(boxId);
  };

  const handleRowSelect = (serverPackage: any) => {
    const selectedPackageDetails = {
      name: serverPackage.display_name,
      cpu: serverPackage.display_name,
      memory: serverPackage.configs.memory + 'GB',
      disk: serverPackage.configs.disk + 'GB',
      traffic: (
        serverPackage.configs.included_traffic /
        1024 /
        1024 /
        1024 /
        1024
      ).toFixed(2) + 'TB',
      price: `${formatPrice(serverPackage.price_override[0]?.price_monthly || 'N/A')} / ماه\n${formatPrice(serverPackage.price_override[0]?.price_hourly || 'N/A')} / ساعت`,
    };
  
    dispatch(setSelectedPackage(serverPackage.name));
    dispatch(setPriceOverride(serverPackage.price_override));
    dispatch(setSelectedPackageDetails(selectedPackageDetails));
    setIsItemSelected(true);
  };

  const handleBoxClick = (boxId: string) => {
    setSelectedBox(boxId);
    dispatch(setServerType(boxId));
  };

  const handleRadioClick = (cpuType: string, cpuArch: string) => {
    const boxId = `${cpuType}-${cpuArch}`;
    setSelectedBox(boxId);
    dispatch(setServerType(boxId));
  };

  const handleNext = () => {
    if (selectedPackage) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('fa-IR').format(Number(price));
  };

  const activeBorderColor = useColorModeValue("#3F4859", "#739FE5");
  const inactiveBorderColor = useColorModeValue("#D8DDE5", "#8491A6");
  const activeBackgroundColor = useColorModeValue("#F0F6FF", "#1E2D47");
  const inactiveBackgroundColor = "transparent";
  const radioActiveBorderColor = useColorModeValue("#476BB1", "#739FE5");

  return (
    <Card variant="normal">
      <CardBody>
        <Text as="h4" textAlign="center" mb={10}>
          اندازه ابرک
        </Text>
        <RadioGroup
          onChange={(value) => handleRadioClick(value.split("-")[0], value.split("-")[1])}
          value={selectedBox || undefined}
        >
          <Flex
            justifyContent="space-between"
            mb={4}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Box
              width={{ base: "100%", md: "49%" }}
              borderWidth="1px"
              borderRadius="md"
              padding="4"
              marginBottom={{ base: "4", md: "0" }}
              borderColor={isBoxSelected("shared") ? activeBorderColor : inactiveBorderColor}
              backgroundColor={isBoxSelected("shared") ? activeBackgroundColor : inactiveBackgroundColor}
              cursor="pointer"
              position="relative"
              onClick={() => handleBoxClick("shared")}
            >
              {isBoxSelected("shared") && (
                <Badge
                  position="absolute"
                  top="-10px"
                  left="-10px"
                  width="24px"
                  height="24px"
                  bg="#476BB1"
                  color="white"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="full"
                  padding="4px"
                >
                  <Box
                    as="i"
                    className="icon-tick"
                    boxSize={2}
                    filter="unset"
                  />
                </Badge>
              )}
              <Flex alignItems="center">
                <Text as="h4" mr={2}>
                  VCPU اشتراکی
                </Text>
                <Tooltip
                  label="مناسب برای چه کاری یا چه کسانی."
                  fontSize="md"
                >
                  <Box
                    as="span"
                    bg="#E6E9F2"
                    color="black"
                    borderRadius="full"
                    width="20px"
                    height="20px"
                    display="flex"
                    padding="5px"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    fontSize="10px"
                    mr="2"
                  >
                    ?
                  </Box>
                </Tooltip>
              </Flex>

              <Text fontSize="sm" mt={2} color="gray.600">
                توضیحات مربوط به VCPU اشتراکی.
              </Text>
              <Divider my={2} borderColor="#D8DDE5" />
              <Stack direction="row" spacing={4}>
                <Radio
                  value="shared-x86"
                  borderColor={selectedBox === "shared-x86" ? radioActiveBorderColor : inactiveBorderColor}
                  borderWidth="1px"
                  padding="5px"
                >
                  (AMD/ Intel) x86
                </Radio>
                <Radio
                  value="shared-arm"
                  borderColor={selectedBox === "shared-arm" ? radioActiveBorderColor : inactiveBorderColor}
                  borderWidth="1px"
                  padding="5px"
                >
                  (AMD) arm
                </Radio>
              </Stack>
            </Box>

            <Box
              width={{ base: "100%", md: "49%" }}
              borderWidth="1px"
              borderRadius="md"
              padding="4"
              borderColor={isBoxSelected("dedicated") ? activeBorderColor : inactiveBorderColor}
              backgroundColor={isBoxSelected("dedicated") ? activeBackgroundColor : inactiveBackgroundColor}
              cursor="pointer"
              position="relative"
              onClick={() => handleBoxClick("dedicated")}
            >
              {isBoxSelected("dedicated") && (
                <Badge
                  position="absolute"
                  top="-10px"
                  left="-10px"
                  width="24px"
                  height="24px"
                  bg="#476BB1"
                  color="white"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="full"
                  padding="4px"
                >
                  <Box
                    as="i"
                    className="icon-tick"
                    boxSize={2}
                    filter="unset"
                  />
                </Badge>
              )}
              <Flex alignItems="center">
                <Text as="h4" mr={2}>
                  VCPU اختصاصی
                </Text>
                <Tooltip
                  label="مناسب برای چه کاری یا چه کسانی."
                  fontSize="md"
                >
                  <Box
                    as="span"
                    bg="#E6E9F2"
                    color="black"
                    borderRadius="full"
                    width="20px"
                    height="20px"
                    display="flex"
                    padding="5px"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    fontSize="10px"
                    mr="2"
                  >
                    ?
                  </Box>
                </Tooltip>
              </Flex>
              <Text fontSize="sm" mt={2} color="gray.600">
                توضیحات مربوط به VCPU اختصاصی.
              </Text>
              <Divider my={2} borderColor="#D8DDE5" />
              <Stack direction="row" spacing={4}>
                <Radio
                  value="dedicated-x86"
                  borderColor={selectedBox === "dedicated-x86" ? radioActiveBorderColor : inactiveBorderColor}
                  style={{ borderWidth: "1px" }}
                >
                  (AMD/ Intel) x86
                </Radio>
              </Stack>
            </Box>
          </Flex>
        </RadioGroup>

        <Text as="h4" mt={8} mb={4}>
          اندازه ابرک‌ها
        </Text>
        {isLoading && <Spinner />}
        {error && <Text color="red.500">خطا در بارگذاری داده‌ها</Text>}
        {data?.server_packages?.length ? (
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th textAlign="right" px={2}>نام</Th>
                <Th textAlign="right" px={2}>پردازنده</Th>
                <Th textAlign="right" px={2}>حافظه</Th>
                <Th textAlign="right" px={2}>دیسک</Th>
                <Th textAlign="right" px={2}>ترافیک</Th>
                <Th textAlign="right" px={2}>قیمت (ریال)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.server_packages.map((serverPackage) => {
                const priceOverride = serverPackage.price_override[0];
                const monthlyPrice = priceOverride ? parseInt(priceOverride.price_monthly, 10) : 0;
                const hourlyPrice = priceOverride ? parseInt(priceOverride.price_hourly, 10) : 0;

                const formattedMonthlyPrice = formatPrice(monthlyPrice.toString());
                const formattedHourlyPrice = formatPrice(hourlyPrice.toString());

                return (
                  <Tr
                    key={serverPackage.name}
                    borderColor={selectedPackage === serverPackage.name ? radioActiveBorderColor : "transparent"}
                    backgroundColor={selectedPackage === serverPackage.name ? activeBackgroundColor : "transparent"}
                    cursor="pointer"
                    onClick={() => handleRowSelect(serverPackage)}
                  >
                    <Td
                      display="flex"
                      alignItems="center"
                      justifyContent="right"
                      px={2}
                      whiteSpace="nowrap"
                    >
                      <Radio
                        value={serverPackage.name}
                        isChecked={selectedPackage === serverPackage.name}
                        onChange={() => handleRowSelect(serverPackage)}
                        borderColor={selectedPackage === serverPackage.name ? radioActiveBorderColor : inactiveBorderColor}
                        ml={2}
                      />
                      <Text ml={2}>{serverPackage.display_name}</Text>
                    </Td>
                    <Td textAlign="right" px={2}>{serverPackage.display_name}</Td>
                    <Td textAlign="right" px={2}>{serverPackage.configs.memory + 'GB'}</Td>
                    <Td textAlign="right" px={2}>{serverPackage.configs.disk + 'GB'}</Td>
                    <Td textAlign="right" px={2}>
                    {(
                        serverPackage.configs.included_traffic /
                        1024 /
                        1024 /
                        1024 /
                        1024
                      ).toFixed(2) + 'TB'}
                    </Td>
                    <Td textAlign="right" px={2}>
                      {monthlyPrice > 0 && hourlyPrice > 0 ? (
                        <>
                          {formattedMonthlyPrice} / ماه
                          <br />
                          {formattedHourlyPrice} / ساعت
                        </>
                      ) : (
                        "N/A"
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <Text color="gray.500">هیچ داده‌ای یافت نشد.</Text>
        )}

        <Flex justifyContent="end" gap={4} mt={4}>
          <Button variant="outline" color="#FA6465" borderColor="#FA6465" borderRadius="6px" onClick={handleBack}>
            بازگشت
          </Button>
          <Button bg="#FA6465" color="white" borderRadius="6px" onClick={handleNext} isDisabled={!isItemSelected}>
            بعدی
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CloudsSizeComponent;
