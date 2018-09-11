import React, { Component } from "react";

import Welcome from "./components/Welcome";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Welcome />
      </ApolloProvider>
    );
  }
}

export default App;
