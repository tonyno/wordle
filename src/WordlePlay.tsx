import { useEffect, useState } from "react";
import { Alert } from "./components/alerts/Alert";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { WinModal } from "./components/modals/WinModal";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  updateFinishedGameStats,
} from "./lib/localStorage";
import { PlayContext } from "./lib/playContext";
import { logMyEvent } from "./lib/settingsFirebase";
import { loadGuessInitialState } from "./lib/statuses";
import { isWinningWord, isWordInWordList } from "./lib/words";

type Props = {
  playContext: PlayContext;
};

const WordlePlay = ({ playContext }: Props) => {
  const dataFromLocalStorage = loadGameStateFromLocalStorage(
    playContext.solution
  );
  const [guesses, setGuesses] = useState<string[]>(
    dataFromLocalStorage?.guesses || []
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [shareComplete, setShareComplete] = useState(false);

  // Only as part of the start of the app
  useEffect(() => {
    logMyEvent("start", navigator.userAgent || navigator.vendor);
    console.log("Loaded from localStorage: ", dataFromLocalStorage);
    console.log("guesses ", guesses);
    if (!dataFromLocalStorage) {
      setCurrentGuess("");
      setGuesses([]);
      setIsGameWon(false);
    } else {
      const initialStatus = loadGuessInitialState(playContext, guesses);
      console.log("useEffect() start: ", initialStatus);
      if (initialStatus === "win" && isGameWon === false) {
        setIsGameWon(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playContext]);
  // TODO https://github.com/facebook/create-react-app/issues/6880#issuecomment-485912528

  useEffect(() => {
    saveGameStateToLocalStorage(guesses, playContext.solution, isGameWon);
  }, [guesses, playContext, isGameWon]);

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true);
    }
  }, [isGameWon]);

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    const lastGuess = currentGuess;
    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true);
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false);
      }, 2000);
    }

    const winningWord = isWinningWord(playContext.solution, currentGuess);

    const actualGuessAttempt = guesses.length;
    if (currentGuess.length === 5 && actualGuessAttempt < 6 && !isGameWon) {
      logMyEvent("guess", lastGuess);
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (winningWord) {
        logMyEvent("win", lastGuess);
        updateFinishedGameStats(true, actualGuessAttempt);
        return setIsGameWon(true);
      }

      if (actualGuessAttempt === 5) {
        logMyEvent("loose", lastGuess);
        updateFinishedGameStats(false, actualGuessAttempt);
        setIsGameLost(true);
        return setTimeout(() => {
          setIsGameLost(false);
        }, 2000);
      }
    }
  };

  return (
    <>
      <div className="py-1 max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
        <Alert message="Slovo nenalezeno" isOpen={isWordNotFoundAlertOpen} />
        <Alert message={`Prohrál jsi.`} isOpen={isGameLost} />
        <Alert
          message="Hra zkopírována do schránky"
          isOpen={shareComplete}
          variant="success"
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
        <WinModal
          playContext={playContext}
          isOpen={isWinModalOpen}
          handleClose={() => setIsWinModalOpen(false)}
          guesses={guesses}
          handleShare={() => {
            setIsWinModalOpen(false);
            setShareComplete(true);
            return setTimeout(() => {
              setShareComplete(false);
            }, 2000);
          }}
        />
      </div>
    </>
  );
};

export default WordlePlay;
