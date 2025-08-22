import Rounds from "@/components/Rounds/Rounds.component";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const AllRounds = () => {
  const { rounds } = useSelector((store: RootState) => store.rounds);

  return (
    <Rounds rounds={rounds} />
  )
}

export default AllRounds
