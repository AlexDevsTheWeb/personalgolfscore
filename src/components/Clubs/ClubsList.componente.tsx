import React from 'react'
import { IClub } from '../../types/clubs.types'
import { RowCard, Typography } from '../../styles';
// import Accordion from '@mui/material/Accordion';
import { Accordion, AccordionSummary } from '../../styles';
import AccordionDetails from '@mui/material/AccordionDetails';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { capitalize } from '../../utils/strings/strings.utils';
import { Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';


interface Props {
  index: number
  props: IClub;
}

const ClubsList = (props: Props) => {
  const { name, degree, type, imageURL } = props.props;
  return (
    <>
      {/* <Grid2 container>
        <Grid2 md={10} sx={{ border: "2px solid #ccc", padding: "10px" }}>
          <Typography>{capitalize(type.cat)} - {type.number}</Typography>
        </Grid2>
        <Grid2 md={6} sx={{ border: "2px solid #ccc", padding: "10px" }}>ZZZ</Grid2>
        <Grid2 md={2} sx={{ border: "2px solid #ccc", padding: "10px" }}>ZZZ</Grid2>
        <Grid2 md={2} sx={{ border: "2px solid #ccc", padding: "10px" }}>ZZZ</Grid2>
        <Grid2 md={2} sx={{ border: "2px solid #ccc", padding: "10px" }}>ZZZ</Grid2>
        <Grid2 md={2} sx={{ border: "2px solid #ccc", padding: "10px" }}>ZZZ</Grid2>
      </Grid2> */}
      <Accordion sx={{ width: "auto", minWidth: "150px" }}>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <RowCard name="" label="" value={`${capitalize(type.cat)} ${type.number}`} />
        </AccordionSummary>
        <AccordionDetails>
          <RowCard name={"Name"} label={"Name"} value={capitalize(name)} />
          <Typography>{`Name: ${capitalize(name)}`}</Typography>
          <Typography>{`Loft: ${degree}`}</Typography>
          {
            imageURL &&
            <Box
              component="img"
              sx={{
                height: "auto",
                width: 350,
                maxWidth: { xs: 350, md: 250 },
              }}
              alt={`${capitalize(type.cat)} ${type.number} - ${capitalize(name)}`}
              src={imageURL}
            />
          }

        </AccordionDetails>
      </Accordion>
    </>

  )
}

export default ClubsList
