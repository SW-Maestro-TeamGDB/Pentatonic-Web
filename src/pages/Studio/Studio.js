import react from 'react';
import { Route, Switch } from 'react-router-dom';
import StudioHome from '../StudioHome';
import StudioBandCover from '../StudioBandCover';
import StudioSoloCover from '../StudioSoloCover';
import MusicInformation from '../MusicInformation';
import CoverMaking from '../CoverMaking';
import RecordPage from '../RecordPage';
import RecordMaking from '../RecordMaking/RecordMaking';
import NotFoundPage from '../NotFoundPage';

const Studio = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={StudioHome} />
      <Route
        path={`${match.path}/band/search/:content`}
        component={StudioBandCover}
        exact
      />
      <Route path={`${match.path}/band`} component={StudioBandCover} exact />
      <Route
        path={`${match.path}/solo/search/:content`}
        component={StudioSoloCover}
        exact
      />
      <Route path={`${match.path}/solo`} component={StudioSoloCover} exact />
      <Route
        path={`${match.path}/band/:id`}
        component={MusicInformation}
        exact
      />
      <Route
        path={`${match.path}/solo/:id`}
        component={MusicInformation}
        exact
      />
      <Route
        path={`${match.path}/band/:id/cover`}
        component={CoverMaking}
        exact
      />
      <Route
        path={`${match.path}/solo/:id/cover`}
        component={CoverMaking}
        exact
      />
      <Route
        path={`${match.path}/band/:id/record`}
        component={RecordMaking}
        exact
      />
      <Route
        path={`${match.path}/solo/:id/record`}
        component={RecordMaking}
        exact
      />
      <Route path="*" component={NotFoundPage} exact />
    </Switch>
  );
};

export default Studio;
