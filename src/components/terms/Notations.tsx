import React from "react";
import { Chip } from "@mui/material";

export const Notations: React.FC<{ notation: string[] }> = ({ notation }) => {
  return (
    <>
      {notation.map((n) => (
        <Chip label={n} variant="outlined" color="secondary" />
      ))}
    </>
  );
};
