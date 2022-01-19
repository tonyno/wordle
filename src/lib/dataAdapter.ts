import { addDoc, collection } from "firebase/firestore";
import { PlayContext } from "./playContext";
import { firestore } from "./settingsFirebase";
import { PlayState } from "./statuses";

export const saveGameResultFirebase = async (
  playContext: PlayContext,
  userUid: string,
  result: PlayState,
  guesses: string[],
  numberOfGuesses: number // 0 = no guesses, I hit the correct word on first attempt (one line in table)
) => {
  // https://firebase.google.com/docs/firestore/manage-data/add-data
  // https://firebase.google.com/docs/firestore/query-data/queries
  await addDoc(
    collection(
      firestore,
      "gameResult",
      "day" + playContext.solutionIndex,
      "result"
    ),
    {
      playContext: playContext,
      userUid,
      result,
      guesses,
      numberOfGuesses,
    }
  );
};
