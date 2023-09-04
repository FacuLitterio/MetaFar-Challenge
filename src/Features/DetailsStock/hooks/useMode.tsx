import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../store"
import { Mode, setMode } from "../slices/DetailsSlice"

const useMode = () => {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.details.mode)

  const onChangeMode = useCallback(
    (mode: Mode) => {
      dispatch(setMode(mode))
    },
    [dispatch],
  )

  return { mode, onChangeMode }
}

export default useMode
