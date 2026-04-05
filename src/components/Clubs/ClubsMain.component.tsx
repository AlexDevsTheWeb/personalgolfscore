import React, { useState } from 'react';
import ClubsHeaderTypography from "@/styles/typography/ClubsHeaderTypography.styles";
import { IGolfBagData } from '@/types/player.types';
import { BoxPlayer } from "../../styles";

import { IClubsMainProps } from '@/types/clubs.types';
import { Box, Button, Typography } from '@mui/material';
import { useAppStore } from '@/store/zustand';


const ClubsMain: React.FC<IClubsMainProps> = ({ golfBag }) => {
  const { player, isLoadingPlayer: isLoading } = useAppStore();
  const updatePlayerGolfbag = useAppStore((state) => state.updatePlayerGolfbag);
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
      await updatePlayerGolfbag({
        uid: player.uid,
        golfBagData: dataToShow as IGolfBagData
      });
    } catch (error) {
      console.error("Failed to save initial golf bag:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading && !player) {
    return <Typography>Loading Player Data...</Typography>;
  }

  return (
    <BoxPlayer>
      <ClubsHeaderTypography />

      {!hasExistingBag && (
        <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveInitialBag}
            disabled={isSaving || !player?.uid}
          >
            {isSaving ? "Saving..." : "Save Default Bag"}
          </Button>
        </Box>
      )}
    </BoxPlayer>
  );
};

export default ClubsMain;