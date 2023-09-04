import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import "@progress/kendo-theme-material/dist/all.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import "./index.css"
import { store } from "./store"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Provider store={store}>
        <App />
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>,
)
