"use client";

import React from "react";
import { useGetLocationsQuery } from "@/app/redux/services/server-packages/serverPackageApi";
import { Box, Card, CardBody, Grid, GridItem, Flex, Text, useMediaQuery, Spinner, Button, useColorModeValue, Badge } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/app/redux/store";
import { setLocation } from "@/app/redux/slices/createServerSlice";

interface DataCenter {
  id: number;
  city: string;
  country: string;
  description: string;
  latitude: number;
  longitude: number;
  name: string;
  network_zone: string;
}

interface DataCenterComponentProps {
  activeStep: number;
  setShowStepper: (show: boolean) => void;
  setActiveStep: (step: number) => void;
}

const DataCenterComponent: React.FC<DataCenterComponentProps> = ({ activeStep, setShowStepper, setActiveStep }) => {
  const [tablet] = useMediaQuery("(max-width: 1024px)");
  const { data: locationsData, error: locationsError, isLoading: isLoadingLocations } = useGetLocationsQuery();
  
  const dispatch = useDispatch();
  const selectedLocation = useSelector((state: RootState) => state.createServer.location);

  const activeBorderColor = useColorModeValue("#476BB1", "#739FE5");
  const inactiveBorderColor = useColorModeValue("#D8DDE5", "#8491A6");
  const activeBackgroundColor = useColorModeValue("#E4EAF2", "#1E2D47");
  const inactiveBackgroundColor = "transparent";
  const badgeFilter = useColorModeValue(
    "unset",
    "brightness(0) saturate(100%) invert(86%) sepia(4%) saturate(2143%) hue-rotate(187deg) brightness(94%) contrast(90%)"
  );

  const getLocationImageSrc = (country: string): string => {
    switch (country) {
      case "DE":
        return "/images/dashboard/locations/de.png";
      case "FI":
        return "/images/dashboard/locations/fi.png";
      case "US":
        return "/images/dashboard/locations/us.png";
      case "SG":
        return "/images/dashboard/locations/sg.png";
      default:
        return "https://cdn.britannica.com/22/1722-004-EAD033D8/Flag-Iran.jpg";
    }
  };

  const handleNext = () => {
    if (selectedLocation) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setShowStepper(false);
  };

  const handleLocationClick = (location: DataCenter) => {
    dispatch(setLocation(location.name));
  };

  return (
    <Card variant="normal">
      <CardBody as={Flex} direction="column" gap={tablet ? 8 : 4} py={10} px={12}>
        <Box>
          <Text as="h4" textAlign="center" mb={10}>
            موقعیت دیتا‌سنتر
          </Text>
          {isLoadingLocations && <Spinner />}
          {locationsError && <Text color="red.500">خطا در بارگذاری داده‌ها</Text>}
          {locationsData?.locations.locations && (
            <>
              <Grid templateColumns={tablet ? "repeat(1, 1fr)" : "repeat(4, 1fr)"} gap={4}>
                {locationsData?.locations.locations.map((location: DataCenter) => (
                  <GridItem key={location.id}>
                    <Flex
                      direction="row"
                      alignItems="center"
                      border={selectedLocation === location.name ? `1px solid ${activeBorderColor}` : `1px solid ${inactiveBorderColor}`}
                      bg={selectedLocation === location.name ? activeBackgroundColor : inactiveBackgroundColor}
                      p={3}
                      borderRadius="md"
                      cursor="pointer"
                      position="relative"
                      onClick={() => handleLocationClick(location)}
                    >
                      {selectedLocation === location.name && (
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
                            filter={badgeFilter}
                          />
                        </Badge>
                      )}
                      <Box
                        as="img"
                        src={getLocationImageSrc(location.country)}
                        alt={`${location.name} image`}
                        width="56px"
                        height="35px"
                        ml={3}
                      />
                      <Box>
                        <Text fontSize="14px">{location.name}</Text>
                        <Text fontSize="12px">
                          {location.city}, {location.country}
                        </Text>
                      </Box>
                    </Flex>
                  </GridItem>
                ))}
              </Grid>
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
                <Button bg="#FA6465" color="white" borderRadius="6px" onClick={handleNext} isDisabled={!selectedLocation}>
                  بعدی
                </Button>
              </Flex>
            </>
          )}
        </Box>
      </CardBody>
    </Card>
  );
};

export default DataCenterComponent;
