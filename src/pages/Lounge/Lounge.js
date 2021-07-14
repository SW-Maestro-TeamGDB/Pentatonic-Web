import react from 'react';
import { Route, Link } from 'react-router-dom';
import SubMenu from '../../components/SubMenu';
import LoungeHome from '../LoungeHome';
import WeeklyChallenge from '../WeeklyChallenge';
import LoungeBandCovers from '../LoungeBandCovers';
import LoungeSoloCovers from '../LoungeSoloCovers';

const Lounge = ({ match }) => {
  return (
    <center>
      <SubMenu page={'Lounge'} />
      <Route exact path={match.path} component={LoungeHome} />
      <Route path={`${match.path}/weekly`} component={WeeklyChallenge} />
      <Route path={`${match.path}/band`} component={LoungeBandCovers} />
      <Route path={`${match.path}/solo`} component={LoungeSoloCovers} />
    </center>
  );
};

export default Lounge;
