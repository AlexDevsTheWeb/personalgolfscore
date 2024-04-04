import { Box, Typography, capitalize } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import BoxClubs from "../../styles/box/BoxClubs.styles";
import { ClubTypography } from "../../styles";
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import DoNotDisturbAltTwoToneIcon from '@mui/icons-material/DoNotDisturbAltTwoTone';
import SportsGolfTwoToneIcon from '@mui/icons-material/SportsGolfTwoTone';
import { Button } from '@mui/material';
import { IClub } from "../../types/clubs.types";
import { useDispatch } from "react-redux";
import { updateClubSelection } from "../../features/golfBag/golfBag.slice";

const ClubsList = (props: any) => {
  const { typeName, details } = props;
  const dispatch = useDispatch<any>();

  const handleSelectClub = (clubDetail: IClub) => {
    dispatch(updateClubSelection({ ...clubDetail, selected: !clubDetail.selected, typeName: typeName }));
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
                <ClubTypography typeName={typeName} details={clubDetail} />
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
                </CardActions>
              </CardContent>
            </Card>
          )
        })}
      </BoxClubs>
    </Box>
  );
};

export default ClubsList;