import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { emptyStatsArray } from "../../lib/localStorage";

type Props = {
  distribution: number[] | undefined | null;
};

const ChartBar = ({ distribution }: Props) => {
  // const myFormatter = (value: any, name: any, props: any): string[] => {
  //   const message = "Počet odehraných her s daným počtem pokusů je " + value;
  //   //console.log(value, name, props);
  //   return ["this is it", "yeah"];
  // };

  // https://recharts.org/en-US/examples/CustomContentOfTooltip
  // const CustomTooltip = ({ active, payload, label }: any) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div className="custom-tooltip">
  //         <p className="label">{`${label} : ${payload[0].value}`}</p>
  //         <p className="intro">Kuk</p>
  //         <p className="desc">Anything you want can be displayed here.</p>
  //       </div>
  //     );
  //   }
  //   return <div className="custom-tooltip"></div>;
  // };

  const data = (distribution ? distribution : emptyStatsArray).map(
    (item, index) => ({
      name: "" + (index === 6 ? "N" : index + 1),
      g: item,
      fill: index === 6 ? "red" : "#8884d8",
      key: "" + (index + 1),
    })
  );

  return (
    <>
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
          <YAxis allowDecimals={false} />
          {/* <Tooltip content={<CustomTooltip />} /> */}
          <Bar dataKey="g" fill="#8884d8"></Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ChartBar;

// File sizes after gzip:

//   380.3 kB (+104.42 kB)  build\static\js\main.831e4a3b.js
//   3.25 kB                build\static\css\main.8a35a9f5.css
//   1.73 kB                build\static\js\27.5dbfd2fb.chunk.js
