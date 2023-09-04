import { useAppSelector } from "../../../store"

const useStockDetails = () => {
  const data = useAppSelector((state) => state.details.data)

  return data
}

export default useStockDetails
