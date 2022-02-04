import { Box } from "@mui/material";
import { Cell } from "./Cell";

export const EmptyRow = () => {
  const emptyCells = Array.from(Array(5));

  return (
    <Box sx={{ display: "flex", mb: "0.25rem", justifyContent: "center" }}>
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </Box>
  );
};
