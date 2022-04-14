import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
import logo from "../../assets/images/logo_dark.png";
import dashboard from "../../assets/icons/dashboard.svg";
// import arrow from "../../assets/icons/arrow.svg";
// import app from "../../assets/icons/app.svg";
import Button from "../Button";
import { useWeb3React } from "@web3-react/core";
import Menu from "../Icons/Menu";

const Header: React.FC = () => {
  const { account } = useWeb3React();
  const [sidebar, setSidebar] = useState(false);

  const renderHeaderControls = (
    <div className="header_controls">
      <Button>
        {account
          ? `${account.slice(0, 6)}...${account.slice(account.length - 6)}`
          : "Connect wallet"}
      </Button>
      <Button variant="secondary">Buy H4G Now.</Button>
    </div>
  );

  const renderHeaderLinks = (
    <>
      <div className="header_lists-links">
        <div className="search_bar">
          <input type="search" placeholder="Explore with address" />
        </div>
        <Link to={"/"}>Home</Link>
        <Link to={"/"}>Smart Contracts</Link>
      </div>
    </>
  );

  return (
    <>
      <header className="header_wrapper pad">
        <section className="mx">
          <div className="header_lists">
            <img src={logo} alt="logo" className="logo" />
            {renderHeaderLinks}
          </div>
          {renderHeaderControls}
          <div className="header_hamburger" onClick={() => setSidebar(true)}>
            <Menu />
          </div>
        </section>
      </header>
      <nav className="navbar pad">
        <section className="mx pad">
          <div className="nav_links">
            <Link to="/" className="link">
              <img src={dashboard} alt="icon" />
              <span>Dashboard</span>
            </Link>
            {/* <div className="dropdown_link">
              <p><img src={app} alt="icon" /><span>Apps <img src={arrow} alt="arrow icon" /></span></p>
              <div className="dropdown_lists">
                
              </div>
            </div> */}
          </div>
        </section>
      </nav>
      <section
        className={sidebar ? "sidebar_backdrop active" : "sidebar_backdrop"}
        onClick={() => setSidebar(false)}
      />
      <aside className={sidebar ? "sidebar active" : "sidebar"}>
        {renderHeaderLinks}
        {renderHeaderControls}
      </aside>
    </>
  );
};

export default Header;
