import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EastIcon from '@mui/icons-material/East';
import FilterTiltShiftIcon from '@mui/icons-material/FilterTiltShift';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import WestIcon from '@mui/icons-material/West';
import { FAIRWAYSICONS } from '../../../enum/shots.enum';
import { Tooltip } from '../../../styles';
import { capitalize } from '../../../utils/strings/strings.utils';

type Props = {
  position: number;
}

export const ShotPosition = ({ position }: Props) => {
  switch (position) {
    case 1:
      return (
        <Tooltip title={capitalize(FAIRWAYSICONS.SHORTLEFT)}>
          <SouthWestIcon />
        </Tooltip>
      )
    case 2:
      return (
        <Tooltip title={capitalize(FAIRWAYSICONS.SHORTCENTER)}>
          <ArrowDownwardIcon />
        </Tooltip>
      )
    case 3:
      return (
        <Tooltip title={capitalize(FAIRWAYSICONS.SHORTRIGHT)}>
          <SouthEastIcon />
        </Tooltip>
      )
    case 4:
      return (
        <Tooltip title={capitalize(FAIRWAYSICONS.MIDLEFT)}>
          <WestIcon />
        </Tooltip>
      )
    case 5:
      return (
        <Tooltip title={capitalize(FAIRWAYSICONS.MIDCENTER)}>
          <FilterTiltShiftIcon />
        </Tooltip>
      )
    case 6:
      return (
        <Tooltip title={capitalize(FAIRWAYSICONS.MIDRIGHT)}>
          <EastIcon />
        </Tooltip>
      )
    case 7:
      return (
        <Tooltip title={capitalize(FAIRWAYSICONS.LONGLEFT)}>
          <NorthWestIcon />
        </Tooltip>
      )
    case 8:
      return (
        <Tooltip title={capitalize(FAIRWAYSICONS.LONGCENTER)}>
          <ArrowUpwardIcon />
        </Tooltip>
      )
    case 9:
      return (
        <Tooltip title={capitalize(FAIRWAYSICONS.LONGRIGHT)}>
          <NorthEastIcon />
        </Tooltip>
      )
    default:
      return <></>
  }
}
