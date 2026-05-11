import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "../base"
import {
  getTicketInfo,
  getTicketsListResponse,
  postTicketMessageRequest,
  postTicketRequest,
} from "./ticketsApiTypes"

export const ticketsApi = createApi({
  reducerPath: "ticketsApi",
  baseQuery,
  tagTypes: ["Ticket"],
  endpoints: (builder) => ({
    postTicket: builder.mutation<void, postTicketRequest>({
      query: (body) => ({
        url: "/ticket/",
        method: "POST",
        body,
      }),
    }),

    postMessage: builder.mutation<void, postTicketMessageRequest>({
      query: ({ ticket_id, message, attachments }) => ({
        url: `/ticket/${ticket_id}/`,
        method: "POST",
        body: {
          message,
          ...(attachments && { attachments }),
        },
      }),
      invalidatesTags: (result, error, { ticket_id }) => [
        { type: "Ticket", id: ticket_id },
      ],
    }),

    getTickets: builder.query<getTicketsListResponse, void>({
      query: () => ({
        url: "/ticket/",
      }),
    }),

    getTicket: builder.query<getTicketInfo, number>({
      query: (ticketId) => ({
        url: `/ticket/${ticketId}`,
      }),
      providesTags: (result, error, ticketId) => [
        { type: "Ticket", id: ticketId },
      ],
    }),
  }),
})

export const {
  usePostTicketMutation,
  usePostMessageMutation,
  useGetTicketsQuery,
  useLazyGetTicketQuery,
} = ticketsApi
