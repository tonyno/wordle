import { msInDay, startDate } from "../constants/otherConstants";
import { VALIDGUESSES } from "../constants/validGuesses";

// if set, then no validation of incoming words
export const DEBUG_WORD: string | null | undefined = null;

export const isWordInWordList = (solution: string, word: string): boolean => {
  if (DEBUG_WORD) return true;
  return solution === word || VALIDGUESSES.includes(word.toLowerCase());
};

export const isWinningWord = (solution: string, word: string) => {
  return solution === word;
};

// export const getWordOfDay = (): PlayContext => {
//   //return { solution: "ROBOT", solutionIndex: 1 };
//   const epochMs = startDate.getTime();
//   const now = Date.now();
//   let index = Math.floor((now - epochMs) / msInDay);
//   console.log("Index: ", index);
//   return {
//     solution: WORDS[index].toUpperCase(),
//     solutionIndex: index,
//   };
// };

export const getWordIndex = (): number => {
  //return { solution: "ROBOT", solutionIndex: 1 };
  const epochMs = startDate.getTime();
  const now = Date.now();
  let index = Math.floor((now - epochMs) / msInDay);
  return index;
};

const addDays = (i: Date, days: number): Date => {
  let result = new Date(i);
  result.setDate(result.getDate() + days);
  return result;
};

export const getDateFromSolutionIndex = (solutionIndex: number): Date => {
  const newDate = addDays(startDate, solutionIndex);
  return newDate;
};

type DaysListItem = {
  solutionIndex: number;
  date: Date;
};

export const getDaysListUpToday = (): DaysListItem[] => {
  let days: DaysListItem[] = [];
  for (let i = 0; i <= getWordIndex(); ++i) {
    const item: DaysListItem = {
      solutionIndex: i,
      date: addDays(new Date(startDate), i),
    };
    days.push(item);
  }
  return days;
};

export const getSolutionIndexFromUrlSafe = (
  solutionIndex: string | undefined
): number => {
  return solutionIndex &&
    (parseInt(solutionIndex) === 0 || parseInt(solutionIndex)) &&
    parseInt(solutionIndex) >= 0 &&
    parseInt(solutionIndex) <= getWordIndex()
    ? parseInt(solutionIndex)
    : -1;
};

//export const { solution, solutionIndex } = getWordOfDay();
