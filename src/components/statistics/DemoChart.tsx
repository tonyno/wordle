import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "1",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "2",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "3",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "4",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "5",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "6",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "N",
    uv: 3490,
    pv: 4300,
    amt: 2100,
    fill: "red",
    key: "X",
  },
];

export default function DemoChart() {
  const myFormatter = (value: any, name: any, props: any): string[] => {
    console.log(value, name, props);
    return ["this is it", "yeah"];
  };

  return (
    <ResponsiveContainer width={"99%"} height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={myFormatter} />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8"></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// File sizes after gzip:

//   380.3 kB (+104.42 kB)  build\static\js\main.831e4a3b.js
//   3.25 kB                build\static\css\main.8a35a9f5.css
//   1.73 kB                build\static\js\27.5dbfd2fb.chunk.js
