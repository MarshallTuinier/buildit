import React, { Component } from "react";
import { Router } from "@reach/router";
class Main extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>This is the main</h1>
        <Router>
          <page1 path="page1" />
          <page2 path="page2" />
        </Router>
      </div>
    );
  }
}

const page1 = () => <h2>page1</h2>;
const page2 = () => {
  return <p>hello world</p>;
};
export default Main;
