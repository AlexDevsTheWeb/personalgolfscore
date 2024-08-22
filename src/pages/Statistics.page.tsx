import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatisticsMain from "../components/Statistics/StatisticsMain.component";
import { getAllRoundsTotals } from "../features/rounds/roundsTotals.slice";
import { RootState } from "../store/store";

const Statistics = () => {
  const dispatch = useDispatch<any>();
  const { totals } = useSelector((store: RootState) => store.roundsNumber.roundsTotals);

  useEffect(() => {
    if (totals.length === 0) {
      dispatch(getAllRoundsTotals(""))
    }
  }, [totals, dispatch]);

  return (
    <StatisticsMain />
  )
}

export default Statistics
