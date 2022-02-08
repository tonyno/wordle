import PersonIcon from "@mui/icons-material/Person";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import Chart from "react-apexcharts";
import { HistoryData } from "./statisticsLib";

export type HistoryProps = {
  data: HistoryData;
};

const HistoryCard = ({ data }: HistoryProps) => {
  const theme = useTheme();
  // https://apexcharts.com/docs/options/annotations/
  const graphData = {
    options: {
      chart: {
        id: "basic-bar",
        sparkline: {
          enabled: true,
        },
      },
      colors: [
        theme.wordle.cell.correct.bgcolor,
        theme.wordle.cell.correct.bgcolor,
        theme.wordle.cell.correct.bgcolor,
        theme.wordle.cell.correct.bgcolor,
        theme.wordle.cell.correct.bgcolor,
        theme.wordle.cell.correct.bgcolor,
        "#ee0000",
      ],
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: false,
          dataLabels: {
            position: "bottom",
          },
        },
      },

      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName: any) {
              return "";
            },
          },
        },
        marker: {
          show: true,
        },
      },
    },
    series: [
      {
        data:
          data.guessesDistribution && data.guessesDistribution.length === 7
            ? data.guessesDistribution
            : [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                {data.dateStr}
              </Grid>
              <Grid item xs={12}>
                {data.solution}
              </Grid>
              <Grid item xs={12}>
                {data.myScore}
              </Grid>
              <Grid item xs={12}>
                {"Nejlepších " + data.percentil + "%"}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Chart
              options={graphData.options}
              series={graphData.series}
              type="bar"
              height={100}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small">Hrát</Button>
        <Button size="small">Graf</Button>
        <Box sx={{ marginLeft: "auto", justifyContent: "center" }}>
          <Typography
            variant="body2"
            color="text.disabled"
            sx={{ justifyContent: "center" }}
          >
            <PersonIcon />
            {data.playsCount}
            <ThumbUpIcon sx={{ ml: 2 }} />
            {data.successRate}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default HistoryCard;

// 514.32 kB (+126.34 kB)  build\static\js\main.4daab5e1.js
// 1.73 kB                 build\static\js\27.5dbfd2fb.chunk.js
// 794 B                   build\static\css\main.51cc142e.css
