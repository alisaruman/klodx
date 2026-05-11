export interface ServerPackageMeResponse {
  success: boolean
  server_packages: ServerPackage[]
}

export interface ServerPackage {
  display_name: string
  name: string
  description: string
  type: number
  is_active: boolean
  price_override: PriceOverride[]
  configs: Configs
}

export interface PriceOverride {
  location: string
  price_hourly: string
  price_yearly: string
  price_monthly: string
  price_six_months: string
  price_three_months: string
}

export interface Configs {
  memory: number
  disk: number
  included_traffic: number
  architecture: string
  cpu_type: string
}

export interface LocationResponse {
  success: boolean
  locations: {
    locations: Location[]
    meta: Meta
  }
}

export interface Location {
  city: string
  country: string
  description: string
  id: number
  latitude: number
  longitude: number
  name: string
  network_zone: string
}

export interface ImageResponse {
  success: boolean
  images: {
    images: Image[]
    meta: Meta
  }
}

export interface Image {
  id: number
  type: string
  status: string
  name: string
  description: string
  image_size: number | null
  disk_size: number
  created: string
  created_from: string | null
  bound_to: string | null
  os_flavor: string
  os_version: string
  rapid_deploy: boolean
  protection: {
    delete: boolean
  }
  deprecated: string | null
  labels: Record<string, string>
  deleted: string | null
  architecture: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  last_page: number
  next_page: number | null
  page: number
  per_page: number
  previous_page: number | null
  total_entries: number
}

export interface ServerPackageMeResponse {
  success: boolean
  data: {
    server_packages: ServerPackage[]
  }
}

export interface ServerPackage {
  display_name: string
  name: string
  description: string
  type: number
  is_active: boolean
  price_override: PriceOverride[]
  configs: Configs
}

export interface PriceOverride {
  location: string
  price_hourly: string
  price_yearly: string
  price_monthly: string
  price_six_months: string
  price_three_months: string
}

export interface Configs {
  memory: number
  disk: number
  included_traffic: number
  architecture: string
  cpu_type: string
}

export interface VoucherResponse {
  code: string
  user: number
  status: number
  tax_rate: string
  description: string
  paid_date: string
  currency: string
  discount: string
  total: string
  discounted_total: string
  voucher_data: string
}

export interface InvoiceItem {
  invoice: number
  service_type: number
  price: string
  description: string
  requested_data: {
    ipv4: boolean
    ipv6: boolean
    name: string
    ssh_key: number
    location: string
    os_image: string
    price_type: number
    server_type: string
  }
}

export interface InvoiceResponse {
  code: string
  user: number
  status: number
  tax_rate: string
  description: string
  paid_date: string | null
  currency: string
  expiration_time: string
  items: InvoiceItem[]
  discount: string
  total: string
}

export interface getServersListResponse {
  id: number
  name: string
}
