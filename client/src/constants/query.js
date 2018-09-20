import gql from "graphql-tag";

export const LOG_IN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const SIGN_UP = gql`
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

export const CAPTURE_EMAIL = gql`
  mutation($email: String!) {
    captureEmail(email: $email) {
      id
      email
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    getUser {
      id
      name
    }
  }
`;
