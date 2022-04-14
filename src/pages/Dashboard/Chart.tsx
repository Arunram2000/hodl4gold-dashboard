import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import arrow from "../../assets/icons/arrow.svg";

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
      <div className="chart-content">chart</div>
    </div>
  );
};

export default Chart;
