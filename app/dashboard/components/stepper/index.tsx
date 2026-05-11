"use client";

import React from "react";
import { Box, Flex, Text, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

SwiperCore.use([Navigation]);

interface Step {
  title: string;
  icon: string;
}

interface StepperProps {
  activeStep: number;
  setActiveStep: (index: number) => void;
}

const steps: Step[] = [
  { title: "موقعیت دیتاسنتر", icon: "icon-data-centers" },
  { title: "سیستم عامل", icon: "icon-os" },
  { title: "اندازه ابرک‌ها", icon: "icon-resize-four-directions" },
  { title: "انتخاب پلن", icon: "icon-subscription" },
  { title: "تنظیمات نهایی", icon: "icon-final-settings" },
  { title: "بررسی و خرید", icon: "icon-magnifier" },
];

const StepperComponent: React.FC<StepperProps> = ({ activeStep, setActiveStep }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const bgColor = useColorModeValue("brandGray.1400", "brandDark.bg.200");
  const borderColor = useColorModeValue("brandGray.1100", "brandDark.1300");
  const boxBorder = useColorModeValue("1px solid #739FE5", "1px solid #476BB1");
  const inactiveBoxBorder = useColorModeValue("1px solid #D8DDE5", "1px solid #8491A6");
  const activeTextColor = "blue.500";
  const inactiveTextColor = useColorModeValue("#99A8BF", "#8491A6");
  const lineColor = useColorModeValue("gray.200", "gray.700");
  const iconActiveColor = "#739FE5";
  const iconInactiveColor = useColorModeValue("#99A8BF", "#8491A6");
  const iconActiveFilter = "none";
  const iconInactiveFilter = useColorModeValue("brightness(100) invert(1)", "brightness(0) invert(1)");
  const tickIconFilter = useColorModeValue(
    "unset",
    "brightness(0) saturate(100%) invert(86%) sepia(4%) saturate(2143%) hue-rotate(187deg) brightness(94%) contrast(90%)"
  );

  const handleStepClick = (index: number) => {
    // setActiveStep(index);
  };

  return (
    <Flex
      align="center"
      justify="center"
      p={6}
      gap={4}
      w="full"
      bg={bgColor}
      borderBottom="1px solid"
      borderColor={borderColor}
    >
      {isMobile ? (
        <Box width="100%" px={2}>
          <Swiper
            spaceBetween={5}
            slidesPerView={2}
            slidesPerGroup={2}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
          >
            {steps.map((step, index) => (
              <SwiperSlide key={index}>
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <Flex direction="column" alignItems="center" mx={6} px={4} py={4}>
                    <Box
                      transitionDuration="0.2s"
                      borderRadius="6px"
                      p={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      border={activeStep === index ? boxBorder : inactiveBoxBorder}
                      boxShadow={
                        activeStep === index
                          ? "0px 0px 4px 1px #739FE5"
                          : "transparent"
                      }
                      cursor="pointer"
                      onClick={() => handleStepClick(index)}
                      width="40px"
                      height="40px"
                    >
                      <Box
                        as="i"
                        className={step.icon}
                        boxSize={6}
                        color={activeStep === index ? iconActiveColor : iconInactiveColor}
                        filter={
                          activeStep === index
                            ? iconActiveFilter
                            : iconInactiveFilter
                        }
                      />
                    </Box>
                    <Text
                      mt={2}
                      fontSize="10px"
                      textAlign='center'
                      color={activeStep === index ? activeTextColor : inactiveTextColor}
                    >
                      {index + 1 + ". " + step.title}
                    </Text>
                  </Flex>
                  {index < steps.length - 1 && (
                    <Box
                      h="1px"
                      w="48px"
                      bg={lineColor}
                      alignSelf="center"
                      mb={2}
                    />
                  )}
                  {activeStep > index && (
                    <Box
                      position="absolute"
                      top="10px"
                      left="48%"
                      bg="#07C877"
                      color="white"
                      borderRadius="50%"
                      width="16px"
                      height="16px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="10px"
                    >
                      <Box
                        as="i"
                        className="icon-tick"
                        boxSize={2}
                        filter={tickIconFilter}
                      />
                    </Box>
                  )}
                </Flex>
              </SwiperSlide>
            ))}
            <Box
              className="swiper-button-prev"
              bg="#476BB1"
              color="white"
              borderRadius="6px"
              width="32px"
              height="32px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              position="absolute"
              top="70px"
              transform="translateY(-50%)"
              _hover={{ bg: "#3b5b9d" }}
            >
              {"<"}
            </Box>
            <Box
              className="swiper-button-next"
              bg="#476BB1"
              color="white"
              borderRadius="6px"
              width="32px"
              height="32px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              position="absolute"
              top="70px"
              transform="translateY(-50%)"
              _hover={{ bg: "#3b5b9d" }}
            >
              {">"}
            </Box>
          </Swiper>
        </Box>


      ) : (
        <Flex justifyContent="center" alignItems="center" mb={4}>
          {steps.map((step, index) => (
            <Flex key={index} direction="row" alignItems="center" position="relative">
              <Flex direction="column" alignItems="center">
                <Box
                  transitionDuration="0.2s"
                  borderRadius="6px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={2}
                  border={
                    activeStep === index
                      ? boxBorder
                      : inactiveBoxBorder
                  }
                  boxShadow={
                    activeStep === index
                      ? "0px 0px 4px 1px #739FE5"
                      : "transparent"
                  }
                  cursor="pointer"
                  onClick={() => handleStepClick(index)}
                  position="relative"
                >
                  <Box
                    as="i"
                    className={step.icon}
                    boxSize={6}
                    color={activeStep === index ? iconActiveColor : iconInactiveColor}
                    filter={activeStep === index ? iconActiveFilter : iconInactiveFilter}
                  />
                  {activeStep > index && (
                    <Box
                      position="absolute"
                      top="-8px"
                      left="-8px"
                      bg="#07C877"
                      color="white"
                      borderRadius="50%"
                      width="16px"
                      height="16px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="10px"
                      zIndex="1"
                    >
                      <Box
                        as="i"
                        className="icon-tick"
                        boxSize={2}
                        filter={tickIconFilter}
                      />
                    </Box>
                  )}
                </Box>
                <Text mt={2} fontSize="xs" color={activeStep === index ? activeTextColor : inactiveTextColor}>
                  {index + 1 + ". " + step.title}
                </Text>
              </Flex>
              {index < steps.length - 1 && (
                <Box
                  h="1px"
                  w="60px"
                  bg={lineColor}
                  alignSelf="center"
                  mb={2}
                />
              )}
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default StepperComponent;
