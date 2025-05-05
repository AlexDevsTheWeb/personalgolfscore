import { updatePlayerGolfbag, updatePlayerProfile } from '@/features/player/player.slice'; // Import golfbag action
import { AppDispatch, RootState } from '@/store/store';
import { IGolfBagData, IUpdateGolfBagPayload, IUpdatePlayerProfilePayload } from '@/types/player.types';
import {
  Avatar, // Import Avatar
  Box, // Import Box
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Step, // Import Step
  StepLabel, // Import StepLabel
  Stepper, // Import Stepper
  TextField,
  Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClubSetupForm from './ClubSetupForm.component';

interface SetupWizardDialogProps {
  open: boolean;
  playerUid: string;
}

// Define the labels for the stepper
const steps = ['Profile Details', 'Golf Bag Setup'];

const WizardSetupDialog: React.FC<SetupWizardDialogProps> = ({ open, playerUid }) => {
  // --- State Variables ---
  const [step, setStep] = useState(1); // 1: Profile, 2: Clubs
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, errorMessage, player } = useSelector((state: RootState) => state.player);

  // --- Form State ---
  const [firstName, setFirstName] = useState(player?.firstName || '');
  const [lastName, setLastName] = useState(player?.lastName || '');
  const [dob, setDob] = useState<Dayjs | null>(player?.DOB ? dayjs(player.DOB) : null);
  const [photoURL, setPhotoURL] = useState(player?.photoURL || '');
  const [hcp, setHcp] = useState<number | string>(player?.HCP ?? '');
  // State for golf bag data (initialized but not used in this version of the form)
  // const [golfBag, setGolfBag] = useState<IGolfBagData>(player?.golfBag || []);
  const [golfBag, setGolfBag] = useState<IGolfBagData>(player?.golfBag || []); // State for golf bag
  // Local state for displaying form-specific validation errors
  const [formError, setFormError] = useState('');

  // --- Effects ---
  // This effect runs when the 'player' object from Redux changes.
  // It updates the local form state if the player data becomes available after the component mounts.
  useEffect(() => {
    if (player) {
      setFirstName(player.firstName || '');
      setLastName(player.lastName || '');
      setDob(player.DOB ? dayjs(player.DOB) : null);
      setPhotoURL(player.photoURL || '');
      setHcp(player.HCP ?? '');
      setGolfBag(player.golfBag || []); // Initialize golf bag state
    }
  }, [player]); // Dependency array: effect runs only when 'player' changes

  // --- Event Handlers ---
  // Handles changes in the Handicap (HCP) text field
  const handleHcpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Basic validation: Allow only empty string, numbers, optional minus sign, and optional decimal point
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setHcp(value); // Update the local HCP state
    }
  };

  // --- Step 1: Profile Validation ---
  const validateProfileStep = (): boolean => {
    setFormError(''); // Clear any previous form errors
    if (!firstName || !lastName || !dob || hcp === '') {
      setFormError('First Name, Last Name, Date of Birth, and HCP are required.');
      return false;
    }

    // Validate and parse the HCP value
    const hcpNumber = parseFloat(hcp as string); // Convert HCP string to a number
    if (isNaN(hcpNumber)) {
      setFormError('HCP must be a valid number.');
      return false; // Stop submission if HCP is not a valid number
    }
    return true;
  };

  // --- Step 2: Club Validation (Optional - can add if needed) ---
  // const validateClubStep = (): boolean => {
  //   // Add validation for golf bag if necessary (e.g., at least one club)
  //   return true;
  // };

  // --- Actions ---
  const handleNext = () => {
    if (validateProfileStep()) {
      setStep(2); // Move to step 2 if profile is valid
    }
  };

  // Handles the final submission (saving both profile and golf bag)
  const handleSave = async () => {
    if (!validateProfileStep()) return; // Re-validate profile
    // if (!validateClubStep()) return; // Validate clubs if needed

    setFormError(''); // Clear errors
    const hcpNumber = parseFloat(hcp as string); // Already validated
    // --- Data Preparation ---
    // Create the payload object with the data to be updated in Firestore
    const profileData: IUpdatePlayerProfilePayload = {
      uid: playerUid, // The ID of the player document to update
      data: { // The fields to update
        firstName,
        lastName,
        DOB: dob?.valueOf(), // Convert Dayjs object to a Unix timestamp (milliseconds) for Firestore
        photoURL: photoURL || null, // Store null if the photoURL is empty
        HCP: hcpNumber,
        isSetupComplete: true, // Mark the setup as complete upon successful submission
      }
    };

    // Prepare golf bag data payload
    const golfBagPayload: IUpdateGolfBagPayload = {
      uid: playerUid,
      golfBagData: golfBag, // Use the golfBag state managed by ClubSetupForm
    };

    // --- Dispatch Action ---
    try {
      // Dispatch profile update first
      await dispatch(updatePlayerProfile(profileData)).unwrap(); // .unwrap() helps catch errors from the thunk

      // If profile update is successful, dispatch golf bag update
      await dispatch(updatePlayerGolfbag(golfBagPayload)).unwrap();

      // If both succeed, the Redux state will update isSetupComplete to true,
      // and the Dashboard component will automatically close the dialog.

    } catch (rejectedValueOrSerializedError) {
      // Handle potential errors from either dispatch
      console.error("Error saving setup wizard data:", rejectedValueOrSerializedError);
      // Try to extract a meaningful error message
      const message = (rejectedValueOrSerializedError as any)?.message ||
        (typeof rejectedValueOrSerializedError === 'string' ? rejectedValueOrSerializedError : null) ||
        'An error occurred while saving setup.';
      setFormError(message);
    }

    // Note: The dialog doesn't close itself directly.
    // It relies on the Redux state update: when 'updatePlayerProfile' succeeds,
    // the 'player.isSetupComplete' state in Redux becomes true.
    // The parent component (`Dashboard.component.tsx`) observes this change
    // and will stop rendering the dialog (by setting the 'open' prop to false).
    // The parent component (`Dashboard.component.tsx`) observes this change
    // and will stop rendering the dialog (by setting the 'open' prop to false).
  };

  const handleBack = () => {
    setStep(1); // Go back to step 1
  };

  // Callback function passed to ClubSetupForm to update the golfBag state here
  const handleGolfBagChange = useCallback((newGolfBag: IGolfBagData) => {
    setGolfBag(newGolfBag);
  }, []); // Empty dependency array means this function reference doesn't change
  // --- Render Logic ---
  return (
    // The main Dialog component from Material UI
    // 'open={open}' controls visibility based on the prop from the parent
    <Dialog open={open} aria-labelledby="setup-profile-dialog-title" maxWidth="md" fullWidth>
      {/* Dialog Title */}
      <DialogTitle id="setup-wizard-dialog-title">
        Setup Wizard - Step {step} of 2: {step === 1 ? 'Your Details' : 'Your Golf Bag'}
      </DialogTitle>

      {/* Stepper Component */}
      <Stepper activeStep={step - 1} alternativeLabel sx={{ mb: 3, mt: 1, px: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* Dialog Content Area */}
      <DialogContent>
        {/* --- Step 1 Content: Profile Form --- */}
        {step === 1 && (
          <>
            <Typography sx={{ mb: 2 }}>
              Please provide the following details to complete your profile setup.
            </Typography>
            {/* Use Grid for layout */}
            <Grid container spacing={2} component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense" id="firstName" label="First Name" type="text" fullWidth
                  value={firstName} onChange={(e) => setFirstName(e.target.value)} required
                />
              </Grid>
              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense" id="lastName" label="Last Name" type="text" fullWidth
                  value={lastName} onChange={(e) => setLastName(e.target.value)} required
                />
              </Grid>
              {/* Date of Birth */}
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth *"
                    value={dob}
                    onChange={(newValue) => setDob(newValue)}
                    // Apply fullWidth via sx prop for DatePicker
                    sx={{ width: '100%', mt: 1 }} // Adjust margin as needed
                  />
                </LocalizationProvider>
              </Grid>
              {/* Handicap */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense" id="hcp" label="Handicap (HCP)" type="text" inputMode="decimal" fullWidth
                  value={hcp} onChange={handleHcpChange} required sx={{ mt: { xs: 0, sm: 1 } }} // Align vertically on desktop
                />
              </Grid>
              {/* Photo URL and Avatar (Full Width) */}
              <Grid item xs={12}>
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

        {/* --- Step 2 Content: Club Setup Form --- */}
        {
          step === 2 && (
            // Render the ClubSetupForm, passing the current golfBag state
            // and the callback function to update it
            <ClubSetupForm initialGolfBag={golfBag} onGolfBagChange={handleGolfBagChange} />
          )
        }

        {/* Display area for form errors or errors from Redux state */}
        {
          (formError || error) && (
            <Typography color="error" sx={{ mt: 2 }}>
              {/* Show local form error first, then Redux error message */}
              {formError || errorMessage || 'An error occurred.'}
            </Typography>
          )
        }
      </DialogContent >

      {/* Dialog Actions Area (usually contains buttons) */}
      < DialogActions sx={{ padding: '16px 24px', justifyContent: 'space-between' }}>
        {/* Back Button (Show only on Step 2) */}
        {
          step === 2 && (
            <Button onClick={handleBack} disabled={isLoading}>Back</Button>
          )
        }
        {/* Next Button (Show only on Step 1) */}
        {
          step === 1 && (
            <Button onClick={handleNext} variant="contained" disabled={isLoading}>Next</Button>
          )
        }
        {/* Finish Setup Button (Show only on Step 2) */}
        {
          step === 2 && (
            <Button onClick={handleSave} variant="contained" disabled={isLoading}>
              {/* Show loading spinner if Redux state indicates loading, otherwise show button text */}
              {isLoading ? <CircularProgress size={24} /> : 'Finish Setup'}
            </Button>)
        }
      </DialogActions >
    </Dialog >
  );
};

export default WizardSetupDialog;
