export interface postTicketRequest {
  title: string
  priority: number
  type: number
  cloud_server: number
  message: string
  attachments: {
    file: string
  }[]
}

export interface postTicketMessageRequest {
  ticket_id: string
  message: string
  attachments: {
    file: string
  }[]
}

export interface Ticket {
  id: number
  ticket_number: string
  created: string
  title: string
  status: number
  priority: number
}

export interface getTicketsListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Ticket[]
}

export interface getTicketMessage {
  id: number
  created: string
  message: string
  attachments: {
    file: string
    filename: string
  }[]
  is_admin_user: boolean
}

export interface getTicketInfo {
  id: number
  ticket_number: string
  created: string
  type: number
  cloud_server: {
    id: number
    name: string
    server_created_time: string
    location: string
    cloud_server_package: string
    os_image: string
    server_id: number
    rental_type: number
    server_status: number
    expiration_date: string
  }
  title: string
  status: number
  priority: number
  messages: getTicketMessage[]
}
