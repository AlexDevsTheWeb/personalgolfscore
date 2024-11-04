import { Stack, Typography } from '@mui/material';
import GridPuttsStat from "../../../styles/grid/GridCellStats.styles";


interface IGridStat {
  gridNumber: number,
  label: string,
  value: any
}

const GridStat = ({ gridNumber, label, value }: IGridStat) => {
  return (
    <GridPuttsStat item xs={gridNumber}>
      <Stack>
        <Typography sx={{ textAlign: 'center' }}>{label}</Typography>
        <Typography fontWeight={'bold'} sx={{ textAlign: 'center' }}>
          {value}
        </Typography>
      </Stack>
    </GridPuttsStat>
  )
}

export default GridStat
