import { Paper, Typography as TypographyMui, TypographyProps as TypographyPropsMui, styled } from "@mui/material";
import React, { useMemo } from "react";
import { usePlayerStore } from "@/store/zustand";

interface TypographyProps extends TypographyPropsMui { }

const StyledTypography = styled(TypographyMui)({})

const ClubsHeaderTypography: React.FC<TypographyProps> = props => {
  const player = usePlayerStore((state) => state.player);

  const { totalClubs, selectedClubs } = useMemo(() => {
    if (!player?.golfBag) {
      return { totalClubs: 0, selectedClubs: 0 };
    }
    let total = 0;
    let selected = 0;
    player.golfBag.forEach(clubType => {
      total += clubType.details.length;
      selected += clubType.details.filter(club => club.selected).length;
    });
    return { totalClubs: total, selectedClubs: selected };
  }, [player?.golfBag]);

  const playerName = player?.displayName ?? player?.uid ?? 'Player';

  return (
    <Paper variant='clubsHeader'>
      <StyledTypography {...props} variant='headline2'>
        {playerName}'s Golf Bag
      </StyledTypography>
      <StyledTypography {...props} variant='subheadline1'>
        {`${selectedClubs} clubs selected / ${totalClubs} total clubs`}
      </StyledTypography>
    </Paper>
  )
}

export default ClubsHeaderTypography;