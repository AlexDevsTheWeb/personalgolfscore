import { Button } from "@mui/material";
import { useAppStore } from "@/store/zustand";

const DistancesButton = () => {
  const setShowDistances = useAppStore((state) => state.setShowDistances);

  const handleDistances = () => {
    setShowDistances(true);
  };
  return (
    <Button variant='contained' onClick={handleDistances}>
      DISTANCES
    </Button>
  );
};

export default DistancesButton;
