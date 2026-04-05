import Rounds from "@/components/Rounds/Rounds.component";
import { useAppStore } from "@/store/zustand";

const AllRounds = () => {
  const roundsList = useAppStore((state) => state.roundsList);

  return (
    <Rounds rounds={roundsList} />
  )
}

export default AllRounds
