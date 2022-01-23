import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApplicationContext } from "../lib/playContext";
import { logMyEvent } from "../lib/settingsFirebase";
import { getSolutionIndexFromUrlSafe } from "../lib/words";
import MyAlert from "./alerts/MyAlert";
import WordlePlayWrapper from "./WordlePlayWrapper";

type Props = {
  setNewMessage: (newText: string) => void;
};

function HistoryPlay({ setNewMessage }: Props) {
  let { solutionIndex } = useParams();
  const [appContext] = useState<ApplicationContext>({
    solutionIndex: getSolutionIndexFromUrlSafe(solutionIndex),
    typeOfGame: "wordle-history",
  });

  useEffect(() => {
    logMyEvent("history-play", "" + appContext.solutionIndex);
    setNewMessage("Slovo č." + appContext.solutionIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (appContext.solutionIndex === -1) {
    return (
      <MyAlert
        message={
          "Zadaný identifikátor dne '" +
          solutionIndex +
          "' je neplatný. Vraťte se na úvodní stránku kliknutím na ikonku 'S' vlevo nahoře."
        }
        variant="error"
      />
    );
  }

  return (
    <WordlePlayWrapper appContext={appContext} setNewMessage={setNewMessage} />
  );
}

export default HistoryPlay;
