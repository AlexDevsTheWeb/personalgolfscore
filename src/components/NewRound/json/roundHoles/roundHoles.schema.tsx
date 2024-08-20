import { RJSFSchema } from "@rjsf/utils";
import { fairwayValues, greenSideValues, hcpList18, parList } from "../../../../utils/constant.utils";

export const roundHolesSchema: RJSFSchema =
{
  "properties": {
    "firstRow": {
      "type": "object",
      "title": "First Row",
      "properties": {
        "hcp": {
          "type": "number",
          "enum": hcpList18
        },
        "par": {
          "type": "number",
          "enum": parList
        },
        "strokes": {
          "type": "number"
        },
        "putts": {
          "type": "number"
        },
      }
    },
    "secondRow": {
      "type": "object",
      "title": "Second Row",
      "properties": {
        "fairway": {
          "type": "string",
          "enum": fairwayValues
        },
        // "teeClub": {
        //   "type": "number",
        //   "enum": teeClubs,
        // },
        // "driveDistance": {
        //   "type": "number",
        // },
        // "toGreen": {
        //   "type": "number",
        //   "enum": greenClubs,
        // },
        // "mtToGreen": {
        //   "type": "number",
        // }
      },
    },
    "thirRow": {
      "type": "object",
      "title": "Third Row",
      "properties": {
        "greenSide": {
          "type": "string",
          "enum": greenSideValues
        },
        // "chipClub": {
        //   "type": "number",
        //   "enum": chipClubs,
        // },
        "firstPutt": {
          "type": "number",
        },
        "secondPutt": {
          "type": "number",
        },
        "thirdPutt": {
          "type": "number",
        },
      },
    },
    "fourthRow": {
      "type": "object",
      "title": "Gourth Row",
      "properties": {
        "sand": {
          "type": "number",
        },
        "water": {
          "type": "number",
        },
        "out": {
          "type": "number",
        },
      },
    },
  }
}

