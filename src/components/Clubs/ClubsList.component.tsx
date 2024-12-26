import { updateClub, updateClubSelection } from "@/features/golfBag/golfBag.slice";
import BoxClubs from "@/styles/box/BoxClubs.styles";
import { IClub } from "@/types/clubs.types";
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import DoNotDisturbAltTwoToneIcon from '@mui/icons-material/DoNotDisturbAltTwoTone';
import SportsGolfTwoToneIcon from '@mui/icons-material/SportsGolfTwoTone';
import { Box, Button, TextField, Typography, capitalize } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ClubTypography } from "../../styles";

const ClubsList = (props: any) => {
  const { typeName, details } = props;
  const dispatch = useDispatch<any>();

  const [isEditing, setIsEditing] = useState(false);

  const handleSelectClub = (clubDetail: IClub) => {
    dispatch(updateClubSelection({ ...clubDetail, selected: !clubDetail.selected, typeName: typeName }));
  };

  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleClubChange = (clubName: string, propertyName: string, newValue: string) => {
    dispatch(updateClub({ clubName, propertyName, newValue, typeName }));
  };

  return (
    <Box>
      <Typography variant="clubsTypeName">{capitalize(typeName)}</Typography>
      <BoxClubs>
        {details.map((clubDetail: IClub, index: number) => {
          const { name, imageURL, selected } = clubDetail;
          return (
            <Card variant={selected ? 'clubs' : 'disabled'} key={index}>
              <CardMedia
                image={imageURL}
                title={name}
                component={'img'}
                className={selected ? '' : 'disabled'}
              />
              <CardContent>
                {isEditing
                  ? <TextField
                    label="Name"
                    variant="outlined"
                    value={clubDetail.name} // Assuming name is stored in clubDetail
                    onChange={(event) => handleClubChange(clubDetail.name, "name", event.target.value)} // Update handler function
                  />
                  : <ClubTypography typeName={typeName} details={clubDetail} />}

                <CardActions>
                  {selected ? (
                    <>
                      <CheckCircleOutlineTwoToneIcon color='success' />
                      <Button
                        variant='link'
                        size='small'
                        startIcon={<SportsGolfTwoToneIcon />}
                        onClick={() => handleSelectClub(clubDetail)}
                      >
                        REMOVE
                      </Button>
                    </>
                  ) : (
                    <>
                      <DoNotDisturbAltTwoToneIcon color='error' />
                      <Button
                        variant='link'
                        size='small'
                        startIcon={<SportsGolfTwoToneIcon />}
                        onClick={() => handleSelectClub(clubDetail)}
                      >
                        INSERT
                      </Button>
                    </>
                  )}
                  <Button variant="link" size="small" onClick={handleEditToggle}>
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          )
        })}
      </BoxClubs>
      <Button variant="contained" onClick={handleEditToggle}>
        {isEditing ? "Save Changes" : "Edit All Clubs"}
      </Button>
    </Box>
  );
};

export default ClubsList;