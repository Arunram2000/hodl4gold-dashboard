import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider as ReduxProvider } from "react-redux";
import { Web3Provider } from "@ethersproject/providers";

import "./index.scss";
import App from "./App";
import Provider from "./store/Provider";
import store from "./store";

function getLibrary(provider: any) {
  return new Web3Provider(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <HashRouter>
        <ReduxProvider store={store}>
          <Provider>
            <App />
          </Provider>
        </ReduxProvider>
      </HashRouter>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
