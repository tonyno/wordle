import md5 from "md5";
const gameStateKey = "gameState";
const gameStateKeyNew = "actualGameState";
const gameStatisticsKey = "stats";

type StoredGameState = {
  guesses: string[];
  solutionMd5: string;
};

type GameStateItem = {
  guesses: string[];
  isGameWon?: boolean;
};

type Stats = {
  guessesDistribution: number[];
};

export const updateFinishedGameStats = (
  isGameWon: boolean,
  numberOfGuesses: number // length of the guesses array what means 0 => I made it on first attempt, 1 => on second
) => {
  const stats = localStorage.getItem(gameStatisticsKey);
  let data: Stats = { guessesDistribution: [0, 0, 0, 0, 0, 0, 0] };
  if (stats) {
    const newData = JSON.parse(stats);
    if (newData) {
      data = newData;
    }
  }
  const index = !isGameWon ? 6 : numberOfGuesses; // zero based, storing lost games to 7.attempt
  console.log("Storing to index " + index);
  data.guessesDistribution[index] += 1;
  localStorage.setItem(gameStatisticsKey, JSON.stringify(data));
};

export const saveGameStateToLocalStorageNew = (
  guesses: string[],
  solution: string,
  isGameWon: boolean
) => {
  const state = localStorage.getItem(gameStateKeyNew);
  let data: any; // TODO Jonas. Nejaka moznost definovat strukturu kde klice jsou ruzne hodnoty? Map?
  if (state) {
    data = JSON.parse(state);
  } else {
    data = {};
  }
  const gameState: GameStateItem = {
    guesses: guesses,
    isGameWon: isGameWon,
  };
  data[md5(solution)] = gameState;
  localStorage.setItem(gameStateKeyNew, JSON.stringify(data));
};

export const saveGameStateToLocalStorage = (
  guesses: string[],
  solution: string,
  isGameWon: boolean
) => {
  const gameState = {
    guesses,
    solutionMd5: md5(solution),
  };
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
  saveGameStateToLocalStorageNew(guesses, solution, isGameWon);
};

export const loadGameStateFromLocalStorage = (solution: string) => {
  const state = localStorage.getItem(gameStateKey);
  if (!state) return null;
  const data = JSON.parse(state) as StoredGameState;
  //console.log("Data md5: ", data?.solutionMd5, " new md5: ", md5(solution));
  return data?.solutionMd5 === md5(solution) ? data : null; // if the solution changes, we start from scratch
};
