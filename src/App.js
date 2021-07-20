import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { createHttpLink } from 'apollo-link-http';
import ScrollToTop from './lib/ScrollToTop';
import styled from 'styled-components';
import Header from './components/Header';
import Menu from './components/Menu';
import LoungeHome from './pages/LoungeHome';
import Register from './pages/Register';
import Artist from './pages/Artist';
import Lounge from './pages/Lounge';
import Profile from './pages/Profile';
import Studio from './pages/Studio';
import Library from './pages/Library';
import Liked from './pages/Liked';
import Login from './pages/Login/Login';

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
        <ScrollToTop />
        <Header />
        <Menu />
        <Centered>
          <Switch>
            <Route path="/" component={LoungeHome} exact />
            <Route path="/login" component={Login} />
            <Route path="/lounge" component={Lounge} />
            <Route path="/studio" component={Studio} />
            <Route path="/artist" component={Artist} />
            <Route path="/profile" component={Profile} />
            <Route path="/register" component={Register} />
            <Route path="/library" component={Library} />
            <Route path="/liked" component={Liked} />
          </Switch>
        </Centered>
      </Router>
    </ApolloProvider>
  );
}

const Centered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 160px;
  width: 100%;
`;

export default App;
