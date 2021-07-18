import { gql } from '@apollo/client';

export const LOAD_USERS = gql`
  query {
    getAllUser {
      id
      name
      color
    }
  }
`;
