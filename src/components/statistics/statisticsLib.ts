import { GameStats, StatsDay } from "../../lib/dataAdapter";
import {
  GameStateHistory,
  getMyHistoricalResultToGraphs,
} from "../../lib/localStorage";
import { dateToStrCZShort } from "../../lib/timeFunctions";
import { getDateFromSolutionIndex, getDaysList } from "../../lib/words";

export type HistoryData = {
  date: Date;
  dateStr: string; // 01.01.'22
  solutionIndex: number;
  solution?: string;
  myScore?: number | null;
  myScoreStr?: string; // 5/6
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

export const getPercentil = (
  guessesDistribution: number[],
  myScore: number
): number => {
  if (!guessesDistribution || guessesDistribution.length !== 7) {
    return 0; // something is wrong
  }
  let total = guessesDistribution.reduce((a, b) => a + b, 0);
  let sum = 0;
  for (let i = 6; i >= 0; --i) {
    if (i === myScore - 1) {
      sum += guessesDistribution[i] / 2; // take the average in that column
      break;
    }
    sum += guessesDistribution[i];
  }
  //console.log(myScore, sum, total);
  return Math.round(100 * (sum / total));
};

export const getHistoryItems = (
  myStatsLocalStorage: GameStateHistory | undefined,
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
    const myScore = localStorageData
      ? getMyHistoricalResultToGraphs(localStorageData)
      : undefined;
    const myScoreStr = myScore
      ? (myScore === 7 ? "N" : "" + myScore) + "/6"
      : undefined;

    const record: HistoryData = {
      date: date,
      dateStr: dateToStrCZShort(date),
      solutionIndex: solutionIndex,
      solution: finishedGame && dbStatsData ? dbStatsData.solution : undefined,
      myScore: myScore,
      myScoreStr: myScoreStr,
      percentil:
        dbStatsData && myScore && finishedGame
          ? getPercentil(dbStatsData.guessesDistribution, myScore)
          : undefined,
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
};

type AllPlayersOneDayData = {
  stats?: StatsDay;
  myScore?: number | null;
};

export const getAllPlayersDataForOneDay = (
  myStatsLocalStorage: GameStateHistory,
  statsAllPlayersDb: GameStats,
  solutionIndex: number
): AllPlayersOneDayData => {
  if (!solutionIndex || solutionIndex === -1)
    return { stats: undefined, myScore: undefined };
  const key = "day" + solutionIndex;

  const dbStatsData =
    statsAllPlayersDb && key in statsAllPlayersDb
      ? statsAllPlayersDb[key]
      : null;

  const localStorageData =
    myStatsLocalStorage && key in myStatsLocalStorage
      ? myStatsLocalStorage[key]
      : null;
  const myScore = localStorageData
    ? getMyHistoricalResultToGraphs(localStorageData)
    : undefined;
  return {
    stats:
      dbStatsData && dbStatsData.guessesDistribution ? dbStatsData : undefined,
    myScore: myScore,
  };
};

type PersonalScore = {
  percentil?: number;
  playedGames?: number;
  totalGames?: number;
};

export const getPersonalScore = (
  myStatsLocalStorage: GameStateHistory,
  statsAllPlayersDb: GameStats
): PersonalScore | undefined => {
  let sum = 0;
  let playedGames = 0;
  let totalGames = 0;
  getDaysList(1, 6).forEach((solutionIndex) => {
    const key = "day" + solutionIndex;

    const dbStatsData =
      statsAllPlayersDb && key in statsAllPlayersDb
        ? statsAllPlayersDb[key]
        : null;
    const localStorageData = myStatsLocalStorage[key];
    const finishedGame =
      localStorageData &&
      (localStorageData.isGameLoose === true ||
        localStorageData.isGameWon === true)
        ? true
        : false;
    const myScore =
      localStorageData && finishedGame
        ? getMyHistoricalResultToGraphs(localStorageData)
        : undefined;
    if (finishedGame && myScore && dbStatsData) {
      const percentil = getPercentil(dbStatsData.guessesDistribution, myScore);
      //console.log("Day " + key + " percentil " + percentil);
      sum += percentil;
      playedGames += 1;
    }
    totalGames += 1;
  });
  return {
    percentil: Math.round(sum / totalGames),
    playedGames: playedGames,
    totalGames: totalGames,
  };
};
