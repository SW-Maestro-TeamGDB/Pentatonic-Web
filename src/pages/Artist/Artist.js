import react from 'react';
import { Route } from 'react-router-dom';
import ArtistHome from '../ArtistHome';
import RisingBand from '../RisingBand';
import RisingArtist from '../RisingArtist';
import BandRank from '../BandRank';
import ArtistRank from '../ArtistRank';

import NotFoundPage from '../NotFoundPage';

const Artist = ({ match }) => {
  return (
    <>
      <Route exact path={match.path} component={ArtistHome} />
      <Route path={`${match.path}/rank/band`} component={BandRank} />
      <Route path={`${match.path}/rank/artist`} component={ArtistRank} />
      <Route path={`${match.path}/*`} component={NotFoundPage} exact />
    </>
  );
};

export default Artist;
