import { Chip } from "@mui/material"
import { GridCellParams } from "@mui/x-data-grid"
import React, { useCallback } from "react"
import { useAppDispatch } from "../../../store"
import { setSelected } from "../../DetailsStock/slices/DetailsSlice"
import { Stock } from "../slices/ListingSlice"

const SymbolCell: React.FC<GridCellParams> = ({ value, row }) => {
  const dispatch = useAppDispatch()
  const symbol = value as string
  const stock = row as Stock

  const handleClick = useCallback(() => {
    dispatch(setSelected(stock))
  }, [dispatch, stock])

  return (
    <Chip
      label={symbol}
      color="primary"
      sx={{ cursor: "pointer" }}
      onClick={handleClick}
    />
  )
}

export default SymbolCell
