import React from "react";
import { Chip, Tooltip } from "@mui/material";

export const Notations: React.FC<{ notation: string[] }> = ({ notation }) => {
  return (
    <>
      {notation.map((n) => (
        <Tooltip title="Notace" key={n}>
          <Chip label={n} variant="outlined" color="secondary" />
        </Tooltip>
      ))}
    </>
  );
};
