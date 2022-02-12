import Chart from "react-apexcharts";

export type ChartOthersProps = {
  guessesDistribution?: number[];
  myScore?: number | null;
  mode: "personal" | "others";
};

const ChartBarOthers = ({
  guessesDistribution,
  myScore,
  mode,
}: ChartOthersProps) => {
  //  const theme = useTheme();
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
  const annotations = myScore
    ? {
        points: [
          {
            x: "" + (myScore === 7 ? "N" : myScore),
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 40,
              style: {
                color: "#fff",
                background: "#775DD0",
              },
              text: "Vy",
            },
          },
        ],
      }
    : undefined;
  const sum = guessesDistribution
    ? guessesDistribution.reduce((sum, value) => sum + value, 0)
    : 0;

  // https://apexcharts.com/docs/options/annotations/
  const graphData = {
    series: [
      {
        name: "Počet her",
        data: guessesDistribution,
      },
    ],
    options: {
      annotations: annotations,
      colors: colors,
      plotOptions: {
        bar: {
          borderRadius: 0,
          distributed: true,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return Math.round(100 * (val / sum)) + "%";
        },
        offsetY: -30,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: ["1", "2", "3", "4", "5", "6", "N"],

        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
        tickPlacement: "on",
        title: {
          text: "Pokus na který byla hra dokončena",
        },
      },
      yaxis: {
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
        labels: {
          show: true,
        },
        title: {
          text: "Počet her",
        },
      },
      legend: {
        show: false,
      },
    },
  };

  return (
    <Chart
      options={graphData.options}
      series={graphData.series}
      type="bar"
      height={350}
    />
  );
};

export default ChartBarOthers;

// 514.32 kB (+126.34 kB)  build\static\js\main.4daab5e1.js
// 1.73 kB                 build\static\js\27.5dbfd2fb.chunk.js
// 794 B                   build\static\css\main.51cc142e.css
