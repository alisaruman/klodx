import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, useStore } from "react-redux"
import { authApi } from "./services/auth/authApi"
import { serverPackageApi } from "./services/server-packages/serverPackageApi"
import createServerReducer from "./slices/createServerSlice"
import { ticketsApi } from "./services/tickets/ticketsApi"
import { paymentApi } from "./services/payment/paymentApi"
import { invoicesApi } from "./services/invoices/invoicesApi"

export const makeStore = () =>
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [serverPackageApi.reducerPath]: serverPackageApi.reducer,
      [ticketsApi.reducerPath]: ticketsApi.reducer,
      [paymentApi.reducerPath]: paymentApi.reducer,
      [invoicesApi.reducerPath]: invoicesApi.reducer,
      createServer: createServerReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        serverPackageApi.middleware,
        ticketsApi.middleware,
        paymentApi.middleware,
        invoicesApi.middleware,
      ),
    devTools: process.env.NODE_ENV !== "production",
  })

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"]
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
