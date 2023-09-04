import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../store"
import { setInterval } from "../slices/DetailsSlice"

const useInterval = () => {
  const dispatch = useAppDispatch()
  const interval = useAppSelector((state) => state.details.interval)

  const onChangeInterval = useCallback(
    (interval: number) => {
      dispatch(setInterval(interval))
    },
    [dispatch],
  )

  return { interval, onChangeInterval }
}

export default useInterval
