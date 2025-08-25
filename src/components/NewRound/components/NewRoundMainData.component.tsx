import RoundsDataHeader from "@/components/RoundsData/components/roundData/RoundsDataHeader.component";
import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import { RootState } from "@/store/store";
import { IRoundDetails } from "@/types/roundDetails.types";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const NewRoundMainData = () => {

  const roundData = useSelector((state: RootState) => state.newRound.newRoundMain.round);
  const { roundCourse, roundDate, roundHoles, roundPar, roundPlayingHCP, roundTee } = roundData;

  const newRoundData: IRoundDetails = {
    id: '0',
    roundCourse: roundCourse || 'N/A',
    roundDate: roundDate ? dayjs(roundDate).valueOf() : new Date().valueOf(),
    roundHoles: roundHoles.toString(),
    roundPar: roundPar.toString(),
    roundPlayingHCP: roundPlayingHCP.toString(),
    roundTee: roundTee || 'N/A',
    totals: {} as IRoundDetails['totals'],
    holes: [] as IRoundDetails['holes'],
    createdAt: new Date().valueOf(),
  }

  return (
    <Box sx={{ width: useDeviceDetection().isMobileDevice ? '100%' : '30%' }}>
      <RoundsDataHeader round={newRoundData} />
    </Box>
  )
}

export default NewRoundMainData
