// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./util/react-auth0-spa";
import history from "./util/history";
import { Provider } from 'react-redux'
import store from './redux/store'
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { URI } from './util/api';

const client = new ApolloClient({
  uri: URI,
});

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID
}

ReactDOM.render(
<Auth0Provider
  domain={config.domain}
  client_id={config.clientId}
  redirect_uri={window.location.origin}
  onRedirectCallback={onRedirectCallback}
>
  <ApolloProvider client={client}>
    <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();