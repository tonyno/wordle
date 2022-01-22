import { Box, LinearProgress, Typography } from "@mui/material";
import { useGetWordOfDay } from "../lib/dataAdapter";
import { ApplicationContext } from "../lib/playContext";
import { getDateFromSolutionIndex } from "../lib/words";
import MyAlert from "./alerts/MyAlert";
import WordlePlay from "./WordlePlay";

type Props = { appContext: ApplicationContext };

const WordlePlayContext = ({ appContext }: Props) => {
  const [playContext, loading, currentWordError] = useGetWordOfDay(
    getDateFromSolutionIndex(appContext.solutionIndex)
  );

  const Loader = () => {
    return (
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <LinearProgress />
        <Typography>Načítám další šlovo...</Typography>
      </Box>
    );
  };

  return (
    <>
      {loading ? <Loader /> : <WordlePlay playContext={playContext} />}

      {currentWordError && (
        <MyAlert
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
