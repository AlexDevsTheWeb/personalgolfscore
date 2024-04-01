import * as React from "react";
import { Paper, Typography as TypographyMui, TypographyProps as TypographyPropsMui } from "@mui/material";
import styled from "styled-components";
import { IClubDetails } from "../../types/clubs.types";
import { capitalize } from "../../utils/strings/strings.utils";

interface TypographyProps extends TypographyPropsMui {
  details: IClubDetails,
  typename: string,
}

const StyledTypography = styled(TypographyMui)({})

const ClubTypography: React.FC<TypographyProps> = props => {

  const { name, loft, clubNumber, selected } = props.details;
  const { typename } = props;

  return (
    <>
      <Paper variant={!!selected ? 'clubs' : 'disabled'}>
        <StyledTypography {...props} variant='clubsTypeName'>
          {name}
        </StyledTypography>
        {
          (clubNumber !== 1 && clubNumber !== 0)
            ? <StyledTypography {...props} variant='subheadline2'>
              {`${typeof clubNumber === 'string'
                ? `${capitalize(clubNumber)} ${capitalize(typename)}`
                : `${capitalize(typename)} ${clubNumber}`
                }`}
            </StyledTypography>
            : null
        }
      </Paper>
      <Paper variant='clubsLoft'>
        {clubNumber !== 0
          ? <StyledTypography {...props} variant='body'>
            {`Loft: ${loft}°`}
          </StyledTypography>
          : <StyledTypography {...props} variant='body' />
        }
      </Paper>

    </>

  )
}

export default ClubTypography;