import { Button } from "@mui/material";
import { SubmitButtonProps, getSubmitButtonOptions } from "@rjsf/utils";

export function ButtonTemplates(props: SubmitButtonProps) {
  const { uiSchema } = props;
  const { norender, submitText } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }

  return (
    <Button variant="contained" type='submit'>
      {submitText}
    </Button>
  );
}