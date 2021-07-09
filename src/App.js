import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { createHttpLink } from 'apollo-link-http';
import Menu from './components/Menu';
import Register from './pages/Register';
import Artist from './pages/Artist';
import Lounge from './pages/Lounge';
import Profile from './pages/Profile';
import Studio from './pages/Studio';
import Library from './pages/Library';
import Liked from './pages/Liked';

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
  return (
    <ApolloProvider client={client}>
      <Router>
        <Menu />
        <Switch>
          <Route path={['/', '/lounge']} component={Lounge} exact />
          <Route path="/studio" component={Studio} exact />
          <Route path="/artist" component={Artist} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/library" component={Library} exact />
          <Route path="/liked" component={Liked} exact />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
