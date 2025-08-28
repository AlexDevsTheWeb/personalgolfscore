import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import styled from '@emotion/styled';
import { Button, DialogActions as DialogActionsMui, DialogContent as DialogContentMui, Dialog as DialogMui, DialogProps as DialogPropsMui, DialogTitle as DialogTitleMui } from '@mui/material';

interface IDialogProps extends DialogPropsMui {
  open: boolean;
  title: string
  onClose: () => void;
  onSubmit?: () => void;
}

const StyledDialog = styled(DialogMui)(({ theme }) => ({}));
const StyledDialogContent = styled(DialogContentMui)(({ theme }) => ({
  margin: '10px !important'
}));
const StyledDialogTitle = styled(DialogTitleMui)(({ theme }) => ({
  padding: '10px',
  height: '60px'
}));
const StyledDialogActions = styled(DialogActionsMui)(({ theme }) => ({
  margin: '0px !important',
  padding: '10px !important'
}));

export const Dialog: React.FC<IDialogProps> = ({ children, open, onClose, title, onSubmit }) => {
  return (
    <StyledDialog
      open={open}
      fullWidth
      maxWidth="md"
      onClose={onClose}
      slotProps={{
        paper: {

          sx: {
            border: '2px solid #586069',
          }
        }
      }}
    >
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <StyledDialogContent sx={{ margin: '10px' }}>
        {children}
      </StyledDialogContent>
      <StyledDialogActions
        sx={{ flexDirection: useDeviceDetection().isMobile ? 'column-reverse' : 'row', }}
      >
        <Button variant='link' onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSubmit}>Save</Button>
      </StyledDialogActions>
    </StyledDialog >
  )
}