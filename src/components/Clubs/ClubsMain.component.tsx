import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store/store";
import ClubsHeaderTypography from "@/styles/typography/ClubsHeaderTypography.styles";
import { IGolfBagData } from '@/types/player.types';
import { BoxPlayer } from "../../styles";

import { updatePlayerGolfbag } from '@/features/player/player.slice';
import { IClubsMainProps } from '@/types/clubs.types';
import { Box, Button, Typography } from '@mui/material';


const ClubsMain: React.FC<IClubsMainProps> = ({ golfBag }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { player, isLoading } = useSelector((store: RootState) => store.player);
  const [isSaving, setIsSaving] = useState(false);

  const hasExistingBag = golfBag && golfBag.length > 0;
  const dataToShow = hasExistingBag ? golfBag : null;

  const handleSaveInitialBag = async () => {
    if (!player?.uid) {
      console.error("cannot save initial bag: player UID is missing");
      return;
    }
    if (hasExistingBag) {
      console.warn("Attemped to save initial bag, but an existing bag was found.");
      return;
    }
    setIsSaving(true);
    try {
      await dispatch(updatePlayerGolfbag({
        uid: player.uid,
        golfBagData: dataToShow as IGolfBagData
      })).unwrap();
    } catch (error) {
      console.error("Failed to save initial golf bag:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading && !player) { // Show loading only if player data isn't available yet
    return <Typography>Loading Player Data...</Typography>;
  }

  return (
    <BoxPlayer>
      <ClubsHeaderTypography />


      {/* <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={12}
      >
        {dataToShow && dataToShow.length > 0
          ? (dataToShow.map((clubType, index) => (
            <Grid
              size={12}
              key={`${clubType.typeName}-${index}`}
              sx={{ minWidth: "100%" }}
            >
              <ClubsList
                typeName={clubType.typeName}
                details={clubType.details}
              />
            </Grid>
          ))
          )
          : (<Typography sx={{ padding: 2 }}>No clubs found.</Typography>)
        }
      </Grid> */}

      {!hasExistingBag && (
        <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveInitialBag}
            disabled={isSaving || !player?.uid} // Disable if saving or no UID
          >
            {isSaving ? "Saving..." : "Save Default Bag"}
          </Button>
        </Box>
      )}
    </BoxPlayer>
  );
};

export default ClubsMain;