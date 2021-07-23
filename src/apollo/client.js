import { ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { currentUserVar, cache } from './cache';
import dotenv from 'dotenv';
dotenv.config();

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_APOLLO_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      authorization: token ? token : '',
      ...headers,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
});
