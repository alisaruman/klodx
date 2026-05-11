import {
  AbsoluteCenter,
  Avatar,
  Box,
  Skeleton,
  Text,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react"
import { useCallback, useEffect, useRef, useState } from "react"
import SwiperCore from "swiper"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

SwiperCore.use([Autoplay])

const slides = [
  {
    url: "/images/landing/profile.png",
    name: "علی",
    description:
      "سه تا از نکات مهمی که من رو به خدمات HC علاقمند کرده قابل اعتماد بودن، تأخیر زمانی پایین و همچنین قیمت کم خدمات است. ",
  },
  {
    url: "/images/landing/profile.png",
    name: "محمد حسین",
    description:
      "مبلغی که من بابت استفاده از سرور می‌پردازم شاید یک دهم مبلغی باشد که هنگام استفاده از همین خدمات که توسط شرکت های دیگر ارایه میگردد باید بپردازم. ",
  },
  {
    url: "/images/landing/profile.png",
    name: "سید رضا",
    description:
      "استفاده از خدمات امن، قابل اتکا و ارزان‌قیمت مستلزم بهره وری بالاتر در کار ما بوده است. ما همواره از این خرسند هستیم.",
  },
  {
    url: "/images/landing/profile.png",
    name: "جواد",
    description:
      "استفاده از خدمات امن، قابل اتکا و ارزان‌قیمت مستلزم بهره وری بالاتر در کار ما بوده است. ما همواره از این خرسند هستیم.",
  },
]

const TestiSlider = () => {
  const [loading, setLoading] = useState(true)
  const [smallDevice, mobile] = useMediaQuery(
    ["(min-width: 501px) and (max-width: 1024px)", "(max-width: 500px)"],
    { fallback: false },
  )

  useEffect(() => {
    setLoading(false)
  }, [])

  const swiperRef = useRef<SwiperCore | null>(null)
  const nextButtonRef = useRef<HTMLButtonElement | null>(null)
  const prevButtonRef = useRef<HTMLButtonElement | null>(null)

  const handleNext = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }, [])

  const handlePrev = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
    }
  }, [])

  const filter = useColorModeValue(
    "brightness(0) saturate(100%) invert(8%) sepia(15%) saturate(7390%) hue-rotate(213deg) brightness(99%) contrast(105%)",
    "unset",
  )
  useEffect(() => {
    const nextButton = nextButtonRef.current
    const prevButton = prevButtonRef.current

    if (nextButton && prevButton) {
      nextButton.addEventListener("click", handleNext)
      prevButton.addEventListener("click", handlePrev)

      return () => {
        nextButton.removeEventListener("click", handleNext)
        prevButton.removeEventListener("click", handlePrev)
      }
    }
  }, [handleNext, handlePrev])

  const detectDevice = () => {
    if (mobile) return 1 as number
    if (smallDevice) return 2 as number
    return 3 as number
  }

  const prevButtonFilter = useColorModeValue(
    "brightness(0) saturate(100%) invert(8%) sepia(15%) saturate(7390%) hue-rotate(213deg) brightness(99%) contrast(105%)",
    "unset",
  )
  const nextButtonFilter = useColorModeValue(
    "brightness(0) saturate(100%) invert(8%) sepia(15%) saturate(7390%) hue-rotate(213deg) brightness(99%) contrast(105%)",
    "unset",
  )

  if (loading) return <Skeleton />

  return (
    <Box py={16} pos="relative" px="1px">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        slidesPerView={detectDevice()}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        spaceBetween={24}
        className="mySwiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <VStack spacing={4}>
              <Avatar src={slide.url} size="md" mb={2} />
              <Box
                rounded={20}
                border="1px solid"
                borderColor="brandDark.bg.500"
                py={8}
                px={4}
                minH={48}
                pos="relative"
                _before={{
                  content: '""',
                  borderX: "6px solid transparent",
                  borderBottom: "10px solid #a1a4b2",
                  pos: "absolute",
                  top: "-10px",
                  left: "50%",
                  transform: "translate(-50%, 0)",
                }}
              >
                {slide.description}
              </Box>
              <Text>{slide.name}</Text>
            </VStack>
          </SwiperSlide>
        ))}
      </Swiper>
      <AbsoluteCenter
        as="i"
        className="icon-chevron-right custom-swiper-button-prev"
        filter={prevButtonFilter}
        display="flex"
        boxSize={7}
        pos="absolute"
        axis="vertical"
        right={!smallDevice && !mobile ? -12 : 0}
        top={!smallDevice && !mobile ? "50%" : "25%"}
        ref={prevButtonRef}
        cursor="pointer"
      />
      <AbsoluteCenter
        as="i"
        className="icon-chevron-right custom-swiper-button-next"
        filter={nextButtonFilter}
        transform="rotate(180deg)"
        display="flex"
        boxSize={7}
        pos="absolute"
        axis="vertical"
        left={!smallDevice && !mobile ? -12 : 0}
        top={!smallDevice && !mobile ? "calc(50% - 16px)" : "calc(25% - 16px)"}
        ref={nextButtonRef}
        cursor="pointer"
      />
    </Box>
  )
}

export default TestiSlider
