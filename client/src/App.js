import React, { Component } from "react";
import { Router } from "@reach/router";
import SignUp from "./components/SignUp";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <SignUp path="/" />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
