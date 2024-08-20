import { Form } from "@rjsf/mui";
import { RJSFSchema, UiSchema } from '@rjsf/utils';

import styled from "styled-components";
import useDeviceDetection from "../../hooks/useDeviceDetection.hook";

interface IFormProps {
  schema: RJSFSchema,
  uiSchema: UiSchema,
  validator: any,
  onChange?: any,
  formData?: any,
  onSubmit: any,
  onError: any,
  templates: any
}

const StyledForm = styled(Form)<IFormProps>(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 10,
  width: '100%',
  ...(useDeviceDetection().isMobile && {
    flexDirection: 'column',
  }),
}));

const GeneralForm: React.FC<IFormProps> = props => {
  return (
    <StyledForm {...props} />
  )
}

export default GeneralForm
