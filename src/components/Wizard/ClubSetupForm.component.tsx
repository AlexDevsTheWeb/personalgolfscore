import { IClubSetupFormProps } from '@/types/clubs.types';
import { IClubDetail, IGolfBagData } from '@/types/player.types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid2,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

const DEFAULT_CLUB_TYPES = ["driver", "fairway wood", "hybrid", "iron", "wedge", "putter"];

const ClubSetupForm: React.FC<IClubSetupFormProps> = ({ initialGolfBag, onGolfBagChange }) => {
  const [golfBag, setGolfBag] = useState<IGolfBagData>([]);
  useEffect(() => {
    console.log("ClubSetupForm useEffect triggered. initialGolfBag:", initialGolfBag);

    let structuredBag: IGolfBagData;
    if (!initialGolfBag || initialGolfBag.length === 0) {
      structuredBag = DEFAULT_CLUB_TYPES.map(typeName => ({
        typeName,
        details: []
      }));
    } else {
      structuredBag = [...initialGolfBag];
      const currentTypes = new Set(initialGolfBag.map(t => t.typeName));
      DEFAULT_CLUB_TYPES.forEach(defaultType => {
        if (!currentTypes.has(defaultType)) {
          structuredBag.push({ typeName: defaultType, details: [] });
        }
      });
      structuredBag.sort((a, b) => DEFAULT_CLUB_TYPES.indexOf(a.typeName) - DEFAULT_CLUB_TYPES.indexOf(b.typeName));
    }

    if (JSON.stringify(structuredBag) !== JSON.stringify(golfBag)) {
      console.log("Structuring golf bag state:", structuredBag); // Debugging log
      setGolfBag(structuredBag);
      onGolfBagChange(structuredBag);
    }
  }, [initialGolfBag]);

  const handleClubDetailChange = useCallback(<K extends keyof IClubDetail>(
    typeIndex: number,
    clubIndex: number,
    field: K,
    value: IClubDetail[K]
  ) => {
    const newGolfBag = golfBag.map((clubType, tIndex) => {
      if (tIndex === typeIndex) {
        const newDetails = clubType.details.map((club, cIndex) => {
          if (cIndex === clubIndex) {
            return { ...club, [field]: value };
          }
          return club;
        });
        return { ...clubType, details: newDetails };
      }
      return clubType;
    });
    setGolfBag(newGolfBag);
    onGolfBagChange(newGolfBag);
  }, [golfBag, onGolfBagChange]);

  const addClub = useCallback((typeIndex: number) => {
    const newGolfBag = golfBag.map((clubType, tIndex) => {
      if (tIndex === typeIndex) {
        const newClub: IClubDetail = {
          name: '',
          loft: 0,
          imageURL: '',
          clubIdentifier: `${clubType.typeName}-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          selected: true,
          clubNumber: '',
        };
        return { ...clubType, details: [...clubType.details, newClub] };
      }
      return clubType;
    });
    setGolfBag(newGolfBag);
    onGolfBagChange(newGolfBag);
  }, [golfBag, onGolfBagChange]);

  const removeClub = useCallback((typeIndex: number, clubIndex: number) => {
    const newGolfBag = golfBag.map((clubType, tIndex) => {
      if (tIndex === typeIndex) {
        const newDetails = clubType.details.filter((_, cIndex) => cIndex !== clubIndex);
        return { ...clubType, details: newDetails };
      }
      return clubType;
    });
    setGolfBag(newGolfBag);
    onGolfBagChange(newGolfBag);
  }, [golfBag, onGolfBagChange]);

  return (
    <Box>
      <Typography sx={{ mb: 2 }}>
        Add the clubs you currently carry in your bag. You can adjust this later in Settings.
      </Typography>
      {golfBag.map((clubType, typeIndex) => (
        <Paper key={clubType.typeName} sx={{ p: 2, mb: 3, }} variant="outlined">
          <Typography gutterBottom>{clubType.typeName.toUpperCase()}</Typography>
          {clubType.details.map((club, clubIndex) => (
            <Stack sx={{ mb: 2, gap: 2 }}>
              <Grid2 container spacing={2} key={club.clubIdentifier} size={12}>
                <Grid2 size={12} gap={2}>
                  <TextField
                    label="Club Name/Number"
                    size="small"
                    fullWidth
                    value={club.name}
                    onChange={(e) => handleClubDetailChange(typeIndex, clubIndex, 'name', e.target.value)}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <TextField
                    label="Image URL (Optional)"
                    size="small"
                    fullWidth
                    type="url"
                    value={club.imageURL || ''}
                    onChange={(e) => handleClubDetailChange(typeIndex, clubIndex, 'imageURL', e.target.value)}
                  />
                </Grid2>
                <Grid2 size={4}>
                  <FormControlLabel
                    control={<Checkbox checked={club.selected} onChange={(e) => handleClubDetailChange(typeIndex, clubIndex, 'selected', e.target.checked)} size="small" />}
                    label="In Bag"
                    sx={{ height: '100%', width: '100%', '& .MuiFormControlLabel-label': { fontSize: '0.875rem' }, justifyContent: 'end' }}
                  />
                </Grid2>
              </Grid2>
              <Grid2 container spacing={2} key={club.clubIdentifier} size={12}>
                <Grid2 size={12}>
                  <TextField
                    label="Loft (°)"
                    type="number"
                    size="small"
                    fullWidth
                    value={club.loft}
                    onChange={(e) => handleClubDetailChange(typeIndex, clubIndex, 'loft', parseFloat(e.target.value) || 0)}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <TextField
                    label="Club #" // e.g., P, S, 7, 5W
                    size="small"
                    fullWidth
                    value={club.clubNumber || ''}
                    onChange={(e) => handleClubDetailChange(typeIndex, clubIndex, 'clubNumber', e.target.value)}
                  />
                </Grid2>
                <Grid2 size={4} sx={{ justifyContent: 'end' }}>
                  <IconButton onClick={() => removeClub(typeIndex, clubIndex)} color="warning" size="small" aria-label={`Remove ${club.name || 'club'}`} sx={{ justifyContent: 'flex-end', width: '100%' }}>
                    <DeleteIcon />
                  </IconButton>
                </Grid2>
              </Grid2>
            </Stack>
          ))
          }
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => addClub(typeIndex)}
            size="small"
            variant="outlined"
            disableFocusRipple
            disableRipple
            sx={{ mt: 2 }}
          >
            Add {clubType.typeName === 'Putter' ? 'Putter' : (clubType.typeName.endsWith('s') ? clubType.typeName.slice(0, -1) : clubType.typeName)} {/* Basic singularization */}
          </Button>
        </Paper >
      ))
      }
    </Box >
  );
}

export default ClubSetupForm
