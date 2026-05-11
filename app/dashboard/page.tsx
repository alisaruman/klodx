"use client"
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Circle,
  Flex,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react"
import DashboardLayout from "./DashboardLayout"

const DashboardPage = () => {
  const [tablet] = useMediaQuery("(max-width: 1024px")

  return (
    <DashboardLayout>
      <VStack spacing={4} align="stretch">
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
                    filter={useColorModeValue("unset", "invert(1)")}
                  />
                }
              >
                ایجاد دسترسی جدید
              </Button>
            </Box>
            <Image
              src="/images/dashboard/dashboard-auth.svg"
              alt="auth"
              maxW={450}
            />
          </CardBody>
        </Card>
        <SimpleGrid columns={tablet ? 1 : 2} gap={4}>
          <Card variant="information">
            <CardHeader>
              <Text as="h4">مصرف این ماه</Text>
              <Link
                href="#"
                variant="normal"
                color="brandRed.200"
                fontSize={tablet ? "xs" : "sm"}
              >
                مشاهده تیکت ها
              </Link>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Flex align="center" justify="space-between">
                  <Text>مصرف این ماه</Text>
                  <Text>1,000,000 ریال</Text>
                </Flex>
                <Flex align="center" justify="space-between">
                  <Text>موجودی کیف پول</Text>
                  <Text>1,000,000 ریال</Text>
                </Flex>
              </VStack>
            </CardBody>
          </Card>
          <Card variant="information">
            <CardHeader>
              <Text as="h4">تیکت ها</Text>
              <Link
                href="#"
                variant="normal"
                color="brandRed.200"
                fontSize={tablet ? "xs" : "sm"}
              >
                مشاهده تیکت ها
              </Link>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Flex align="center" justify="space-between">
                  <Text>تیکت‌های آپدیت شده</Text>
                  <Text>5</Text>
                </Flex>
                <Flex align="center" justify="space-between">
                  <Text>تیکت‌های باز</Text>
                  <Text>12</Text>
                </Flex>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
        <Card variant="information">
          <CardHeader>
            <Text as="h4">لاگ‌ها</Text>
            <Link href="#" fontSize={tablet ? "xs" : "sm"} color="brandRed.200">
              مشاهده تمام لاگ‌ها
            </Link>
          </CardHeader>
          <CardBody>
            <TableContainer
              border="1px solid"
              rounded="lg"
              borderColor={useColorModeValue(
                "brandGray.1100",
                "brandDark.1300",
              )}
              maxH={500}
              overflowY="auto"
            >
              <Table>
                <Thead>
                  <Tr>
                    <Th textAlign="right">سطح اهمیت</Th>
                    <Th>نوع سرویس</Th>
                    <Th>فعالیت</Th>
                    <Th>تاریخ</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <HStack>
                        <Circle size={2} bg="red" />
                        <Text>Info</Text>
                      </HStack>
                    </Td>
                    <Td>CDN</Td>
                    <Td>iam.v1.workspaces.enableMFARequirement</Td>
                    <Td>
                      <Text>1403-02-30</Text>
                      <Text fontSize="sm" color="brandGray.1700">
                        08:23:12
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <HStack>
                        <Circle size={2} bg="orange" />
                        <Text>Info</Text>
                      </HStack>
                    </Td>
                    <Td>CDN</Td>
                    <Td>iam.v1.workspaces.enableMFARequirement</Td>
                    <Td>
                      <Text>1403-02-30</Text>
                      <Text fontSize="sm" color="brandGray.1700">
                        08:23:12
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <HStack>
                        <Circle size={2} bg="blue" />
                        <Text>Info</Text>
                      </HStack>
                    </Td>
                    <Td>CDN</Td>
                    <Td>iam.v1.workspaces.enableMFARequirement</Td>
                    <Td>
                      <Text>1403-02-30</Text>
                      <Text fontSize="sm" color="brandGray.1700">
                        08:23:12
                      </Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <HStack>
                        <Circle size={2} bg="green" />
                        <Text>Info</Text>
                      </HStack>
                    </Td>
                    <Td>CDN</Td>
                    <Td>iam.v1.workspaces.enableMFARequirement</Td>
                    <Td>
                      <Text>1403-02-30</Text>
                      <Text fontSize="sm" color="brandGray.1700">
                        08:23:12
                      </Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </VStack>
    </DashboardLayout>
  )
}

export default DashboardPage
