import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';
import { media, Default } from '../../lib/Media';

import PageContainer from '../../components/PageContainer';
import StudioBanner from '../../components/StudioBanner/StudioBanner';
import GridContainer from '../../components/GridContainer/GridContainer';
import SongGrid from '../../components/SongGrid';

import GroupIcon from '../../images/GroupIcon.svg';
import SoloIcon from '../../images/SoloIcon.svg';
import StudioBandImage from '../../images/StudioBandCover.jpg';
import StudioSoloImage from '../../images/StudioSoloCover.png';

const QUERY_SONG = gql`
  query Query($querySongFilter: QuerySongInput!) {
    querySong(filter: $querySongFilter) {
      songId
      name
      songImg
      genre
      artist
      weeklyChallenge
      level
      instrument {
        position
      }
    }
    getRecommendBand {
      bandId
      name
      backGroundURI
      likeCount
      viewCount
      song {
        name
        artist
      }
    }
  }
`;

const StudioHome = () => {
  const [songData, setSongData] = useState();
  const [recommendData, setRecommendData] = useState();
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  const { data } = useQuery(QUERY_SONG, {
    variables: {
      querySongFilter: {
        type: 'ALL',
      },
    },
    onCompleted: (data) => {
      setSongData(data.querySong);
      setRecommendData(data.getRecommendBand);
    },
  });

  const showSongGrid = () => {
    if (songData)
      return songData.map((v, i) => {
        return <SongGrid key={'SongGrid' + i} data={v} />;
      });
  };

  return (
    <PageContainer>
      <StudioBanner data={recommendData} />
      <BoardContainer>
        <BoardWrapper>
          <GridContainer>
            <CoverLinkContainer to="/studio/band">
              <Background url={StudioBandImage} position="top" />
              <BandIconContainer src={GroupIcon} />
              <LinkText>밴드 커버 만들기</LinkText>
            </CoverLinkContainer>
            <CoverLinkContainer to="/studio/solo">
              <Background url={StudioSoloImage} position="center" />
              <SoloIconContainer src={SoloIcon} />
              <LinkText>솔로 커버 만들기</LinkText>
            </CoverLinkContainer>
          </GridContainer>
        </BoardWrapper>
        <BoardWrapper>
          <BoardHeader>
            <BoardTitle>이런 곡 어때요?</BoardTitle>
          </BoardHeader>
          <GridContainer templateColumn={isMobile ? '150px' : '250px'} autoFill>
            {showSongGrid()}
          </GridContainer>
        </BoardWrapper>
      </BoardContainer>
    </PageContainer>
  );
};

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 2vh;
`;

const BoardWrapper = styled.div`
  width: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 1rem 0;

  ${media.small} {
    padding: 0 1rem;
  }
`;

const BoardHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 100%;

  ${media.small} {
    margin-bottom: 1.5rem;
  }
`;

const BoardTitle = styled.nav`
  font-size: 20px;
  font-weight: 600;
  width: 100%;
  color: black;

  line-height: 1;

  ${media.small} {
    font-size: 16px;
    letter-spacing: -1px;
    font-weight: 800;
  }
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

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: ${(props) => `${props.position} center`};
  background-size: cover;
  filter: blur(1px) brightness(50%);
  transition: all 0.3s ease-in-out;

  &:hover {
    filter: blur(0.5px) brightness(65%);
  }
`;

const CoverLinkContainer = styled(Link)`
  width: 100%;
  height: 10rem;
  border-radius: 15px;
  margin-top: 1rem;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const BandIconContainer = styled.img`
  width: 4.5rem;

  position: absolute;
  top: 15%;

  ${media.small} {
    width: 3rem;
    top: 28%;
  }
`;

const SoloIconContainer = styled.img`
  width: 3rem;

  position: absolute;
  top: 25%;

  ${media.small} {
    width: 2.5rem;
    top: 30%;
  }
`;

const LinkText = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: white;

  position: absolute;
  bottom: 20%;

  ${media.small} {
    font-size: 0.9rem;
    font-weight: 800;
  }
`;

export default StudioHome;
