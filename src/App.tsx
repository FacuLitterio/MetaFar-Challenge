import { Box } from "@mui/material"
import DetailsStock from "./Features/DetailsStock/components/DetailsStock"
import Listing from "./Features/Listing/components/Listing"

const App = () => {
  return (
    <Box sx={{ height: "100%", bgcolor: "grey.200", p: 5 }}>
      <Listing />
      <DetailsStock />
    </Box>
  )
}

export default App
