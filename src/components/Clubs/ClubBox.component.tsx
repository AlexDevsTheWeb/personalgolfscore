import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { ClubTypography } from '../../styles';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import DoNotDisturbAltTwoToneIcon from '@mui/icons-material/DoNotDisturbAltTwoTone';
import SportsGolfTwoToneIcon from '@mui/icons-material/SportsGolfTwoTone';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Button } from '@mui/material';

export default function ClubBox(props: any) {
  const { totalClubs } = useSelector((store: RootState) => store.clubs);
  const { name, clubNumber, imageURL, selected } = props.details;

  return (
    <Card variant={!!selected ? 'clubs' : 'disabled'}>
      <CardMedia
        image={imageURL}
        title={name}
      />
      <CardContent>
        <ClubTypography details={props.details} typename={props.typename} />
        <CardActions>
          {selected && !!selected && totalClubs < 14
            ?
            <>
              <CheckCircleOutlineTwoToneIcon
                color='success'
              />
              <Button
                variant='link'
                size='small'
                startIcon={<SportsGolfTwoToneIcon />}
                onClick={() => props.handleAddRemoveClubs(name, clubNumber, selected)}
              >
                REMOVE
              </Button>
            </>
            :
            <>
              <DoNotDisturbAltTwoToneIcon color='error' />
              {
                totalClubs < 14 &&
                <Button variant='link'
                  size='small'
                  startIcon={<SportsGolfTwoToneIcon />}
                  onClick={() => props.handleAddRemoveClubs(name, clubNumber, selected)}
                >
                  INSERT
                </Button>
              }
            </>
          }
        </CardActions>
      </CardContent>

    </Card >
  );
}