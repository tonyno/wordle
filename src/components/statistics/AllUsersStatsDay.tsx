import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetStats } from "../../lib/dataAdapter";
import { loadGameStateFromLocalStorageNew } from "../../lib/localStorage";
import { logMyEvent } from "../../lib/settingsFirebase";
import { getSolutionIndexFromUrlSafe } from "../../lib/words";
import MyAlert from "../alerts/MyAlert";
import MainLoader from "../muiStyled/MainLoader";
import { HistoryDayCard } from "./HistoryDayCard";
import PageTitle from "./PageTitle";
import { getAllPlayersDataForOneDay } from "./statisticsLib";

type Props = {
  setNewMessage: (newText: string) => void;
};

const AllUsersStatsDay = ({ setNewMessage }: Props) => {
  /*const [faqData, faqLoading, faqError] = useGetFaq();*/
  //const navigate = useNavigate();
  let { solutionIndex } = useParams();
  const safeSolutionIndex = getSolutionIndexFromUrlSafe(solutionIndex);
  const [day] = useState(safeSolutionIndex);
  const myStatsLocalStorage = loadGameStateFromLocalStorageNew();
  const [stats, loadingStats, errorStats] = useGetStats();

  useEffect(() => {
    logMyEvent("history-day", "" + day);
    setNewMessage("Slovo č." + day);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useMemo(
    () =>
      myStatsLocalStorage
        ? getAllPlayersDataForOneDay(myStatsLocalStorage, stats, day)
        : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stats, day]
  );

  if (loadingStats) {
    return <MainLoader title="Načítám statistiku hráčů...." />;
  }

  const twitterUrl =
    "https://twitter.com/search?q=%23hadejslova%20%23den" +
    day +
    "&src=typed_query";

  return (
    <Box justifyContent="center" component="main" sx={{ flexGrow: 1, p: 2 }}>
      <PageTitle title={"Statistika den " + day + "."} backUrl="/history" />
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
        <Grid item xs={12} md={6}>
          {data && data?.stats?.guessesDistribution && (
            <HistoryDayCard
              distribution={data?.stats?.guessesDistribution}
              myScore={data?.myScore}
              mode="others"
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Typography>Počet odehraných her:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={0} justifyContent="flex-end">
                    <Typography>{data?.stats?.games}</Typography>
                  </Grid>
                </Grid>

                <Grid item xs={8}>
                  <Typography>Počet výher:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={0} justifyContent="flex-end">
                    <Typography>{data?.stats?.win}</Typography>
                  </Grid>
                </Grid>

                <Grid item xs={8}>
                  <Typography>Počet proher:</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={0} justifyContent="flex-end">
                    <Typography>{data?.stats?.loose}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button href={twitterUrl} variant="outlined">
                    Výsledky na Twitteru
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AllUsersStatsDay;
