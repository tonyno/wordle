import { Box, Button, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getFinishedGameStatsFromLocalStorage } from "../../lib/localStorage";
import { logMyEvent } from "../../lib/settingsFirebase";
import ChartBar from "./ChartBar";
import PageTitle from "./PageTitle";

const Statistics = () => {
  /*const [faqData, faqLoading, faqError] = useGetFaq();*/
  const personalStats = getFinishedGameStatsFromLocalStorage();
  const navigate = useNavigate();

  React.useEffect(() => {
    logMyEvent("stats");
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <PageTitle title="Osobní statistika" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ChartBar distribution={personalStats.guessesDistribution} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ mt: 3 }}>
            Graf výše znázorňuje počet jednotlivých her dokončených na uvedený
            počet pokusů. Např. hodnota 2 ve sloupci 3 znamená, že jste 2 hry
            dokončil/a na 3. uhodnuté slovo. Sloupec "N" značí prohru, kdy dané
            slovo nebylo uhodnuto ani na 6.pokus.
          </Typography>
          <Typography>
            Zaznamenávání odehraných her bylo spuštěno až 23.1. Do té doby
            nemusí být data přesná a mohou vykazovat nepřesnosti. Omlouvám se.
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="flex-center">
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/history");
            }}
          >
            Porovnání vašich výsledků s ostatními hráči
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;
