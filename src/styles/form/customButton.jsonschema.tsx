import { Box, Button, styled } from "@mui/material";
import { SubmitButtonProps, getSubmitButtonOptions } from "@rjsf/utils";

export function ButtonTemplates(props: SubmitButtonProps) {
  const { uiSchema } = props;
  const { norender, submitText } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }

  interface Props { }

  const MyBox = styled(Box)<Props>(() => ({
    border: '2px solid #ff9900',
    marginTop: '-24px'
  }))

  return (
    <MyBox>

      <Button variant="contained" type='submit'>
        {submitText}
      </Button>
    </MyBox>


  );
}