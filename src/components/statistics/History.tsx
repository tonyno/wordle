import { Box, Button, Grid } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useGetStats } from "../../lib/dataAdapter";
import { loadGameStateFromLocalStorageNew } from "../../lib/localStorage";
import { logMyEvent } from "../../lib/settingsFirebase";
import MyAlert from "../alerts/MyAlert";
import MainLoader from "../muiStyled/MainLoader";
import HistoryCard from "./HistoryCard";
import PageTitle from "./PageTitle";
import { getHistoryItems } from "./statisticsLib";

export default function History() {
  const [numberOfItems, setNumberOfItems] = useState<number>(10);
  const myStatsLocalStorage = loadGameStateFromLocalStorageNew();
  const [stats, loadingStats, errorStats] = useGetStats();
  //const [statsDict, setStatsDict] = useState<any>({}); // TODO any
  //const navigate = useNavigate();

  useEffect(() => {
    logMyEvent("history");
    //rows = getHistoryItems(myStatsLocalStorage, stats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats]);

  const rows = useMemo(
    () => getHistoryItems(myStatsLocalStorage, stats),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stats]
  );

  const onNextPage = () => {
    setNumberOfItems(numberOfItems + 10);
  };

  if (loadingStats) {
    return <MainLoader title="Načítám statistiku hráčů...." />;
  }

  return (
    <Box justifyContent="center" component="main" sx={{ flexGrow: 1, p: 2 }}>
      <PageTitle title="Historie" />

      {errorStats && (
        <MyAlert
          open={true}
          onClose={() => {}}
          message={
            "Nepodařilo se načíst statistiku hráčů. Ujistěte se, že máte funkční připojení k internetu. Chyba: " +
            errorStats.message
          }
          variant="error"
        />
      )}

      <Grid container alignItems="stretch" spacing={2} sx={{ pt: 2 }}>
        {rows &&
          rows.slice(0, numberOfItems).map((row) => (
            <Grid item xs={12} md={6} lg={4} key={row.solutionIndex}>
              <HistoryCard data={row} />
            </Grid>
          ))}
      </Grid>
      <Button
        onClick={onNextPage}
        variant="contained"
        sx={{ mt: 2 }}
        disabled={numberOfItems >= rows.length}
      >
        Načíst další..
      </Button>
    </Box>
  );
}
