import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getChartsData } from "../../api";

import arrow from "../../assets/icons/arrow.svg";
import { IChart } from "../../constants/types";

const timeframeLists = ["monthly", "weekly", "yearly"];

const getTimestamp = (timeframe: string) => {
  const currentDate = new Date();
  if (timeframe === "monthly") {
    const pastDate = currentDate.setDate(currentDate.getDate() - 30);
    return parseInt(String(pastDate / 1000));
  }
  if (timeframe === "yearly") {
    const pastDate = currentDate.setDate(currentDate.getDate() - 365);
    return parseInt(String(pastDate / 1000));
  }
  const pastDate = currentDate.setDate(currentDate.getDate() - 7);
  return parseInt(String(pastDate / 1000));
};

const Chart: React.FC = () => {
  const [timeframe, setTimeFrame] = useState("weekly");
  const [isActive, setIsActive] = useState(false);
  const [chartData, setChartData] = useState<IChart[]>([]);

  const handleGetChartsData = useCallback(async () => {
    const timestamp = getTimestamp(timeframe);
    const data = await getChartsData(String(timestamp));
    if (data) setChartData(data);
  }, [timeframe]);

  useEffect(() => {
    handleGetChartsData();
  }, [handleGetChartsData]);

  return (
    <div className="chart_wrapper">
      <div className="chart-header">
        <h4>Burn History</h4>
        <section>
          {/* <h5>TIMEFRAME :</h5>{" "} */}
          <div
            className="timeframe_dropdown"
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
          >
            <p className="flex">
              <span>{timeframe}</span> <img src={arrow} alt="arrow icon" />
            </p>
            <AnimatePresence exitBeforeEnter>
              {isActive && (
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="dropdown_list"
                >
                  {timeframeLists.map((t, index) => (
                    <p
                      key={index.toString()}
                      onClick={() => {
                        setTimeFrame(t);
                        setIsActive(false);
                      }}
                    >
                      {t}
                    </p>
                  ))}
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
      <div className="chart-content">
        <ResponsiveContainer width={"100%"} height={300}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <XAxis dataKey="timestamp" />
            <YAxis
              dataKey="Burns"
              width={0}
              domain={[0, "dataMax + 10"]}
              tick={false}
              tickFormatter={(value) =>
                new Intl.NumberFormat("en", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(value)
              }
            />
            <Tooltip formatter={(val) => Number(val) * Math.pow(10, 9)} />
            <Area
              type="monotone"
              dataKey="Burns"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            {/* <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            /> */}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
