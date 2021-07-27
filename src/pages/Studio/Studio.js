import react from 'react';
import { Route, Link } from 'react-router-dom';
import SubMenu from '../../components/SubMenu';
import StudioHome from '../StudioHome';
import StudioBandCover from '../StudioBandCover';
import StudioSoloCover from '../StudioSoloCover';
import MusicInformation from '../MusicInformation';
import CoverMaking from '../CoverMaking';
import RecordPage from '../RecordPage';

const Studio = ({ match }) => {
  return (
    <>
      <SubMenu page={'Studio'} />
      <Route exact path={match.path} component={StudioHome} />
      <Route path={`${match.path}/band`} component={StudioBandCover} exact />
      <Route path={`${match.path}/solo`} component={StudioSoloCover} exact />
      <Route path={`${match.path}/:id`} component={MusicInformation} exact />

      <Route path={`${match.path}/:id/cover`} component={CoverMaking} exact />
      <Route path={`${match.path}/:id/record`} component={RecordPage} exact />
    </>
  );
};

export default Studio;
