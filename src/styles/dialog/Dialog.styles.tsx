import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import styled from '@emotion/styled';
import { Button, DialogActions as DialogActionsMui, DialogContent, Dialog as DialogMui, DialogProps as DialogPropsMui, DialogTitle as DialogTitleMui } from '@mui/material';

interface IDialogProps extends DialogPropsMui {
  open: boolean;
  title: string
  onClose: () => void;
}

const StyledDialog = styled(DialogMui)(({ theme }) => ({}));
const StyledDialogTitle = styled(DialogTitleMui)(({ theme }) => ({
  padding: '10px 20px',
  height: '60px'
}));
const StyledDialogActions = styled(DialogActionsMui)(({ theme }) => ({
  margin: '0px 20px 20px 20px'
}));

export const Dialog: React.FC<IDialogProps> = ({ children, open, onClose, title }) => {
  return (
    <StyledDialog
      open={open}
      fullWidth
      maxWidth="md"
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            border: '2px solid ##253352'
          }
        }
      }}
    >
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <StyledDialogActions
        sx={{ flexDirection: useDeviceDetection().isMobile ? 'column-reverse' : 'row', margin: 2.5 }}
      >
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onClose}>Save</Button>
      </StyledDialogActions>
    </StyledDialog >
  )
}