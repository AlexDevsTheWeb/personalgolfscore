import { setShowDistances } from "@/features/app/controls.slice";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

const DistancesButton = () => {
  const dispatch = useDispatch<any>();

  const handleDistances = () => {
    dispatch(setShowDistances(true))
  }
  return (
    <Button variant='contained' onClick={handleDistances} sx={{ marginTop: '0px' }}>
      DISTANCES
    </Button>
  )
}

export default DistancesButton
