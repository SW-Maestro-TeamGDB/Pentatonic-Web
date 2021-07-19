import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import WeeklyBanner from '../../components/WeeklyBanner/WeeklyBanner';
import PageContainer from '../../components/PageContainer';
import SearchBar from '../../components/SearchBar';
import CoverList from '../../components/CoverList/CoverList';

const LoungeHome = () => {
  const tempCover = () =>
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => {
      return (
        <CoverList
          id={parseInt(Math.random() * 100)}
          key={v}
          idx={parseInt(Math.random() * 5)}
        />
      );
    });

  return (
    <PageContainer>
      <WeeklyBanner />
      <Spacing />
      <BoardContainer>
        <BoardWrapper>
          <BoardHeader>
            <BoardTitle>떠오르는 밴드커버</BoardTitle>
            <BoardLink to="/lounge/band">더보기</BoardLink>
          </BoardHeader>
          <CoverContainer>{tempCover()}</CoverContainer>
        </BoardWrapper>
        <BoardWrapper>
          <BoardHeader>
            <BoardTitle>떠오르는 솔로커버</BoardTitle>
            <BoardLink to="/lounge/solo">더보기</BoardLink>
          </BoardHeader>
          <CoverContainer>{tempCover()}</CoverContainer>
        </BoardWrapper>
      </BoardContainer>
    </PageContainer>
  );
};

const Spacing = styled.div`
  margin: 2rem 0;
`;

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
`;

const BoardWrapper = styled.div`
  width: 100%;
`;

const BoardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
`;

const BoardTitle = styled.nav`
  font-size: 1.2vw;
  font-weight: 600;
  text-align: center;
  width: 100%;
  color: black;
`;

const BoardLink = styled(Link)`
  font-size: 0.8vw;
  font-weight: 500;
  color: black;
  width: 3rem;
  z-index: 2;
  position: absolute;
  right: 0;
`;

export default LoungeHome;
