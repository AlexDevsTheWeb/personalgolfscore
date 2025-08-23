import styled from '@emotion/styled';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface IActinTextButtonProps {
  text: string;
  onClick: () => void;
}

const StyledActionTextButton = styled(Button)(({ theme }) => ({
  padding: '12px',
  gap: 0,
  transition: (theme as Theme).transitions.create(['background-color', 'transform'], { duration: '0.4s' }),

  '&:hover': {
    backgroundColor: 'rgba(32, 46, 70, 0.202)',
    textDecoration: 'underline',
    textUnderlineOffset: '6px'
  },
}));

export const ActionTextButtons = ({ text, onClick }: IActinTextButtonProps) => {
  const theme = useTheme();
  return (
    <StyledActionTextButton onClick={onClick} variant='text' startIcon={<KeyboardArrowRightIcon />} theme={theme}>
      {text}
    </StyledActionTextButton>
  )
}
