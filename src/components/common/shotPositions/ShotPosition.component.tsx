import FilterTiltShiftIcon from '@mui/icons-material/FilterTiltShift';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { capitalize } from '../../../utils/strings/strings.utils';
import { Tooltip } from '../../../styles';

type Props = {
  position: number;
}

export const ShotPosition = ({ position }: Props) => {

  enum firPosition {
    SHORTLEFT = 'short left',
    SHORTCENTER = 'short center',
    SHORTRIGHT = 'short right',
    MIDLEFT = 'mid left',
    MIDCENTER = 'mid center',
    MIDRIGHT = 'mid right',
    LONGLEFT = 'long left',
    LONGCENTER = 'long center',
    LONGRIGHT = 'long right'
  }
  switch (position) {
    case 1:
      return (
        <Tooltip title={capitalize(firPosition.SHORTLEFT)}>
          <SouthWestIcon />
        </Tooltip>
      )
    case 2:
      return (
        <Tooltip title={capitalize(firPosition.SHORTCENTER)}>
          <ArrowDownwardIcon />
        </Tooltip>
      )
    case 3:
      return (
        <Tooltip title={capitalize(firPosition.SHORTRIGHT)}>
          <SouthEastIcon />
        </Tooltip>
      )
    case 4:
      return (
        <Tooltip title={capitalize(firPosition.MIDLEFT)}>
          <WestIcon />
        </Tooltip>
      )
    case 5:
      return (
        <Tooltip title={capitalize(firPosition.MIDCENTER)}>
          <FilterTiltShiftIcon />
        </Tooltip>
      )
    case 6:
      return (
        <Tooltip title={capitalize(firPosition.MIDRIGHT)}>
          <EastIcon />
        </Tooltip>
      )
    case 7:
      return (
        <Tooltip title={capitalize(firPosition.LONGLEFT)}>
          <NorthWestIcon />
        </Tooltip>
      )
    case 8:
      return (
        <Tooltip title={capitalize(firPosition.LONGCENTER)}>
          <ArrowUpwardIcon />
        </Tooltip>
      )
    case 9:
      return (
        <Tooltip title={capitalize(firPosition.LONGRIGHT)}>
          <NorthEastIcon />
        </Tooltip>
      )
    default:
      return <></>
  }
}
