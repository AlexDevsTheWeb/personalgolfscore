import { capitalize } from "@/utils/strings/strings.utils";
import { Paper, Typography as TypographyMui, TypographyProps as TypographyPropsMui, styled } from "@mui/material";
import * as React from "react";
interface TypographyProps extends TypographyPropsMui {
  details: any,
  typeName: string,
}

const StyledTypography = styled(TypographyMui)({})

const ClubTypography: React.FC<TypographyProps> = props => {

  const { typeName, details: { name, loft, clubNumber, selected } } = props;

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
                ? `${capitalize(clubNumber)} ${capitalize(typeName)}`
                : `${capitalize(typeName)} ${clubNumber}`
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