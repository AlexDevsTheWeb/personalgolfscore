import Rounds from "@/components/Rounds/Rounds.component";
import { useRoundsStore } from "@/store/zustand";

const AllRounds = () => {
  const rounds = useRoundsStore((state) => state.rounds);

  return (
    <Rounds rounds={rounds} />
  )
}

export default AllRounds
