import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "1",
    g: 535,
  },
  {
    name: "2",
    g: 439,
  },
  {
    name: "3",
    g: 1295,
  },
  {
    name: "4",
    g: 2387,
  },
  {
    name: "5",
    g: 2356,
  },
  {
    name: "6",
    g: 1533,
  },
  {
    name: "N",
    g: 1642,
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
        <Bar dataKey="g" fill="#8884d8"></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// File sizes after gzip:

//   380.3 kB (+104.42 kB)  build\static\js\main.831e4a3b.js
//   3.25 kB                build\static\css\main.8a35a9f5.css
//   1.73 kB                build\static\js\27.5dbfd2fb.chunk.js
