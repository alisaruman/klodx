import { Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react"

const ModeSwitchLoading = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      w={20}
      h={4}
      position="relative"
    >
      <SkeletonCircle w={10} h={10} right="-12px" position="absolute" />
      <Skeleton w="full" h="full" opacity={0.5} />
      <SkeletonCircle w={10} h={10} left="-12px" position="absolute" />
    </Flex>
  )
}

export default ModeSwitchLoading
