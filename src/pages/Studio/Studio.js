import react from 'react';
import { Route, Link } from 'react-router-dom';
import SubMenu from '../../components/SubMenu';
import StudioHome from '../StudioHome';
import StudioBandCover from '../StudioBandCover';
import StudioSoloCover from '../StudioSoloCover';
import MusicInformation from '../MusicInformation';
import CoverMaking from '../CoverMaking';

const Studio = ({ match }) => {
  return (
    <>
      <SubMenu page={'Studio'} />
      <Route exact path={match.path} component={StudioHome} />
      <Route path={`${match.path}/band`} component={StudioBandCover} exact />
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
      <Route path={`${match.path}/cover/:id`} component={CoverMaking} />
    </>
  );
};

export default Studio;
