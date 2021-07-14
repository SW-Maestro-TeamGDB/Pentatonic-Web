import react from 'react';
import { Route, Link } from 'react-router-dom';
import SubMenu from '../../components/SubMenu';
import StudioHome from '../StudioHome';
import StudioBandCover from '../StudioBandCover';
import StudioSoloCover from '../StudioSoloCover';

const Studio = ({ match }) => {
  return (
    <center>
      <SubMenu page={'Studio'} />
      <Route exact path={match.path} component={StudioHome} />
      <Route path={`${match.path}/band`} component={StudioBandCover} />
      <Route path={`${match.path}/solo`} component={StudioSoloCover} />
    </center>
  );
};

export default Studio;
