import { Box, Button, Grid } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getFinishedGameStatsFromLocalStorage } from "../../lib/localStorage";
import ChartBar from "./ChartBar";
import PageTitle from "./PageTitle";

const Statistics = () => {
  /*const [faqData, faqLoading, faqError] = useGetFaq();*/
  const personalStats = getFinishedGameStatsFromLocalStorage();
  const navigate = useNavigate();

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <PageTitle title="Osobní statistika" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ChartBar distribution={personalStats.guessesDistribution} />
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
