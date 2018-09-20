import React, { Component } from "react";
import styled from "styled-components";

class Main extends Component {
  state = {};
  render() {
    const { getUser } = this.props.data;
    return (
      <StyledMain>
        <h1>Hi {getUser.name}</h1>
      </StyledMain>
    );
  }
}

const StyledMain = styled.div`
  padding: 2rem;
  text-align: center;
`;

export default Main;
