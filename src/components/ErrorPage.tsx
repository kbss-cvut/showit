import React from "react";
import { Box, Typography } from "@mui/material";
import { ReactComponent as NotFound } from "../assets/404.svg";
import theme from "../app/theme";

const ErrorPage: React.FC = () => {
  return (
    <Box
      flex={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <NotFound
        style={{
          maxHeight: 330,
          maxWidth: "80%",
          marginBottom: 30,
          color: theme.palette.primary.main,
        }}
      />
      <Box pl={3}>
        <Typography variant="h2" color={theme.palette.common.black}>
          Stránka nebyla nalezena
        </Typography>
      </Box>
    </Box>
  );
};

export default ErrorPage;
