"use client"
import { Container, useMediaQuery, VStack } from "@chakra-ui/react"
import CreateServerComponent from "./components/landing/CreateServer"
import LandingFooterComponent from "./components/landing/Footer"
import LandingHeaderComponent from "./components/landing/Header"
import PlansComponent from "./components/landing/Plans"
import SloganCloudComponent from "./components/landing/SloganCloud"
import StepsComponent from "./components/landing/Steps"
import TestimonialsComponent from "./components/landing/Testimonials"
import WhyComponent from "./components/landing/Why"
import WorldMapComponent from "./components/landing/WorldMap"

const Home = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)")

  return (
    <>
      <LandingHeaderComponent />
      <Container>
        <VStack spacing={isMobile ? 24 : 56} py={isMobile ? 12 : 40}>
          <SloganCloudComponent />
          <CreateServerComponent />
          <WhyComponent />
          <StepsComponent />
          <TestimonialsComponent />
          <PlansComponent />
          <WorldMapComponent />
        </VStack>
      </Container>
      <LandingFooterComponent />
    </>
  )
}

export default Home
