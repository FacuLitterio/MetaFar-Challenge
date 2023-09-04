import { Paper } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import useStocks from "../hooks/useStocks"
import SymbolCell from "./SymbolCell"

const GRID_COLUMNS: GridColDef[] = [
  {
    field: "symbol",
    headerName: "Symbol",
    flex: 0.8,
    renderCell: SymbolCell,
    align: "center",
  },
  {
    field: "name",
    headerName: "Name",
    flex: 2,
  },
  {
    field: "currency",
    headerName: "Currency",
    flex: 0.5,
  },
  {
    field: "exchange",
    headerName: "Exchange",
    flex: 0.5,
  },
  {
    field: "mic_code",
    headerName: "Mic Code",
    flex: 0.5,
  },
  {
    field: "country",
    headerName: "Country",
    flex: 0.5,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 0.5,
  },
]

const Listing: React.FC<{}> = () => {
  const { status, data: stocks } = useStocks()

  return (
    <Paper variant="outlined" sx={{ height: "100%" }}>
      <DataGrid
        columns={GRID_COLUMNS}
        rows={stocks}
        getRowId={(row) => `${row.symbol}-${row.currency}-${row.exchange}`}
        disableRowSelectionOnClick
        checkboxSelection
        loading={status === "pending"}
        initialState={{
          filter: {
            filterModel: {
              items: [{ field: "symbol", operator: "contains", value: "TSLA" }],
            },
          },
        }}
      />
    </Paper>
  )
}

export default Listing
