import { Box } from "@mui/material";
import { PlayContext } from "../../lib/playContext";
import { getGuessStatuses } from "../../lib/statuses";
import { Cell } from "./Cell";

type Props = {
  playContext: PlayContext;
  guess: string;
};

export const CompletedRow = ({ playContext, guess }: Props) => {
  const statuses = getGuessStatuses(playContext, guess);

  return (
    <Box sx={{ display: "flex", mb: "0.25rem", justifyContent: "center" }}>
      {guess.split("").map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} />
      ))}
    </Box>
  );
};
