import { getAllRoundsTotals } from "@/features/rounds/roundsTotals.slice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatisticsMain from "../components/Statistics/StatisticsMain.component";

const Statistics = () => {
  const dispatch = useDispatch<any>();
  const { roundsTotals } = useSelector((store: RootState) => store.roundsNumber.roundsTotals.roundsTotals);
  useEffect(() => {
    if (roundsTotals.length < 1) {
      dispatch(getAllRoundsTotals(""))
    }
  }, [roundsTotals, dispatch]);

  return (
    <StatisticsMain />
  )
}

export default Statistics
