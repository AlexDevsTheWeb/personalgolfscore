import { Box, Tab, Tabs, useTheme } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import HolebyHoleChipping from "./ChippingPitching/HolebyHoleChipping.component";
import HolebyHoleGeneral from "./General/HolebyHoleGeneral.component";
import HolebyHolePutts from "./Putts/HolebyHolePutts.component";
import HolebyHoleTeeShots from "./TeeShots/HolebyHoleTeeShots.component";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ width: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const HolebyHoleTotals = () => {
  const { roundTotals } = useSelector((store: RootState) => store.newRound.newRoundTotals);

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Tee shots" {...a11yProps(1)} />
          <Tab label="Fairway Woods & Irons" {...a11yProps(2)} />
          <Tab label="Inside 100mt" {...a11yProps(3)} />
          <Tab label="Pitching & Chipping" {...a11yProps(4)} />
          <Tab label="Putts" {...a11yProps(5)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <HolebyHoleGeneral />
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
        <HolebyHoleTeeShots totals={roundTotals} />
      </TabPanel>

      <TabPanel value={value} index={2} dir={theme.direction}>
        {/* <HolebyHoleTeeShots totals={roundTotals} /> */}
      </TabPanel>

      <TabPanel value={value} index={3} dir={theme.direction}>
        {/* <HolebyHoleTeeShots totals={roundTotals} /> */}
      </TabPanel>

      <TabPanel value={value} index={4} dir={theme.direction}>
        <HolebyHoleChipping totals={roundTotals} />
      </TabPanel>

      <TabPanel value={value} index={5} dir={theme.direction}>
        <HolebyHolePutts totalsPutts={roundTotals.putts} />
      </TabPanel>
    </Box>
  )
}

export default HolebyHoleTotals
