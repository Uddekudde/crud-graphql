import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "normalize.css";
import App from "./components/app/App";
import GraphQLApp from "./components/app/GraphQLApp";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const GRAPHQL_URL = "http://localhost:3000";

const client = new ApolloClient({
  uri: GRAPHQL_URL
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <GraphQLApp />
  </ApolloProvider>
);

ReactDOM.render(<ApolloApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
