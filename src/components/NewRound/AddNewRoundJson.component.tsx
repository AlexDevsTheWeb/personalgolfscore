import Form from '@rjsf/mui';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { generalData } from './json/general.jsonschema';
import { generalUiSchema } from './json/general.jsonUIschema';


const schema: RJSFSchema = generalData;
const uiSchema: UiSchema = generalUiSchema;

const AddNewRoundJson = () => {
  return (
    <Form
      className='xxxx'
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      onChange={(e: RJSFSchema) => console.log('changed: ', e)}
      onSubmit={(e: RJSFSchema) => console.log('submit: ', e.formData)}
      onError={(e: RJSFSchema) => console.log('errors:', e.formData)}
    />
  )
}

export default AddNewRoundJson
