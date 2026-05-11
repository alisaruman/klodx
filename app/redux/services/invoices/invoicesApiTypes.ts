export interface postChargeWalletRequest {
  amount: string
  voucher_code?: string
}

export interface postChargeWalletResponse {
  code: string
  user: number
  status: number
  tax_rate: string
  description: string
  paid_date: string | null
  currency: string
  expiration_time: string
  items: [
    {
      invoice: number
      service_type: number
      price: string
      description: string
      requested_data: string | null
    },
  ]
}

export interface postVoucherCheckRequest {
  invoice_code: string
  voucher_code: string
}

export interface postVoucherCheckResponse {
  code: string
  user: number
  status: number
  tax_rate: string
  description: string
  paid_date: string | null
  currency: string
  discount: number
  total: string
  discounted_total: number
  voucher_data: {
    percentage: number
    amount: number
    maximum_voucher_amount: number
  }
}

export interface postGetPayUrlRequest {
  invoice_id: string
  voucher_code?: string
}

export interface postGetPayUrlResponse {
  pay_url: string
}
