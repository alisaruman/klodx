import { Icon } from "@chakra-ui/react"

const StepsLineComponent = () => {
  return (
    <>
      <Icon w="100%" h="100%" mx="auto" viewBox="20 0 384 53">
        <path
          d="M383 61.4957C317.56 15.2737 148.745 -38.9309 1 48.0017"
          stroke="#82A4D9"
          strokeWidth="2"
          strokeDasharray="20 20"
          fill="transparent"
          className="orderStepsLine"
        />
      </Icon>
      <Icon
        w="100%"
        h="100%"
        mx="auto"
        viewBox="-70 -10 384 53"
        transform="rotateX(180deg)"
        mt={16}
      >
        <path
          d="M383 61.4957C317.56 15.2737 148.745 -38.9309 1 28.0017"
          stroke="#82A4D9"
          strokeWidth="2"
          strokeDasharray="20 20"
          fill="transparent"
          className="orderStepsLine"
        />
      </Icon>
    </>
  )
}

export default StepsLineComponent
