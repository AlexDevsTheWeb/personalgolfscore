import StackHolesPoints from "@/styles/stack/StackHolesPoints.styles";
import { IRoundMainDataProp } from "@/types/props.types";
import { Card, CardActionArea, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const RoundsDataHeader = ({ round }: IRoundMainDataProp) => {
  const navigate = useNavigate();
  const {
    id,
    roundCourse,
    roundDate,
    roundPar,
    roundTee,
    roundPlayingHCP,
    roundHoles,
    totals,
  } = round;

  const par = Number(roundPar);
  const playingHCP = Number(roundPlayingHCP);
  const formattedDate = roundDate ? dayjs(roundDate).format('DD/MM/YYYY') : 'N/A';
  const location = window.location.pathname;

  const handleCardActionAreaClick = () => {
    if (location === `/dashboard`) {
      navigate(`/round/${id}`);
    };
  };

  return (

    <CardActionArea onClick={handleCardActionAreaClick} sx={{
      cursor: location === `/dashboard` ? 'pointer' : 'default', widht: '100%'
    }}>
      <Card>
        <CardHeader title={`${roundCourse}`} subheader={`${formattedDate}`} />
        <CardContent sx={{ py: 0 }}>

          <Grid container spacing={1} columns={{ xs: 1, sm: 12 }} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 14 }}>
                {`Par: ${par} | HCP: ${playingHCP} | Holes: ${roundHoles}`}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <StackHolesPoints round={round} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </CardActionArea>

  )
}

export default RoundsDataHeader
