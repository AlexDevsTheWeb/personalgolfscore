import { DatePicker as DatePickerMui } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import * as React from "react";
import styled from "styled-components";
import useDeviceDetection from '../../hooks/useDeviceDetection.hook';

interface IDatepickerProps {
  // value: dayjs.Dayjs | null;
  onChange: (value: dayjs.Dayjs | null) => void;
  // label: string;
  // name: string;
};

const StyledDatePicker = styled(DatePickerMui)<IDatepickerProps>(({ theme }) => ({
  '.MuiInputBase-root': {
    color: 'black',
    borderRadius: '0px',
    borderWidth: '1px',
    border: 'none',
    borderBottom: '1px solid black',
    backgroundColor: '#e9eaeb',
    height: '56px',
  }
}));


const DatePicker: React.FC<IDatepickerProps> = (props) => {
  return (
    <StyledDatePicker {...props} sx={{ width: useDeviceDetection().isMobile ? '37%' : 200, }} />
  );
};

export default DatePicker;