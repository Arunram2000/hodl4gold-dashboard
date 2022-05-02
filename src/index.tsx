import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
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
      <BrowserRouter>
        <ReduxProvider store={store}>
          <Provider>
            <App />
          </Provider>
        </ReduxProvider>
      </BrowserRouter>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
