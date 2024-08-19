import { UiSchema } from "@rjsf/utils";

export const generalUiSchema: UiSchema = {
  "roundCourse": {
    "ui:title": "Course name",
    "ui:autofocus": true,
    "ui:emptyValue": "",
    "ui:autocomplete": "family-name"
  },
  "roundDate": { "ui:title": "Round date", },
  "roundTee": { "ui:title": "Round starting Tees", },
  "roundHoles": {
    "ui:title": "Holes number",
    "ui:widget": "range"
  },
  "roundPar": { "ui:title": "Course par", },
  "roundPlayingHCP": { "ui:title": "Player HCP", },
  "roundStrokes": { "ui:title": "Player strokes", }
};