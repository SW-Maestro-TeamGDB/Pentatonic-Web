import { ApolloClient, createHttpLink } from '@apollo/client';
import { cache } from './cache';
import dotenv from 'dotenv';
dotenv.config();

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_APOLLO_URI,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: cache,
});
