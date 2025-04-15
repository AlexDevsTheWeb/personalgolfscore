import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionSummary as AccordionSummaryMui, AccordionSummaryProps as AccordionSummaryPropsMui, styled } from "@mui/material";
import _ from 'lodash';
import * as React from "react";

type AccordionSummaryProps = AccordionSummaryPropsMui & {};

const StyledAccordionSummary = styled(AccordionSummaryMui)<AccordionSummaryProps>((props) => ({
  backgroundColor: '#00000014',
  borderRadius: 0,
  boxShadow: 'none',
  border: 'none',
  height: '40px'
}));

const AccordionSummary: React.FC<AccordionSummaryProps> = (props) => {
  return (
    <StyledAccordionSummary
      {...props}
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id={_.uniqueId("panel1-content-")}
    >
      {props.children}
    </StyledAccordionSummary>
  );
};

export default AccordionSummary;