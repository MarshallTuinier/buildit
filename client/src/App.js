import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { Router } from "@reach/router";

import InitialSignUp from "./components/InitialSignUp";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Main from "./components/Main";

const client = new ApolloClient({});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <InitialSignUp path="/" />
          <SignUp path="/signup/:id" />
          <LogIn path="/login" />
          <Main path="/main" />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
