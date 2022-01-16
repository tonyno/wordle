import { useEffect, useState } from "react";
import { Alert } from "./components/alerts/Alert";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { WinModal } from "./components/modals/WinModal";
import TopMenu from "./components/navigation/TopMenu";
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from "./lib/localStorage";
import { logMyEvent } from "./lib/settingsFirebase";
import { loadGuessInitialState } from "./lib/statuses";
import { isWinningWord, isWordInWordList, solution } from "./lib/words";

function App() {
  const dataFromLocalStorage = loadGameStateFromLocalStorage(solution);
  const [guesses, setGuesses] = useState<string[]>(
    dataFromLocalStorage?.guesses || []
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [shareComplete, setShareComplete] = useState(false);

  useEffect(() => {
    logMyEvent("start", navigator.userAgent || navigator.vendor);
    const initialStatus = loadGuessInitialState(guesses);
    console.log(initialStatus);
    if (initialStatus === "win" && isGameWon === false) {
      setIsGameWon(true);
    }
  }, [guesses, isGameWon]);

  useEffect(() => {
    saveGameStateToLocalStorage(guesses, solution);
  }, [guesses]);

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

    const winningWord = isWinningWord(currentGuess);

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (winningWord) {
        logMyEvent("win", lastGuess);
        return setIsGameWon(true);
      }

      if (guesses.length === 5) {
        logMyEvent("loose", lastGuess);
        setIsGameLost(true);
        return setTimeout(() => {
          setIsGameLost(false);
        }, 2000);
      }
    }
  };

  return (
    <>
      <TopMenu />
      <div className="py-1 max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
        <Alert message="Slovo nenalezeno" isOpen={isWordNotFoundAlertOpen} />
        <Alert
          message={`Prohrál jsi. Správná odpověď: ${solution}`}
          isOpen={isGameLost}
        />
        <Alert
          message="Hra zkopírována do schránky"
          isOpen={shareComplete}
          variant="success"
        />
        <Grid guesses={guesses} currentGuess={currentGuess} />
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={guesses}
        />
        <WinModal
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
}

export default App;
