import react from 'react';
import { Route, Switch } from 'react-router-dom';
import ArtistHome from '../ArtistHome';
import BandRank from '../BandRank';
import ArtistRank from '../ArtistRank';
import NotFoundPage from '../NotFoundPage';

const Artist = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={ArtistHome} exact />
      <Route path={`${match.path}/rank/band`} component={BandRank} exact />
      <Route path={`${match.path}/rank/artist`} component={ArtistRank} exact />
      <Route path={`*`} component={NotFoundPage} />
    </Switch>
  );
};

export default Artist;
