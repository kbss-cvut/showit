import React from "react";
import { styled, Typography, TypographyProps } from "@mui/material";

interface MaxLineTextProp {
  maxlines: number;
}
const MaxLineText: React.FC<TypographyProps & MaxLineTextProp> = (props) => {
  const Text = styled(Typography)(() => ({
    position: "relative",
    display: "-webkit-box",
    WebkitLineClamp: props.maxlines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "& em": {
      fontStyle: "normal",
      fontWeight: 600,
    },
  }));
  return <Text {...props}>{props.children}</Text>;
};

export default MaxLineText;
