import { AccordionSummary as AccordionSummaryMui, AccordionSummaryProps as AccordionSummaryPropsMui } from '@mui/material';
import styled from 'styled-components';
import * as React from 'react';

type AccordionSummaryProps = AccordionSummaryPropsMui;

const StyledCard = styled(AccordionSummaryMui)<AccordionSummaryProps>({})

const AccordionSummary: React.FC<AccordionSummaryProps> = props => {
  return (
    <StyledCard {...props}>{props.children}</StyledCard>
  )
};

export default AccordionSummary;