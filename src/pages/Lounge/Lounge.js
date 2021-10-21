import react from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import LoungeHome from '../LoungeHome';
import WeeklyChallenge from '../WeeklyChallenge';
import LoungeBandCovers from '../LoungeBandCovers';
import LoungeSoloCovers from '../LoungeSoloCovers';
import CoverRoom from '../CoverRoom/CoverRoom';
import NotFoundPage from '../NotFoundPage';
import LoungeFreeCovers from '../LoungeFreeCovers';
import LoungeSongCovers from '../LoungeSongCovers';
import CoverRoomRecord from '../CoverRoomRecord/CoverRoomRecord';

const Lounge = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={LoungeHome} />
      <Route
        path={`${match.path}/weekly/search/:content`}
        component={WeeklyChallenge}
        exact
      />
      <Route path={`${match.path}/song/:id`} component={LoungeSongCovers} />
      <Route path={`${match.path}/weekly`} component={WeeklyChallenge} />
      <Route
        path={`${match.path}/band/search/:content`}
        component={LoungeBandCovers}
        exact
      />
      <Route path={`${match.path}/band`} component={LoungeBandCovers} />
      <Route
        path={`${match.path}/solo/search/:content`}
        component={LoungeSoloCovers}
        exact
      />
      <Route path={`${match.path}/solo`} component={LoungeSoloCovers} />
      <Route
        path={`${match.path}/free/search/:content`}
        component={LoungeFreeCovers}
        exact
      />
      <Route path={`${match.path}/free`} component={LoungeFreeCovers} />
      <Route path={`${match.path}/cover/:id`} component={CoverRoom} exact />
      <Route
        path={`${match.path}/record/:id`}
        component={CoverRoomRecord}
        exact
      />
      <Route path="*" component={NotFoundPage} exact />
    </Switch>
  );
};

export default Lounge;
