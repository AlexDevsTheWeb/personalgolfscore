import { Card as CardMui, CardProps as CardPropsMui } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../theme/Breakpoints.theme';

interface ICardProps extends CardPropsMui { };

const StyledCard = styled(CardMui)<ICardProps>({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignContent: 'center',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: 'none',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#f5f5f5',
  borderRadius: 0,
  padding: 10,
  width: '48%',
  [`@media (max-width:${breakpoints.values.md - 1}px)`]: {
    flexDirection: 'row',
    width: '100%',
  },
})

const Card: React.FC<ICardProps> = props => {
  return (
    <StyledCard {...props}>{props.children}</StyledCard>
  )
};

export default Card;