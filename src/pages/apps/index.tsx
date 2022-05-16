import React from "react";
import Calculator from "../../assets/icons/calculator.svg";
import Paint from "../../assets/icons/art.svg";
import Marketplace from "../../assets/icons/marketplace.svg";
import MerchStore from "../../assets/icons/shirt-green.svg";
// import { Footer } from "../../components";

import "./Apps.scss";

const Apps: React.FC = () => {
  const renderContent = (
    <div className="row">
      <div className="col-lg-3 mb-3">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">Shop H4G</h5>
            <img src={MerchStore} className="card-img-top" style={{padding:"50px"}} alt="..."></img>
            <p className="card-text">Shop from a selection of stylish H4G merch to support your favorite token!</p>
          </div>
          <div className="card-footer">
            <a href="https://hodl4gold.myshopify.com/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Visit Store</a>
          </div>
        </div>
      </div>

      <div className="col-lg-3 mb-3">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">Rewards Calculator</h5>
            <img src={Calculator} className="card-img-top" style={{padding:"50px"}} alt="..."></img>
            <p className="card-text">A simple tool to calculate your projected rewards over time, based on your H4G holdings.</p>
          </div>
          <div className="card-footer">
            <a href="https://aurumanalytics.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Visit Rewards calculator</a>
          </div>
        </div>
      </div>

      <div className="col-lg-3 mb-3">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">NFT Minter</h5>
            <img src={Paint} className="card-img-top" style={{padding:"50px"}} alt="..."></img>
            <p className="card-text">Turn your artwork into NFTs with our no-code minting app, at the low cost of 0.02 BNB per mint.</p>
          </div>
          <div className="card-footer">
            <a href="https://hodl4gold-nft-minting-dapp.vercel.app/dashboard" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Visit NFT Minter</a>
          </div>
        </div>
      </div>

      <div className="col-lg-3 mb-3">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">NFT Marketplace</h5>
            <img src={Marketplace} className="card-img-top" style={{padding:"50px"}} alt="..."></img>
            <p className="card-text">Buy, sell and list NFTs in custom galleries on our marketplace and show off your collection.</p>
          </div>
          <div className="card-footer">
            <a href="https://nft-market-h4g.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Visit NFT Marketplace</a>
          </div>
        </div>
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
              <p>External Apps</p>
            </section>
            {renderContent}
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Apps;
