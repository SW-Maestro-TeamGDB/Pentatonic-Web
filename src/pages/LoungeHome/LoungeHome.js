import react, { useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import WeeklyBanner from '../../components/WeeklyBanner/WeeklyBanner';
import PageContainer from '../../components/PageContainer';
import SearchBar from '../../components/SearchBar';
import CoverGrid from '../../components/CoverGrid/CoverGrid';
import GridContainer from '../../components/GridContainer/GridContainer';

const GET_TREND_BANDS = gql`
  query Query {
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
  const loadBandCover = () => {
    if (data) {
      return data.getTrendBands
        .filter((v) => !v.isSoloBand)
        .map((v, i) => {
          return <CoverGrid key={`bandData+${v.bandId}`} data={v} autoFill />;
        });
    }
  };

  const loadSoloCover = () => {
    if (data) {
      return data.getTrendBands
        .filter((v) => v.isSoloBand)
        .map((v, i) => {
          return <CoverGrid key={`bandData+${v.bandId}`} data={v} autoFill />;
        });
    }
  };

  const { data } = useQuery(GET_TREND_BANDS, {
    variables: {
      queryBandFilter: {
        type: 'ALL',
      },
    },
  });

  return (
    <PageContainer>
      <WeeklyBanner />
      <Spacing />
      <BoardContainer>
        <BoardWrapper>
          <BoardHeader>
            <BoardTitle>떠오르는 솔로커버</BoardTitle>
            <BoardLink to="/lounge/solo">더보기</BoardLink>
          </BoardHeader>
          <GridContainer templateColumn="250px" autoFill>
            {loadSoloCover()}
          </GridContainer>
        </BoardWrapper>
        <BoardWrapper>
          <BoardHeader>
            <BoardTitle>떠오르는 밴드커버</BoardTitle>
            <BoardLink to="/lounge/band">더보기</BoardLink>
          </BoardHeader>
          <GridContainer templateColumn="250px" autoFill>
            {loadBandCover()}
          </GridContainer>
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
`;

const BoardWrapper = styled.div`
  width: 47%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoardHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 95%;
`;

const BoardTitle = styled.nav`
  font-size: 20px;
  font-weight: 600;
  width: 100%;
  color: black;
`;

const BoardLink = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  color: #bbbbbb;
  position: absolute;
  right: 0;

  &:hover {
    color: rgb(150, 150, 150);
  }
`;

export default LoungeHome;
