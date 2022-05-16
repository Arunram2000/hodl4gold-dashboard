import React from "react";
// import { Footer } from "../../components";
import Chart from "./Chart";

import "./Dashboard.scss";
import Stats from "./Stats";
import TokenStats from "./TokenStats";

const Dashboard: React.FC = () => {
  const renderDashboardContent = (
    <div className="dashboard-content">
      <Stats />
      <div className="graphs">
        <Chart />
        <TokenStats />
      </div>
    </div>
  );

  return (
    <>
      <main className="dashboard_wrapper pad">
        <div className="mx pad">
          <div className="dashboard">
            <section className="dashboard-header">
              <h5> </h5>
              <p>Dashboard</p>
            </section>
            {renderDashboardContent}
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Dashboard;
