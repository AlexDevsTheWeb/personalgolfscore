import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import React from 'react';

interface IHeaderProps extends BoxProps {
  title: string;
  onClick?: () => void;
}

const BoxStyled = styled(Box)<BoxProps>(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: theme.palette.grey4.main,
  width: '100%',
}));

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }: { theme: Theme }) => ({
  textTransform: 'uppercase',
  fontWeight: 500,
  color: theme.palette.getContrastText(theme.palette.grey4.main),
}));


const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
  return (
    <BoxStyled onClick={props.onClick} {...props}>
      <TypographyStyled>{props.title}</TypographyStyled>
    </BoxStyled>
  )
}


export default Header;
