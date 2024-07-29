import { useMediaQuery } from '@mui/material';
import Stack, { StackProps as StackPropsMui } from '@mui/material/Stack';
import * as React from 'react';
import styled, { useTheme } from 'styled-components';

// type StackProps = StackPropsMui;
interface IStackProps extends StackPropsMui {
  isMobile?: boolean;
}

const StyledStack = styled(Stack)<IStackProps>({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '10px 0px',
});

const BoxNewHole: React.FC<IStackProps> = props => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledStack {...props} isMobile={isMobile} sx={{ flexDirection: isMobile ? 'column !important' : 'row !important', rowGap: isMobile ? '10px !important' : 0 }}>
      {props.children}
    </StyledStack >
  )
};

export default BoxNewHole;