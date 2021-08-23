import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PageContainer from '../../components/PageContainer';
import StudioBanner from '../../components/StudioBanner/StudioBanner';
import GridContainer from '../../components/GridContainer/GridContainer';
import SongGrid from '../../components/SongGrid';

import GroupIcon from '../../images/GroupIcon.svg';
import SoloIcon from '../../images/SoloIcon.svg';

const StudioHome = () => {
  const showSongGrid = () => {
    return Array.from({ length: 4 }, () => 0).map((v, i) => {
      return <SongGrid key={'SongGrid' + i} idx={i} />;
    });
  };

  return (
    <PageContainer>
      <StudioBanner />
      <BoardContainer>
        <BoardWrapper>
          <BoardHeader>
            <BoardTitle>커버 녹음하기</BoardTitle>
          </BoardHeader>
          <GridContainer>
            <CoverLinkContainer to="/studio/band">
              <Background
                url="https://s.wsj.net/public/resources/images/B3-BY031_TRUCKE_IM_20181002114854.jpg"
                position="top"
              />
              <BandIconContainer src={GroupIcon} />
              <LinkText>밴드 커버</LinkText>
            </CoverLinkContainer>
            <CoverLinkContainer to="/studio/solo">
              <Background
                url="https://i.pinimg.com/originals/25/71/3f/25713fdfa829a9513536661f3eaad441.jpg"
                position="center"
              />
              <SoloIconContainer src={SoloIcon} />
              <LinkText>솔로 커버</LinkText>
            </CoverLinkContainer>
          </GridContainer>
        </BoardWrapper>
        <BoardWrapper>
          <BoardHeader>
            <BoardTitle>이런 곡 어때요?</BoardTitle>
          </BoardHeader>
          <GridContainer templateColumn={'200px'}>
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

  margin-top: 2vw;
`;

const BoardHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 100%;
`;

const BoardTitle = styled.nav`
  font-size: 20px;
  font-weight: 600;
  width: 100%;
  color: black;

  line-height: 1;
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

  transition: all 0.3s ease-in-out;
  position: relative;

  &:hover {
    background-color: rgba(98, 54, 255, 0.4);
  }
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

export default StudioHome;
