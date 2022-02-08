import { Box, Grid } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useGetStats } from "../../lib/dataAdapter";
import { loadGameStateFromLocalStorageNew } from "../../lib/localStorage";
import { logMyEvent } from "../../lib/settingsFirebase";
import MyAlert from "../alerts/MyAlert";
import MainLoader from "../muiStyled/MainLoader";
import HistoryCard from "./HistoryCard";
import PageTitle from "./PageTitle";
import { getHistoryItems } from "./statisticsLib";

export default function History() {
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
    () =>
      myStatsLocalStorage ? getHistoryItems(myStatsLocalStorage, stats) : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stats]
  );
  console.log(rows);

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

      <Grid container spacing={2} sx={{ pt: 2 }}>
        {rows &&
          rows.map((row) => (
            <Grid item xs={12} md={6} lg={4}>
              <HistoryCard data={row} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

// <Grid container spacing={2} sx={{ pl: 1, pr: 1 }}>
//           <Grid item xs={12}>
//             <Typography sx={{ mt: 1 }}>
//               Kliknutím na <PlayCircleOutlineIcon color="primary" /> spustíte
//               danou hru. Kliknutím na <BarChartIcon color="primary" /> zobrazíte
//               porovnání s ostatními hráči. Tabulkou můžete posouvat potažením
//               myši/prstu.
//             </Typography>
//             <Typography>
//               Význam sloupců: 1.sloupec zobrazuje datum a pořadové číslo slova.
//               2.sloupec vaše score (počet pokusů) u daného slova. 3.sloupec
//               ukazuje počet odehraných her všech hráčů. 4.sloupec obsahuje
//               hrubou kalkulaci úspěšnosti všech hráčů (0% by značilo, že nikdo
//               slovo neuhodl. 100% hypotetickou situaci, že by všichni uhodli
//               slovo na 1.pokus). Čím je číslo nižší, tím bylo dané slovo na
//               uhodnutí těžší.
//             </Typography>
//             <Typography>
//               Zaznamenávání odehraných her bylo spuštěno až 23.1. Do té doby
//               nemusí být data přesná a mohou vykazovat nepřesnosti. Omlouvám se.
//               Zároveň se omlouvám za nulté (0.) slovo, je ze soboty z první
//               verze kterou jsem nasadil.
//             </Typography>
//           </Grid>
