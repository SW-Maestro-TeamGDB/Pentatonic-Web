import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://pentatonic.cdn.ntruss.com/api',
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Credentials': true,
    // },
    // fetch,
    fetchOptions: { mode: 'no-cors' },
  }),
  cache: new InMemoryCache(),
});

function App() {
  return <ApolloProvider client={client}></ApolloProvider>;
}

export default App;
