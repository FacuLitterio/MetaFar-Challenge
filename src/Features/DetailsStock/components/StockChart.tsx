import {
  ChartSeries,
  ChartSeriesItem,
  StockChart as KendoStockChart,
} from "@progress/kendo-react-charts"
import "hammerjs"
import useStockDetails from "../hooks/useStockDetails"

const StockChart = () => {
  const details = useStockDetails()

  return (
    <KendoStockChart style={{ height: 330 }}>
      <ChartSeries>
        <ChartSeriesItem
          data={structuredClone(details)}
          type="candlestick"
          openField="open"
          closeField="close"
          lowField="low"
          highField="high"
          categoryField="datetime"
        />
      </ChartSeries>
    </KendoStockChart>
  )
}

export default StockChart
