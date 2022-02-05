import { Box } from "@mui/material";
import { PlayContext } from "../../lib/playContext";
import { getGuessStatuses } from "../../lib/statuses";
import { MiniCell } from "./MiniCell";

type Props = {
  playContext: PlayContext;
  guess: string;
};

export const MiniCompletedRow = ({ playContext, guess }: Props) => {
  const statuses = getGuessStatuses(playContext, guess);

  return (
    <Box sx={{ display: "flex", mb: "0.25rem", justifyContent: "center" }}>
      {guess.split("").map((letter, i) => (
        <MiniCell key={i} status={statuses[i]} />
      ))}
    </Box>
  );
};
