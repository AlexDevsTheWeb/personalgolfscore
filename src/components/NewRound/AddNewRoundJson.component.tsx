import { RJSFSchema, UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { useDispatch } from 'react-redux';
import { setRoundMainData } from '../../features/newRound/newRoundMain.slice';
import BoxGeneralShadow from '../../styles/box/BoxGeneralShadow.styles';
import { ButtonTemplates } from '../../styles/form/customButton.jsonschema';
import { ObjectFieldTemplate } from '../../styles/form/customObject.jsonschema';
import GeneralForm from '../../styles/form/GeneralForm.styles';
import { formData as dataForm } from './json/roundGeneral/GeneralData.data';
import { generalData as dataSchema } from './json/roundGeneral/GeneralData.schema';
import { generalUiSchema as dataUISchema } from './json/roundGeneral/GeneralData.UIschema';

const schema: RJSFSchema = dataSchema;
const uiSchema: UiSchema = dataUISchema;
const formData = dataForm;

const AddNewRoundJson = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e: RJSFSchema) => {
    const { roundDate, roundCourse, roundHoles, roundTee, roundPar, roundPlayingHCP, roundNumber } = e.formData;
    dispatch(setRoundMainData({
      newRound: {
        roundID: '',
        roundDate: roundDate,
        roundCourse: roundCourse,
        roundHoles: roundHoles,
        roundTee: roundTee,
        roundPar: roundPar,
        roundPlayingHCP: roundPlayingHCP,
        roundNumber: roundNumber,
      }
    }));
  };

  return (
    <BoxGeneralShadow direction={'column'}>
      <GeneralForm
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        formData={formData}
        onSubmit={(e: RJSFSchema) => handleSubmit(e)}
        onError={(e: RJSFSchema) => console.log('errors:', e.formData)}
        templates={{ ObjectFieldTemplate, ButtonTemplates: { ButtonTemplates } }}
      />
    </BoxGeneralShadow>
  )
}

export default AddNewRoundJson
