import { RootState } from "@/store/store";
import { Dialog } from "@/styles/dialog/Dialog.styles";
import { hcpList18, hcpList9, parList } from "@/utils/constant.utils";
import { Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Select from "../NewRound/components/Select.component";

interface HoleDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (par: number, distance: number, hcp: number, strokes: number) => void;
}

const HoleDetailsDialog: React.FC<HoleDetailsDialogProps> = ({ open, onClose, onSubmit }) => {
  const tmpHole = useSelector((store: RootState) => store.newRound.holeTmp);
  const {
    round: { roundHoles },
  } = useSelector((store: RootState) => store.newRound.newRoundMain);
  const { holes } = useSelector((store: RootState) => store.newRound.newRoundHoles);

  const [par, setPar] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [hcp, setHcp] = useState<number>(0);
  const [strokes, setStrokes] = useState<number>(0);

  const usedHCPs = holes.map((hole: any) => hole.hcp);
  const hcpList = Number(roundHoles) === 18 ? hcpList18 : hcpList9;
  const newHCPList = hcpList.filter(hcp => !usedHCPs.includes(Number(hcp)));

  const handleChange = (e: any) => {
    switch (e.target.name) {
      case 'par':
        setPar(e.target.value);
        break;
      case 'distance':
        setDistance(e.target.value);
        break;
      case 'strokes':
        setStrokes(e.target.value);
        break;
      case 'hcp':
        setHcp(e.target.value);
        break;
    }

  }

  const handleSubmit = () => {
    onSubmit(par, distance, hcp, strokes);
    onClose();
  }

  return (
    <Dialog
      open={open}
      title='Hole info'
      onClose={onClose}
      onClick={handleSubmit}
      onSubmit={handleSubmit}
    >
      <Typography>
        Please insert hole par, hole meters, hole HCP and strokes made.
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }} columns={{ xs: 4, sm: 4, lg: 12 }}>
        <Grid size={{ xs: 2, sm: 4, lg: 3 }}>
          <Select name={'par'} list={parList} onChange={handleChange} value={tmpHole.par ? tmpHole.par.toString() : par.toString()} label="Hole Par" />
        </Grid>
        <Grid size={{ xs: 2, sm: 4, lg: 3 }}>
          <TextField name="distance" label="Length" type="number" onChange={handleChange} value={distance} variant="filled" sx={{ width: '100%' }} />
        </Grid>
        <Grid size={{ xs: 2, sm: 4, lg: 3 }}>
          <Select name='hcp' list={newHCPList} onChange={handleChange} value={tmpHole.hcp ? tmpHole.hcp.toString() : hcp.toString()} label="Hole HCP" />
        </Grid>
        <Grid size={{ xs: 2, sm: 4, lg: 3 }}>
          <TextField name="strokes" label="Score" type="number" onChange={handleChange} value={strokes.toString()} variant="filled" sx={{ width: '100%' }} />
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default HoleDetailsDialog
