import React, { PureComponent } from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 8545, fill: "green" },
  { name: "Group B", value: 1642, fill: "red" },
];

export default class PieChartStats extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/pie-chart-of-straight-angle-oz0th";

  render() {
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
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
