import BoxFooter from "@/styles/box/BoxFooter.styles";
import { Typography } from "@mui/material";
import dayjs from "dayjs";

const RELEASE_VERSION = import.meta.env.VITE_APP_RELEASE_VERSION ?? 'dev';

const Footer = () => {
  return (
    <BoxFooter>
      <Typography variant='footer'>
        {`${import.meta.env.VITE_APP_NAME} @ ${dayjs().format('YYYY')} - ${RELEASE_VERSION}`}
      </Typography>
    </BoxFooter>
  )
}

export default Footer
