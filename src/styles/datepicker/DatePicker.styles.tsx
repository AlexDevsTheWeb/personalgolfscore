import useDeviceDetection from '@/hooks/useDeviceDetection.hook';
import { styled } from '@mui/material';
import { DatePicker as DatePickerMui } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import * as React from "react";
interface IDatepickerProps {
  value: dayjs.Dayjs | null;
  onChange: (value: dayjs.Dayjs | null) => void;
  label: string;
  // name: string;
};

const StyledDatePicker = styled(DatePickerMui)<IDatepickerProps>(({ theme }) => ({
  '.MuiInputBase-root': {
    color: theme.palette.text.primary, // Use theme text color
    borderRadius: '0px',
    borderWidth: '1px',
    border: 'none',
    // Use theme divider color for the bottom border
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey5.main, // Use a theme grey for background
    height: '56px',
    width: useDeviceDetection().isMobile ? '180px' : '200px'
  }
}));


const DatePicker: React.FC<IDatepickerProps> = (props) => {
  return (
    <StyledDatePicker {...props} />
  );
};

export default DatePicker;