import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import BoxGeneralShadow from "../../styles/box/BoxGeneralShadow.styles";
import { IShots } from "../../types/roundData.types";
import RoundsDataShotTable from "../RoundsData/RoundsDataShotTable.component";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IRoundTotalsProps {
  open: boolean;
  handleClose: any;
  totals: any;
  holes: IShots[];
  roundDate?: any;
  roundCourse?: string;
  coursePar?: number;
}

const RoundTotalsDialog = ({ open, holes, totals, handleClose }: IRoundTotalsProps) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <BoxGeneralShadow direction='column' sx={{ width: '100% !important' }}>
        <RoundsDataShotTable
          totals={totals}
          holes={holes}
          onClick={handleClose}
        />
      </BoxGeneralShadow>
    </Dialog>
  )
}

export default RoundTotalsDialog
