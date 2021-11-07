import react, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { media, Default, Mobile, mobileCheck } from '../../lib/Media';
import styled from 'styled-components';

import PageContainer from '../../components/PageContainer';
import ArtistBanner from '../../components/ArtistBanner';
import GridContainer from '../../components/GridContainer/GridContainer';
import SongGrid from '../../components/SongGrid';
import SearchBar from '../../components/SearchBar';
import RankList from '../../components/RankList';

import GroupIcon from '../../images/GroupIcon.svg';
import SoloIcon from '../../images/SoloIcon.svg';

const GET_RANKED_USER = gql`
  query Query {
    getRankedUser {
      username
      profileURI
      id
      followerCount
      introduce
    }
  }
`;

const GET_RANKED_BANDS = gql`
  query Query {
    getRankedBands {
      bandId
      name
      backGroundURI
      likeCount
      song {
        name
        artist
      }
    }
  }
`;

const ArtistHome = ({ match }) => {
  const content = match.params?.content;
  const [bandRankList, setBandRankList] = useState();
  const [artistRankList, setArtistRankList] = useState();

  const { bandRankData } = useQuery(GET_RANKED_BANDS, {
    onCompleted: (data) => {
      setBandRankList(data.getRankedBands);
    },
  });

  const { artistRankData } = useQuery(GET_RANKED_USER, {
    onCompleted: (data) => {
      setArtistRankList(data.getRankedUser);
    },
  });

  const showBandRank = () => {
    if (bandRankList)
      return bandRankList.slice(0, 3).map((v, i) => {
        return (
          <RankList
            key={`bandRankList+${i}`}
            data={v}
            type={'band'}
            rank={i + 1}
          />
        );
      });
  };

  const showUserRank = () => {
    if (artistRankList)
      return artistRankList.slice(0, 3).map((v, i) => {
        return (
          <RankList
            key={`artistRankList+${i}`}
            data={v}
            type={'user'}
            rank={i + 1}
          />
        );
      });
  };

  return (
    <PageContainer>
      <ArtistBanner artistData={artistRankList} bandData={bandRankList} />
      <Spacing />
      <SearchBar
        placeholder="닉네임을 입력하세요"
        sort="artist"
        searching={content}
        match={match}
      />
      <BoardContainer>
        <BoardWrapper>
          <BoardHeader>
            <BoardTitle>커버 랭킹</BoardTitle>
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
  height: 2rem;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 4vh 0 2vh;

  ${media.small} {
    margin: 2rem 0;
    justify-content: center;
    flex-direction: column;
  }
`;

const BoardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  ${media.small} {
    margin-top: 1rem;
    padding: 0 1rem;
  }
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

  ${media.small} {
    font-size: 16px;
    letter-spacing: -1px;
    font-weight: 800;
  }
`;

const BoardItems = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 3vh;
`;

const BoardLink = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: #bbbbbb;
  position: absolute;
  right: 3%;

  &:hover {
    color: rgb(150, 150, 150);
  }

  ${media.small} {
    font-size: 12px;
    letter-spacing: -1px;
    font-weight: 500;
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
