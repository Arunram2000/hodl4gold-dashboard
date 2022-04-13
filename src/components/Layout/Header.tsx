import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
import logo from "../../assets/images/logo_dark.png";
import dashboard from "../../assets/icons/dashboard.svg";
import Button from "../Button";
import { useWeb3React } from "@web3-react/core";

const Header: React.FC = () => {
  const { account } = useWeb3React();
  return (
    <>
      <header className="header_wrapper pad">
        <section className="mx">
          <div className="header_lists">
            <img src={logo} alt="logo" className="logo" />
            <div className="header_lists-links">
              <div className="search_bar">
                <input type="search" placeholder="Explore with address" />
              </div>
              <Link to={"/"}>Home</Link>
              <Link to={"/"}>Smart Contracts</Link>
            </div>
          </div>
          <div className="header_controls">
            <Button>
              {account
                ? `${account.slice(0, 6)}...${account.slice(
                    account.length - 6
                  )}`
                : "Connect wallet"}
            </Button>
            <Button variant="secondary">Buy H4G Now.</Button>
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
          </div>
        </section>
      </nav>
    </>
  );
};

export default Header;
