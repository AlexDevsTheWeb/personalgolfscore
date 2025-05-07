import { RootState } from "@/store/store"
import { IPlayerSetupProps } from "@/types/clubs.types"
import { Avatar, Box, Grid, TextField, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"
import React, { useState } from "react"
import { useSelector } from "react-redux"

const PlayerSetupForm: React.FC<IPlayerSetupProps> = ({ handleHcpChange }) => {
  const { player } = useSelector((state: RootState) => state.player);
  const [firstName, setFirstName] = useState(player?.firstName || '');
  const [lastName, setLastName] = useState(player?.lastName || '');
  const [dob, setDob] = useState<Dayjs | null>(player?.DOB ? dayjs(player.DOB) : null);
  const [photoURL, setPhotoURL] = useState(player?.photoURL || '');
  const [hcp, setHcp] = useState<number | string>(player?.HCP ?? '');

  return (
    <>
      <Typography sx={{ mb: 2 }}>
        Please provide the following details to complete your profile setup.
      </Typography>
      <Grid container spacing={2} component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            margin="dense" id="firstName" label="First Name" type="text" fullWidth
            value={firstName} onChange={(e) => setFirstName(e.target.value)} required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            margin="dense" id="lastName" label="Last Name" type="text" fullWidth
            value={lastName} onChange={(e) => setLastName(e.target.value)} required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth *"
              value={dob}
              onChange={(newValue) => setDob(newValue)}
              sx={{ width: '100%', mt: 1 }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            margin="dense" id="hcp" label="Handicap (HCP)" type="text" inputMode="decimal" fullWidth
            value={hcp} onChange={handleHcpChange} required sx={{ mt: { xs: 0, sm: 1 } }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, width: '100%' }}>
            <TextField
              margin="dense" id="photoURL" label="Photo URL (Optional)" type="url"
              value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} sx={{ flexGrow: 1 }}
            />
            {photoURL && <Avatar src={photoURL} sx={{ width: 56, height: 56 }} />}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default PlayerSetupForm;
