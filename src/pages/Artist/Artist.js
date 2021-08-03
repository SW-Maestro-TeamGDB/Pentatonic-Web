import react from 'react';
import { Route, Link } from 'react-router-dom';
import ArtistHome from '../ArtistHome';
import RisingBand from '../RisingBand';
import RisingArtist from '../RisingArtist';
import BandRank from '../BandRank';
import ArtistRank from '../ArtistRank';

const Artist = ({ match }) => {
  return (
    <>
      <Route exact path={match.path} component={ArtistHome} />
      <Route path={`${match.path}/rising/band`} component={RisingBand} />
      <Route path={`${match.path}/rising/solo`} component={RisingArtist} />
      <Route path={`${match.path}/rank/band`} component={BandRank} />
      <Route path={`${match.path}/rank/solo`} component={ArtistRank} />
    </>
  );
};

export default Artist;
