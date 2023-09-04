import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../store"
import { getAllStocks } from "../slices/ListingSlice"

const useStocks = () => {
  const dispatch = useAppDispatch()
  const { status, data } = useAppSelector((state) => state.listing)

  useEffect(() => {
    dispatch(getAllStocks())
  }, [dispatch])

  return { status, data }
}

export default useStocks
