import { Box } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

const Footer = () => {

  const [year, setYear] = useState(dayjs().format('YYYY'));

  console.log(dayjs().format('YYYY'))
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: '#ddd', padding: '20px', bottom: '0', justifyContent: 'center' }}>
      {`Footer ${year}`}
    </Box>
  )
}

export default Footer
