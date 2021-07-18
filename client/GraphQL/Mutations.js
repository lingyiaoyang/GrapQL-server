import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation createUser($name: String!, $color: String!) {
    createUser(name: $name, color: $color) {
      name
      color
    }
  }
`;
