import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { isProduction } from "./environments";
import {
  AllResults,
  GameStateHistory,
  getFinishedGameStatsFromLocalStorage,
  getSettings,
  getUserId,
  loadGameStateFromLocalStorageNew,
} from "./localStorage";
import { PlayContext } from "./playContext";
import { firestore } from "./settingsFirebase";
import { PlayState } from "./statuses";
import { dateToStr } from "./timeFunctions";
import { DEBUG_WORD } from "./words";

export const saveGameResultFirebase = async (
  playContext: PlayContext,
  userUid: string,
  result: PlayState,
  guesses: string[],
  numberOfGuesses: number, // 0 = no guesses, I hit the correct word on first attempt (one line in table)
  duration?: number
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
      playContext: {
        solution: playContext.solution,
        solutionIndex: playContext.solutionIndex,
      },
      userUid,
      result,
      guesses,
      numberOfGuesses,
      duration: duration ? duration : 0,
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

export type FirstWords = { [key in string]: number }; // TODO duplicated in stats.ts in functions

export type FirstWordDb = { word: string; count: number }; // TODO duplicated in stats.ts in functions

export type StatsDay = {
  // TODO duplicated in stats.ts in functions
  dateStr: string;
  games: number;
  loose: number;
  win: number;
  firstGuesses: FirstWordDb[];
  guessesDistribution: number[];
  score: number;
  solution: string;
  solutionIndex: number;
};

export type GameStats = {
  [dateStr: string]: StatsDay;
};

// export const useGetStats = (): any => {
//   const colRef = collection(firestore, "stats");
//   const queryRef = query(colRef);
//   return useCollectionDataOnce(queryRef, {
//     idField: "id",
//   });
// };

export const useGetStats = (): any => {
  // TODO any -> GameStats
  const statsRef = doc(firestore, "gameStats", "wordle");
  return useDocumentDataOnce(statsRef, {
    idField: "id",
  });
};

export const useGetStatsDocument = (documentId: string): any => {
  const statsRef = doc(firestore, "stats", documentId);
  return useDocumentDataOnce(statsRef, {
    idField: "id",
  });
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
      alertMessage: data?.alertMessage,
    };
    if (DEBUG_WORD) {
      context = {
        solution: DEBUG_WORD,
        solutionIndex: 99,
      };
    }
  } else {
    context = { solution: "", solutionIndex: -1 };
  }
  return [context, loading, error];
};

type SharedResult = {
  nickname: string;
  items: GameStateHistory;
};

export const saveSharedResult = async () => {
  const userId = getUserId();
  const nickname = getSettings()?.nickname;
  if (!userId || !nickname) {
    console.info(
      "User doesn't have user id, cannot save the shared result. Exitting."
    );
    return;
  }
  const docRef = doc(firestore, "sharedResult", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
  }
  const localStorageData = loadGameStateFromLocalStorageNew();
  if (!localStorageData) {
    console.info("No data in local storage, skipping...");
    return;
  }
  const data: SharedResult = {
    nickname: nickname,
    items: localStorageData,
  };
  await setDoc(docRef, data);
};

const prepaveForSaving = () => {
  const settings = getSettings();
  const history = loadGameStateFromLocalStorageNew();
  const stats = getFinishedGameStatsFromLocalStorage();
  if (!settings.userId || !history) {
    console.error("Missing userId or history data");
    return;
  }
  const data: AllResults = {
    history,
    settings,
    stats,
    size:
      JSON.stringify(history).length +
      JSON.stringify(stats).length +
      JSON.stringify(settings).length,
  };
  console.log("Size of data: ", data.size);
  if (!data?.settings?.nickname) {
    data.settings.nickname = "";
  }
  return data;
};

export const saveAllResultsToFirebase = async () => {
  const settings = getSettings();
  const data = prepaveForSaving();
  if (data && settings.userId) {
    const docRef = doc(firestore, "allResults", settings.userId);
    await setDoc(docRef, data);
  }
};

export const getAllResultsFromFirebase = async (userId: string) => {
  const docRef = doc(firestore, "allResults", userId);
  return await getDoc(docRef);
};

// Login feature

export const saveGamesForLoggedUser = async (loggedUserID: string) => {
  const data = prepaveForSaving();
  if (data && loggedUserID) {
    const docRef = doc(firestore, "savedGames", loggedUserID);
    await setDoc(docRef, data);
  }
};
