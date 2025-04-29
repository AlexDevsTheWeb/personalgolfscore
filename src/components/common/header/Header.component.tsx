import styled from '@emotion/styled';
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import React from 'react';

interface IHeaderProps {
  title: string;
  onClick?: () => void;
}



const BoxStyled = styled(Box)<BoxProps>((props) => (({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: 'black',
  width: '100%',
})));

const TypographyStyled = styled(Typography)<TypographyProps>((props) => (({
  textTransform: 'uppercase',
  fontWeight: 500,
  color: 'white',
})));


const Header: React.FC<IHeaderProps> = ({ title, onClick }) => {
  return (
    <BoxStyled onClick={onClick}>
      <TypographyStyled>{title}</TypographyStyled>
    </BoxStyled>
  )
}

export default Header;
