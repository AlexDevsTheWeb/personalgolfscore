import GridAccordion from "@/styles/grid/GridAccordion.styles";
import NewGridCellStats from "@/styles/grid/NewGridCellStats.style";
import { IPercentageStatDisplayProps, ISimpleParStatDisplayProps, ISimpleScoreParStatDisplayProps, ISimpleStatDisplayProps } from "@/types/props.types";
import { Stack, Typography } from "@mui/material";
import React from "react";

export const SimpleStatDisplay: React.FC<ISimpleStatDisplayProps> = React.memo(({
  title, total, avg, inTotal, inAvg, outTotal, outAvg, totalSuffix = '', inSuffix = '', outSuffix = ''
}) => (
  <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
    <NewGridCellStats size={{ xs: 3, sm: 4 }}>
      <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
        {title && <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>{title}</Typography>}
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>TOTAL</Typography> {/* Use secondary for label */}
        <Typography fontWeight={'bold'} color="text.primary">{`${total}${totalSuffix}`}</Typography>
        {avg !== undefined && <Typography variant="caption" color="text.secondary">{avg}</Typography>}
      </Stack>
    </NewGridCellStats>
    <NewGridCellStats size={{ xs: 3, sm: 4 }}>
      <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>IN</Typography> {/* Use secondary for label */}
        <Typography fontWeight={'bold'} color="text.primary">{`${inTotal}${inSuffix}`}</Typography>
        {inAvg !== undefined && <Typography variant="caption" color="text.secondary">{inAvg}</Typography>}
      </Stack>
    </NewGridCellStats>
    <NewGridCellStats size={{ xs: 3, sm: 4 }}>
      <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>OUT</Typography> {/* Use secondary for label */}
        <Typography fontWeight={'bold'} color="text.primary">{`${outTotal}${outSuffix}`}</Typography>
        {outAvg !== undefined && <Typography variant="caption" color="text.secondary">{outAvg}</Typography>}
      </Stack>
    </NewGridCellStats>
  </GridAccordion>
));

export const SimpleParStatDisplay: React.FC<ISimpleParStatDisplayProps> = React.memo(({
  title, scorePar3, scorePar4, scorePar5
}) => (
  <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
    <NewGridCellStats size={{ xs: 3, sm: 4 }}>
      <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
        {title && <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>{title}</Typography>}
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>PAR 3</Typography> {/* Use secondary for label */}
        <Typography fontWeight={'bold'} color="text.primary">{scorePar3}</Typography>
      </Stack>
    </NewGridCellStats>
    <NewGridCellStats size={{ xs: 3, sm: 4 }}>
      <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>PAR 4</Typography> {/* Use secondary for label */}
        <Typography fontWeight={'bold'} color="text.primary">{scorePar4}</Typography>
      </Stack>
    </NewGridCellStats>
    <NewGridCellStats size={{ xs: 3, sm: 4 }}>
      <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>PAR 5</Typography> {/* Use secondary for label */}
        <Typography fontWeight={'bold'} color="text.primary">{scorePar5}</Typography>
      </Stack>
    </NewGridCellStats>
  </GridAccordion>
));

export const SimpleScoreParStatDisplay: React.FC<ISimpleScoreParStatDisplayProps> = React.memo(({
  title, scoreBirdie, scoreBogey, scoreDoubleBogeyWorst, scoreEagleBetter, scorePar,
}) => (
  <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <NewGridCellStats size={{ xs: 4, sm: 4 }}>
      <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
        {title && <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>{title}</Typography>}
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>Eagle or better</Typography> {/* Use secondary for label */}
        <Typography fontWeight={'bold'} color="text.primary">{scoreEagleBetter}</Typography>
      </Stack>
    </NewGridCellStats>
    <NewGridCellStats size={{ xs: 4, sm: 4 }}>
      <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>Birdie</Typography> {/* Use secondary for label */}
        <Typography fontWeight={'bold'} color="text.primary">{scoreBirdie}</Typography>
      </Stack>
    </NewGridCellStats>
    <NewGridCellStats size={{ xs: 4, sm: 4 }}>
      <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>Par</Typography> {/* Use secondary for label */}
        <Typography fontWeight={'bold'} color="text.primary">{scorePar}</Typography>
      </Stack>
    </NewGridCellStats>

    <NewGridCellStats size={{ xs: 4, sm: 6 }}>
      <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}>Bogey</Typography> {/* Use secondary for label */}
        <Typography fontWeight={'bold'} color="text.primary">{scoreBogey}</Typography>
      </Stack>
    </NewGridCellStats>
    <NewGridCellStats size={{ xs: 4, sm: 6 }}>
      <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
        <Typography color="text.secondary" sx={{ fontSize: '0.8rem' }}> Double Bogey or worse</Typography> {/* Use secondary for label */}
        <Typography fontWeight={'bold'} color="text.primary">{scoreDoubleBogeyWorst}</Typography>
      </Stack>
    </NewGridCellStats>
  </GridAccordion>
));

export const PercentageStatDisplay: React.FC<IPercentageStatDisplayProps> = React.memo(({ saved, total, percentage }) => (
  <>
    <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <NewGridCellStats size={{ xs: 6, sm: 6 }}>
        <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
          <Typography color="text.secondary">Saved</Typography> {/* Use secondary for label */}
          <Typography fontWeight={'bold'} color="text.primary">{saved}</Typography>
        </Stack>
      </NewGridCellStats>
      <NewGridCellStats size={{ xs: 6, sm: 6 }}>
        <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
          <Typography color="text.secondary">Totals</Typography> {/* Use secondary for label */}
          <Typography fontWeight={'bold'} color="text.primary">{total}</Typography>
        </Stack>
      </NewGridCellStats>
    </GridAccordion>
    <GridAccordion container spacing={1} sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <NewGridCellStats size={{ xs: 12 }}>
        <Stack sx={{ textAlign: 'center', color: 'text.primary' }}> {/* Set color on Stack */}
          <Typography fontWeight={'bold'}>
            {percentage !== 0 ? `${percentage.toFixed(2)}%` : '0,00%'}
          </Typography>
        </Stack>
      </NewGridCellStats>
    </GridAccordion>
  </>
));