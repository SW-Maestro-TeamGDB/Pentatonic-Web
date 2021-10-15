import react, { useState, useEffect, useRef } from 'react';
import CoverGrid from '../CoverGrid';
import GridContainer from '../GridContainer';
import styled from 'styled-components';
import { debounce } from 'lodash';

const CoverHistory = (props) => {
  const { coverWidth, coverData } = props;
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

  const showCoverHistory = () => {
    if (windowWidth) {
      const coverUnit = parseInt((windowWidth * 0.95) / coverWidth);

      return [...coverData]
        .reverse()
        .slice(0, coverUnit > 1 ? coverUnit : 2)
        .map((v) => {
          return <CoverGrid key={v.bandId} data={v} />;
        });
    }
  };

  return (
    <CoverHistoryContainer ref={coverRef}>
      <GridContainer templateColumn={`${coverWidth}px`} autoFill>
        {showCoverHistory()}
      </GridContainer>
    </CoverHistoryContainer>
  );
};

const CoverHistoryContainer = styled.div`
  width: 100%;
`;

export default CoverHistory;
