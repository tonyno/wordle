import { Box } from "@mui/material";
import { Cell } from "./Cell";

type Props = {
  guess: string;
};

// ...

export const CurrentRow = ({ guess }: Props) => {
  const splitGuess = guess.split("");
  const emptyCells = Array.from(Array(5 - splitGuess.length));

  return (
    <Box sx={{ display: "flex", mb: "0.25rem", justifyContent: "center" }}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </Box>
  );
};
