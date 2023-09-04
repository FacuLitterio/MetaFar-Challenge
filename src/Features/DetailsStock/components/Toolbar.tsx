import GraphicEqIcon from "@mui/icons-material/GraphicEq"
import {
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers"
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers"
import { Dayjs } from "dayjs"
import React, { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../store"
import useInterval from "../hooks/useInterval"
import useMode from "../hooks/useMode"
import { Mode, getStockPrice, setFrom, setTo } from "../slices/DetailsSlice"

const Toolbar: React.FC<{}> = () => {
  const dispatch = useAppDispatch()

  const { from, to } = useAppSelector((state) => state.details)

  const { mode, onChangeMode } = useMode()
  const { interval, onChangeInterval } = useInterval()

  const handleClickGraph = useCallback(() => {
    dispatch(getStockPrice())
  }, [dispatch])

  const handleChangeFrom = useCallback(
    (newValue: any) => {
      dispatch(setFrom(newValue as Dayjs))
    },
    [dispatch],
  )

  const handleChangeTo = useCallback(
    (newValue: any) => {
      dispatch(setTo(newValue as Dayjs))
    },
    [dispatch],
  )

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <RadioGroup
        value={mode}
        onChange={(event: any, value: string) => onChangeMode(value as Mode)}
      >
        <Grid container direction="column">
          <Grid item>
            <FormControlLabel
              value="realtime"
              control={<Radio />}
              label="Realtime"
            />
          </Grid>
          <Grid container item spacing={2}>
            <Grid item>
              <FormControlLabel
                value="historic"
                control={<Radio />}
                label="Historic"
              />
            </Grid>
            {mode === "historic" && (
              <>
                <Grid item>
                  <DateTimePicker
                    label="From"
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                    slotProps={{ textField: { size: "small" } }}
                    value={from}
                    onChange={handleChangeFrom}
                  />
                </Grid>
                <Grid item>
                  <DateTimePicker
                    label="To"
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                    slotProps={{ textField: { size: "small" } }}
                    value={to}
                    onChange={handleChangeTo}
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Grid item mt={2}>
            <TextField
              select
              label="Interval"
              size="small"
              sx={{ width: 200 }}
              value={interval}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChangeInterval(+event.target.value)
              }
            >
              <MenuItem value={1}>1 Min</MenuItem>
              <MenuItem value={5}>5 Min</MenuItem>
              <MenuItem value={15}>15 Min</MenuItem>
            </TextField>
          </Grid>
          <Grid container item justifyContent="flex-end" mt={1}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disableElevation
                startIcon={<GraphicEqIcon />}
                onClick={handleClickGraph}
              >
                Graph
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </RadioGroup>
    </Paper>
  )
}

export default Toolbar
