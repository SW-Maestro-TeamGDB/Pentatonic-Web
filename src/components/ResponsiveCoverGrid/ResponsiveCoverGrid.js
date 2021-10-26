import react, { useState, useEffect, useRef } from 'react';
import CoverGrid from '../CoverGrid';
import GridContainer from '../GridContainer';
import styled from 'styled-components';
import { debounce } from 'lodash';

const ResponsiveCoverGrid = (props) => {
  const { coverWidth, coverData, half } = props;
  const [windowWidth, setWindowWidth] = useState(0);
  const resizeWindow = debounce(
    () => setWindowWidth(coverRef.current.clientWidth),
    10,
  );
  const coverRef = useRef();

  useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, []);

  const showResponsiveCoverGrid = () => {
    if (windowWidth) {
      const coverUnit = parseInt(
        (windowWidth * 0.945) / parseInt(coverWidth.split('px')[0]),
      );

      return [...coverData]
        .reverse()
        .slice(0, coverUnit > 1 ? coverUnit : 2)
        .map((v) => {
          return <CoverGrid key={v.bandId} data={v} />;
        });
    }
  };

  return (
    <ResponsiveCoverGridContainer ref={coverRef}>
      <GridContainer templateColumn={coverWidth} autoFill>
        {showResponsiveCoverGrid()}
      </GridContainer>
    </ResponsiveCoverGridContainer>
  );
};

const ResponsiveCoverGridContainer = styled.div`
  width: 100%;
`;

export default ResponsiveCoverGrid;
