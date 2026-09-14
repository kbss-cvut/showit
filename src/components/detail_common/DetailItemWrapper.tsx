import React from "react";
import { Box, Container, Typography } from "@mui/material";

interface DetailItemWrapperProps {
  title: string;
}

const DetailItemWrapper: React.FC<DetailItemWrapperProps> = (props) => {
  return (
    <Container>
      <Box py={2} mb={2} px={2} mt={4}>
        <Box borderLeft={4} pr={6} borderColor="primary.main">
          <Box pl={4} mb={1} sx={{ color: "#000000" }}>
            <Typography variant="h5">{props.title}</Typography>
          </Box>
          <Box pl={4}>{props.children}</Box>
        </Box>
      </Box>
    </Container>
  );
};

export default DetailItemWrapper;
