import react, { useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import WeeklyBanner from '../../components/WeeklyBanner/WeeklyBanner';
import PageContainer from '../../components/PageContainer';
import SearchBar from '../../components/SearchBar';
import CoverGrid from '../../components/CoverGrid/CoverGrid';
import GridContainer from '../../components/GridContainer/GridContainer';
import ResponsiveCoverGrid from '../../components/ResponsiveCoverGrid/ResponsiveCoverGrid';
import { SearchOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { media } from '../../lib/Media';

import LoungeBandImage from '../../images/LoungeBandCover.jpg';
import LoungeSoloImage from '../../images/LoungeSoloCover.jpeg';

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
          <ResponsiveCoverGrid coverWidth={COVER_WIDTH} coverData={filtered} />
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
          <ResponsiveCoverGrid coverWidth={COVER_WIDTH} coverData={filtered} />
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
            <BoardTitle>떠오르는 밴드커버</BoardTitle>
            <BoardLink to="lounge/trending/band">더보기</BoardLink>
          </BoardHeader>
          {loadBandCover()}
        </BoardWrapper>
        <BoardWrapper>
          <BoardHeader>
            <BoardTitle>떠오르는 솔로커버</BoardTitle>
            <BoardLink to="lounge/trending/solo">더보기</BoardLink>
          </BoardHeader>
          {loadSoloCover()}
        </BoardWrapper>
      </BoardContainer>
      <Spacing />
      <BoardContainer>
        <CoverLinkContainer to="lounge/band">
          <Background url={LoungeBandImage} position="center" />
          <LinkText>
            <SearchOutlined style={{ marginRight: '10px' }} /> 밴드 커버
            전체보기
          </LinkText>
        </CoverLinkContainer>
        <CoverLinkContainer to="lounge/solo">
          <Background url={LoungeSoloImage} position="center" />
          <LinkText>
            <SearchOutlined style={{ marginRight: '10px' }} /> 솔로 커버
            전체보기
          </LinkText>
        </CoverLinkContainer>
      </BoardContainer>
    </PageContainer>
  );
};

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
`;

const CoverLinkContainer = styled(Link)`
  width: 100%;
  height: 7.5rem;
  border-radius: 15px;
  margin: 1rem 1rem;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  ${media.small} {
    height: 5rem;
    width: 90%;
    margin: 0.5rem 0;
  }

  &:hover {
    ${Background} {
      filter: blur(0.5px) brightness(65%);
    }
  }
`;

const LinkText = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
  letter-spacing: -0.5px;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  ${media.small} {
    font-size: 1.1rem;
    font-weight: 800;
  }
`;

const Spacing = styled.div`
  margin: 1rem 0;

  ${media.small} {
    margin: 0.8rem 0;
  }
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
    width: 90%;
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
