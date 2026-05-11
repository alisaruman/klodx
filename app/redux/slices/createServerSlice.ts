import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ServerPackage {
  name: string
  cpu: string
  memory: string
  disk: string
  traffic: string
  price: string
}

interface CreateServerState {
  name: string
  location: string | null
  server_type: string | null
  os_image: string | null
  price_type: number | null
  ipv4: boolean
  ipv6: boolean
  ssh_key: string | null
  price_override: any | null
  selectedPackageDetails: ServerPackage | null
  selectedPackage: string | null
}

const initialState: CreateServerState = {
  name: "",
  location: null,
  server_type: null,
  os_image: null,
  price_type: null,
  ipv4: true,
  ipv6: true,
  ssh_key: null,
  price_override: null,
  selectedPackageDetails: null,
  selectedPackage: null,
}

const createServerSlice = createSlice({
  name: "createServer",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload
    },
    setServerType: (state, action: PayloadAction<string>) => {
      state.server_type = action.payload
    },
    setOsImage: (state, action: PayloadAction<string>) => {
      state.os_image = action.payload
    },
    setPriceType: (state, action: PayloadAction<number>) => {
      state.price_type = action.payload
    },
    setIpv4: (state, action: PayloadAction<boolean>) => {
      state.ipv4 = action.payload
    },
    setIpv6: (state, action: PayloadAction<boolean>) => {
      state.ipv6 = action.payload
    },
    setSshKey: (state, action: PayloadAction<string>) => {
      state.ssh_key = action.payload
    },
    setSelectedPackage: (state, action: PayloadAction<string>) => {
      state.server_type = action.payload
    },
    setPriceOverride: (state, action: PayloadAction<any>) => {
      state.price_override = action.payload
    },
    setSelectedPackageDetails: (
      state,
      action: PayloadAction<ServerPackage>,
    ) => {
      state.selectedPackageDetails = action.payload
    },
    resetCreateServer: () => initialState,
  },
})

export const {
  setName,
  setLocation,
  setServerType,
  setOsImage,
  setPriceType,
  setIpv4,
  setIpv6,
  setSshKey,
  setSelectedPackage,
  setPriceOverride,
  setSelectedPackageDetails,
  resetCreateServer,
} = createServerSlice.actions

export default createServerSlice.reducer
