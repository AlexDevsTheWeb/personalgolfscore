import { updatePlayerGolfbag, updatePlayerProfile } from '@/features/player/player.slice';
import { AppDispatch, RootState } from '@/store/store';
import { IGolfBagData, IUpdateGolfBagPayload, IUpdatePlayerProfilePayload } from '@/types/player.types';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClubSetupForm from './ClubSetupForm.component';
import PlayerSetupForm from './PlayerSetupForm.component';

interface SetupWizardDialogProps {
  open: boolean;
  playerUid: string;
}

const steps = ['Profile Details', 'Golf Bag Setup'];

const WizardSetupDialog: React.FC<SetupWizardDialogProps> = ({ open, playerUid }) => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, errorMessage, player } = useSelector((state: RootState) => state.player);

  const [firstName, setFirstName] = useState(player?.firstName || '');
  const [lastName, setLastName] = useState(player?.lastName || '');
  const [dob, setDob] = useState<Dayjs | null>(player?.DOB ? dayjs(player.DOB) : null);
  const [photoURL, setPhotoURL] = useState(player?.photoURL || '');
  const [hcp, setHcp] = useState<number | string>(player?.HCP ?? '');
  const [golfBag, setGolfBag] = useState<IGolfBagData>(player?.golfBag || []);
  const [formError, setFormError] = useState('');
  useEffect(() => {
    if (player) {
      setFirstName(player.firstName || '');
      setLastName(player.lastName || '');
      setDob(player.DOB ? dayjs(player.DOB) : null);
      setPhotoURL(player.photoURL || '');
      setHcp(player.HCP ?? '');
      setGolfBag(player.golfBag || []);
    }
  }, [player]);

  const handleHcpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setHcp(value);
    }
  };

  const validateProfileStep = (): boolean => {
    setFormError('');
    if (!firstName || !lastName || !dob || hcp === '') {
      setFormError('First Name, Last Name, Date of Birth, and HCP are required.');
      return false;
    }
    const hcpNumber = parseFloat(hcp as string); // Convert HCP string to a number
    if (isNaN(hcpNumber)) {
      setFormError('HCP must be a valid number.');
      return false; // Stop submission if HCP is not a valid number
    }
    return true;
  };

  const handleNext = () => {
    if (validateProfileStep()) {
      setStep(2);
    }
  };

  const handleSave = async () => {
    if (!validateProfileStep()) return;

    setFormError('');
    const hcpNumber = parseFloat(hcp as string);

    const profileData: IUpdatePlayerProfilePayload = {
      uid: playerUid,
      data: {
        firstName,
        lastName,
        DOB: dob?.valueOf(),
        photoURL: photoURL || null,
        HCP: hcpNumber,
        isSetupComplete: true,
      }
    };

    const golfBagPayload: IUpdateGolfBagPayload = {
      uid: playerUid,
      golfBagData: golfBag,
    };

    try {
      await dispatch(updatePlayerProfile(profileData)).unwrap();
      await dispatch(updatePlayerGolfbag(golfBagPayload)).unwrap();
    } catch (rejectedValueOrSerializedError) {
      console.error("Error saving setup wizard data:", rejectedValueOrSerializedError);
      const message = (rejectedValueOrSerializedError as any)?.message ||
        (typeof rejectedValueOrSerializedError === 'string' ? rejectedValueOrSerializedError : null) ||
        'An error occurred while saving setup.';
      setFormError(message);
    }
  };

  const handleBack = () => {
    setStep(1);
  };
  const handleGolfBagChange = useCallback((newGolfBag: IGolfBagData) => {
    setGolfBag(newGolfBag);
  }, []);

  return (

    <Dialog open={open} aria-labelledby="setup-profile-dialog-title" maxWidth="md" fullWidth>
      <DialogTitle id="setup-wizard-dialog-title">
        Setup Wizard - Step {step} of 2: {step === 1 ? 'Your Details' : 'Your Golf Bag'}
      </DialogTitle>

      <Stepper activeStep={step - 1} alternativeLabel sx={{ mb: 3, mt: 1, px: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <DialogContent>
        {step === 1 && (
          <PlayerSetupForm handleHcpChange={() => handleHcpChange} />
        )
        }
        {
          step === 2 && (
            <ClubSetupForm initialGolfBag={golfBag} onGolfBagChange={handleGolfBagChange} />
          )
        }
        {
          (formError || error) && (
            <Typography color="error" sx={{ mt: 2 }}>
              {formError || errorMessage || 'An error occurred.'}
            </Typography>
          )
        }
      </DialogContent>

      <DialogActions sx={{
        padding: '16px 0px',
        justifyContent: step === 1 ? 'flex-end' : 'space-between'
      }}>
        {
          step === 2 && (
            <Button onClick={handleBack} disabled={isLoading}>Back</Button>
          )
        }
        {
          step === 1 && (
            <Button onClick={handleNext} variant="contained" disabled={isLoading}>Next</Button>
          )
        }
        {
          step === 2 && (
            <Button onClick={handleSave} variant="contained" disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : 'Finish Setup'}
            </Button>)
        }
      </DialogActions>
    </Dialog>
  );
};

export default WizardSetupDialog;
