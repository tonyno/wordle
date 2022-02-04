import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { saveGameResultFirebase } from "../lib/dataAdapter";
import {
  loadGameStateFromLocalStorage,
  migration1,
  saveGameStateToLocalStorage,
  updateFinishedGameStats,
} from "../lib/localStorage";
import { PlayContext } from "../lib/playContext";
import { logMyEvent } from "../lib/settingsFirebase";
import { getGameStateFromGuesses, PlayState } from "../lib/statuses";
import { isWinningWord, isWordInWordList } from "../lib/words";
import MyAlert from "./alerts/MyAlert";
import { Grid } from "./grid/Grid";
import { Keyboard } from "./keyboard/Keyboard";
import EndGameModal from "./modals/EndGameModal";
import styles from "./WordlePlay.module.css";

type Props = {
  playContext: PlayContext;
};

const WordlePlay = ({ playContext }: Props) => {
  const dataFromLocalStorage = loadGameStateFromLocalStorage(playContext);
  const [guesses, setGuesses] = useState<string[]>(
    dataFromLocalStorage?.guesses || []
  );
  const [currentGuess, setCurrentGuess] = useState("");
  //const [isGameWon, setIsGameWon] = useState(false);
  //const [isGameLost, setIsGameLost] = useState(false);
  const [gameStatus, setGameStatus] = useState<PlayState>("notStarted");
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [errorWordNotInDictionary, setErrorWordNotInDictionary] =
    useState(false);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [gameDurationMs, setGameDurationMs] = useState(0);

  try {
    migration1();
  } catch (err) {
    console.error("migration1 error ", err);
  }

  // Only as part of the start of the app
  useEffect(() => {
    logMyEvent("start", navigator.userAgent || navigator.vendor);
    //console.log("Loaded from localStorage: ", dataFromLocalStorage);
    //console.log("guesses ", guesses);
    setGameStartTime(null); // if word changed, then clean the time
    setGameDurationMs(0);
    if (!dataFromLocalStorage) {
      setCurrentGuess("");
      setGuesses([]);
      setGameStatus("notStarted");
    } else {
      const initialStatus = getGameStateFromGuesses(playContext, guesses);
      //console.log("useEffect() start: ", initialStatus);
      if (initialStatus === "win" && gameStatus !== "win") {
        setGameStatus("win");
      }
      if (initialStatus === "loose" && gameStatus !== "loose") {
        setGameStatus("loose");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playContext]);
  // TODO https://github.com/facebook/create-react-app/issues/6880#issuecomment-485912528

  // useEffect(() => {
  //   saveGameStateToLocalStorage(guesses, playContext.solution, isGameWon);
  // }, [guesses, playContext, isGameWon]);

  useEffect(() => {
    if (gameStatus === "win" || gameStatus === "loose") {
      setIsWinModalOpen(true);
    }
  }, [gameStatus]);

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6 && gameStatus !== "win") {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    const lastGuess = currentGuess;

    if (!isWordInWordList(playContext.solution, currentGuess)) {
      return setErrorWordNotInDictionary(true);
    }

    const actualGuessAttempt = guesses.length;

    if (
      currentGuess.length === 5 &&
      actualGuessAttempt < 6 &&
      gameStatus !== "win"
    ) {
      const newGuesses = [...guesses, currentGuess];
      const winningWord = isWinningWord(playContext.solution, currentGuess);
      const newGameState = getGameStateFromGuesses(playContext, newGuesses);

      logMyEvent("guess", lastGuess);

      if (actualGuessAttempt === 0) {
        // entering first word, remember the time when started
        setGameStartTime(new Date());
      }
      setGameDurationMs(
        gameStartTime ? Date.now() - gameStartTime?.getTime() : 0
      );

      saveGameStateToLocalStorage(
        newGuesses,
        playContext,
        winningWord,
        newGameState === "loose"
      );
      setGuesses(newGuesses);
      setCurrentGuess("");

      if (newGameState === "win") {
        logMyEvent("win", lastGuess);
        saveGameResultFirebase(
          playContext,
          "TBD",
          "win",
          guesses,
          actualGuessAttempt
        );
        updateFinishedGameStats(true, actualGuessAttempt);
        return setGameStatus("win");
      }

      if (newGameState === "loose") {
        logMyEvent("loose", lastGuess);
        saveGameResultFirebase(
          playContext,
          "TBD",
          "loose",
          guesses,
          actualGuessAttempt
        );
        updateFinishedGameStats(false, actualGuessAttempt);
        return setGameStatus("loose");
      }
    }
  };

  return (
    <Box className={styles.WordlePlay}>
      <MyAlert
        open={errorWordNotInDictionary}
        onClose={() => setErrorWordNotInDictionary(false)}
        message="Slovo nenalezeno ve slovníku!"
        variant="error"
        autoHide={2000}
      />

      <Grid
        playContext={playContext}
        guesses={guesses}
        currentGuess={currentGuess}
      />
      <Keyboard
        playContext={playContext}
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <EndGameModal
        playContext={playContext}
        isOpen={isWinModalOpen}
        gameStatus={gameStatus}
        handleClose={() => setIsWinModalOpen(false)}
        guesses={guesses}
        gameDurationMs={gameDurationMs}
      />
    </Box>
  );
};

export default WordlePlay;
