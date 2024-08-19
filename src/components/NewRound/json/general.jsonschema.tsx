import { RJSFSchema } from "@rjsf/utils";

export const generalData: RJSFSchema =
{
  "section": "test",
  "title": 'Round General Data',
  "required": [
    "roundCourse",
  ],
  "properties": {
    "roundCourse": { "type": 'string' },
    "roundDate": {
      "type": 'string',
      "format": 'date',
    },
    "roundTee": { "type": 'string' },
    "roundHoles": {
      "title": "Integer range",
      "type": "integer",
      "minimum": 1,
      "maximum": 18
    },
    "roundPar": { "type": 'number' },
    "roundPlayingHCP": { "type": 'number' },
    "roundStrokes": { "type": 'number' },

  },

}