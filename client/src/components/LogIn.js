import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import { Button, Input, Typography, Label } from "@smooth-ui/core-sc";
import { Link, navigate } from "@reach/router";
import { LOG_IN } from "../constants/query";

class LogIn extends Component {
  state = {
    email: "",
    password: "",
    showErrorMessage: false,
    showInvalid: false
  };

  // Set the data to local storage for Auth Queries
  saveUserData = (id, token) => {
    localStorage.setItem("user-id", id);
    localStorage.setItem("user-token", token);
  };

  handleSubmit = (event, login) => {
    const { email, password } = this.state;
    event.preventDefault();
    if (email === "" || password === "") {
      this.setState({ showErrorMessage: true });
      return;
    } else {
      login()
        .then(({ data: { login } }) => {
          const id = login.user.id;
          const token = login.token;
          this.saveUserData(id, token);
          console.log("Success!");
          console.log(localStorage);
          window.location.reload(true);
          navigate("/");
        })
        .catch(error => {
          this.setState({ showInvalid: true });
          console.log(error);
        });
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <Mutation mutation={LOG_IN} variables={{ email, password }}>
        {login => (
          <MainBody className="page">
            <Typography variant="display-3">Log in</Typography>
            <form
              method="post"
              id="login-form"
              onSubmit={event => this.handleSubmit(event, login)}
            >
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                value={this.state.email}
                onChange={event =>
                  this.setState({
                    email: event.target.value,
                    showErrorMessage: false
                  })
                }
                placeholder="Email"
                size="lg"
              />
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={this.state.password}
                onChange={event =>
                  this.setState({
                    password: event.target.value,
                    showErrorMessage: false
                  })
                }
                placeholder="Password"
                size="lg"
              />
              <Button variant="info" type="submit" form="login-form" size="lg">
                Log In
              </Button>
            </form>
            {this.state.showErrorMessage && (
              <span
                style={{
                  fontWeight: "300",
                  color: "red"
                }}
              >
                Please enter an email and password.
              </span>
            )}
            {this.state.showInvalid && (
              <span
                style={{
                  fontWeight: "300",
                  color: "red"
                }}
              >
                Invalid email or password.
              </span>
            )}
            <p>
              Need a BuildIt account? <StyledLink to="/">Sign up</StyledLink>
            </p>
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
  form {
    display: flex;
    flex-direction: column;
    h2,
    button,
    input {
      margin: 1rem 0 1rem 0;
    }
    h2 {
      font-size: 3rem;
    }
  }
`;

const StyledLink = styled(Link)`
  color: rgb(23, 162, 184);
  text-decoration: none;
`;

//-------------end styles-----------//

export default LogIn;
