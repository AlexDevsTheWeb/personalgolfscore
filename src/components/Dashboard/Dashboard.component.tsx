import useDeviceDetection from "@/hooks/useDeviceDetection.hook"
import { RootState } from "@/store/store"
import BoxBetween from "@/styles/box/BoxBetween.styles"
import { useSelector } from "react-redux"
import EmptyRounds from "../Rounds/EmptyRounds/EmptyRounds.component"
import DashboardContainer from "./components/DashboardContainer.component"
import PlayerDesktop from "./components/PlayerDesktop.component"
import PlayerMobile from "./components/PlayerMobile.component"

const Dashboard = () => {
  const { player } = useSelector((store: RootState) => store.player);
  const { rounds } = useSelector((store: RootState) => store.rounds);

  return (
    <BoxBetween>
      {
        !useDeviceDetection().isMobile ?
          <PlayerDesktop player={player} />
          :
          <PlayerMobile player={player} />
      }
      {rounds.length === 0
        ? <EmptyRounds />
        : <DashboardContainer />
      }
    </BoxBetween>
  )
}

export default Dashboard
