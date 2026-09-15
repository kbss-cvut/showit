import React from "react";
import { Box, Typography } from "@mui/material";
import { ReactComponent as NoData } from "../../assets/no_data.svg";
import theme from "../../app/theme";

const EmptyTerm: React.FC = () => {
  return (
    <Box style={{ textAlign: "center" }} mt={4}>
      <NoData
        style={{
          maxHeight: 280,
          maxWidth: "80%",
          marginBottom: 30,
          color: theme.palette.primary.main,
        }}
      />
      <Box>
        <Typography variant="h4">
          Víc informací bohužel není k dispozici
        </Typography>
      </Box>
    </Box>
  );
};
export default EmptyTerm;
