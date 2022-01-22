export type ApplicationContext = {
  solutionIndex: number;
  typeOfGame: "wordle" | "challange";
};

export type PlayContext = {
  solution: string;
  solutionIndex: number;
};

export const defaultPlayContext: PlayContext = {
  solution: "TONDA",
  solutionIndex: 1,
};
