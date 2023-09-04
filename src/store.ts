import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import detailsStockReducer from "./Features/DetailsStock/slices/DetailsSlice"
import stocksListingReducer from "./Features/Listing/slices/ListingSlice"

export const store = configureStore({
  reducer: {
    listing: stocksListingReducer,
    details: detailsStockReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
