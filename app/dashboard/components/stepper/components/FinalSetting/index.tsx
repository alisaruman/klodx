"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Text,
  useMediaQuery,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Textarea,
  useDisclosure,
  VStack,
  useColorModeValue,
  Tooltip,
  Checkbox,
  Badge,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  useAddSSHKeyMutation,
  useGetSSHKeysQuery,
} from "@/app/redux/services/server-packages/serverPackageApi";
import {
  setIpv4,
  setIpv6,
  setSshKey,
  setName,
} from "@/app/redux/slices/createServerSlice";
import { RootState } from "@/app/redux/store";

interface FinalSettingComponentProps {
  activeStep: number;
  setShowStepper: (show: boolean) => void;
  setActiveStep: (step: number) => void;
}

const FinalSettingComponent: React.FC<FinalSettingComponentProps> = ({
  activeStep,
  setShowStepper,
  setActiveStep,
}) => {
  const [tablet] = useMediaQuery("(max-width: 1024px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: sshKeys = [], refetch, error } = useGetSSHKeysQuery();
  const [addSSHKey] = useAddSSHKeyMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const storedServerName = useSelector(
    (state: RootState) => state.createServer.name
  );
  const storedIpv4 = useSelector((state: RootState) => state.createServer.ipv4);
  const storedIpv6 = useSelector((state: RootState) => state.createServer.ipv6);
  const storedSshKey = useSelector(
    (state: RootState) => state.createServer.ssh_key
  );

  const [keyName, setKeyName] = useState<string>("");
  const [sshKey, setLocalSshKey] = useState<string>("");
  const [selectedSSHKey, setSelectedSSHKey] = useState<any | null>(storedSshKey);
  const [serverName, setServerName] = useState<string>(storedServerName || "");
  const [ipv4Checked, setIpv4Checked] = useState<boolean>(storedIpv4);
  const [ipv6Checked, setIpv6Checked] = useState<boolean>(storedIpv6);

  useEffect(() => {
    if (error) {
      router.push("/login");
    }
  }, [error, router]);

  const handleNext = () => {
    if (serverName.trim()) {
      dispatch(setSshKey(selectedSSHKey));
      dispatch(setName(serverName));
      dispatch(setIpv4(ipv4Checked));
      dispatch(setIpv6(ipv6Checked));
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setShowStepper(false);
  };

  const handleAddKey = async () => {
    if (keyName && sshKey) {
      await addSSHKey({ key_name: keyName, ssh_key: sshKey }).unwrap();
      setKeyName("");
      setLocalSshKey("");
      refetch();
      onClose();
    }
  };

  const handleSelectKey = (id: number) => {
    setSelectedSSHKey(id);
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
    backgroundColor: useColorModeValue("gray.100", "gray.700"),
    cursor: "pointer",
  };

  return (
    <Card variant="normal">
      <CardBody as={Flex} direction="column" gap={tablet ? 8 : 4} py={10} px={12}>
        <Box>
          <Text as="h4" textAlign="center" mb={10}>
            تنظیمات نهایی
          </Text>

          <Box mb={8}>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center" gap={2}>
                <Box
                  as="i"
                  className="icon-key"
                  boxSize={6}
                  filter={useColorModeValue(
                    "unset",
                    "brightness(0) saturate(100%) invert(97%) sepia(4%) saturate(199%) hue-rotate(186deg) brightness(95%) contrast(94%)"
                  )}
                />
                <Text as="h5">کلید SSH</Text>
              </Flex>
            </Flex>

            <Flex mt={4} alignItems="center" gap={4}>
              <Button
                bg="white"
                color="#62718C"
                border="1px dashed #62718C"
                borderRadius="6px"
                onClick={onOpen}
                _hover={{
                  bg: "white",
                  color: "#62718C",
                  borderColor: "#62718C",
                }}
              >
                ساخت کلید جدید
              </Button>

              <Flex direction="row" wrap="wrap" gap={4}>
                {sshKeys.map((key: { id: number; key_name: string }) => (
                  <Box
                    key={key.id}
                    borderWidth="1px"
                    borderRadius="md"
                    padding="4"
                    {...(selectedSSHKey === key.id ? selectedStyle : normalStyle)}
                    onClick={() => handleSelectKey(key.id)}
                    display="flex"
                    alignItems="center"
                  >
                    {selectedSSHKey === key.id && (
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
                    <Text fontWeight="bold" display="flex" alignItems="center">
                      <Box
                        as="i"
                        className="icon-key"
                        boxSize={4}
                        ml={2}
                        filter={tickIconFilter}
                      />
                      {key.key_name}
                    </Text>
                  </Box>
                ))}
              </Flex>
            </Flex>
          </Box>

          <Box mb={8}>
            <Flex direction={tablet ? "column" : "row"} gap={4}>
              <Box
                border="1px solid"
                borderColor={useColorModeValue("#D8DDE5", "#8491A6")}
                borderRadius="6px"
                p={4}
                flex="1"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center" gap={2}>
                    <Text as="h5">IPv4</Text>
                    <Tooltip
                      label="مناسب برای چه کاری یا چه کسانی."
                      fontSize="md"
                    >
                      <Box
                        as="span"
                        bg={useColorModeValue("#E6E9F2", "#4A5568")}
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
                  <Checkbox isChecked={ipv4Checked} onChange={(e) => setIpv4Checked(e.target.checked)} />
                </Flex>
              </Box>

              <Box
                border="1px solid"
                borderColor={useColorModeValue("#D8DDE5", "#8491A6")}
                borderRadius="6px"
                p={4}
                flex="1"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center" gap={2}>
                    <Text as="h5">IPv6</Text>
                    <Tooltip
                      label="مناسب برای چه کاری یا چه کسانی."
                      fontSize="md"
                    >
                      <Box
                        as="span"
                        bg={useColorModeValue("#E6E9F2", "#4A5568")}
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
                  <Checkbox isChecked={ipv6Checked} onChange={(e) => setIpv6Checked(e.target.checked)} />
                </Flex>
              </Box>
            </Flex>
          </Box>

          <Box mb={8}>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center" gap={2}>
                <Box
                  as="i"
                  className="icon-edit"
                  boxSize={6}
                  filter={useColorModeValue(
                    "unset",
                    "brightness(0) saturate(100%) invert(97%) sepia(4%) saturate(199%) hue-rotate(186deg) brightness(95%) contrast(94%)"
                  )}
                />
                <Text as="h5">نام سرور</Text>
              </Flex>
            </Flex>
            <Box mt={4}>
              <Input placeholder="سرور ۱" value={serverName} onChange={(e) => setServerName(e.target.value)} />
            </Box>
          </Box>

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
              isDisabled={!serverName.trim()}
            >
              تایید و خرید ابرک
            </Button>
          </Flex>
        </Box>
      </CardBody>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">کلید SSH</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} alignItems="flex-start">
              <Box width="100%">
                <Text fontSize="12px" fontWeight="500" mb={1}>نام کلید</Text>
                <Input
                  placeholder="عنوان"
                  borderRadius="12px"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                />
              </Box>
              <Box width="100%">
                <Text fontSize="12px" fontWeight="500" mb={1}>کلید SSH</Text>
                <Textarea
                  value={sshKey}
                  onChange={(e) => setLocalSshKey(e.target.value)}
                  borderRadius="12px"
                  rows={5}
                />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter gap={4} justifyContent="center">
            <Button
              variant="outline"
              borderColor="#EE4747"
              fontSize="12px"
              color="#EE4747"
              bg="white"
              borderRadius="6px"
              _hover={{ bg: "white", borderColor: "#D03F3F", color: "#D03F3F" }}
              onClick={onClose}
            >
              بازگشت
            </Button>
            <Button
              bg="#EE4747"
              fontSize="12px"
              color="white"
              borderRadius="6px"
              mr={3}
              _hover={{ bg: "#D03F3F" }}
              onClick={handleAddKey}
            >
              تایید
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default FinalSettingComponent;
