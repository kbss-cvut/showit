import React from "react";
import { DotLoader } from "react-spinners";
import theme from "../app/theme";
import { Box, Typography, TypographyProps } from "@mui/material";

interface LoaderProps {
  size?: number;
}

const Loader: React.FC<LoaderProps & TypographyProps> = (props) => {
  return (
    <Box flex={1} display="flex" alignItems="center" justifyContent="center">
      <DotLoader color={theme.palette.primary.main} size={props.size} />
      <Box pl={3}>
        <Typography variant="h2" {...props}>
          Načítání
        </Typography>
      </Box>
    </Box>
  );
};

Loader.defaultProps = {
  size: 150,
};
export default Loader;
