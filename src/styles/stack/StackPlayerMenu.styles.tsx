// import { Stack as StackMui, StackProps as StackPropsMui, Typography } from '@mui/material';
import styled from 'styled-components';

import { Box as BoxMui, BoxProps as BoxPropsMui, Typography } from '@mui/material';

type BoxProps = BoxPropsMui & {
  name: string,
  value: number | string,
};

const StyledBox = styled(BoxMui)<BoxProps>(() => ({
  gap: 5,
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignContent: 'space-around',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

const StyledBoxHCP = styled(BoxMui)<BoxProps>((props) => ({
  backgroundColor: Number(props.value) >= 20
    ? 'red'
    : (Number(props.value) < 20 && Number(props.value) >= 10)
      ? 'orange'
      : 'green',

  padding: '10px',
  borderRadius: 100,
  height: '100px',
  width: '100px',
  gap: 2,

  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignContent: 'center',
  justifyContent: 'center',
  alignItems: 'center'
}));

const StyledTypographyHCP = styled(Typography)<BoxProps>((props) => ({
  fontWeight: 'bold',
  fontSize: '40px',
  lineHeight: '40px',
  color: Number(props.value) >= 20
    ? 'white'
    : (Number(props.value) < 20 && Number(props.value) >= 10)
      ? '#494949'
      : 'white',

}));

const StyledTypographyLabelHCP = styled(Typography)<BoxProps>((props) => ({
  fontSize: '16px',
  lineHeight: '16px',
  color: Number(props.value) >= 20
    ? 'white'
    : (Number(props.value) < 20 && Number(props.value) >= 10)
      ? '#494949'
      : 'white',
}))

const StackPlayerMenu: React.FC<BoxProps> = props => {
  const { name, value } = props;

  return (
    <StyledBox {...props}>
      <Typography>{name}</Typography>

      <StyledBoxHCP {...props}>
        <StyledTypographyLabelHCP {...props}>{'HCP'}</StyledTypographyLabelHCP>
        <StyledTypographyHCP {...props}>{value}</StyledTypographyHCP>
      </StyledBoxHCP>

    </StyledBox>
  )
};

export default StackPlayerMenu;