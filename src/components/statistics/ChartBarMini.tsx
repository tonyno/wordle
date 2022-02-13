import { useTheme } from "@mui/material";
import Chart from "react-apexcharts";

export type ChartProps = {
  guessesDistribution?: number[];
  myScore?: number | null;
};

const ChartBarMini = ({ guessesDistribution, myScore }: ChartProps) => {
  const theme = useTheme();
  let colors = [
    // theme.wordle.cell.present.bgcolor,
    "#c0cccf",
    "#c0cccf",
    "#c0cccf",
    "#c0cccf",
    "#c0cccf",
    "#c0cccf",
    "#d47070",
  ];
  if (myScore) {
    colors[myScore - 1] = theme.wordle.cell.correct.bgcolor;
  }

  // https://apexcharts.com/docs/options/annotations/
  const graphData = {
    options: {
      chart: {
        id: "basic-bar",
        sparkline: {
          enabled: true,
        },
      },
      colors: colors,
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
          show: false,
        },
      },
    },
    series: [
      {
        data:
          guessesDistribution && guessesDistribution.length === 7
            ? guessesDistribution
            : [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };

  return (
    <Chart
      options={graphData.options}
      series={graphData.series}
      type="bar"
      height={100}
    />
  );
};

export default ChartBarMini;

// 514.32 kB (+126.34 kB)  build\static\js\main.4daab5e1.js
// 1.73 kB                 build\static\js\27.5dbfd2fb.chunk.js
// 794 B                   build\static\css\main.51cc142e.css
