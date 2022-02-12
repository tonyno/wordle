export type ApplicationContext = {
  solutionIndex: number;
  typeOfGame: "wordle" | "challange" | "wordle-history";
};

export type PlayContext = {
  solution: string;
  solutionIndex: number;
  alertMessage?: string; // message to show on client's screen
};

export const defaultPlayContext: PlayContext = {
  solution: "TONDA",
  solutionIndex: 1,
};
