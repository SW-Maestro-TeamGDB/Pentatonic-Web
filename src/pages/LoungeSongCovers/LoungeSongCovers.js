import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
import MakingCoverButton from '../../components/MakingCoverButton';
import PageContainer from '../../components/PageContainer';
import SearchBar from '../../components/SearchBar';
import CoverGrid from '../../components/CoverGrid/CoverGrid';
import MakingIcon from '../../images/MakingIcon.svg';
import PageImage from '../../components/PageImage';
import GridContainer from '../../components/GridContainer/GridContainer';
import NotFoundPage from '../NotFoundPage';
import { LoadingOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { media, Default } from '../../lib/Media';

import GroupIcon from '../../images/GroupIcon.svg';
import SoloIcon from '../../images/SoloIcon.svg';

const GET_SONG = gql`
  query Query($songId: ObjectID!) {
    getSong(songId: $songId) {
      songId
      songImg
      artist
      name
      band {
        bandId
        name
        backGroundURI
        viewCount
        likeCount
        session {
          position
        }
        isSoloBand
      }
    }
  }
`;

const LoungeSongCovers = ({ match }) => {
  const id = match.params?.id;
  const COVER_WIDTH = useMediaQuery({ maxWidth: 767 }) ? '250px' : '220px';
  const { loading, error, data } = useQuery(GET_SONG, {
    variables: {
      songId: id,
    },
  });
  const songData = data?.getSong;

  const loadCover = () => {
    if (songData?.band.length > 0) {
      const title = songData.name;
      const artist = songData.name;

      return (
        <GridContainer width="95%" templateColumn={COVER_WIDTH} autoFill>
          {songData.band.map((v, i) => {
            return (
              <CoverGrid
                key={`bandData+${i}`}
                data={v}
                title={title}
                artist={artist}
              />
            );
          })}
        </GridContainer>
      );
    } else if (!loading) {
      return <NoCover>등록된 커버가 없습니다</NoCover>;
    }
  };

  const CoverMenu = (
    <SubMenuContainer>
      <SubMenuSpacing />
      <SubMenuLink to={songData ? `/studio/solo/${songData.songId}/cover` : ``}>
        <SoloIconContainer src={SoloIcon} />
        솔로 커버
      </SubMenuLink>
      <SubMenuLink to={songData ? `/studio/band/${songData.songId}/cover` : ``}>
        <BandIconContainer src={GroupIcon} />
        밴드 커버
      </SubMenuLink>
      <SubMenuSpacing />
    </SubMenuContainer>
  );

  return (
    <>
      {!error ? (
        !loading ? (
          <PageContainer>
            <PageImage
              imgUrl={songData ? songData.songImg : null}
              title={songData ? songData.name : null}
              artist={songData ? songData.artist : null}
              position="top"
              desc="유저들의 커버를 감상하고 참여해보세요"
            />
            <SubContainer>
              <Default>
                <Dropdown
                  overlay={CoverMenu}
                  placement="bottomCenter"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  trigger={['click']}
                >
                  <ButtonContainer>
                    새로운 커버 만들기
                    <MakingIconImg src={MakingIcon} />
                  </ButtonContainer>
                </Dropdown>
              </Default>
            </SubContainer>
            {loadCover()}
          </PageContainer>
        ) : (
          <LoadingContainer>
            <LoadingOutlined />
          </LoadingContainer>
        )
      ) : !loading ? (
        <NotFoundPage />
      ) : null}
    </>
  );
};

const LoadingContainer = styled.div`
  width: 100%;
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12rem;
  color: #6236ff;
`;

const BandIconContainer = styled.img`
  width: 48px;
  filter: invert(100%);
  padding-right: 10px;
`;

const SoloIconContainer = styled.img`
  width: 36px;
  filter: invert(100%);
  padding-right: 10px;
`;

const MakingIconImg = styled.img`
  width: 1rem;
  margin-left: 0.5rem;
  filter: invert(100%);
`;

const ButtonContainer = styled.div`
  cursor: pointer;
  min-width: 12em;
  padding: 0.8vh 0.7vw;
  color: white;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 700;
`;

const SubMenuContainer = styled.div`
  border-radius: 1rem;
  min-width: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
  background-color: white;
  position: fixed;
  box-shadow: 0 2px 0px rgba(0, 0, 0, 0.3);
`;

const SubMenuLink = styled(Link)`
  color: black;
  font-size: 15px;
  font-weight: 700;
  padding: 10px 10px;
  line-height: 1.13;
  letter-spacing: -1px;
  width: 100%;
  text-align: center;
  transition: background-color 0.1s ease-in-out;
  border-radius: 3px;

  &:hover {
    color: rgb(60, 60, 60);
    background-color: rgba(200, 200, 200, 0.5);
  }
`;

const SubMenuSpacing = styled.div`
  height: 0.5rem;
`;

const PageDesc = styled.div`
  font-size: 1rem;
  margin: 3rem 0;
  width: 80%;
  text-align: center;

  white-space: pre-line; // 개행 유지
  word-break: break-all; // width 벗어날 경우 줄바꿈
`;

const SearchContent = styled.span`
  color: #6236ff;
  font-size: 24px;
  font-weight: 800;
  padding: 0 0.5rem;
`;

const SearchResult = styled.div`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -1px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubContainer = styled.div`
  margin: 2rem 0 1rem;
  position: relative;
  width: 93%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  ${media.small} {
    margin: 1.5rem 0;
  }
`;

const MakingCoverLink = styled(Link)`
  position: absolute;
  right: 1rem;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CustomButton = styled.span`
  cursor: pointer;
  font-size: 1rem;
`;

const NoCover = styled.div`
  font-size: 1.4rem;
  color: #9b94b3;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 12rem;
  letter-spacing: -0.5px;
  font-weight: 800;
`;

export default LoungeSongCovers;
