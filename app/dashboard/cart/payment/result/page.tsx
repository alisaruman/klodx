"use client";

import { useState, useEffect } from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import DashboardLayout from "@/app/dashboard/DashboardLayout";

const PaymentCallbackPage = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
  }, []);

  const isSuccess = paymentSuccess;

  return (
    <DashboardLayout>
      <Flex
        justify="center"
        align="center"
        position="relative"
        px={4}
      >
        <Box
          bg="white"
          width="640px"
          height="382px"
          borderRadius="16px"
          position="absolute"
          top="80px"
          left="50%"
          transform="translateX(-50%)"
          p={6}
          boxShadow="md"
        >
          <Flex direction="column" align="center" justify="center" height="100%" gap={4}>
            <Image
              src={isSuccess ? "/images/dashboard/cluod-success.png" : "/images/dashboard/cloud-faild.png"}
              alt={isSuccess ? "پرداخت موفق" : "پرداخت ناموفق"}
              width="200px"
            />
            <Text
              as="h2"
              fontSize="xl"
              color={isSuccess ? "#00A789" : "#EE4747"}
              textAlign="center"
            >
              {isSuccess ? "پرداخت موفق بود" : "پرداخت ناموفق بود"}
            </Text>
            <Flex gap={4} mt={4} justify="center">
              {isSuccess ? (
                <>
                  <Button
                    borderColor="#00A789"
                    color="#00A789"
                    variant="outline"
                    _hover={{ borderColor: "#00A789", color: "#00A789" }}
                  >
                    چاپ فاکتور
                  </Button>
                  <Button
                    bg="#00A789"
                    color="white"
                    _hover={{ bg: "#00A789" }}
                  >
                    بازگشت
                  </Button>
                </>
              ) : (
                <Button
                  bg="#FA6465"
                  color="white"
                  _hover={{ bg: "#FA6465" }}
                >
                  بازگشت
                </Button>
              )}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </DashboardLayout>
  );
};

export default PaymentCallbackPage;
