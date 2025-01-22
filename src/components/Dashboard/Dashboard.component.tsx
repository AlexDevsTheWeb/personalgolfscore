import { RootState } from "@/store/store"
import BoxBetween from "@/styles/box/BoxBetween.styles"
import _ from "lodash"
import { useSelector } from "react-redux"
import Spinner from "../common/spinner/Spinner.component"
import DashboardContainer from "./components/DashboardContainer.component"
import EmptyRounds from "./components/EmptyRounds/EmptyRounds.component"
import Player from "./components/Player/Player.component"

const Dashboard = () => {
  const { rounds } = useSelector((store: RootState) => store.rounds);
  const { isLoading } = useSelector((store: RootState) => store.controls);

  if (!!isLoading) {
    return <Spinner />
  }

  if (_.isEmpty(rounds) || _.isUndefined(rounds) || _.isNull(rounds)) {
    return <EmptyRounds />
  }

  return (
    <BoxBetween>
      <Player />
      {
        rounds.length === 0
          ? <EmptyRounds />
          : <DashboardContainer />
      }
    </BoxBetween>
  )
}

export default Dashboard
