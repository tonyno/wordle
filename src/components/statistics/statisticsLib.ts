import { GameStats } from "../../lib/dataAdapter";
import { GameStateHistory } from "../../lib/localStorage";
import { dateToStrCZShort } from "../../lib/timeFunctions";
import { getDateFromSolutionIndex, getDaysList } from "../../lib/words";

export type HistoryData = {
  date: Date;
  dateStr: string; // 01.01.'22
  solutionIndex: number;
  solution?: string;
  myScore?: string; // 5/6
  percentil?: number;
  finishedGame: boolean;
  playsCount?: number; // 3557
  successRate?: number; // 75
  guessesDistribution?: number[];
};

// const getMyScore = (localStorageItem: any): string => {
//   const value = getMyHistoricalResultToGraphs(localStorageItem);
//   if (!value) return "";
//   if (value === 7) return "N/6";
//   return "" + value + "/6";
// };

export const getHistoryItems = (
  myStatsLocalStorage: GameStateHistory,
  statsAllPlayersDb: GameStats
) => {
  const rows = getDaysList().map((solutionIndex: number) => {
    const key = "day" + solutionIndex;
    const date = getDateFromSolutionIndex(solutionIndex);
    const dbStatsData =
      statsAllPlayersDb && key in statsAllPlayersDb
        ? statsAllPlayersDb[key]
        : null;
    const localStorageData =
      myStatsLocalStorage && key in myStatsLocalStorage
        ? myStatsLocalStorage[key]
        : null;
    const finishedGame =
      localStorageData &&
      (localStorageData.isGameLoose === true ||
        localStorageData.isGameWon === true)
        ? true
        : false;
    const record: HistoryData = {
      date: date,
      dateStr: dateToStrCZShort(date),
      solutionIndex: solutionIndex,
      solution: finishedGame && dbStatsData ? dbStatsData.solution : undefined,
      myScore: "5/6",
      percentil: 30,
      finishedGame: finishedGame,
      playsCount: dbStatsData ? dbStatsData.games : undefined,
      successRate: dbStatsData ? dbStatsData.score : undefined,
      guessesDistribution: dbStatsData
        ? dbStatsData.guessesDistribution
        : undefined,
    };
    return record;
  });
  return rows;

  // const rows = getDaysListUpToday()
  //   .reverse()
  //   .map((item) => {
  //     const key: string = "day" + item.solutionIndex;
  //     const record: HistoryData = {
  //       solutionIndex: item.solutionIndex,
  //       // playable:
  //       //   item.solutionIndex >= 0 && item.solutionIndex <= maxSolutionIndex,
  //       date: item.date,
  //       dateStr: dateToStrCZShort(item.date) + " (" + item.solutionIndex + ")",
  //       // dateCode: dateToStr(item.date),
  //       myScore:
  //         myStatsLocalStorage && myStatsLocalStorage[key]
  //           ? getMyScore(myStatsLocalStorage[key])
  //           : "",
  //       playsCount: 10, // statsDict && statsDict[key] ? statsDict[key]?.games : "-",
  //       successRate: "X",
  //       // statsDict && statsDict[key]
  //       //   ? "" + calculateStatsScore(statsDict[key]) + "%"
  //       //   : "-",
  //     };
  //     return record;
  //   });
  // return rows;
};
