import react, { useState, useEffect, useRef } from 'react';
import CoverGrid from '../CoverGrid';
import SongGrid from '../SongGrid';
import GridContainer from '../GridContainer';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { debounce, throttle } from 'lodash';

const QUERY_BAND = gql`
  query Query($filter: QueryBandInput!, $first: Int!, $after: String) {
    queryBand(filter: $filter, first: $first, after: $after) {
      bands {
        backGroundURI
        song {
          artist
          name
          weeklyChallenge
        }
        name
        isSoloBand
        isFreeBand
        likeCount
        viewCount
        bandId
        session {
          position
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const InfiniteScrollGrid = (props) => {
  const { coverWidth, bandFilter } = props;
  const [coverData, setCoverData] = useState([]);
  const [windowWidth, setWindowWidth] = useState();
  const [lastCover, setLastCover] = useState();
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const [loadCover, { loading, error, data }] = useLazyQuery(QUERY_BAND, {
    onCompleted: (data) => {
      setCoverData([...coverData, ...data.queryBand.bands]);
      setLastCover(data.queryBand.pageInfo.endCursor);

      if (data.queryBand.pageInfo.hasNextPage === false) {
        setIsEnd(true);
      }
    },
  });

  const coverRef = useRef();

  const resizeWindow = debounce(
    () => setWindowWidth(coverRef.current.clientWidth),
    10,
  );

  const handleScroll = throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      setIsScrollBottom(true);
    }
  }, 300);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isScrollBottom && !isEnd) {
      loadCover({
        variables: {
          filter: bandFilter,
          first: 8,
          after: lastCover,
        },
      });
      setIsScrollBottom(false);
    }
  }, [isScrollBottom]);

  useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);

    return () => window.removeEventListener('resize', resizeWindow);
  }, []);

  useEffect(() => {
    if (bandFilter) {
      setCoverData([]);
      loadCover({
        variables: {
          filter: bandFilter,
          first: 8,
        },
      });
    }
  }, [bandFilter]);

  const showResponsiveCoverGrid = () => {
    if (windowWidth) {
      const coverUnit = parseInt(
        (windowWidth * 0.945) / parseInt(coverWidth.split('px')[0]),
      );

      if (coverData.length > 0) {
        return (
          <GridContainer templateColumn={coverWidth} autoFill>
            {coverData
              .slice(
                0,
                coverData.length > coverUnit
                  ? isEnd
                    ? coverData.length
                    : coverData.length - (coverData.length % coverUnit)
                  : coverData.length,
              )
              .map((v) => {
                return <CoverGrid key={`coverData + ${v.bandId}`} data={v} />;
              })}
          </GridContainer>
        );
      } else if (data && coverData.length === 0) {
        return <NoCover>등록된 커버가 없습니다</NoCover>;
      }
    }
  };

  return (
    <InfiniteScrollGridContainer ref={coverRef}>
      {showResponsiveCoverGrid()}
      {loading && !isEnd ? (
        <LoadingContainer>
          <LoadingOutlined />
        </LoadingContainer>
      ) : null}
    </InfiniteScrollGridContainer>
  );
};

const InfiniteScrollGridContainer = styled.div`
  width: 100%;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 6rem;
  color: #6236ff;
`;

const NoCover = styled.div`
  font-size: 1.4rem;
  color: #9b94b3;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 12rem;
  letter-spacing: -0.5px;
  font-weight: 800;
`;

export default InfiniteScrollGrid;
