import React, { Component } from "react";
import { Router } from "@reach/router";
import InitialSignUp from "./components/InitialSignUp";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <InitialSignUp path="/" />
          <SignUp path="/signup/:id" />
          <LogIn path="/login" />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
