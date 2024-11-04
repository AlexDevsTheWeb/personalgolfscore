import { UiSchema } from "@rjsf/utils";

export const generalUiSchema: UiSchema = {
  "ui:submitButtonOptions": {
    "submitText": "submit",
    "norender": false,
    "props": {
      "disabled": false,
    }
  },
  "roundCourse": {
    "ui:title": "Course name",
    "ui:autofocus": true,
    "ui:emptyValue": "",
    "ui:autocomplete": "family-name"
  },
  "roundDate": { "ui:title": "Round date", },
  "roundNumber": { "ui:title": "Round number", },
  "roundTee": { "ui:title": "Round starting Tees", },
  "roundHoles": {
    "ui:title": "Holes number",
  },
  "roundPar": { "ui:title": "Course par", },
  "roundPlayingHCP": { "ui:title": "Player HCP", },

};