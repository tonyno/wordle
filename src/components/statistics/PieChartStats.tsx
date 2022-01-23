import React from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

type Props = {
  win: number;
  loose: number;
};

const PieChartStats = ({ win, loose }: Props) => {
  const data = [
    { name: "jmeno", value: win, fill: "green" },
    { name: "jine", value: loose, fill: "red" },
  ];

  return (
    <ResponsiveContainer width={"99%"} height={300}>
      <PieChart width={500} height={300}>
        <Pie
          dataKey="value"
          startAngle={0}
          endAngle={360}
          data={data}
          cx="50%"
          cy="50%"
          fill="#8884d8"
          label
        ></Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartStats;
