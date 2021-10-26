import react, { useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import WeeklyBanner from '../../components/WeeklyBanner/WeeklyBanner';
import PageContainer from '../../components/PageContainer';
import SearchBar from '../../components/SearchBar';
import CoverGrid from '../../components/CoverGrid/CoverGrid';
import GridContainer from '../../components/GridContainer/GridContainer';
import { useMediaQuery } from 'react-responsive';
import { media } from '../../lib/Media';

const GET_TREND_BANDS = gql`
  query Query($querySongFilter: QuerySongInput!) {
    querySong(filter: $querySongFilter) {
      name
      artist
      songImg
    }
    getTrendBands {
      backGroundURI
      song {
        name
        artist
      }
      name
      session {
        position
      }
      likeCount
      viewCount
      bandId
      isSoloBand
      isFreeBand
    }
  }
`;

const LoungeHome = () => {
  const { data } = useQuery(GET_TREND_BANDS, {
    variables: {
      queryBandFilter: {
        type: 'ALL',
      },
      querySongFilter: {
        weeklyChallenge: true,
        type: 'ALL',
      },
    },
  });
  const COVER_WIDTH = useMediaQuery({ maxWidth: 767 }) ? '160px' : '200px';
  const loadBandCover = () => {
    if (data) {
      const filtered = data.getTrendBands.filter((v) => !v.isSoloBand);

      if (filtered.length > 0)
        return (
          <GridContainer templateColumn={COVER_WIDTH} autoFill>
            {filtered.map((v, i) => {
              return (
                <CoverGrid key={`bandData+${v.bandId}`} data={v} autoFill />
              );
            })}
          </GridContainer>
        );
      else {
        return <NoCover>최근 떠오르는 밴드커버가 없습니다</NoCover>;
      }
    }
  };

  const loadSoloCover = () => {
    if (data) {
      const filtered = data.getTrendBands.filter((v) => v.isSoloBand);

      if (filtered.length > 0)
        return (
          <GridContainer templateColumn={COVER_WIDTH} autoFill>
            {filtered.map((v, i) => {
              return (
                <CoverGrid key={`bandData+${v.bandId}`} data={v} autoFill />
              );
            })}
          </GridContainer>
        );
      else {
        return <NoCover>최근 떠오르는 솔로커버가 없습니다</NoCover>;
      }
    }
  };

  return (
    <PageContainer>
      <WeeklyBanner data={data?.querySong} />
      <Spacing />
      <BoardContainer>
        <BoardWrapper>
          <BoardHeader>
            <BoardTitle>떠오르는 솔로커버</BoardTitle>
            <BoardLink to="/lounge/solo">더보기</BoardLink>
          </BoardHeader>
          {loadSoloCover()}
        </BoardWrapper>
        <BoardWrapper>
          <BoardHeader>
            <BoardTitle>떠오르는 밴드커버</BoardTitle>
            <BoardLink to="/lounge/band">더보기</BoardLink>
          </BoardHeader>
          {loadBandCover()}
        </BoardWrapper>
      </BoardContainer>
    </PageContainer>
  );
};

const Spacing = styled.div`
  margin: 1rem 0;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  ${media.small} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const BoardWrapper = styled.div`
  width: 47%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.small} {
    width: 100%;
    padding: 0 1rem;
    margin: 0 0 1rem;
  }
`;

const BoardHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 95%;

  ${media.small} {
    margin-bottom: 1.5rem;
  }
`;

const BoardTitle = styled.nav`
  font-size: 20px;
  font-weight: 700;
  width: 100%;
  color: black;
  letter-spacing: -1px;

  ${media.small} {
    font-size: 16px;
    letter-spacing: -1px;
    font-weight: 800;
  }
`;

const BoardLink = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: #bbbbbb;
  position: absolute;
  right: 0;

  &:hover {
    color: rgb(150, 150, 150);
  }

  ${media.small} {
    font-size: 12px;
    letter-spacing: -1px;
    font-weight: 500;
  }
`;

const NoCover = styled.div`
  font-size: 1.3rem;
  color: #9b94b3;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 12rem;
  letter-spacing: -0.5px;
  font-weight: 700;

  ${media.small} {
    font-size: 0.9rem;
    height: 3rem;
    padding-bottom: 0.5rem;
    font-weight: 700;
  }
`;

export default LoungeHome;
