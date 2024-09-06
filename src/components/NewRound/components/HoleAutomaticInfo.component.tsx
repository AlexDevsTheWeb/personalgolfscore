import { Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import CompositeTypography from "../../../styles/typography/CompositeTypography.styles";
import { IShots } from "../../../types/roundData.types";

interface IProps {
  holeFinished: number;
  tmpHole: IShots;
  shots: IShots[];
  roundHoles: number;
  saveHole: any;
}

const HoleAutomaticInfo = (props: IProps) => {

  const { holeFinished, tmpHole, shots, roundHoles, saveHole } = props;

  const [vsPar, setVsPar] = useState<string>('');

  useEffect(() => {
    const diff = tmpHole.strokes - tmpHole.par;
    if (diff === 0) {
      setVsPar('PAR - 0')
    } else {
      if (diff > 0) {
        setVsPar(`+${diff}`);
      }
      else {
        setVsPar(`${diff}`);
      }
    }
  }, [tmpHole])

  return (
    <Stack direction='column' justifyContent='space-between' sx={{ width: '100%' }}>
      <CompositeTypography string='Hole number' value={holeFinished === 0 ? 1 : holeFinished} />
      <CompositeTypography string='Strokes' value={tmpHole.strokes} />
      <CompositeTypography string='Vs. Par' value={vsPar} />
      <CompositeTypography string='Hole points' value={tmpHole.points} />
      <CompositeTypography string='Green in regulation' value={!!tmpHole.gir ? 'YES' : 'NO'} />
      <CompositeTypography string='Green in regulation (bogey)' value={!!tmpHole.girBogey ? 'YES' : 'NO'} />
      <CompositeTypography string='Up&Down' value={tmpHole.upDown === 'x' ? 'YES' : tmpHole.upDown === 'n' ? 'NO' : '-'} />
      {
        shots.length <= roundHoles - 1 ?
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
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
