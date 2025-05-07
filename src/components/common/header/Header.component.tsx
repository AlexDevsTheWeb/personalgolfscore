import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import React from 'react';

interface IHeaderProps extends BoxProps {
  title: string;
  subtitle?: string
  onClick?: () => void;
}

const BoxStyled = styled(Box)<IHeaderProps>(({ theme, onClick }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5px',
  backgroundColor: theme.palette.grey4.main,
  width: '100%',
  cursor: onClick ? 'pointer' : 'default',
  minHeight: '52px',
  border: `1px solid ${theme.palette.divider}`,
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
      {props.subtitle && (
        <Typography variant="caption" display='block' color="text.secondary" sx={{ textAlign: 'center' }}>
          {props.subtitle}
        </Typography>
      )}
    </BoxStyled>
  )
}


export default Header;
