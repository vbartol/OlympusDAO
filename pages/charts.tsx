import { useQuery } from "react-query";
import { AreaChart } from "../components/Charts/AreaChart";
import {
  convertStringDateToLocalString,
  increaseValueByPercentage,
} from "../utils";
import { BookmarkIcon } from "../components/Icons";
import { ChartValue } from "../models/ChartValue";

const API_URL =
  "https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000";
const defaultStartAPRvalue = 6.5;

const Charts = () => {
  let aprValue = defaultStartAPRvalue;

  const { data: { data } = {}, status } = useQuery("assets", async () => {
    const response = await fetch(API_URL, { method: "GET" });
    const data = await response.json();

    return data;
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error!</p>;
  }

  const terraLidoLunaAsset = data.find(
    (asset: any) => asset.assetId === "TERRA_Lido__LUNA"
  );

  const [firstSelectedFarm] = terraLidoLunaAsset?.selected_farm;

  const assetTVL = firstSelectedFarm.tvlStakedHistory.map(
    (tvl: ChartValue) => ({
      date: convertStringDateToLocalString(tvl.date),
      value: tvl.value / 1000000000,
    })
  );

  const reversedAssetTVL = assetTVL.reverse();
  const dates = reversedAssetTVL.map((array: ChartValue) => array.date);

  const assetAPR: ChartValue = dates.map((date: string) => {
    aprValue = increaseValueByPercentage(aprValue, 5);

    return { date: date, value: aprValue };
  });

  const charts = [
    { title: "Asset APR (y)", data: assetAPR, formatter: "%" },
    { title: "Asset TVL", data: reversedAssetTVL, formatter: "" },
  ];

  return (
    <div className="container">
      <div className="charts-container-title">
        <h1 style={{ color: "#5e8dce" }}>Lido: </h1>
        <h1>Luna</h1>
        <div className="icon">
          <BookmarkIcon height={25} />
        </div>
        <h3 className="last-title">Report an error</h3>
      </div>
      <div className="charts-container">
        {charts.map((chart, index) => (
          <AreaChart
            title={chart.title}
            formatter={chart.formatter}
            chartData={chart.data}
            key={index}
            axisDataKey="date"
            yaxisDataKey="value"
            color="#40E0D0"
            stroke="#FF00FF"
          />
        ))}
      </div>
    </div>
  );
};

export default Charts;
