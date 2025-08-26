import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
        role
      }
    }
  }
`;

export const GOOGLE_LOGIN_MUTATION = gql`
  mutation GoogleLogin($token: String!) {
    googleLogin(token: $token) {
      token
      user {
        id
        email
        firstName
        lastName
        role
      }
    }
  }
`;
