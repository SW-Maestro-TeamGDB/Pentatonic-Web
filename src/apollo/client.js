import { ApolloClient, createHttpLink } from '@apollo/client';
import { cache } from './cache';

require('dotenv').config();

const httpLink = createHttpLink({
  uri: process.env.APOLLO_URI,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: cache,
});
