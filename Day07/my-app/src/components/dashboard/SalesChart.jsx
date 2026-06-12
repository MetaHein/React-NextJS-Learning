"use client";

import { LineChart, Line } from "recharts";

export default function SalesChart({ data }) {
  return (
    <LineChart width={600} height={300} data={data.monthly}>
      <Line dataKey="sales" />
    </LineChart>
  );
}
