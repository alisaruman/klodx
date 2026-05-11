"use client";
import { Box, Card, CardBody, Flex, useMediaQuery, Text, Button, useColorModeValue, Image, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import CloudServerLayout from "./CloudServerLayout";
import DataCenterComponent from "../components/stepper/components/DataCenters";
import ChooseOsComponent from "../components/stepper/components/ChooseOS";
import CloudsSizeComponent from "../components/stepper/components/CloudsSize";
import ChoosePlanComponent from "../components/stepper/components/ChoosePlan";
import FinalSettingComponent from "../components/stepper/components/FinalSetting";
import ReviewAndBuyComponent from "../components/stepper/components/ReviewAndBuy";

const steps = [
  { title: "موقعیت دیتاسنتر", component: DataCenterComponent },
  { title: "سیستم عامل", component: ChooseOsComponent },
  { title: "اندازه ابرک‌ها", component: CloudsSizeComponent },
  { title: "انتخاب پلن", component: ChoosePlanComponent },
  { title: "تنظیمات نهایی", component: FinalSettingComponent },
  { title: "بررسی و خرید", component: ReviewAndBuyComponent },
];

const CloudServerPage: React.FC = () => {
  const [tablet] = useMediaQuery("(max-width: 1024px)");
  const [showStepper, setShowStepper] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const buttonIconFilter = useColorModeValue("unset", "invert(1)");

  const createServerHandler = () => {
    console.log("create");
    setShowStepper(true);
    setActiveStep(0);
  };

  const CurrentComponent = steps[activeStep].component;

  return (
    <CloudServerLayout
      createServerHandler={createServerHandler}
      showStepper={showStepper}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
    >
      {showStepper ? (
        <VStack spacing={4} align="stretch">
          <CurrentComponent activeStep={activeStep} setShowStepper={setShowStepper} setActiveStep={setActiveStep} />
        </VStack>
      ) : (
        <Card variant="normal">
          <CardBody
            as={Flex}
            direction={tablet ? "column-reverse" : "row"}
            justify="space-between"
            gap={tablet ? 8 : 4}
            py={10}
            px={12}
          >
            <Box>
              <Text as="h4">احراز هویت</Text>
              <Text>
                برای استفاده از خدمات لطفا حساب کاربری خود را تکمیل کنید.
              </Text>
              <Button
                rounded="lg"
                mt={8}
                {...(tablet && { p: 4 })}
                leftIcon={
                  <Box
                    as="i"
                    className="icon-plus"
                    boxSize={4}
                    filter={buttonIconFilter}
                  />
                }
                onClick={createServerHandler}
              >
                ساخت سرور
              </Button>
            </Box>
            <Image
              src="/images/dashboard/cloud-server-no-item.svg"
              alt="auth"
              maxW={450}
            />
          </CardBody>
        </Card>
      )}
    </CloudServerLayout>
  );
};

export default CloudServerPage;
