import { Tooltip as TooltipMui, TooltipProps as TooltipPropsMui, styled } from "@mui/material";

interface TooltipProps extends TooltipPropsMui { }

const StyledTooltip = styled(TooltipMui) <TooltipProps>`
  cursor: pointer;
  border: "1px solid black";
  background-color: 'black';
  color: 'white'
`

const Tooltip: React.FC<TooltipProps> = (props) => {
  return (
    <StyledTooltip {...props} placement="left">
      {props.children}
    </StyledTooltip>
  )
}

export default Tooltip;