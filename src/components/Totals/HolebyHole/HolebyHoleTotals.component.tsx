import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import { IRoundTotalsProps, TabPanelProps } from "@/types/props.types";
import { Box, Tab, Tabs, useTheme } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import React from "react";
import HolebyHoleChipping from "./ChippingPitching/HolebyHoleChipping.component";
import HolebyHoleFwAndIrons from "./FairwayWoodAndIrons/HolebyHoleFwAndIrons.component";
import HolebyHoleGeneral from "./General/HolebyHoleGeneral.component";
import HolebyHoleInside100 from "./Inside100mt/HolebyHoleInside100.component";
import HolebyHolePutts from "./Putts/HolebyHolePutts.component";
import HolebyHoleTeeShots from "./TeeShots/HolebyHoleTeeShots.component";

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

const HolebyHoleTotals = ({ roundTotals, dashboard }: IRoundTotalsProps) => {
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
          variant={useDeviceDetection().isMobile ? 'scrollable' : 'fullWidth'}
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs"
        >
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Tee shots" {...a11yProps(1)} />
          <Tab label="Fw Woods & Irons" {...a11yProps(2)} />
          <Tab label="Inside 100mt" {...a11yProps(3)} />
          <Tab label="Pitching & Chipping" {...a11yProps(4)} />
          <Tab label="Putts" {...a11yProps(5)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <HolebyHoleGeneral roundTotals={roundTotals} dashboard={dashboard} />
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
        <HolebyHoleTeeShots roundTotals={roundTotals} />
      </TabPanel>

      <TabPanel value={value} index={2} dir={theme.direction}>
        <HolebyHoleFwAndIrons roundTotals={roundTotals} />
      </TabPanel>

      <TabPanel value={value} index={3} dir={theme.direction}>
        <HolebyHoleInside100 roundTotals={roundTotals} />
      </TabPanel>

      <TabPanel value={value} index={4} dir={theme.direction}>
        <HolebyHoleChipping roundTotals={roundTotals} />
      </TabPanel>

      <TabPanel value={value} index={5} dir={theme.direction}>
        <HolebyHolePutts totalsPutts={roundTotals.putts} />
      </TabPanel>
    </Box>
  )
}

export default HolebyHoleTotals
