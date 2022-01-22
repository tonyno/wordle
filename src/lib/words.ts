import { msInDay, startDate } from "../constants/otherConstants";
import { VALIDGUESSES } from "../constants/validGuesses";

export const isWordInWordList = (solution: string, word: string) => {
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

//export const { solution, solutionIndex } = getWordOfDay();
