import React, { Component } from "react";
import styled from "styled-components";

class Main extends Component {
  state = {};
  render() {
    console.log(this.props);

    return (
      <StyledMain>
        <h1>Hi</h1>
      </StyledMain>
    );
  }
}

const StyledMain = styled.div`
  padding: 2rem;
  text-align: center;
`;

export default Main;
