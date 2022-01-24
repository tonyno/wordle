import BarChartIcon from "@mui/icons-material/BarChart";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Box, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  calculateStatsScore,
  StatsType,
  useGetStats,
} from "../../lib/dataAdapter";
import {
  getMyHistoricalResultToGraphs,
  loadGameStateFromLocalStorageNew,
} from "../../lib/localStorage";
import { logMyEvent } from "../../lib/settingsFirebase";
import { dateToStr, dateToStrCZShort } from "../../lib/timeFunctions";
import { getDaysListUpToday, getWordIndex } from "../../lib/words";
import MyAlert from "../alerts/MyAlert";
import MainLoader from "../muiStyled/MainLoader";
import PageTitle from "./PageTitle";

type RowType = {
  solutionIndex: number;
  playable: boolean;
  date: Date;
  dateStr: string; // 01.01.'22
  dateCode: string; // 2022-01-01
  myScore: string; // 5/6
  playsCount: number; // 3557
  successRate: string; // 75
};

export default function History() {
  const myStatsLocalStorage = loadGameStateFromLocalStorageNew();
  const [stats, loadingStats, errorStats] = useGetStats();
  const [statsDict, setStatsDict] = useState<any>({}); // TODO any
  const navigate = useNavigate();

  useEffect(() => {
    // convert list to dictionary
    if (stats && !loadingStats && !errorStats) {
      logMyEvent("history");
      let dictionary = stats.reduce(
        (a: any, x: StatsType) => ({ ...a, [x.id]: x }), // TODO any
        {}
      );
      setStatsDict(dictionary);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats]);

  //console.log(myStatsLocalStorage);

  const getMyScore = (localStorageItem: any): string => {
    const value = getMyHistoricalResultToGraphs(localStorageItem);
    if (!value) return "";
    if (value === 7) return "N/6";
    return "" + value + "/6";
  };

  const maxSolutionIndex = getWordIndex();

  const rows = getDaysListUpToday()
    .reverse()
    .map((item) => {
      const key: string = "day" + item.solutionIndex;
      const record: RowType = {
        solutionIndex: item.solutionIndex,
        playable:
          item.solutionIndex >= 0 && item.solutionIndex <= maxSolutionIndex,
        date: item.date,
        dateStr: dateToStrCZShort(item.date) + " (" + item.solutionIndex + ")",
        dateCode: dateToStr(item.date),
        myScore:
          myStatsLocalStorage && myStatsLocalStorage[key]
            ? getMyScore(myStatsLocalStorage[key])
            : "",
        playsCount: statsDict && statsDict[key] ? statsDict[key]?.games : "-",
        successRate:
          statsDict && statsDict[key]
            ? "" + calculateStatsScore(statsDict[key]) + "%"
            : "-",
      };
      return record;
    });

  //   const getMyScore = (solutionIndex: number): string => {
  //   }

  if (loadingStats) {
    return <MainLoader title="Načítám statistiku hráčů...." />;
  }

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, pt: 2, pl: 2, pr: 2 }}>
        <PageTitle title="Historie" />
      </Box>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {errorStats && (
          <MyAlert
            message={
              "Nepodařilo se načíst statistiku hráčů. Ujistěte se, že máte funkční připojení k internetu. Chyba: " +
              errorStats.message
            }
            variant="error"
          />
        )}
        <TableContainer component={Paper} sx={{ maxHeight: 400, mt: 2 }}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Datum</TableCell>
                <TableCell align="right">Vy</TableCell>
                <TableCell align="right"># her</TableCell>
                <TableCell align="right">%</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.dateStr}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.dateStr}
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() => navigate("/day/" + row.solutionIndex)}
                  >
                    {row.myScore}
                    {row.playable && <PlayCircleOutlineIcon color="primary" />}
                  </TableCell>
                  <TableCell
                    align="right"
                    onClick={() =>
                      row?.playsCount > 0 &&
                      navigate("/stats/" + row.solutionIndex)
                    }
                  >
                    {row.playsCount} <BarChartIcon color="primary" />
                  </TableCell>
                  <TableCell align="right">{row.successRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} sx={{ pl: 1, pr: 1 }}>
          <Grid item xs={12}>
            <Typography sx={{ mt: 1 }}>
              Kliknutím na <PlayCircleOutlineIcon color="primary" /> spustíte
              danou hru. Kliknutím na <BarChartIcon color="primary" /> zobrazíte
              porovnání s ostatními hráči. Tabulkou můžete posouvat potažením
              myši/prstu.
            </Typography>
            <Typography>
              Význam sloupců: 1.sloupec zobrazuje datum a pořadové číslo slova.
              2.sloupec vaše score (počet pokusů) u daného slova. 3.sloupec
              ukazuje počet odehraných her všech hráčů. 4.sloupec obsahuje
              hrubou kalkulaci úspěšnosti všech hráčů (0% by značilo, že nikdo
              slovo neuhodl. 100% hypotetickou situaci, že by všichni uhodli
              slovo na 1.pokus). Čím je číslo nižší, tím bylo dané slovo na
              uhodnutí těžší.
            </Typography>
            <Typography>
              Zaznamenávání odehraných her bylo spuštěno až 23.1. Do té doby
              nemusí být data přesná a mohou vykazovat nepřesnosti. Omlouvám se.
              Zároveň se omlouvám za nulté (0.) slovo, je ze soboty z první
              verze kterou jsem nasadil.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
