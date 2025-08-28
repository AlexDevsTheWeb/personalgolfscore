// import ShotsTableHeaderStack from '@/components/RoundsData/components/shotsTable/ShotsTableHeaderStack.component';
// import { Stack as StackMui, StackProps as StackPropsMui, Typography, styled } from '@mui/material';
// import * as React from 'react';

// type StackProps = StackPropsMui & {
//   name: string,
//   value: string | number,
// };

// const StyledStack = styled(StackMui)<StackProps>(() => ({
//   rowGap: 2,
// }));

// const StackHoles: React.FC<StackProps> = props => {
//   const { name, value } = props;

//   return (
//     <StyledStack {...props}>
//       <ShotsTableHeaderStack firstRow={name} secondRow={''} />
//       <Typography sx={{ padding: '2px !important', textAlign: 'center', }}>
//         {value}
//       </Typography>
//     </StyledStack>
//   )
// };

// export default StackHoles;