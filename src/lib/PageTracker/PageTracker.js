import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

const PageTracker = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
  }, [pathname]);

  return null;
};

export default withRouter(PageTracker);
