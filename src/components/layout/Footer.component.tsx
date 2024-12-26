import BoxFooter from "@/styles/box/BoxFooter.styles";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import packageJson from "../../../package.json";

const Footer = () => {
  return (
    <BoxFooter>
      <Typography variant='footer'>
        {`${import.meta.env.VITE_APP_NAME} @ ${dayjs().format('YYYY')} - v.${packageJson.version}`}
      </Typography>
    </BoxFooter>
  )
}

export default Footer
