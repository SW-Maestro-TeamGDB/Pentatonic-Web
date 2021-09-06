import { InMemoryCache, makeVar, gql } from '@apollo/client';

export const currentUserVar = makeVar(null);
export const isLoggedInVar = makeVar(
  !!localStorage.getItem('token') && !!localStorage.getItem('userInfo'),
);

export const GET_CURRENT_USER = gql`
  query {
    user @client
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const GET_USER_INFORM = gql`
  query Query($getUserInfoUserId: Id!) {
    getUserInfo(userId: $getUserInfoUserId) {
      id
      username
      profileURI
      prime
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
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
      },
    },
  },
});
