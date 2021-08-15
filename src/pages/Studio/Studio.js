import react from 'react';
import { Route } from 'react-router-dom';
import StudioHome from '../StudioHome';
import StudioBandCover from '../StudioBandCover';
import StudioSoloCover from '../StudioSoloCover';
import MusicInformation from '../MusicInformation';
import CoverMaking from '../CoverMaking';
import RecordPage from '../RecordPage';

const Studio = ({ match }) => {
  return (
    <>
      <Route exact path={match.path} component={StudioHome} />
      <Route path={`${match.path}/band`} component={StudioBandCover} exact />
      <Route path={`${match.path}/solo`} component={StudioSoloCover} exact />
      <Route
        path={`${match.path}/:sort/:id`}
        component={MusicInformation}
        exact
      />
      <Route
        path={`${match.path}/:sort/:id/cover`}
        component={CoverMaking}
        exact
      />
    </>
  );
};

export default Studio;
