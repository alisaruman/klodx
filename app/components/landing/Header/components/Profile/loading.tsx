import { SkeletonCircle } from "@chakra-ui/react"
import React from "react"

const ProfileLoadingComponent = () => {
  return <SkeletonCircle w={10} h={10} borderRadius="full" cursor="pointer" />
}

export default ProfileLoadingComponent
