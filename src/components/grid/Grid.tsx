import { Box } from "@mui/material";
import { PlayContext } from "../../lib/playContext";
import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";

type Props = {
  playContext: PlayContext;
  guesses: string[];
  currentGuess: string;
};

export const Grid = ({ playContext, guesses, currentGuess }: Props) => {
  const empties =
    guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : [];

  return (
    <Box sx={{ pb: "1.5rem" }}>
      {guesses.map((guess, i) => (
        <CompletedRow playContext={playContext} key={i} guess={guess} />
      ))}
      {guesses.length < 6 && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </Box>
  );
};
