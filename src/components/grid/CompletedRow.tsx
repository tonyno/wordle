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
    <div className="flex justify-center mb-1">
      {guess.split("").map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  );
};
