import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import "./Header.scss";
import logo from "../../assets/images/quantum-logo.png";
import dashboard from "../../assets/icons/dashboard.svg";
// import arrow from "../../assets/icons/arrow.svg";
// import app from "../../assets/icons/app.svg";
import lotto from "../../assets/icons/ticket.svg";
import wallet from "../../assets/icons/wallet.svg";
import staking from "../../assets/icons/coin.svg";
// import arrow from "../../assets/icons/arrow.svg";
import appIcon from "../../assets/icons/app.svg";
import contestIcon from "../../assets/icons/award-line.svg";
import Button from "../Button";
import { useWeb3React } from "@web3-react/core";
import Menu from "../Icons/Menu";
import { ReactComponent as Disconnect } from "../../assets/icons/logout.svg";
// import appLinks from "../../data/appLinks.json";

const Header: React.FC = () => {
  const { account, deactivate } = useWeb3React();
  const [sidebar, setSidebar] = useState(false);
  // const [dropdown, setDropdown] = useState(false);

  const renderHeaderControls = (
    <div className="header_controls">
      <Button

        style={{ gap: "1rem" }}
        onClick={async () => {
          deactivate();
        }}
      >
        <Disconnect />
        {account
          ? `${account.slice(0, 6)}...${account.slice(account.length - 6)}`
          : "Connect wallet"}
      </Button>
      {/* <Button
        onClick={() =>
          window.open(
            "https://bscscan.com/token/0xE8c4bEce93084D649fB630886b5332942b643BB9?a=" +
              account
          )
        }
      >
        {account
          ? `${account.slice(0, 6)}...${account.slice(account.length - 6)}`
          : "Connect wallet"}
      </Button> */}
      <Button
        variant="secondary"
        onClick={() =>
          window.open(
            "https://pancakeswap.finance/swap?outputCurrency=0xE8c4bEce93084D649fB630886b5332942b643BB9"
          )
        }
      >
        Buy H4G Now.
      </Button>
    </div>
  );

  const renderHeaderLinks = (
    <>
      <div className="header_lists-links">
        {/* <div className="search_bar">
          <input type="search" placeholder="Explore with address" />
        </div> */}
        <Link to={"/"}>Home</Link>
        <Link
          onClick={() =>
            window.open(
              "https://bscscan.com/address/0xE8c4bEce93084D649fB630886b5332942b643BB9"
            )
          }
          to={"/"}
        >
          Smart Contracts
        </Link>
      </div>
    </>
  );

  return (
    <>
      <header className="header_wrapper pad">
        <section className="mx pad">
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
      <nav className="navbar pad nav_container">
        <section className="mx pad" style={{width:"100%"}}>
          <div className="nav_links">
            <Link to="/" className="btn link">
              <img src={dashboard} alt="icon" />
              <span>Dashboard</span>
            </Link>
            <Link to="/contests" className="btn link">
              <img src={contestIcon} alt="icon" />
              <span>Contests</span>
            </Link>
            <Link to="/apps" className="link btn">
              <img src={appIcon} alt="icon" />
              <span>External Apps</span>
            </Link>
            <Link to="/lottery" className="link btn disabled">
              <img src={lotto} alt="icon" />
              <span>Lotto</span>
            </Link>
            <Link to="/farms" className="link btn disabled">
              <img src={staking} alt="icon" />
              <span>Staking</span>
            </Link>
            <Link to="/wallet" className="link btn disabled">
              <img src={wallet} alt="icon" />
              <span>Wallet</span>
            </Link>
            {/* <div
              className="dropdown_link"
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
            >
              <div className="app_link">
                <img src={app} alt="icon" />
                <p>
                  <span>Apps</span>
                  <img src={arrow} alt="arrow icon" />
                </p>
              </div>
              <AnimatePresence exitBeforeEnter>
                {dropdown && (
                  <motion.div
                    className="dropdown_lists"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <ul>
                      {appLinks.map((links, index) => {
                        if (Array.isArray(links.link)) {
                          return (
                            <div className="nested_link" key={index.toString()}>
                              nested links
                            </div>
                          );
                        }

                        return (
                          <li key={index.toString()}>
                            <Link to={links.link}>{links.label}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div> */}
          </div>
        </section>
      </nav>
      <section
        className={sidebar ? "sidebar_backdrop active" : "sidebar_backdrop"}
        onClick={() => setSidebar(false)}
      />
      <AnimatePresence exitBeforeEnter>
        {sidebar && (
          <motion.aside
            className={"sidebar"}
            initial={{ right: -300 }}
            animate={{ right: 0 }}
            exit={{ right: -300 }}
          >
            {renderHeaderLinks}
            {renderHeaderControls}
            <hr></hr>
            <div className="side_bar_nav_links">
              <Link to="/" className="link btn">
                <img src={dashboard} alt="icon" />
                <span>Dashboard</span>
              </Link>
              <Link to="/contests" className="link btn">
                <img src={lotto} alt="icon" />
                <span>Contests</span>
              </Link>
              <Link to="/apps" className="link btn">
                <img src={appIcon} alt="icon" />
                <span>External Apps</span>
              </Link>
              <Link to="/lottery" className="link btn disabled">
                <img src={lotto} alt="icon" />
                <span>Lotto</span>
              </Link>
              <Link to="/farms" className="link btn disabled">
                <img src={staking} alt="icon" />
                <span>Staking</span>
              </Link>
              <Link to="/wallet" className="link btn disabled">
                <img src={wallet} alt="icon" />
                <span>Wallet</span>
              </Link>
              {/* <div className="dropdown_link">
                <p><img src={app} alt="icon" /><span>Apps <img src={arrow} alt="arrow icon" /></span></p>
                <div className="dropdown_lists">
                  
                </div>
              </div> */}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
