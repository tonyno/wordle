import { addDoc, collection, doc, query } from "firebase/firestore";
import {
  useCollectionDataOnce,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { isProduction } from "./environments";
import { PlayContext } from "./playContext";
import { firestore } from "./settingsFirebase";
import { PlayState } from "./statuses";
import { dateToStr } from "./timeFunctions";

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

export type FaqType = {
  category: string;
  title: string;
  description: string;
};

export const useGetFaq = (): any => {
  const faqRef = doc(firestore, "content", "faq");
  return useDocumentDataOnce(faqRef);
};

export type StatsType = {
  firstGuesses: any;
  games: number;
  guessesDistribution: number[];
  id: string;
  loose: number;
  win: number;
};

export const useGetStats = (): any => {
  const colRef = collection(firestore, "stats");
  const queryRef = query(colRef);
  return useCollectionDataOnce(queryRef, {
    idField: "id",
  });
};

export const useGetStatsDocument = (documentId: string): any => {
  const statsRef = doc(firestore, "stats", documentId);
  return useDocumentDataOnce(statsRef, {
    idField: "id",
  });
};

export const calculateStatsScore = (item: StatsType): number => {
  // item = {
  //   guessesDistribution: [0, 0, 100, 100, 0, 0],
  //   loose: 0,
  //   firstGuesses: [],
  //   games: 500,
  //   id: "xx",
  //   win: 0,
  // };
  const guesses = item?.guessesDistribution;
  //console.log("calculateStatsScore ", guesses);
  const score =
    100 *
    ((6 * guesses[0] +
      5 * guesses[1] +
      4 * guesses[2] +
      3 * guesses[3] +
      2 * guesses[4] +
      1 * guesses[5]) /
      (6 *
        (guesses[0] +
          guesses[1] +
          guesses[2] +
          guesses[3] +
          guesses[4] +
          guesses[5] +
          guesses[6]))); // guesses[6] equals to item?.loose
  return Math.round(score);
};

// getting based on data from FS:
// https://stackoverflow.com/questions/59416677/how-to-get-all-record-with-todays-date-from-firebase/65635901

export const useGetWordOfDay = (date: Date): any => {
  const dateStr = dateToStr(date);
  //console.log("Getting data from FireStore for date: ", dateStr);
  const wordRef = doc(firestore, "word", dateStr);
  let [data, loading, error] = useDocumentDataOnce(wordRef, {
    idField: "id",
  });
  let context: PlayContext;
  if (!error && !loading && data) {
    context = {
      solution: data?.solution,
      solutionIndex: data?.solutionIndex,
    };
  } else {
    context = { solution: "", solutionIndex: -1 };
  }
  return [context, loading, error];
};
