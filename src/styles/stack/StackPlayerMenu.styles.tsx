import { Box as BoxMui, BoxProps as BoxPropsMui, Typography, styled } from '@mui/material';

type BoxProps = BoxPropsMui & {
  name: string;
  value: number | string;
};

interface ValueProps {
  value: number | string;
}

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

const StyledTypographyHCP = styled(Typography)<ValueProps>((props) => ({
  fontWeight: 'bold',
  fontSize: '40px',
  lineHeight: '40px',
  color: Number(props.value) >= 20
    ? 'white'
    : (Number(props.value) < 20 && Number(props.value) >= 10)
      ? '#494949'
      : 'white',
}));

const StyledTypographyLabelHCP = styled(Typography)<ValueProps>((props) => ({
  fontSize: '16px',
  lineHeight: '16px',
  color: Number(props.value) >= 20
    ? 'white'
    : (Number(props.value) < 20 && Number(props.value) >= 10)
      ? '#494949'
      : 'white',
}));

const StackPlayerMenu: React.FC<BoxProps> = props => {
  const { name, value } = props;

  return (
    <StyledBox {...props}>
      <Typography>{name}</Typography>

      <StyledBoxHCP {...props}>
        <StyledTypographyLabelHCP value={value}>{'HCP'}</StyledTypographyLabelHCP>
        <StyledTypographyHCP value={value}>{value}</StyledTypographyHCP>
      </StyledBoxHCP>

    </StyledBox>
  );
};

export default StackPlayerMenu;

// ── SidebarHCP: compact ~40px color-coded HCP badge for sidebar use ──────────

interface SidebarHCPProps {
  value?: number;
  name: string;
}

const getHCPColors = (hcpValue?: number) => {
  if (hcpValue === undefined) return { bg: 'transparent', text: '#999999' };
  if (hcpValue >= 20) return { bg: 'red', text: 'white' };
  if (hcpValue >= 10) return { bg: 'orange', text: '#494949' };
  return { bg: 'green', text: 'white' };
};

const CompactHCPBox = styled(BoxMui, {
  shouldForwardProp: (prop) => prop !== 'hcpValue',
})<{ hcpValue?: number }>(({ hcpValue }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: getHCPColors(hcpValue).bg,
}));

const CompactHCPLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'hcpValue',
})<{ hcpValue?: number }>(({ hcpValue }) => ({
  fontSize: '9px',
  lineHeight: '9px',
  color: getHCPColors(hcpValue).text,
}));

const CompactHCPNumber = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'hcpValue',
})<{ hcpValue?: number }>(({ hcpValue }) => ({
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '16px',
  color: getHCPColors(hcpValue).text,
}));

export const SidebarHCP: React.FC<SidebarHCPProps> = ({ value, name }) => {
  return (
    <CompactHCPBox hcpValue={value}>
      {value !== undefined ? (
        <>
          <CompactHCPLabel hcpValue={value}>HCP</CompactHCPLabel>
          <CompactHCPNumber hcpValue={value}>{value}</CompactHCPNumber>
        </>
      ) : (
        <CompactHCPLabel hcpValue={undefined}>-</CompactHCPLabel>
      )}
    </CompactHCPBox>
  );
};