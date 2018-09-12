import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import { Button, Input, Label, Typography } from "@smooth-ui/core-sc";

// GQL mutation for registering

const SIGN_UP = gql`
  mutation Signup(
    $id: String!
    $firstname: String!
    $lastname: String!
    $password: String!
  ) {
    signup(
      id: $id
      firstname: $firstname
      lastname: $lastname
      password: $password
    ) {
      token
      user {
        id
        email
      }
    }
  }
`;

class SignUp extends Component {
  state = {
    firstname: "",
    lastname: "",
    password: "",
    showErrorMessage: false
  };

  saveUserData = (id, token) => {
    localStorage.setItem("user-id", id);
    localStorage.setItem("user-token", token);
  };

  handleSubmit = (event, signup) => {
    const { firstname, lastname, password } = this.state;
    event.preventDefault();
    if (firstname === "" || lastname === "" || password === "") {
      this.setState({ showErrorMessage: true });
      return;
    } else {
      signup()
        .then(({ data: { signup } }) => {
          const id = signup.user.id;
          const token = signup.token;
          this.saveUserData(id, token);
          //TODO Push user state to the app
          console.log("Success!");
        })
        .catch(error => console.log(error));
    }
  };

  render() {
    const { id } = this.props;
    const { firstname, lastname, password } = this.state;
    return (
      <Mutation
        mutation={SIGN_UP}
        variables={{ id, firstname, lastname, password }}
      >
        {(signup, { data }) => (
          <MainBody>
            <Typography variant="display-3">Welcome to BuildIt!</Typography>
            <p>Finish setting up your account</p>
            <Label htmlFor="firstname">First Name</Label>
            <Input
              id="firstname"
              type="text"
              value={this.state.firstname}
              onChange={event =>
                this.setState({ firstname: event.target.value })
              }
              placeholder="First Name"
              size="lg"
            />
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              id="lastname"
              type="text"
              value={this.state.lastname}
              onChange={event =>
                this.setState({ lastname: event.target.value })
              }
              placeholder="First Name"
              size="lg"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={this.state.password}
              onChange={event =>
                this.setState({ password: event.target.value })
              }
              placeholder="Password"
              size="lg"
            />
            <Button
              variant="info"
              onClick={event => this.handleSubmit(event, signup)}
              size="lg"
            >
              Complete
            </Button>
            {this.state.showErrorMessage && (
              <span
                style={{
                  fontWeight: "300",
                  color: "red"
                }}
              >
                Please enter a first name, last name, and password.
              </span>
            )}
          </MainBody>
        )}
      </Mutation>
    );
  }
}

//------------styles--------------//

const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  color: white;
  margin: 0 auto;
  margin-top: 20vh;
  max-width: 700px;
  h2,
  button,
  input {
    margin: 1rem 0 1rem 0;
  }
  h2 {
    font-size: 3rem;
  }
`;

//-------------end styles-----------//

export default SignUp;
