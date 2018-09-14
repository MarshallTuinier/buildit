import React, { Component } from "react";
import { Router } from "@reach/router";

class Main extends Component {
  state = {};
  render() {
    console.log(this.props.data.getTeam);
    return (
      <div>
        <h1>This is the main</h1>
        <Router>
          <Page1 path="page1" />
          <Page2 path="page2" />
        </Router>
      </div>
    );
  }
}

const Page1 = () => <h2>page1</h2>;
const Page2 = () => {
  return <p>hello world</p>;
};
export default Main;
