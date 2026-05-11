/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import {
  useGetTicketsQuery,
  useLazyGetTicketQuery,
  usePostMessageMutation,
} from "@/app/redux/services/tickets/ticketsApi"
import {
  getTicketMessage,
  getTicketsListResponse,
  Ticket,
} from "@/app/redux/services/tickets/ticketsApiTypes"
import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  HStack,
  Image,
  ListItem,
  Skeleton,
  Spinner,
  Text,
  UnorderedList,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react"
import { ChakraStylesConfig, Select, SingleValue } from "chakra-react-select"
import { useSession } from "next-auth/react"
import { useEffect, useMemo, useState } from "react"
import TicketLayout from "./TicketLayout"
import MessageFormComponent from "./components/MessageForm"
import { toPersianDigits } from "@/app/utils/constants/toPersianDigits"

interface Option {
  label: string
  value: string
  id?: number
  color?: string
  textColor?: string
}

const TicketPage = () => {
  const [tablet] = useMediaQuery("(max-width: 1024px)")

  const sortOptions: Option[] = [
    { label: "جدیدتر", value: "desc" },
    { label: "قدیمی تر", value: "asc" },
  ]

  const statusOptions: Option[] = [
    { label: "همه", value: "all", id: 0 },
    {
      label: "باز",
      value: "open",
      id: 1,
      color: "ticket.100",
      textColor: "#fff",
    },
    {
      label: "حل شده",
      value: "resolved",
      id: 2,
      color: "ticket.200",
      textColor: useColorModeValue("#fff", "brandDark.2300"),
    },
    {
      label: "بسته شده",
      value: "closed",
      id: 3,
      color: "ticket.300",
      textColor: "brandDark.2300",
    },
    {
      label: "رونوشت شده",
      value: "duplicated",
      id: 4,
      color: "ticket.400",
      textColor: "#fff",
    },
    { label: "مجدد باز شده", value: "reopened", id: 5, color: "ticket.500" },
  ]

  const selectChakraStyles: ChakraStylesConfig<Option, false, never> = {
    control: (provided) => ({
      ...provided,
      p: 2.5,
      width: tablet ? 140 : 200,
      rounded: "lg",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "brandGray.1700",
    }),
    valueContainer: (provided) => ({
      ...provided,
      p: 0,
      height: "auto",
      fontSize: tablet ? 12 : 14,
    }),
    option: (provided) => ({
      ...provided,
      rounded: "lg",
      my: 1,
    }),
    menuList: (provided) => ({
      ...provided,
      px: 2,
      rounded: "lg",
      width: tablet ? 175 : "auto",
    }),
    downChevron: (provided) => ({
      ...provided,
      display: tablet ? "none" : "flex",
    }),
  }

  const session = useSession()
  const [selectedTicketMessages, setSelectedTicketMessages] = useState<
    getTicketMessage[] | null
  >(null)
  const [selectedTicket, setSelectedTicket] = useState<Ticket>()
  const { data: ticketsList, isLoading: ticketsIsLoading } =
    useGetTicketsQuery()
  const [triggerGetTicket, { data: ticketData }] = useLazyGetTicketQuery()
  const [sendMessage, { isLoading: messagesIsLoading }] =
    usePostMessageMutation()
  const [ticketLoading, setTicketLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [sortOrder, setSortOrder] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<number | null>(null)

  const ticketsData: getTicketsListResponse | undefined = useMemo(
    () => ticketsList,
    [ticketsList],
  )

  const handleChange = (option: Option, { selectId }: { selectId: string }) => {
    if (selectId === "sort-select") {
      setSortOrder(option.value)
    } else if (selectId === "status-select") {
      setStatusFilter(option.id!)
    }
  }

  const filteredAndSortedTickets = useMemo(() => {
    if (!ticketsData || !ticketsData.results) {
      return []
    }
    let tickets = [...ticketsData.results]
    if (statusFilter !== null && statusFilter !== 0) {
      tickets = tickets.filter((ticket) => ticket.status === statusFilter)
    }
    if (sortOrder === "asc") {
      tickets.sort(
        (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime(),
      )
    } else if (sortOrder === "desc") {
      tickets.sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
      )
    }

    return tickets
  }, [ticketsData, sortOrder, statusFilter])

  const shamsiDate = (date: string) => {
    const serverTime = date.slice(11, 16)
    const [hours, minutes] = serverTime.split(":").map(Number)

    const totalMinutes = hours * 60 + minutes + 3 * 60 + 30
    const adjustedHours = Math.floor(totalMinutes / 60) % 24
    const adjustedMinutes = totalMinutes % 60

    // const toPersianDigits = (num: string) =>
    //   num.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d, 10)])

    const formattedTime = `${adjustedHours
      .toString()
      .padStart(2, "0")}:${adjustedMinutes.toString().padStart(2, "0")}`

    const result =
      toPersianDigits(formattedTime) +
      " --- " +
      new Date(date).toLocaleDateString("fa-IR")

    return result
  }

  const getStatusData = (statusId: number) => {
    const status = statusOptions.find((option) => option.id === statusId)
    return status
      ? {
          label: status.label,
          color: status.color || "transparent",
          textColor: status.textColor || "auto",
        }
      : { label: "تنظیم نشده", color: "brandDark.1000", textColor: "#fff" }
  }

  useEffect(() => {
    if (ticketData?.messages) {
      setSelectedTicketMessages(ticketData.messages)
    }
  }, [ticketData])

  const handleTicketClick = (ticket: Ticket) => {
    setTicketLoading(true)
    setSelectedTicket(ticket)

    triggerGetTicket(ticket.id)
      .unwrap()
      .then((response) => {
        setSelectedTicketMessages(response.messages)
      })
      .catch((error) => {
        console.error("Failed to fetch ticket details from server", error)
        setSelectedTicketMessages([])
      })
      .finally(() => {
        setTicketLoading(false)
      })
  }

  return (
    <TicketLayout>
      <Card variant="normal">
        <CardBody
          as={VStack}
          textAlign="center"
          direction={tablet ? "column-reverse" : "row"}
          gap={4}
          py={10}
          px={tablet ? 4 : 12}
        >
          <Text as="h4">تیکت ها</Text>

          {!ticketsData && !ticketsIsLoading && (
            <>
              <Image
                mt={8}
                src="/images/dashboard/ticket-empty.svg"
                alt="auth"
                maxW={450}
              />
              <Text>شما هیچ تیکتی ندارید.</Text>
            </>
          )}

          {ticketsIsLoading && <Spinner />}

          {!ticketsIsLoading && ticketsData && (
            <>
              <HStack spacing={6} mb={6} w="full">
                <VStack>
                  <Text textAlign="start" w="full">
                    مرتب سازی
                  </Text>
                  <Select
                    id="sort-select"
                    menuPosition="fixed"
                    placeholder="مشاهده همه"
                    chakraStyles={selectChakraStyles}
                    options={sortOptions}
                    onChange={(option: any) =>
                      handleChange(option, { selectId: "sort-select" })
                    }
                  />
                </VStack>
                <VStack>
                  <Text textAlign="start" w="full">
                    وضعیت تیکت
                  </Text>
                  <Select
                    id="status-select"
                    menuPosition="fixed"
                    placeholder="مشاهده همه"
                    chakraStyles={selectChakraStyles}
                    options={statusOptions}
                    onChange={(option: any) =>
                      handleChange(option, { selectId: "status-select" })
                    }
                  />
                </VStack>
              </HStack>
              <Grid
                gap={6}
                w="full"
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  lg: "repeat(6, 1fr)",
                }}
                alignItems="start"
              >
                <GridItem
                  colSpan={tablet ? 12 : 2}
                  p={tablet ? 4 : 8}
                  rounded="xl"
                  bg={useColorModeValue("brandGray.1300", "brandDark.1600")}
                >
                  <UnorderedList spacing={4} m={0}>
                    {filteredAndSortedTickets.map((ticket) => (
                      <ListItem
                        key={ticket.id}
                        bg={useColorModeValue(
                          "brandGray.bg.1000",
                          "brandDark.bg.200",
                        )}
                        p={4}
                        display="flex"
                        flexDir="column"
                        gap={4}
                        rounded="xl"
                        border="1px solid"
                        borderColor={
                          selectedTicket?.id === ticket.id
                            ? "ticket.400"
                            : useColorModeValue(
                                "brandGray.1100",
                                "brandDark.1300",
                              )
                        }
                        cursor="pointer"
                        transitionDuration="0.2s"
                        _hover={{
                          borderColor: "ticket.400",
                        }}
                        onClick={() => handleTicketClick(ticket)}
                      >
                        <HStack
                          gap={2}
                          justify="space-between"
                          color={useColorModeValue(
                            "brandGray.2000",
                            "brandGray.2100",
                          )}
                          fontSize="small"
                        >
                          <Text as="span">
                            {ticket.ticket_number.slice(1) + "#"}
                          </Text>
                          <Text as="span">{shamsiDate(ticket.created)}</Text>
                        </HStack>
                        <Text as="p" w="full" textAlign="start">
                          {ticket.title}
                        </Text>
                        <HStack justify="end">
                          <Text
                            as="span"
                            bg={getStatusData(ticket.status).color}
                            minW={20}
                            py={1}
                            px={3}
                            rounded="base"
                            color={getStatusData(ticket.status).textColor}
                          >
                            {getStatusData(ticket.status).label}
                          </Text>
                        </HStack>
                      </ListItem>
                    ))}
                  </UnorderedList>
                </GridItem>
                <GridItem
                  colSpan={tablet ? 12 : 4}
                  minH="20rem"
                  p={tablet ? 4 : 8}
                  rounded="xl"
                  bg={useColorModeValue("brandGray.1300", "brandDark.1600")}
                  alignContent="center"
                >
                  {ticketLoading && (
                    <Skeleton w="full" h="20rem" rounded="md" />
                  )}
                  {selectedTicketMessages && !ticketLoading && (
                    <Box w="full" minH="20rem">
                      <UnorderedList spacing={10} m={0}>
                        {selectedTicketMessages.map((msg) => (
                          <ListItem
                            key={msg.id}
                            p={4}
                            rounded="md"
                            px={tablet ? 0 : 4}
                          >
                            <HStack align="center" justify="space-between">
                              <HStack spacing={2} align="center">
                                <Box
                                  as="i"
                                  className={
                                    msg.is_admin_user
                                      ? "icon-support"
                                      : "icon-profile"
                                  }
                                  boxSize={6}
                                  filter={useColorModeValue(
                                    "unset",
                                    "brightness(0) saturate(100%) invert(86%) sepia(4%) saturate(2143%) hue-rotate(187deg) brightness(94%) contrast(90%);",
                                  )}
                                />
                                <Text as="span">
                                  {!msg.is_admin_user &&
                                    (!session.data?.user.name?.includes("null")
                                      ? session.data?.user.name
                                      : "کاربر")}
                                  {msg.is_admin_user && "پشتیبانی"}
                                </Text>
                              </HStack>
                              <Text fontSize="sm" color="gray.500">
                                {shamsiDate(msg.created)}
                              </Text>
                            </HStack>
                            <Text as="p" w="full" mt={4} textAlign="start">
                              {msg.message}
                            </Text>
                            {msg.attachments.map((attachment) => (
                              <Text
                                key={attachment.file}
                                as="a"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={attachment.file}
                                display="block"
                                textAlign="start"
                                my={4}
                              >
                                <Text as="span">فایل: </Text>
                                {attachment.filename}
                              </Text>
                            ))}
                          </ListItem>
                        ))}
                      </UnorderedList>
                      <VStack
                        spacing={3}
                        align="center"
                        justify="center"
                        pt={6}
                      >
                        {selectedTicket?.status === 3 && (
                          <Text
                            as="span"
                            minW={220}
                            bg={useColorModeValue(
                              "ticket.300",
                              "brandDark.1400",
                            )}
                            color={useColorModeValue(
                              "brandDar.2200",
                              "brandGray.1000",
                            )}
                            fontSize="sm"
                            py={3}
                            px={6}
                            rounded="base"
                          >
                            تیکت بسته شده است
                          </Text>
                        )}
                        {!showForm ? (
                          <Button
                            rounded="base"
                            minW={220}
                            onClick={() => setShowForm(!showForm)}
                          >
                            نوشتن پاسخ
                          </Button>
                        ) : (
                          <MessageFormComponent
                            ticket_id={String(selectedTicket?.id)!}
                            cancelMessage={setShowForm}
                          />
                        )}
                      </VStack>
                    </Box>
                  )}
                  {!selectedTicketMessages && !ticketLoading && (
                    <Text>برای نمایش تیکت روی آن کلیک کنید ...</Text>
                  )}
                </GridItem>
              </Grid>
            </>
          )}
        </CardBody>
      </Card>
    </TicketLayout>
  )
}

export default TicketPage
