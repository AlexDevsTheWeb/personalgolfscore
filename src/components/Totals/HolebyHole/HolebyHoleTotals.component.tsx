import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import BoxGeneralShadow from "../../../styles/box/BoxGeneralShadow.styles";
import RoundsDataShotTable from "../../RoundsData/RoundsDataShotTable.component";
import HolebyHolePutts from "./Putts/HolebyHolePutts.component";
import HolebyHoleTeeShots from "./TeeShots/HolebyHoleTeeShots.component";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const HolebyHoleTotals = () => {

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const { roundTotals } = useSelector((store: RootState) => store.newRound.newRoundTotals);
  const { holes } = useSelector((store: RootState) => store.newRound.newRoundHoles);
  const roundPar = roundTotals.mainData.coursePar;

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <BoxGeneralShadow>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="General stat" {...a11yProps(0)} />
          <Tab label="Tee shots" {...a11yProps(1)} />
          <Tab label="Putts" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <RoundsDataShotTable
          // roundDate={mainData.roundDate}
          // roundCourse={mainData.roundCourse}
          roundPar={roundPar}
          totals={roundTotals}
          holes={holes}

        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <HolebyHoleTeeShots totals={roundTotals} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <HolebyHolePutts totalsPutts={roundTotals.putts} />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel> */}
    </BoxGeneralShadow>
  )
}

export default HolebyHoleTotals
