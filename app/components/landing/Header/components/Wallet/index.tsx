/* eslint-disable react-hooks/rules-of-hooks */
import { useLazyGetWalletQuery } from "@/app/redux/services/payment/paymentApi"
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react"
import { useEffect } from "react"
import WalletFormComponent from "./components/WalletForm"

enum Currency {
  IRR = "ریال",
}

const WalletComponent = () => {
  const [smallDevice] = useMediaQuery(["(max-width: 1024px)"], {
    fallback: false,
  })
  const [getWallet, { data, error, isLoading }] = useLazyGetWalletQuery()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const currencyLabel = Object.keys(Currency).find(
    (key) => key === data?.currency,
  )

  useEffect(() => {
    getWallet()
  }, [getWallet])

  if (isLoading) return <Skeleton w={195} h={10} />

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
            <WalletFormComponent currency={currencyLabel} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Button
        {...(smallDevice && { w: "full" })}
        {...(smallDevice && { justifyContent: "space-between" })}
        border={smallDevice ? "0px" : "1px solid"}
        variant="normal"
        borderColor={useColorModeValue("brandGray.1100", "brandDark.1300")}
        rounded="lg"
        p={smallDevice ? 5 : 4}
        gap={1}
        color={useColorModeValue("brandDark.1200", "brandGray.1900")}
        leftIcon={
          <HStack>
            <Box
              as="i"
              className="icon-wallet"
              boxSize={smallDevice ? 7 : 6}
              filter={useColorModeValue(
                "unset",
                "brightness(0) saturate(100%) invert(97%) sepia(4%) saturate(199%) hue-rotate(186deg) brightness(95%) contrast(94%)",
              )}
            />
            <Text as="span">
              {currencyLabel === "IRR"
                ? Number(data?.balance).toLocaleString("fa-IR")
                : data?.balance}
            </Text>
            <Text as="span" fontSize="xs">
              {currencyLabel
                ? Currency[currencyLabel as keyof typeof Currency]
                : ""}
            </Text>
          </HStack>
        }
        rightIcon={
          <Box
            as="i"
            className="icon-plus"
            boxSize={4}
            mr={6}
            filter={useColorModeValue(
              "brightness(0) saturate(100%) invert(22%) sepia(37%) saturate(380%) hue-rotate(180deg) brightness(99%) contrast(82%)",
              "brightness(0) saturate(100%) invert(97%) sepia(4%) saturate(199%) hue-rotate(186deg) brightness(95%) contrast(94%)",
            )}
          />
        }
        onClick={onOpen}
      ></Button>
    </>
  )
}

export default WalletComponent
