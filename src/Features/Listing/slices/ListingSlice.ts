import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../../store"

export type Stock = {
  symbol: string
  name: string
  currency: string
  exchange: string
  mic_code: string
  country: string
  type: string
}

type InitialState = {
  status: "idle" | "pending" | "success" | "error"
  data: Stock[]
}

const initialState: InitialState = {
  status: "idle",
  data: [],
}

export const getAllStocks = createAsyncThunk(
  "GetAllStocks",
  async (_, { getState }) => {
    const URL: string = `${import.meta.env.VITE_ROOT_API_URL}/stocks`!
    const response = await fetch(URL)
    const data = await response.json()

    return data
  },
  {
    condition: (_, { getState }) => {
      const { status } = (getState() as RootState).listing
      return status === "idle"
    },
  },
)

const ListingSlice = createSlice({
  name: "StocksListing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStocks.pending, (state) => {
        state.status = "pending"
      })
      .addCase(
        getAllStocks.fulfilled,
        (state, action: PayloadAction<{ data: Stock[] }>) => {
          state.status = "success"
          state.data = action.payload.data
        },
      )
      .addCase(getAllStocks.rejected, (state) => {
        state.status = "error"
        state.data = []
      })
  },
})

export default ListingSlice.reducer
