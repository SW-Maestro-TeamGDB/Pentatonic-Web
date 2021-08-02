import react from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import LoungeHome from '../LoungeHome';
import WeeklyChallenge from '../WeeklyChallenge';
import LoungeBandCovers from '../LoungeBandCovers';
import LoungeSoloCovers from '../LoungeSoloCovers';
import CoverRoom from '../CoverRoom/CoverRoom';

const Lounge = ({ match }) => {
  return (
    <>
      <Route exact path={match.path} component={LoungeHome} />
      <Route path={`${match.path}/weekly`} component={WeeklyChallenge} />
      <Route path={`${match.path}/band`} component={LoungeBandCovers} />
      <Route path={`${match.path}/solo`} component={LoungeSoloCovers} />
      <Route path={`${match.path}/cover/:id`} component={CoverRoom} exact />
    </>
  );
};

export default Lounge;
