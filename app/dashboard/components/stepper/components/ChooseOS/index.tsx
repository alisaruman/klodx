"use client"

import React, { useState } from "react"
import { useGetImagesQuery } from "@/app/redux/services/server-packages/serverPackageApi"
import {
  Box,
  Card,
  CardBody,
  Flex,
  Text,
  useMediaQuery,
  Spinner,
  Grid,
  GridItem,
  Button,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"
import { setOsImage } from "@/app/redux/slices/createServerSlice"
import { Select } from "chakra-react-select"

interface ChooseOsComponentProps {
  activeStep: number
  setShowStepper: (show: boolean) => void
  setActiveStep: (step: number) => void
}

const ChooseOsComponent: React.FC<ChooseOsComponentProps> = ({
  activeStep,
  setShowStepper,
  setActiveStep,
}) => {
  const [tablet] = useMediaQuery("(max-width: 1024px)")
  const {
    data: imagesData,
    error: imagesError,
    isLoading: isLoadingImages,
  } = useGetImagesQuery()

  const dispatch = useDispatch()
  const selectedOsImage = useSelector(
    (state: RootState) => state.createServer.os_image,
  )
  const [selectedVersions, setSelectedVersions] = useState<{
    [key: string]: string | null
  }>({})

  const getOdImageSrc = (os_flavor: string): string => {
    switch (os_flavor) {
      case "ubuntu":
        return "/images/dashboard/os/ubuntu.png"
      case "debian":
        return "/images/dashboard/os/debian.png"
      case "rocky":
        return "/images/dashboard/os/rockylinux.png"
      case "centos":
        return "/images/dashboard/os/centos.png"
      case "alma":
        return "/images/dashboard/os/almalinux.png"
      default:
        return "https://cdn.britannica.com/22/1722-004-EAD033D8/Flag-Iran.jpg"
    }
  }

  const handleNext = () => {
    if (selectedOsImage && selectedVersions[selectedOsImage]) {
      dispatch(
        setOsImage(`${selectedOsImage}-${selectedVersions[selectedOsImage]}`),
      )
      setActiveStep(activeStep + 1)
    }
  }

  const handleBack = () => {
    setShowStepper(false)
  }

  const handleOsSelect = (osFlavor: string, version: string) => {
    setSelectedVersions((prev) => ({
      ...prev,
      [osFlavor]: version,
    }))
    dispatch(setOsImage(osFlavor))
  }

  const groupedImages = imagesData?.images.images.reduce((acc, image) => {
    const { os_flavor } = image
    if (!acc[os_flavor]) {
      acc[os_flavor] = []
    }
    acc[os_flavor].push(image)
    return acc
  }, {} as Record<string, typeof imagesData.images.images>)

  const activeBorderColor = useColorModeValue("#476BB1", "#739FE5")
  const inactiveBorderColor = useColorModeValue("#D8DDE5", "#8491A6")
  const activeBackgroundColor = useColorModeValue("#E4EAF2", "#1E2D47")
  const inactiveBackgroundColor = "transparent"

  return (
    <Card variant="normal">
      <CardBody
        as={Flex}
        direction="column"
        gap={tablet ? 8 : 4}
        py={10}
        px={12}
      >
        <Box>
          <Text as="h4" textAlign="center" mb={10}>
            سیستم عامل
          </Text>
          {isLoadingImages && <Spinner />}
          {imagesError && <Text color="red.500">خطا در بارگذاری داده‌ها</Text>}
          {groupedImages && (
            <Grid
              templateColumns={tablet ? "repeat(1, 1fr)" : "repeat(5, 1fr)"}
              gap={4}
            >
              {Object.entries(groupedImages).map(([os_flavor, images]) => {
                const uniqueVersions = Array.from(
                  new Set(images.map((image) => image.os_version)),
                )

                return (
                  <GridItem key={os_flavor} colSpan={1}>
                    <Flex
                      direction="column"
                      border={`1px solid ${
                        selectedOsImage === os_flavor
                          ? activeBorderColor
                          : inactiveBorderColor
                      }`}
                      bg={
                        selectedOsImage === os_flavor
                          ? activeBackgroundColor
                          : inactiveBackgroundColor
                      }
                      p={3}
                      borderRadius="md"
                      cursor="pointer"
                      position="relative"
                      onClick={() => dispatch(setOsImage(os_flavor))}
                      transition="border-color 0.2s, background-color 0.2s"
                    >
                      {selectedOsImage === os_flavor &&
                        selectedVersions[os_flavor] && (
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
                            <Box as="i" className="icon-tick" boxSize={2} />
                          </Badge>
                        )}
                      <Flex
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        pb={4}
                      >
                        <Box>
                          <Text ml={2} fontSize="14px">
                            {os_flavor}
                          </Text>
                        </Box>
                        <Box
                          as="img"
                          src={getOdImageSrc(os_flavor)}
                          width="40px"
                          height="40px"
                          ml={3}
                        />
                      </Flex>
                      <Box position="relative" zIndex={3}>
                        <Select
                          placeholder="نسخه"
                          value={
                            selectedVersions[os_flavor]
                              ? {
                                  label: selectedVersions[os_flavor]!,
                                  value: selectedVersions[os_flavor]!,
                                }
                              : null
                          }
                          onChange={(selectedOption) =>
                            handleOsSelect(
                              os_flavor,
                              selectedOption?.value || "",
                            )
                          }
                          options={uniqueVersions.map((version) => ({
                            label: version,
                            value: version,
                          }))}
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            control: (base) => ({ ...base, fontSize: "11px" }),
                            option: (base) => ({ ...base, fontSize: "11px" }),
                            singleValue: (base) => ({
                              ...base,
                              fontSize: "11px",
                            }),
                          }}
                          isDisabled={selectedOsImage !== os_flavor}
                        />
                      </Box>
                    </Flex>
                  </GridItem>
                )
              })}
            </Grid>
          )}
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
              isDisabled={
                !selectedOsImage || !selectedVersions[selectedOsImage]
              }
            >
              بعدی
            </Button>
          </Flex>
        </Box>
      </CardBody>
    </Card>
  )
}

export default ChooseOsComponent
