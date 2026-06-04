import BoxFooter from "@/styles/box/BoxFooter.styles";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { APP_RELEASE_VERSION } from "@/release-info";

const Footer = () => {
  return (
    <BoxFooter>
      <Typography variant='footer'>
        {`${import.meta.env.VITE_APP_NAME} @ ${dayjs().format('YYYY')} - v${APP_RELEASE_VERSION}`}
      </Typography>
    </BoxFooter>
  )
}

export default Footer
