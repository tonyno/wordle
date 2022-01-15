import md5 from "md5";
const gameStateKey = "gameState";

type StoredGameState = {
  guesses: string[];
  solutionMd5: string;
};

export const saveGameStateToLocalStorage = (
  guesses: string[],
  solution: string
) => {
  const gameState = {
    guesses,
    solutionMd5: md5(solution),
  };
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
};

export const loadGameStateFromLocalStorage = (solution: string) => {
  const state = localStorage.getItem(gameStateKey);
  if (!state) return null;
  const data = JSON.parse(state) as StoredGameState;
  //console.log("Data md5: ", data?.solutionMd5, " new md5: ", md5(solution));
  return data?.solutionMd5 === md5(solution) ? data : null; // if the solution changes, we start from scratch
};
