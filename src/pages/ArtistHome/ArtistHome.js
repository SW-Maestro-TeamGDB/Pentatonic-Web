import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PageContainer from '../../components/PageContainer';
import ArtistBanner from '../../components/ArtistBanner';
import GridContainer from '../../components/GridContainer/GridContainer';
import SongGrid from '../../components/SongGrid';
import SearchBar from '../../components/SearchBar';

import GroupIcon from '../../images/GroupIcon.svg';
import SoloIcon from '../../images/SoloIcon.svg';

const ArtistHome = () => {
  const showSongGrid = () => {
    return Array.from({ length: 4 }, () => 0).map((v, i) => {
      return <SongGrid key={'SongGrid' + i} idx={i} />;
    });
  };

  return (
    <PageContainer>
      <ArtistBanner />
      <Spacing />
      <SearchBar placeholder="검색어를 입력하세요" />
      <BoardContainer>
        <BoardWrapper>
          <BoardHeader>
            <BoardTitle>밴드 랭킹</BoardTitle>
            <BoardLink to="/artist/rank/band">더보기</BoardLink>
          </BoardHeader>
          <BoardHeader>
            <BoardTitle>아티스트 랭킹</BoardTitle>
            <BoardLink to="/artist/rank/artist">더보기</BoardLink>
          </BoardHeader>
        </BoardWrapper>
      </BoardContainer>
    </PageContainer>
  );
};

const Spacing = styled.div`
  height: 3vh;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin: 4vh 0 2vh;
`;

const BoardWrapper = styled.div`
  width: 100;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BoardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;

  position: relative;
`;

const BoardTitle = styled.nav`
  font-size: 20px;
  font-weight: 600;
  width: 100%;
  color: black;
  margin-left: 1vw;

  line-height: 1;
`;

const BoardLink = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  color: #bbbbbb;
  position: absolute;
  right: 3%;

  &:hover {
    color: rgb(150, 150, 150);
  }
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: ${(props) => `${props.position} center`};
  background-size: cover;
  filter: blur(2px) brightness(50%);
  transition: all 0.3s ease-in-out;

  &:hover {
    filter: blur(1px) brightness(70%);
  }
`;

const CoverLinkContainer = styled(Link)`
  width: 100%;
  height: 8vw;
  border-radius: 15px;
  margin-top: 1vw;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const BandIconContainer = styled.img`
  width: 3.5vw;

  position: absolute;
  top: 15%;
`;

const SoloIconContainer = styled.img`
  width: 2.5vw;

  position: absolute;
  top: 25%;
`;

const LinkText = styled.div`
  font-size: 1.2vw;
  font-weight: 700;
  color: white;
  margin-top: 0.2vw;

  position: absolute;
  bottom: 20%;
`;

export default ArtistHome;
