import { Box, Typography } from "@mui/material";
import { ObjectFieldTemplateProps } from "@rjsf/utils";
import BoxInternal from "../box/BoxInternal.styles";

export function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {

  console.log("props ---> ", props);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>

      <Typography>{props.schema.title}</Typography>
      <BoxInternal>
        {props.properties.map((element, index) => (
          <div key={index} className={`obj_${index}`}>{element.content}</div>
        ))}
      </BoxInternal>
    </Box>
  );
}
