import { PlayContext } from "./playContext";

export type CharStatus = "absent" | "present" | "correct";

export type CharValue =
  | "Q"
  | "W"
  | "E"
  | "R"
  | "T"
  | "Y"
  | "U"
  | "I"
  | "O"
  | "P"
  | "A"
  | "S"
  | "D"
  | "F"
  | "G"
  | "H"
  | "J"
  | "K"
  | "L"
  | "Z"
  | "X"
  | "C"
  | "V"
  | "B"
  | "N"
  | "M"
  | "Ě"
  | "Ě"
  | "Š"
  | "Č"
  | "Ř"
  | "Ž"
  | "Ý"
  | "Á"
  | "Í"
  | "É"
  | "Ů";

export const getStatuses = (
  playContext: PlayContext,
  guesses: string[]
): { [key: string]: CharStatus } => {
  const solution = playContext.solution;
  const charObj: { [key: string]: CharStatus } = {};

  guesses.forEach((word) => {
    word.split("").forEach((letter, i) => {
      if (!solution.includes(letter)) {
        // make status absent
        return (charObj[letter] = "absent");
      }

      if (letter === solution[i]) {
        //make status correct
        return (charObj[letter] = "correct");
      }

      if (charObj[letter] !== "correct") {
        //make status present
        return (charObj[letter] = "present");
      }
    });
  });

  return charObj;
};

export const getGuessStatuses = (
  playContext: PlayContext,
  guess: string
): CharStatus[] => {
  const solution = playContext.solution;
  const splitSolution = solution.split("");
  const splitGuess = guess.split("");

  const solutionCharsTaken = splitSolution.map((_) => false);

  const statuses: CharStatus[] = Array.from(Array(guess.length));

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = "correct";
      solutionCharsTaken[i] = true;
      return;
    }
  });

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return;

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = "absent";
      return;
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    );

    if (indexOfPresentChar > -1) {
      statuses[i] = "present";
      solutionCharsTaken[indexOfPresentChar] = true;
      return;
    } else {
      statuses[i] = "absent";
      return;
    }
  });

  return statuses;
};

export type PlayState = "win" | "loose" | "notStarted" | "playing";

export const getGameStateFromGuesses = (
  playContext: PlayContext,
  guesses: string[]
): PlayState => {
  const solution = playContext.solution;
  if (!guesses || guesses.length === 0) {
    return "notStarted";
  }
  const lastItem = guesses[guesses.length - 1];
  if (lastItem === solution) {
    return "win";
  }
  if (guesses.length === 6) {
    return "loose";
  }
  return "playing";
};
