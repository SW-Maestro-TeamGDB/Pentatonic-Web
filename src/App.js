import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { client } from './apollo/client';
import ScrollToTop from './lib/ScrollToTop';
import styled from 'styled-components';
import Header from './components/Header';
import LoungeHome from './pages/LoungeHome';
import Register from './pages/Register';
import Artist from './pages/Artist';
import Lounge from './pages/Lounge';
import Profile from './pages/Profile';
import Studio from './pages/Studio';
import Library from './pages/Library';
import Liked from './pages/Liked';
import Login from './pages/Login/Login';
import FindAccount from './pages/FindAccount';
import NotFoundPage from './pages/NotFoundPage';
import PageTracker from './lib/PageTracker';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ScrollToTop />
        <PageTracker />
        <Header />
        <Centered>
          <Switch>
            <Route path="/" component={LoungeHome} exact />
            <Route path="/login" component={Login} />
            <Route path="/lounge" component={Lounge} />
            <Route path="/studio" component={Studio} />
            <Route path="/artist" component={Artist} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/register" component={Register} />
            <Route path="/library" component={Library} />
            <Route path="/liked" component={Liked} />
            <Route path="/account" component={FindAccount} />
            <Route path="*" component={NotFoundPage} exact />
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
  top: 50px;
  width: 100%;
`;

export default App;
