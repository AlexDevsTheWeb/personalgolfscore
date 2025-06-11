import { keyframes, styled } from "@mui/material";

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg); 
  }
`;

export const SpinnerOverlay = styled('div')`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SpinnerContainer = styled('div')(({ theme }) => ({
	display: 'inline-block',
	width: '75px',
	height: '75px',
	border: `5px solid ${theme.palette.divider}`,
	borderRadius: '50%',
	borderTopColor: theme.palette.primary.main,
	animation: `${spinAnimation} 1s ease-in-out infinite`,
	WebkitAnimation: `${spinAnimation} 1s ease-in-out infinite`,
}));
