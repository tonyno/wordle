import { addDoc, collection, orderBy, query } from "firebase/firestore";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { isProduction } from "./environments";
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
  if (!isProduction()) {
    console.log("Skipped saving, not production mode");
    return;
  }
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

export const useGetFaq = (): any => {
  // https://firebase.google.com/docs/firestore/query-data/get-data
  const colRef = collection(firestore, "faq");
  const queryRef = query(colRef, orderBy("order")); // https://firebase.google.com/docs/firestore/query-data/order-limit-data
  return useCollectionDataOnce(queryRef, {
    idField: "id",
  }); // https://github.com/CSFrequency/react-firebase-hooks/tree/v3.0.4/firestore
};

// getting based on data from FS:
// https://stackoverflow.com/questions/59416677/how-to-get-all-record-with-todays-date-from-firebase/65635901
