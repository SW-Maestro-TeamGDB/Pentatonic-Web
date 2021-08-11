import { InMemoryCache, makeVar, gql } from '@apollo/client';

export const currentUserVar = makeVar(null);

export const GET_CURRENT_USER = gql`
  query {
    user @client
  }
`;

export const GET_USER_INFORM = gql`
  query {
    getUserInfo {
      id
      username
      profileURI
      phoneNumber
      prime
      introduce
      type
    }
  }
`;

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user() {
          return currentUserVar();
        },
      },
    },
  },
});
