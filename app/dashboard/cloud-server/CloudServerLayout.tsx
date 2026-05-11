"use client"
import { Box, Button, useColorModeValue, useMediaQuery } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import DashboardLayout from "../DashboardLayout"

interface CloudServerLayoutProps extends PropsWithChildren {
  createServerHandler?: () => void;
  showStepper: boolean;
  activeStep: number;
  setActiveStep: (index: number) => void;
}

const CloudServerLayout: React.FC<CloudServerLayoutProps> = ({
  children,
  createServerHandler,
  showStepper,
  activeStep,
  setActiveStep
}) => {
  const [tablet] = useMediaQuery("(max-width: 1024px)")

  const CloudServerButton = (
    <Button
      rounded="lg"
      {...(tablet && { p: 4 })}
      leftIcon={
        <Box
          as="i"
          className="icon-plus"
          boxSize={4}
          filter={useColorModeValue("unset", "invert(1)")}
        />
      }
      onClick={createServerHandler}
    >
      ساخت سرور
    </Button>
  )

  return (
    <DashboardLayout
      leftElement={CloudServerButton}
      showStepper={showStepper}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
    >
      {children}
    </DashboardLayout>
  )
}

export default CloudServerLayout
