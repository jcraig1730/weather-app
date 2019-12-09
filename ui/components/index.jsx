// import React from "react";
// import ReactDOM from "react-dom";
// import auth0 from "auth0-js";

// import App from "./App.jsx";
// import Scratch from "./Scratch.jsx";
// ReactDOM.render(<App />, document.querySelector("#root"));

// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import * as serviceWorker from "../serviceWorker";
import { Auth0Provider } from "../react-auth0-spa";
import config from "../auth_config.json";
import history from "../utils/history";
import { StateProvider } from "../state/AppState.jsx";
import { reducer } from "../state/reducers.js";
require("babel-core/register");
require("babel-polyfill");
// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const initialState = {
  zip: "",
  userInfo: {}
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
