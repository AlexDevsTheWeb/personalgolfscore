import { Box, Typography, capitalize } from "@mui/material";
import ClubBox from "./ClubBox.component";
import BoxClubs from "../../styles/box/BoxClubs.styles";
import { IClubDetails } from "../../types/clubs.types";

interface ClubType {
  typeName: string;
  details: IClubDetails[];
}

const ClubsList = ({ club }: { club: ClubType }) => {
  const { typeName, details } = club;

  return (
    <Box>
      <Typography variant="clubsTypeName">{capitalize(typeName)}</Typography>
      <BoxClubs>
        {details.map((clubDetail, index) => (
          <ClubBox
            key={index}
            details={clubDetail}
            typeName={typeName}
          />
        ))}
      </BoxClubs>
    </Box>
  );
};

export default ClubsList;