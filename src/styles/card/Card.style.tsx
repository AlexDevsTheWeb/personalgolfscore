import { Card as CardMui, CardProps as CardPropsMui } from '@mui/material';
import styled from 'styled-components';
import * as React from 'react';

type CardProps = CardPropsMui;

const StyledCard = styled(CardMui)<CardProps>({})

const Card: React.FC<CardProps> = props => {
  return (
    <StyledCard {...props}>{props.children}</StyledCard>
  )
};

export default Card;