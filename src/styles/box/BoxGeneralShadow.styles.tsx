import Box, { BoxProps as BoxPropsMui } from '@mui/material/Box';
import { styled } from '@mui/material/styles'; // Import Theme
import { CSSObject } from '@mui/system'; // Import CSSObject
import { Property } from 'csstype'; // Import Property from csstype
import * as React from 'react';

// Rename interface to avoid potential conflicts
interface CustomBoxProps extends BoxPropsMui {
  direction?: Property.FlexDirection; // Use specific FlexDirection type
};

// Correctly receive theme and props
// Simplify the function signature, relying on type inference from <CustomBoxProps>
// Add explicit return type CSSObject
const StyledBox = styled(Box)<CustomBoxProps>(({ theme, direction }): CSSObject => ({
  display: 'flex',
  flexDirection: direction || 'row', // Now correctly typed
  flexWrap: 'wrap',
  alignContent: 'stretch',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  gap: '10px', // Re-added gap
  border: `1px solid ${theme.palette.divider}`, // Correctly use theme.palette.divider
  boxShadow: theme.shadows[1], // Use theme shadows
  padding: '10px', // Re-added padding
  rowGap: '8px', // Re-added row-gap
  borderRadius: '8px',
}));

// Use the renamed interface here as well
const BoxGeneralShadow: React.FC<CustomBoxProps> = props => {
  return (
    <StyledBox {...props}>{props.children}</StyledBox>
  )
};

export default BoxGeneralShadow;