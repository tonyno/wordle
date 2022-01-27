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

function find_occurences(str: string, char_to_count: string): number {
  return str.split(char_to_count).length - 1;
}

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
        // make status correct
        // if the letter appears more times, then we need to make sure we have all of them. If not mark it orange on keyboard.
        // see https://github.com/tonyno/wordle-czech/issues/25
        let status: CharStatus = "correct";
        if (
          find_occurences(solution, letter) >= 2 &&
          charObj[letter] !== "correct"
        ) {
          // to be save run this logic only for reocuring letters
          // and also if the user already caught the correct position earlier, don't change it to orange
          for (let i2 = 0; i2 < solution.length; ++i2) {
            if (i !== i2) {
              // other letters
              if (solution[i2] === letter || word[i2] === letter) {
                // another occurence in the solution for same letter
                //console.log(i, i2, solution[i], letter);
                if (word[i2] !== solution[i2]) {
                  //console.log("kuk");
                  status = "present";
                }
              }
            }
          }
        }
        return (charObj[letter] = status);
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
