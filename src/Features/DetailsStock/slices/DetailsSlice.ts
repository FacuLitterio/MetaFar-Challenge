import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Dayjs } from "dayjs"
import { RootState } from "../../../store"
import { Stock } from "../../Listing/slices/ListingSlice"

export type Mode = "realtime" | "historic"

type CandlestickDataPoint = {
  datetime: Date
  open: number
  high: number
  low: number
  close: number
  volume: number
}

type InitialState = {
  status: "idle" | "pending" | "success" | "error"
  selected?: Stock
  mode: Mode
  interval: number
  data: CandlestickDataPoint[]
  from?: Dayjs
  to?: Dayjs
}

const initialState: InitialState = {
  status: "idle",
  mode: "realtime",
  interval: 5,
  data: [],
}

export const getStockPrice = createAsyncThunk(
  "GetStockPrice",
  async (_, { getState }) => {
    const { selected, interval, from, to } = (getState() as RootState).details

    if (!selected) return

    const queryParams = new URLSearchParams()

    queryParams.append("symbol", selected.symbol)
    queryParams.append("interval", `${interval}min`)
    queryParams.append("apikey", import.meta.env.VITE_TWELVE_DATA_APIKEY!)
    from && queryParams.append("start_date", from.format("YYYY-MM-DDTHH:mm:ss"))
    to && queryParams.append("end_date", to.format("YYYY-MM-DDTHH:mm:ss"))

    const URL: string = `${import.meta.env
      .VITE_ROOT_API_URL!}/time_series?${queryParams.toString()}`

    const response = await fetch(URL)
    const data = await response.json()

    return data
  },
)

const DetailsStockSlice = createSlice({
  name: "DetailsStock",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<Stock | undefined>): void => {
      if (!action.payload) state.data = []
      state.selected = action.payload
    },
    setMode: (state, action: PayloadAction<Mode>): void => {
      state.mode = action.payload
      state.data = []
      state.from = undefined
      state.to = undefined
    },
    setInterval: (state, action: PayloadAction<number>): void => {
      state.interval = action.payload
      state.data = []
    },
    setFrom: (state, action: PayloadAction<Dayjs>) => {
      state.from = action.payload
      state.data = []
    },
    setTo: (state, action: PayloadAction<Dayjs>) => {
      state.to = action.payload
      state.data = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStockPrice.pending, (state) => {
        state.status = "pending"
      })
      .addCase(
        getStockPrice.fulfilled,
        (
          state,
          action: PayloadAction<{
            meta: Stock
            values: CandlestickDataPoint[]
          }>,
        ) => {
          const { values } = action.payload
          state.data = values.map((x: CandlestickDataPoint) => ({
            ...x,
            low: +x.low,
            high: +x.high,
            open: +x.open,
            close: +x.close,
            volume: +x.volume,
            datetime: new Date(x.datetime),
          }))
          state.status = "success"
        },
      )
  },
})

export const { setSelected, setMode, setInterval, setFrom, setTo } =
  DetailsStockSlice.actions

export default DetailsStockSlice.reducer
