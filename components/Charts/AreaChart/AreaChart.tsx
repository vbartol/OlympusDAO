import { FC } from "react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChartValue } from "../../../models/ChartValue";

import styles from "./AreaChart.module.css";

interface AreaChartProps {
  axisDataKey: string;
  yaxisDataKey: string;
  stroke: string;
  color: string;
  title: string;
  formatter: string;
  chartData: ChartValue[];
}

const AreaChart: FC<AreaChartProps> = ({
  chartData,
  yaxisDataKey,
  axisDataKey,
  stroke,
  formatter,
  title,
  color,
}) => (
  <div className={styles.container}>
    <h3 className={styles.title}>{title}</h3>
    <ResponsiveContainer width="100%" height={400}>
      <RechartsAreaChart
        data={chartData}
        margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor={stroke} stopOpacity={0.1} />
            <stop offset="30%" stopColor={stroke} stopOpacity={0.08} />
            <stop offset="50%" stopColor={stroke} stopOpacity={0.08} />
            <stop offset="100%" stopColor={color} stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <XAxis dataKey={axisDataKey} />
        <YAxis
          dataKey={yaxisDataKey}
          tickFormatter={(tick) => `${tick}${formatter}`}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Area
          type="monotone"
          dataKey="value"
          stroke={stroke}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  </div>
);

export default AreaChart;
