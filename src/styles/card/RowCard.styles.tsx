import * as React from "react";
import { capitalize } from "../../utils/strings/strings.utils";
import { Card, Typography } from "../index";

type RowCardProps = {
  label: string;
  name: string;
  value: string | number;
  head?: boolean;
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

  const [labelName, setLabelName] = React.useState("");

  React.useEffect(() => {
    switch (props.label) {
      case "dob":
        setLabelName(capitalize("date of birth"));
        break;
      case "hcp":
        setLabelName(props.label.toUpperCase());
        break;
      default:
        setLabelName(capitalize(props.label));
        break;
    }
  }, [props])

  return (
    <Card variant={props.head ? 'roundHead' : 'player'}>
      <Typography variant='body'>
        {labelName}
      </Typography>
      <Typography variant='headline6'>
        {props.value}
      </Typography>
    </Card>
  );
};

export default RowCard;
