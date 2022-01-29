import { PlayContext } from "../../lib/playContext";
import { MiniCompletedRow } from "./MiniCompletedRow";

type Props = {
  playContext: PlayContext;
  guesses: string[];
};

export const MiniGrid = ({ playContext, guesses }: Props) => {
  return (
    <div>
      {guesses.map((guess, i) => (
        <MiniCompletedRow playContext={playContext} key={i} guess={guess} />
      ))}
    </div>
  );
};
