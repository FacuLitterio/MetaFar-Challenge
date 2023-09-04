import CloseIcon from "@mui/icons-material/Close"
import {
  Box,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"
import React, { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../store"
import { setSelected } from "../slices/DetailsSlice"
import StockChart from "./StockChart"
import Toolbar from "./Toolbar"

const DetailsStock: React.FC<{}> = () => {
  const dispatch = useAppDispatch()
  const selectedStock = useAppSelector((state) => state.details.selected)
  const { status, data } = useAppSelector((state) => state.details)

  const handleClose = useCallback(() => {
    dispatch(setSelected(undefined))
  }, [dispatch])

  return (
    <Modal open={!!selectedStock} onClose={handleClose} sx={{ zIndex: 99 }}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          height: "80%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
        }}
      >
        <Stack spacing={1} height="100%">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" fontWeight={600}>
              {selectedStock?.symbol} - {selectedStock?.name} -{" "}
              {selectedStock?.currency}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
          <Toolbar />
          {status === "success" && data.length > 0 && <StockChart />}
          {status === "pending" && (
            <Box
              sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Stack>
      </Box>
    </Modal>
  )
}

export default DetailsStock
