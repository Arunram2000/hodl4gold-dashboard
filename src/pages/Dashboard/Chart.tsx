import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import arrow from "../../assets/icons/arrow.svg";
import { chartData } from "../../data/chart";

const timeframeLists = ["monthly", "weekly", "yearly"];

const Chart: React.FC = () => {
  const [timeframe, setTimeFrame] = useState("monthly");
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="chart_wrapper">
      <div className="chart-header">
        <h4>Reward distribution vs payouts (under dev)</h4>
        <section>
          <h5>TIMEFRAME :</h5>{" "}
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
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={10} />
            <YAxis fontSize={10} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
