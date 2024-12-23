import AllRoundsGeneral from '@/components/Totals/AllRounds/General/AllRoundsGeneral.component';
import useDeviceDetection from "@/hooks/useDeviceDetection.hook";
import { IAllRoundsTotalsProps, TabPanelProps } from "@/types/props.types";
import { Box, Tab, Tabs, useTheme } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import React from "react";

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

const TotalsStatistics = ({ newTotals: { newTotals } }: IAllRoundsTotalsProps) => {
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
        <AllRoundsGeneral newTotals={newTotals} />
      </TabPanel>

      {/* <TabPanel value={value} index={1} dir={theme.direction}>
        <AllRoundsTeeShots roundTotals={roundTotals} />
      </TabPanel>

      <TabPanel value={value} index={2} dir={theme.direction}>
        <AllRoundsFwAndIrons roundTotals={roundTotals} />
      </TabPanel>

      <TabPanel value={value} index={3} dir={theme.direction}>
        <AllRoundsInside100 roundTotals={roundTotals} />
      </TabPanel>

      <TabPanel value={value} index={4} dir={theme.direction}>
        <AllRoundsChipping roundTotals={roundTotals} />
      </TabPanel>

      <TabPanel value={value} index={5} dir={theme.direction}>
        <AllRoundsPutts totalsPutts={roundTotals.putts} />
      </TabPanel> */}
    </Box>
  )
}

export default TotalsStatistics
