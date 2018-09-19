import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { Router } from "@reach/router";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import InitialSignUp from "./components/InitialSignUp";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Main from "./components/Main";

// Create an ApolloClient with middleware to add auth headers to each query

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem("user-token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer: ${token}` : ""
      }
    });
  }
});

const GET_USER = gql`
  query GetUser {
    getUser {
      id
      name
    }
  }
`;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={GET_USER}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error)
              return (
                <Router>
                  <InitialSignUp path="/" />
                  <SignUp path="/signup/:id" />
                  <LogIn path="/login" />
                </Router>
              );
            return (
              <Router>
                <Main path="//*" data={data} />
              </Router>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
