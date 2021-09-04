import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PageContainer from '../../components/PageContainer';
import ArtistBanner from '../../components/ArtistBanner';
import GridContainer from '../../components/GridContainer/GridContainer';
import SongGrid from '../../components/SongGrid';
import SearchBar from '../../components/SearchBar';
import RankList from '../../components/RankList';

import GroupIcon from '../../images/GroupIcon.svg';
import SoloIcon from '../../images/SoloIcon.svg';

// tempData
import TameImpala from '../../images/TempData/TameImpala.jpeg';
import Hyukoh from '../../images/TempData/Hyukoh.jpeg';
import Beatles from '../../images/TempData/Beatles.jpeg';
import MenITrust from '../../images/TempData/MenITrust.jpeg';
import NoSurprises from '../../images/TempData/NoSurprises.jpeg';
import TheVolunteers from '../../images/TempData/TheVolunteers.jpeg';

const ArtistHome = () => {
  const tempBand = [
    {
      backgroundURI: Hyukoh,
      name: '3인 혁오',
      likeCount: '730',
      bandId: 2,
    },
    {
      backgroundURI: NoSurprises,
      name: '코리아 톰 요크',
      likeCount: '530',
      bandId: 5,
    },
    {
      backgroundURI: TheVolunteers,
      name: '실력은 필요없어',
      likeCount: '340',
      bandId: 6,
    },
    {
      backgroundURI: TameImpala,
      name: '사이키델릭',
      likeCount: '130',
      bandId: 1,
    },
  ];

  const tempUser = [
    {
      username: '이종민',
      profileURI:
        'https://avatars.githubusercontent.com/u/51112542?s=400&u=e2a03455987e2f399de6f62864d46e4fc573a860&v=4',
      followerCount: 300,
      id: 'jongmin',
    },
    {
      username: '장작',
      profileURI:
        'https://media.istockphoto.com/photos/sawn-logs-close-up-on-white-background-picture-id1001192968?k=20&m=1001192968&s=612x612&w=0&h=UfOEiaeW0owdpbJzl6jffriK6tHd2lEeyo27gTX7By0=',
      followerCount: 200,
      id: 'jongmin',
    },

    {
      username: '나무',
      profileURI:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Brennreisig.JPG/1200px-Brennreisig.JPG',
      followerCount: 100,
      id: 'jongmin',
    },
    {
      username: '이쑤시개',
      profileURI:
        'data:image/jpeg;base64,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',
      followerCount: 3,
      id: 'jongmin',
    },
  ];

  const showBandRank = () => {
    return tempBand.map((v, i) => {
      return (
        <RankList key={`tempBand+${i}`} data={v} type={'band'} rank={i + 1} />
      );
    });
  };

  const showUserRank = () => {
    return tempUser.map((v, i) => {
      return (
        <RankList key={`tempBand+${i}`} data={v} type={'user'} rank={i + 1} />
      );
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
          <BoardItems>{showBandRank()}</BoardItems>
        </BoardWrapper>
        <BoardWrapper>
          <BoardHeader>
            <BoardTitle>아티스트 랭킹</BoardTitle>
            <BoardLink to="/artist/rank/artist">더보기</BoardLink>
          </BoardHeader>
          <BoardItems>{showUserRank()}</BoardItems>
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
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 4vh 0 2vh;
`;

const BoardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 95%;

  position: relative;
`;

const BoardTitle = styled.nav`
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  color: black;
  margin-left: 1vw;

  line-height: 1;
`;

const BoardItems = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 3vh;
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
