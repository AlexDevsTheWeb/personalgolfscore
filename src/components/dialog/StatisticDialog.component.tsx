import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Dialog, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import StatisticsNumbers from '../Statistics/StatisticsNumbers.component';

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
  handleClose: any;
  totals: any;
  shots: any;
  roundDate: any;
  roundCourse: string
}

export const StatisticDialog = ({ open, handleClose, totals, shots, roundDate, roundCourse }: IDialogProps) => {

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} component="div">
            Round Statistic
          </Typography>
        </Toolbar>
      </AppBar>
      <StatisticsNumbers
        roundDate={roundDate}
        roundCourse={roundCourse}
        totals={totals}
        shots={shots}
      />
    </Dialog>
  )
}

