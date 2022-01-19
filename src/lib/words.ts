import { msInDay, startDate } from "../constants/otherConstants";
import { VALIDGUESSES } from "../constants/validGuesses";
import { WORDS } from "../constants/wordlist";
import { PlayContext } from "./playContext";

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  );
};

export const isWinningWord = (solution: string, word: string) => {
  return solution === word;
};

export const getWordOfDay = (): PlayContext => {
  //return { solution: "ROBOT", solutionIndex: 5 };
  const epochMs = startDate.getTime();
  const now = Date.now();
  let index = Math.floor((now - epochMs) / msInDay);
  console.log("Index: ", index);
  return {
    solution: WORDS[index].toUpperCase(),
    solutionIndex: index,
  };
};

//export const { solution, solutionIndex } = getWordOfDay();
