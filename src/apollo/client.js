import { ApolloClient } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { cache } from './cache';
import dotenv from 'dotenv';
dotenv.config();

const httpLink = createUploadLink({
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
