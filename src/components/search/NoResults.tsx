import React from "react";
import { Box, Typography } from "@mui/material";
import { ReactComponent as Empty } from "../../assets/empty.svg";
import theme from "../../app/theme";

const NoResults: React.FC = () => {
  return (
    <Box style={{ textAlign: "center" }} pt={2}>
      <Empty
        style={{
          maxHeight: 330,
          maxWidth: "80%",
          marginBottom: 30,
          color: theme.palette.primary.main,
        }}
      />
      <Typography variant="h2">Nebyly nalezeny žádné výsledky</Typography>
    </Box>
  );
};

export default NoResults;
