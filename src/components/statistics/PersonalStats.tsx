import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetStats } from "../../lib/dataAdapter";
import {
  getFinishedGameStatsFromLocalStorage,
  loadGameStateFromLocalStorageNew,
} from "../../lib/localStorage";
import { logMyEvent } from "../../lib/settingsFirebase";
import MyAlert from "../alerts/MyAlert";
import MainLoader from "../muiStyled/MainLoader";
import { HistoryDayCard } from "./HistoryDayCard";
import PageTitle from "./PageTitle";
import { getPersonalScore } from "./statisticsLib";

const Statistics = () => {
  /*const [faqData, faqLoading, faqError] = useGetFaq();*/
  const personalStats = getFinishedGameStatsFromLocalStorage();
  const myStatsLocalStorage = loadGameStateFromLocalStorageNew();
  const [stats, loadingStats, errorStats] = useGetStats();
  const navigate = useNavigate();

  React.useEffect(() => {
    logMyEvent("stats");
  }, []);

  const data = useMemo(
    () =>
      myStatsLocalStorage ? getPersonalScore(myStatsLocalStorage, stats) : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stats]
  );

  if (loadingStats) {
    return <MainLoader title="Načítám statistiku hráčů...." />;
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <PageTitle title="Osobní statistika" />
      {errorStats && (
        <MyAlert
          open={true}
          onClose={() => {}}
          message={
            "Nepodařilo se načíst statistiku. Ujistěte se, že máte funkční připojení k internetu. Chyba: " +
            errorStats.message
          }
          variant="error"
        />
      )}

      <Grid container alignItems="stretch" spacing={2} sx={{ pt: 2 }}>
        {data?.percentil && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{ fontWeight: 500 }}
                >
                  {"" + data?.percentil + "%"}
                </Typography>
                <Typography>
                  Jste lepší než {"" + data?.percentil + "%"} hráčů hry.
                </Typography>
                <Typography>
                  Počítáno z {data?.games} dokončených her.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button size="small" onClick={() => navigate("/history")}>
                  Porovnat s hráči
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          {personalStats && personalStats.guessesDistribution && (
            <HistoryDayCard
              distribution={personalStats.guessesDistribution}
              mode="personal"
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

// <Grid container spacing={2}>
// <Grid item xs={12}>
//   <ChartBar distribution={personalStats.guessesDistribution} />
// </Grid>
// </Grid>

// <Grid container spacing={2}>
// <Grid item xs={12}>
//   <Typography sx={{ mt: 3 }}>
//     Graf výše znázorňuje počet jednotlivých her dokončených na uvedený
//     počet pokusů. Např. hodnota 2 ve sloupci 3 znamená, že jste 2 hry
//     dokončil/a na 3. uhodnuté slovo. Sloupec "N" značí prohru, kdy dané
//     slovo nebylo uhodnuto ani na 6.pokus.
//   </Typography>
//   <Typography>
//     Zaznamenávání odehraných her bylo spuštěno až 23.1. Do té doby
//     nemusí být data přesná a mohou vykazovat nepřesnosti. Omlouvám se.
//   </Typography>
// </Grid>
// </Grid>
// <Grid container spacing={2} justifyContent="flex-center">
// <Grid item xs={12}>
//   <Button
//     variant="outlined"
//     onClick={() => {
//       navigate("/history");
//     }}
//   >
//     Porovnání vašich výsledků s ostatními hráči
//   </Button>
// </Grid>
// </Grid>

export default Statistics;
