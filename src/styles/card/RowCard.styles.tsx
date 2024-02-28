import * as React from "react";
import { Stack, Typography } from "../index";
// import InputAdornment from "style/input/InputAdornment";
// import OutlinedInput from "style/input/OutLinedInput";
// import { useDispatch, useSelector } from "react-redux";
// import { setInputHandleChange } from "features/form/inputSlice";
// import { TFormStateSlice } from "types/Form";
// import { RootState } from "store/store";
// import { resetErrorsForm, setErrorForm } from "features/form/formErrorsSlice";
// import { TErrorSlice } from "../../types/Form";

type RowCardProps = {
  // name?: keyof TFormStateSlice;
  label: string | null;
  name: string;
  value: string;
  editable?: boolean;
  component?: React.ReactNode;
  format?: string;
  multiline?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  width?: number;
  withoutReset?: boolean;
  notRequired?: boolean;
};

const RowCard: React.FC<RowCardProps> = (props) => {
  // const { input, errors } = useSelector((store: RootState) => store.form);
  const [value, setValue] = React.useState<string | null>(props.value);
  const [isChange, setIsChange] = React.useState<boolean>(false);
  // const dispatch = useDispatch<any>();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsChange(false);
  //   setValue(e.target.value);
  //   !!props.name &&
  //     dispatch(
  //       setInputHandleChange({ name: props.name, value: e.target.value })
  //     );
  // };

  // React.useEffect(() => {
  //   if (!!props.editable && !!props.name && !!props.value) {
  //     dispatch(setInputHandleChange({ name: props.name, value: props.value }));
  //     setValue(input[props.name] || props.value);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props.editable, props.name, props.value]);

  // React.useEffect(() => {
  //   if (!!props.editable) {
  //     if (!props.disabled && (value?.length === 0 || !value) && !errors[props.name as keyof TFormStateSlice] && !props?.withoutReset) {
  //       dispatch(setErrorForm({ name: props.name as keyof TErrorSlice, value: "Field cannot be empty" }));
  //     } else if (value && errors[props.name as keyof TFormStateSlice]) {
  //       dispatch(setErrorForm({ name: props.name as keyof TFormStateSlice, value: null }));
  //     }
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [value, props])

  // React.useEffect(() => {
  //   return () => {
  //     setIsChange(false);
  //     !props?.withoutReset && dispatch(resetErrorsForm());
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Stack
      key={`row_${props.name}`}
      direction={"row"}
      sx={{
        position: "relative",
        height: props.multiline ? "auto" : 36,
        width: props.fullWidth ? "100%" : "auto",
        opacity: props.disabled ? 0.3 : 1,
      }}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      {props.label && (
        <Typography variant="body">
          {props.label}:
        </Typography>
      )}
      {props.value && (
        <Typography variant="body">
          {!!props.format && props.value ? props.format : props.value}
        </Typography>
      )}

    </Stack>
  );
};

export default RowCard;
