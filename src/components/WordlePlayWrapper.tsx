import { useEffect } from "react";
import { useGetWordOfDay } from "../lib/dataAdapter";
import { ApplicationContext } from "../lib/playContext";
import { getDateFromSolutionIndex, getWordIndex } from "../lib/words";
import MyAlert from "./alerts/MyAlert";
import MainLoader from "./muiStyled/MainLoader";
import WordlePlay from "./WordlePlay";

type Props = {
  appContext: ApplicationContext;
  setNewMessage: (newText: string) => void;
};

const WordlePlayContext = ({ appContext, setNewMessage }: Props) => {
  const [playContext, loading, currentWordError] = useGetWordOfDay(
    getDateFromSolutionIndex(appContext.solutionIndex)
  );

  useEffect(() => {
    if (playContext && playContext.solutionIndex === getWordIndex()) {
      setNewMessage("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playContext]);

  return (
    <>
      {loading ? (
        <MainLoader title="Načítám další slovo..." />
      ) : (
        <WordlePlay playContext={playContext} />
      )}

      {currentWordError && (
        <MyAlert
          open={true}
          onClose={() => {}}
          message={
            "Nepodařilo se získat další slovo. Ujistěte se, že máte nastaveno správné systémové datum a máte funkční připojení k internetu. Chyba: " +
            currentWordError.message
          }
          variant="error"
        />
      )}
    </>
  );
};

export default WordlePlayContext;
