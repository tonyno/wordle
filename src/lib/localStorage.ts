import md5 from "md5";
import { PlayContext } from "./playContext";
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
  isGameLoose?: boolean;
  solutionMd5?: string; // just to have verification of not cheating and not bug on our side saving to wrong day
};

type Stats = {
  guessesDistribution: number[];
};

export const emptyStatsArray: number[] = [0, 0, 0, 0, 0, 0, 0];

export const emptyStats: Stats = { guessesDistribution: [0, 0, 0, 0, 0, 0, 0] };

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
  //console.log("Storing to index " + index);
  data.guessesDistribution[index] += 1;
  localStorage.setItem(gameStatisticsKey, JSON.stringify(data));
};

export const getFinishedGameStatsFromLocalStorage = (): Stats => {
  const state = localStorage.getItem(gameStatisticsKey);
  if (!state) return emptyStats;
  const data = JSON.parse(state) as Stats;
  return data;
};

export const saveGameStateToLocalStorageNew = (
  guesses: string[],
  playContext: PlayContext,
  isGameWon: boolean,
  isGameLoose: boolean
) => {
  const state = localStorage.getItem(gameStateKeyNew);
  let data: any; // TODO Jonas. Nejaka moznost definovat strukturu kde klice jsou ruzne hodnoty? Map?
  if (state) {
    try {
      data = JSON.parse(state);
    } catch (err) {
      console.error(
        "saveGameStateToLocalStorageNew error when loading old data, removing them. ",
        err
      );
      data = {};
    }
  } else {
    data = {};
  }
  const gameState: GameStateItem = {
    guesses: guesses,
    isGameWon: isGameWon,
    isGameLoose: isGameLoose,
    solutionMd5: md5(playContext.solution), // this field was added later, will be missing in some previous data
  };
  data["day" + playContext.solutionIndex] = gameState;
  localStorage.setItem(gameStateKeyNew, JSON.stringify(data));
};

export const loadGameStateFromLocalStorageNew = (): any => {
  const state = localStorage.getItem(gameStateKeyNew);
  if (!state) return {};
  const data = JSON.parse(state); // TODO how to specify structure of dictionary with unknown keys
  return data;
};

export const saveGameStateToLocalStorage = (
  guesses: string[],
  playContext: PlayContext,
  isGameWon: boolean,
  isGameLoose: boolean
) => {
  console.log("Saving to localstorage ", guesses, isGameWon);
  const gameState = {
    guesses,
    solutionMd5: md5(playContext.solution),
  };
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
  saveGameStateToLocalStorageNew(guesses, playContext, isGameWon, isGameLoose);
};

export const loadGameStateFromLocalStorage = (
  playContext: PlayContext
): any => {
  try {
    const state = localStorage.getItem(gameStateKey);
    // the word was not changed and was found in local storage
    if (state) {
      const data = JSON.parse(state) as StoredGameState;
      if (data?.solutionMd5 === md5(playContext.solution)) {
        return data;
      }
    }

    // if we fail, let's look to the history
    const dataHistory = loadGameStateFromLocalStorageNew();
    if (!dataHistory) {
      return null;
    }
    if (dataHistory["day" + playContext.solutionIndex]) {
      return {
        guesses: dataHistory["day" + playContext.solutionIndex]?.guesses,
        solutionIndex: md5(playContext.solution),
      };
    }
    return null;
  } catch (err) {
    console.error("loadGameStateFromLocalStorage error ", err);
  }
};

export const migration1 = () => {
  const migration1ls = localStorage.getItem("migration1");
  if (migration1ls) return; // already implemented migration
  //console.log("migration1");
  const data = loadGameStateFromLocalStorageNew();
  const migrationData = [
    md5("kánon".toUpperCase()),
    md5("gesto".toUpperCase()),
    md5("nečas".toUpperCase()),
    md5("jíška".toUpperCase()),
    md5("močál".toUpperCase()), // 18.1. v 18:00
    md5("metař".toUpperCase()), // 19.1. v 18:00
    md5("šarže".toUpperCase()),
    md5("tepot".toUpperCase()),
    md5("ježíš".toUpperCase()),
    md5("písař".toUpperCase()),
    md5("čéška".toUpperCase()),
    md5("věžák".toUpperCase()),
    md5("zadák".toUpperCase()),
    md5("nicka".toUpperCase()),
    md5("boxer".toUpperCase()),
    md5("žeton".toUpperCase()),
    md5("řízek".toUpperCase()),
    md5("psina".toUpperCase()),
    md5("verze".toUpperCase()),
  ];
  let statsData: Stats = { guessesDistribution: [0, 0, 0, 0, 0, 0, 0] };
  let newObject: any = {};
  if (data) {
    for (const prop in data) {
      const index = migrationData.indexOf(prop);
      let record = { ...data[prop] };
      let newKey: string;
      if (index && index >= 0) {
        newKey = "day" + index;
        record["solutionMd5"] = prop; // keep the original md5 item in solutionMd5 field
        const newStatsPosition = getMyHistoricalResultToGraphs(record); // !!!! starting with 1, not 0
        if (newStatsPosition) {
          record["isGameLoose"] = newStatsPosition === 7; // !!!! starting with 1, not 0
          statsData.guessesDistribution[newStatsPosition - 1] += 1; // !!!! starting with 1, not 0
        }
      } else {
        newKey = prop; // if we don't know the index, let's keep it, better not to safe data
      }
      newObject[newKey] = record;
    }
  }
  //console.log(newObject);
  if (newObject) {
    localStorage.setItem(gameStateKeyNew, JSON.stringify(newObject));
    localStorage.setItem(
      "migration1",
      JSON.stringify({ timestamp: Date.now() })
    );
    localStorage.setItem(gameStatisticsKey, JSON.stringify(statsData));
  }
};

/**
 * Returns what column in the graph is the previous result.
 * 1 = found the word on first shot, 6 = on last shot, 7 = didn't solve it, null = didn't finish the game
 *
 * @param localStorageObject data from localStorage "actualGameState", item like:  {guesses: ["TONDA", "JEŽÍŠ"], isGameWon: true}
 * @see loadGuessInitialState what is similar function
 */
export const getMyHistoricalResultToGraphs = (
  localStorageObject: any
): number | null => {
  try {
    //console.log(localStorageObject);
    if (!localStorageObject?.guesses) return null;
    if (localStorageObject?.isGameWon) {
      return localStorageObject?.guesses.length;
    }
    if (localStorageObject?.guesses.length < 6) {
      return null; // not all guesses so likely the user is playing
    }
    return 7;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const dumpLocalStorage = (): string => {
  let retVal: string = "{";
  for (let i = 0; i < localStorage.length; ++i) {
    const itemKey = localStorage.key(i);
    if (itemKey) {
      const item = localStorage.getItem(itemKey);
      retVal += '"' + itemKey + '": ' + item + ",\n\n\n";
    }
  }
  retVal += "}";
  return retVal;
};
