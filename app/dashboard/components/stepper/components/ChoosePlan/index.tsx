"use client";

import React from "react";
import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
  useMediaQuery,
  Button,
  Divider,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setPriceType } from "@/app/redux/slices/createServerSlice";

interface ChoosePlanComponentProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

const ChoosePlanComponent: React.FC<ChoosePlanComponentProps> = ({
  activeStep,
  setActiveStep,
}) => {
  const [tablet] = useMediaQuery("(max-width: 1024px)");
  const priceOverride = useSelector((state: RootState) => state.createServer.price_override);
  const selectedLocation = useSelector((state: RootState) => state.createServer.location);
  const selectedPriceType = useSelector((state: RootState) => state.createServer.price_type);
  const dispatch = useDispatch();

  const selectedPrice = priceOverride?.find(
    (price: any) => price.location === selectedLocation
  );

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('fa-IR').format(Number(price));
  };

  const calculateSavings = (priceType: number, basePrice: string, discountedPrice: string) => {
    const baseMonthlyPrice = Number(basePrice) * 720;
    const discountPrice = Number(discountedPrice);
    const savings = ((baseMonthlyPrice - discountPrice) / baseMonthlyPrice) * 100;
    return savings.toFixed(2);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSelectPlan = (priceType: number) => {
    dispatch(setPriceType(priceType));
  };

  const tickIconFilter = useColorModeValue(
    "unset",
    "brightness(0) saturate(100%) invert(86%) sepia(4%) saturate(2143%) hue-rotate(187deg) brightness(94%) contrast(90%)"
  );

  const selectedStyle = {
    borderColor: useColorModeValue("#476BB1", "#739FE5"),
    backgroundColor: useColorModeValue("#E4EAF2", "#1E2D47"),
    position: "relative",
    cursor: "pointer",
  };

  const normalStyle = {
    borderColor: useColorModeValue("#D8DDE5", "#8491A6"),
    backgroundColor: "transparent",
    cursor: "pointer",
  };

  const priceData = selectedPrice
    ? [
        { priceType: 1, typeLabel: "ساعتی", price: formatPrice(selectedPrice.price_hourly) || "N/A", savings: "0" },
        { priceType: 2, typeLabel: "ماهیانه", price: formatPrice(selectedPrice.price_monthly) || "N/A", savings: calculateSavings(2, selectedPrice.price_hourly, selectedPrice.price_monthly) },
        { priceType: 3, typeLabel: "سه‌ماهه", price: formatPrice(selectedPrice.price_three_months) || "N/A", savings: calculateSavings(3, selectedPrice.price_hourly, selectedPrice.price_three_months) },
        { priceType: 4, typeLabel: "شش‌ماهه", price: formatPrice(selectedPrice.price_six_months) || "N/A", savings: calculateSavings(4, selectedPrice.price_hourly, selectedPrice.price_six_months) },
        { priceType: 5, typeLabel: "سالانه", price: formatPrice(selectedPrice.price_yearly) || "N/A", savings: calculateSavings(5, selectedPrice.price_hourly, selectedPrice.price_yearly) },
      ]
    : [];

  return (
    <Card variant="normal">
      <CardBody py={10} px={12}>
        <Box>
          <Text as="h4" textAlign="center" mb={10}>
            انتخاب پلن
          </Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} mb={4}>
            {priceData.length > 0 ? (
              priceData.map(({ priceType, typeLabel, price, savings }) => (
                <GridItem
                  key={priceType}
                  onClick={() => handleSelectPlan(priceType)}
                  borderWidth="1px"
                  borderRadius="md"
                  padding="4"
                  {...(selectedPriceType === priceType
                    ? selectedStyle
                    : normalStyle)}
                >
                  {selectedPriceType === priceType && (
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
                        filter={tickIconFilter}
                      />
                    </Badge>
                  )}
                  <Box display="flex" justifyContent="space-between" textAlign="center" mb={5}>
                    <Text as="h5">{typeLabel}</Text>
                    {savings !== "0" && (
                      <Badge backgroundColor="#476BB1" color="#FFFFFF" fontSize="sm" borderRadius="100px">
                        {savings}% سود
                      </Badge>
                    )}
                  </Box>
                  <Box>
                    <Box display="flex" justifyContent="space-between" alignContent="center" alignItems="center" mb={2}>
                      <Text as="h5">{typeLabel}:</Text>
                      <Text as="h5">{price} ریال</Text>
                    </Box>
                  </Box>
                </GridItem>
              ))
            ) : (
              <Text color="gray.500">پلنی برای نمایش وجود ندارد.</Text>
            )}
          </Grid>

          <Box display="flex" justifyContent="end" gap={4} mt={4}>
            <Button variant="outline" color="#FA6465" borderColor="#FA6465" borderRadius="6px" onClick={handleBack}>
              بازگشت
            </Button>
            <Button bg="#FA6465" color="white" borderRadius="6px" onClick={handleNext} isDisabled={!selectedPrice}>
              تایید و خرید ابرک
            </Button>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ChoosePlanComponent;
