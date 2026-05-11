"use client"
import { Box, Grid, GridItem, useMediaQuery } from "@chakra-ui/react"
import { PropsWithChildren, ReactNode } from "react"
import LandingHeaderComponent from "../components/landing/Header"
import DashboardSidebarComponent from "./components/DashboardSidebar"
import DashboardSubheaderComponent from "./components/DashboardSubheader"
import StepperComponent from "./components/stepper"

interface Props extends PropsWithChildren {
  leftElement?: ReactNode
  centerElement?: ReactNode
  showStepper?: boolean
  activeStep?: number
  setActiveStep?: (index: number) => void
}

const DashboardLayout: React.FC<Props> = ({
  children,
  leftElement,
  centerElement,
  showStepper = false,
  activeStep = 0,
  setActiveStep = () => {}
}) => {
  const [tablet] = useMediaQuery("(max-width: 1024px)")

  return (
    <>
      <LandingHeaderComponent bg={true} />
      <Grid maxW="full" gridTemplateColumns="repeat(12, 1fr)">
        {!tablet && (
          <GridItem colSpan={1}>
            <DashboardSidebarComponent />
          </GridItem>
        )}
        <GridItem colSpan={!tablet ? 11 : 12}>
          {showStepper ? (
            <StepperComponent activeStep={activeStep} setActiveStep={setActiveStep} />
          ) : (
            <DashboardSubheaderComponent
              leftElement={leftElement}
              centerElement={centerElement}
            />
          )}
          <Box p={!tablet ? 10 : 5}>{children}</Box>
        </GridItem>
      </Grid>
    </>
  )
}

export default DashboardLayout
