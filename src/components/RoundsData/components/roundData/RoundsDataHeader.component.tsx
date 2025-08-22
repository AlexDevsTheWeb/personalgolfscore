import StackHolesPoints from "@/styles/stack/StackHolesPoints.styles";
import { IRoundMainDataProp } from "@/types/props.types";
import { Box, Card, CardActionArea, CardActions, CardContent, CardHeader, Stack, Typography } from "@mui/material";
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
  const roundStrokes = totals?.score?.totals;

  const score = roundStrokes ? Number(roundStrokes) : 0;
  const overParNet = roundStrokes ? score - par : 0;
  const overParGross = roundStrokes ? score - (par + playingHCP) : 0;
  const formattedDate = roundDate ? dayjs(roundDate).format('DD/MM/YYYY') : 'N/A';

  const handleCardActionAreaClick = () => {
    navigate(`/round/${id}`);
  };

  return (

    <Stack gap={3}>
      <CardActionArea onClick={handleCardActionAreaClick}>
        <Card>
          <CardHeader title={`${roundCourse}`} />
          <CardContent sx={{ py: 0 }}>
            <Box sx={{ display: 'flex', gap: 4, flexDirection: 'row' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>{formattedDate}</Typography>
                <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 14 }}>
                  {`Par: ${par} | HCP: ${playingHCP} | Holes: ${roundHoles}`}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <StackHolesPoints round={round} />
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </CardActionArea>
    </Stack>

  )
}

export default RoundsDataHeader
