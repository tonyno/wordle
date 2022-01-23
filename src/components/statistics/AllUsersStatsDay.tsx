import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetStatsDocument } from "../../lib/dataAdapter";
import { logMyEvent } from "../../lib/settingsFirebase";
import { getSolutionIndexFromUrlSafe } from "../../lib/words";
import MyAlert from "../alerts/MyAlert";
import MainLoader from "../muiStyled/MainLoader";
import ChartBar from "./ChartBar";
import PageTitle from "./PageTitle";
import PieChartStats from "./PieChartStats";

type Props = {
  setNewMessage: (newText: string) => void;
};

const AllUsersStatsDay = ({ setNewMessage }: Props) => {
  /*const [faqData, faqLoading, faqError] = useGetFaq();*/
  let { solutionIndex } = useParams();
  const safeSolutionIndex = getSolutionIndexFromUrlSafe(solutionIndex);
  const [day] = useState(safeSolutionIndex);
  const [data, loadingData, errorData] = useGetStatsDocument(
    "day" + safeSolutionIndex
  );
  console.log(data);

  useEffect(() => {
    logMyEvent("history-day", "" + day);
    setNewMessage("Slovo č." + day);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {errorData && (
        <MyAlert
          message={
            "Nepodařilo se načíst statistiku. Ujistěte se, že máte funkční připojení k internetu. Chyba: " +
            errorData.message
          }
          variant="error"
        />
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <PageTitle title="Statistika" backUrl="/history" />
        {loadingData && <MainLoader title="Načítám statistiku hráčů...." />}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {data && data?.guessesDistribution && (
              <ChartBar distribution={data?.guessesDistribution} />
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ mt: 3 }}>
              Graf výše znázorňuje počet jednotlivých her dokončených na uvedený
              počet pokusů. Např. sloupec 3 znamená, že hráč zkusil 2 slova a na
              3. pokus hledané slovo našel. Sloupec "N" značí hry, kdy hráč dané
              slovo neuhodl ani na 6.pokus a prohrál.
            </Typography>
            <Typography>
              Sloupce 1 a 2 jsou ovlivněny situacemi, kdy hráč výsledné slovo
              již znal (např. z mobilu) a na v jiném prohlížeči nebo zařízení
              (např. PC) dané slovo zadal znovu. Viz FAQ.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            {data && data.win && data.loose && (
              <PieChartStats win={data.win} loose={data.loose} />
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ mt: 3 }}>
              Zelená barva značí úspěšné hry (1..6 pokusů), červená neúspěšné.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AllUsersStatsDay;
