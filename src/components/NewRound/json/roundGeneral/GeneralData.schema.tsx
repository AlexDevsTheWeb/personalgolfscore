import { RJSFSchema } from "@rjsf/utils";

export const generalData: RJSFSchema =
{
  "section": "test",
  "title": 'Round General Data',
  "required": [
    "roundCourse",
  ],
  "properties": {
    "roundCourse": {
      "type": 'string'
    },
    "roundDate": {
      "type": 'string',
      "format": 'date',
    },
    "roundTee": { "type": 'string' },
    "roundHoles": {
      "type": "number",
    },
    "roundPar": { "type": 'number' },
    "roundPlayingHCP": { "type": 'number' },
    "roundStrokes": { "type": 'number' },

  },

}