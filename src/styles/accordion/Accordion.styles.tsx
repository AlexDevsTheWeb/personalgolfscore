import { Accordion as AccordionMui, AccordionProps as AccordionPropsMui } from '@mui/material';
import styled from 'styled-components';
import * as React from 'react';

type AccordionProps = AccordionPropsMui;

const StyledCard = styled(AccordionMui)<AccordionProps>({})

const Accordion: React.FC<AccordionProps> = props => {
  return (
    <StyledCard {...props}>{props.children}</StyledCard>
  )
};

export default Accordion;