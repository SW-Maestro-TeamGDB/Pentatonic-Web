import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import WeeklyBanner from '../../components/WeeklyBanner/WeeklyBanner';
import PageContainer from '../../components/PageContainer';
import SearchBar from '../../components/SearchBar';
import CoverGrid from '../../components/CoverGrid/CoverGrid';

const LoungeHome = () => {
  const tempCover = () =>
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => {
      return (
        <CoverGrid
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
          <Divider />
          <CoverContainer>{tempCover()}</CoverContainer>
        </BoardWrapper>
        <BoardWrapper>
          <BoardHeader>
            <BoardTitle>떠오르는 솔로커버</BoardTitle>
            <BoardLink to="/lounge/solo">더보기</BoardLink>
          </BoardHeader>
          <Divider />
          <CoverContainer>{tempCover()}</CoverContainer>
        </BoardWrapper>
      </BoardContainer>
    </PageContainer>
  );
};

const Spacing = styled.div`
  margin: 2rem 0;
`;

const Divider = styled.div`
  border-bottom: 1px solid lightgray;
  width: 90%;
  margin: 1vh 0;
`;

const CoverContainer = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(${parseInt(window.innerWidth / 800)}, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

  width: 90%;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
`;

const BoardWrapper = styled.div`
  width: 100%;
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
  margin-bottom: 1rem;
  width: 90%;
`;

const BoardTitle = styled.nav`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  width: 100%;
  color: black;
`;

const BoardLink = styled(Link)`
  font-size: 12px;
  font-weight: 500;
  color: black;
  position: absolute;
  right: 0;
`;

export default LoungeHome;
