import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Dialog, IconButton, Slide, Table, TableBody, Toolbar, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import BoxBetween from '../../styles/box/BoxBetween.styles';
import { IShots } from "../../types/roundData.types";
import ShotsTableBody from '../RoundsData/components/shotsTable/ShotsTableBody.component';
import ShotsTableHeader from '../RoundsData/components/shotsTable/ShotsTableHeader.component';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IDialogProps {
  open: boolean;
  handleCloseHolebyHole: any;
  totals: any;
  shots: any;
  roundDate: any;
  roundCourse: string;
  coursePar: number;
}

const HolebyholeDialog = ({ open, handleCloseHolebyHole, totals, shots, roundDate, roundCourse, coursePar }: IDialogProps) => {
  return (

    <Dialog
      fullScreen
      open={open}
      onClose={handleCloseHolebyHole}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseHolebyHole}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} component="div">
            Round Statistic
          </Typography>
        </Toolbar>
      </AppBar>
      <BoxBetween vertical={true}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <ShotsTableHeader firstLabel='#' singleHole={true} />
          <TableBody>
            {shots.map((shot: IShots, index: number) => {
              return (<ShotsTableBody shot={shot} key={index} />)
            })}
          </TableBody>
        </Table>
      </BoxBetween>
    </Dialog>



  )
}

export default HolebyholeDialog
