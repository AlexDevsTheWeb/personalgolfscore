import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import { useTheme } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
// import { ReactComponent as ArrowDownIcon } from 'assett/icons/arrow_down_icon.svg';
// import { ReactComponent as ArrowlefttIcon } from 'assett/icons/arrow_left_datepicker_icon.svg';
// import { ReactComponent as ArrowRightIcon } from 'assett/icons/arrow_right_datepicker_icon.svg';
import { ArrowLeftIcon, ArrowRightIcon, ArrowDropDownIcon } from '@mui/x-date-pickers';

// import { ReactComponent as ArrowUpIcon } from 'assett/icons/arrow_up_icon.svg';
import dayjs from 'dayjs';
import styled from 'styled-components';
// import IconButton from 'styles/button/IconButton';
import TextField from '../textfield/TextField.style';
import { OptionsDatepicker } from '../../types/form.types';
import { dayjsForMaterial } from '../../utils/date/date.utils';

type Props = {
  value: dayjs.Dayjs | null;
  onChange: (value: dayjs.Dayjs | null) => void;
  label: string;
  variant: keyof typeof OptionsDatepicker;
  minDate?: dayjs.Dayjs | undefined;
  maxDate?: dayjs.Dayjs | undefined;
  setErrorDate?: Dispatch<SetStateAction<boolean>>;
  error?: boolean;
};

const DatePicker: FC<Props> = props => {
  const {
    value,
    onChange,
    label,
    variant,
    maxDate: maxDateNF,
    minDate: mindateNF,
    setErrorDate,
    error,
  } = props;

  const minDate = dayjsForMaterial(mindateNF);
  const maxDate = dayjsForMaterial(maxDateNF);

  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();

  const [invalidDate, setInvalidDate] = useState(false);

  theme.datepicker = OptionsDatepicker[props.variant as OptionsDatepicker];

  useEffect(() => {
    if (!!setErrorDate) {
      setErrorDate(invalidDate);
    }
  }, [invalidDate, setErrorDate]);

  return (
    <StyledDatePicker
      // InputProps={{
      //   disableUnderline: true,
      // }}
      {...props}
      key={`datepicker_${variant}`}
      maxDate={maxDate}
      minDate={minDate}
      open={open}
      onOpen={() => setOpen(!open)}
      components={{
        OpenPickerIcon: () => (!open ? <ArrowDropDownIcon /> : null),
        LeftArrowIcon: () => <ArrowLeftIcon />,
        // RightArrowButton: params => (
        //   <IconButton {...params}>
        //     <ArrowRightIcon />
        //   </IconButton>
        // ),
      }}
      label={label}
      value={value}
      onChange={e => {
        const newDate = dayjsForMaterial(e as any);
        const isValidDate =
          !newDate ||
          (typeof newDate?.isValid() !== 'undefined' &&
            newDate.isValid() &&
            (!maxDate || maxDate.diff(newDate) >= 0) &&
            (!minDate || newDate.diff(minDate) >= 0));
        onChange(isValidDate && newDate ? newDate : null);
        setOpen(false);
        if (isValidDate || value) {
          setInvalidDate(false);
        } else setInvalidDate(true);
      }}
      showDaysOutsideCurrentMonth
    // renderInput={params => (
    //   <TextField
    //     fullWidth
    //     variant="filled"
    //     InputLabelProps={{
    //       style: {
    //         transform: 'translate(12px 18px)',
    //       },
    //     }}
    //     {...params}
    //     error={invalidDate || error}
    //   />
    // )}
    // PopperProps={{
    //   style: {
    //     background: 'transparent',
    //     transform: 'translate(50px, 10px)',
    //   },
    // }}
    // PaperProps={{
    //   style: {
    //     transform: 'translate(20px, 5px)',
    //   },
    // }}
    />
  );
};

const StyledDatePicker = styled(MuiDatePicker)`
	${({ open, theme }) =>
    open ? `border: 1px solid ${theme.palette.primary.main}` : ``};
`;

export default DatePicker;
