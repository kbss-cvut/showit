import React, { useState } from "react";
import { ReactComponent as Copy } from "../../assets/copy_small.svg";
import {
  Box,
  Button,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
  styled,
} from "@mui/material";

export interface IriItem {
  iri: string;
}

const Content = React.forwardRef((props: any, ref: any) => {
  return (
    <Button {...props} ref={ref} variant="text" color="secondary">
      <Box display="flex">
        <Copy style={{ maxHeight: 33, marginRight: 16 }} />
        <Typography variant="h5" color="textSecondary">
          IRI
        </Typography>
      </Box>
    </Button>
  );
});

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    children={props.children}
  />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "none",
  },
});

const IRI: React.FC<IriItem> = (props) => {
  const [title, setTitle] = useState(`${props.iri}`);
  const click = () => {
    navigator.clipboard
      .writeText(props.iri)
      .then(() => setTitle(`Zkopírováno: ${props.iri}`));
  };
  return (
    <NoMaxWidthTooltip title={title} arrow>
      <Content onClick={click} />
    </NoMaxWidthTooltip>
  );
};

export default IRI;
