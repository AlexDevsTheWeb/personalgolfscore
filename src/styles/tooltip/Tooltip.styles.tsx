import { Tooltip as TooltipMui, TooltipProps as TooltipPropsMui } from "@mui/material";
import styled from "styled-components";

interface TooltipProps extends TooltipPropsMui { }

const StyledTooltip = styled(TooltipMui) <TooltipProps>`
  cursor: pointer;
  border: "1px solid black";
  background-color: 'black';
  color: 'white'
`

const Tooltip: React.FC<TooltipProps> = (props) => {
  return (
    <StyledTooltip {...props} placement="right">
      {props.children}
    </StyledTooltip>
  )
}

export default Tooltip;