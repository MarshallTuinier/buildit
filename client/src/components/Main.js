import React, { Component } from "react";
import { Router } from "@reach/router";
import styled from "styled-components";
import { Query } from "react-apollo";

import { GET_FOLDER } from "../constants/query.js";

class Main extends Component {
  state = {};
  render() {
    const { name, id } = this.props.data.getTeam;
    return (
      <Query query={GET_FOLDER} variables={{ id }}>
        {data => {
          console.log(data);
          return (
            <StyledMain>
              <h1>{name}</h1>
            </StyledMain>
          );
        }}
      </Query>
    );
  }
}

const StyledMain = styled.div`
  padding: 2rem;
`;

export default Main;
