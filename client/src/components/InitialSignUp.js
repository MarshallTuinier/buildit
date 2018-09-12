import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import { validateEmail } from "../helpers/helpers";
import { Button, Input, Typography, Label } from "@smooth-ui/core-sc";

// Create the GQL mutation for adding the email

const CAPTURE_EMAIL = gql`
  mutation($email: String!) {
    captureEmail(email: $email) {
      id
      email
    }
  }
`;

class InitialSignUp extends Component {
  state = {
    email: "",
    submitted: false,
    isEmailValid: true,
    doesEmailAlreadyExist: false
  };

  handleChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  handleSubmit = (event, captureEmail) => {
    event.preventDefault();
    if (!validateEmail(this.state.email)) {
      this.setState({ isEmailValid: false });
      return;
    }
    captureEmail()
      .then(data => {
        this.setState({
          isEmailValid: true,
          submitted: true,
          doesEmailAlreadyExist: false
        });
      })
      .catch(error => {
        this.setState({ doesEmailAlreadyExist: true, isEmailValid: true });

        console.warn("Uh oh, looks like something went wrong");
      });
  };

  render() {
    const { email } = this.state;
    return (
      <Mutation mutation={CAPTURE_EMAIL} variables={{ email }}>
        {(captureEmail, { data }) => (
          <MainBody>
            <Typography variant="display-3">Welcome!</Typography>
            <p>Enter your email address to start a free trial</p>
            <Label htmlFor="email">Email</Label>
            <StyledInput
              id="email"
              type="text"
              value={this.state.inputValue}
              onChange={this.handleChange}
              placeholder="Please Enter an Email"
              size="lg"
              props={{ isEmailValid: this.state.isEmailValid }}
            />
            {!this.state.isEmailValid && (
              <span
                style={{
                  fontWeight: "300",
                  color: "red"
                }}
              >
                Please enter a valid email
              </span>
            )}
            {this.state.doesEmailAlreadyExist && (
              <span
                style={{
                  fontWeight: "300",
                  color: "red"
                }}
              >
                It looks like this email already exists. Try logging in.
              </span>
            )}
            <Button
              variant="info"
              onClick={event => this.handleSubmit(event, captureEmail)}
              size="lg"
            >
              Create my BuildIt account
            </Button>

            {this.state.submitted &&
              !this.state.doesEmailAlreadyExist && (
                <Fragment>
                  <span>Thank You!</span>
                  <span>Please check your email.</span>
                </Fragment>
              )}
            <p>Already have a BuildIt account? Log In</p>
          </MainBody>
        )}
      </Mutation>
    );
  }
}

//-------------Styles--------------

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

const StyledInput = styled(Input)`
  box-shadow: ${({ props }) =>
    props.isEmailValid ? "none" : "0px 0px 6px 8px rgba(255,0,0,0.5)"};
`;

export default InitialSignUp;
