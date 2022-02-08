export type FirstWords = { [key in string]: number };

export type FirstWordDb = { word: string; count: number };

export type StatsDay = {
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

export const calculateStatsScore = (guesses: number[]): number => {
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
