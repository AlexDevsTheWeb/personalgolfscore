import { Box } from "@mui/material"
import { RJSFSchema, UiSchema } from "@rjsf/utils"
import validator from "@rjsf/validator-ajv8"
import BoxInternal from "../../styles/box/BoxInternal.styles"
import { ButtonTemplates } from "../../styles/form/customButton.jsonschema"
import { ObjectFieldTemplate } from "../../styles/form/customObject.jsonschema"
import GeneralForm from "../../styles/form/GeneralForm.styles"
import { roundHolesSchema } from "./json/roundHoles/roundHoles.schema"
import { roundHolesUISchema } from "./json/roundHoles/roundHoles.UIschema"

const AddSingleHoleJson = () => {

  const schema: RJSFSchema = roundHolesSchema;
  const uiSchema: UiSchema = roundHolesUISchema;

  const handleSubmit = (e: RJSFSchema) => { console.log('submit single hole') }

  return (
    <BoxInternal sx={{ border: '2px solid #000', padding: '20px' }}>
      <Box>
        <GeneralForm
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          // onChange={() => { }}
          onSubmit={(e: RJSFSchema) => handleSubmit(e)}
          onError={(e: RJSFSchema) => console.log('errors:', e.formData)}
          templates={{ ObjectFieldTemplate, ButtonTemplates: { ButtonTemplates } }}
        />
      </Box>
      <Box sx={{ border: '2px solid #00ff99', padding: '5px', height: '100px' }}>

      </Box>
    </BoxInternal>
  )
}

export default AddSingleHoleJson
