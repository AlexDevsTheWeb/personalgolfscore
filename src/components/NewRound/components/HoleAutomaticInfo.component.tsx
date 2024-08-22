import { Box, Button, Stack } from "@mui/material";
import CompositeTypography from "../../../styles/typography/CompositeTypography.styles";
import { IShots } from "../../../types/roundData.types";

interface IProps {
  holeFinished: number;
  tmpHole: IShots;
  shots: IShots[];
  roundHoles: number
  saveHole: any
}

const HoleAutomaticInfo = (props: IProps) => {

  const { holeFinished, tmpHole, shots, roundHoles, saveHole } = props;
  return (
    <Stack direction='column' justifyContent='space-between'>
      <Stack>
        <CompositeTypography string='Hole number' value={holeFinished === 0 ? 1 : holeFinished} />
        <CompositeTypography string='Hole points' value={tmpHole.points} />
        <CompositeTypography string='Green in regulation' value={!!tmpHole.gir ? 'YES' : 'NO'} />
        <CompositeTypography string='Green in regulation (bogey)' value={!!tmpHole.girBogey ? 'YES' : 'NO'} />
        <CompositeTypography string='Up&Down' value={tmpHole.upDown === 'x' ? 'YES' : tmpHole.upDown === 'n' ? 'NO' : '-'} />
      </Stack>
      {
        shots.length <= roundHoles - 1 ?
          <Box>
            <Button variant='contained' onClick={saveHole}>
              Save
            </Button>
          </Box> :
          null
      }
    </Stack>
  )
}

export default HoleAutomaticInfo
