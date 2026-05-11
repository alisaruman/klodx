import { Skeleton, useMediaQuery } from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import DesktopHeaderComponent from "./components/DesktopHeader"
import MobileHeaderComponent from "./components/MobileHeader"

const LandingHeaderComponent = ({ bg }: { bg?: boolean }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  const [smallDevice] = useMediaQuery(["(max-width: 1024px)"], {
    fallback: false,
  })
  const currentPath = usePathname()
  const headerMenuItems = [
    { label: "خانه", url: currentPath },
    { label: "خدمات", url: "#" },
    { label: "امنیت", url: "#" },
    { label: "تماس با ما", url: "#" },
  ]

  if (loading) return <Skeleton w="full" h="74px" />

  return (
    <>
      {!smallDevice ? (
        <DesktopHeaderComponent
          headerMenuItems={headerMenuItems}
          currentPath={currentPath}
          bg
        />
      ) : (
        <MobileHeaderComponent
          headerMenuItems={headerMenuItems}
          currentPath={currentPath}
          bg
        />
      )}
    </>
  )
}

export default LandingHeaderComponent
