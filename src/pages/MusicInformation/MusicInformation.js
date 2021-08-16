import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CoverGrid from '../../components/CoverGrid/CoverGrid';
import PageContainer from '../../components/PageContainer';
import GridContainer from '../../components/GridContainer';

const MusicInformation = ({ match }) => {
  const type = match.params.sort;
  const typeName = type === 'band' ? '밴드' : '솔로';
  const tempCover = () =>
    [0, 1, 2, 3].map((v) => {
      return (
        <CoverGrid
          id={parseInt(Math.random() * 6)}
          key={v}
          idx={parseInt(Math.random() * 6)}
        />
      );
    });

  return (
    <PageContainer>
      <MusicInformContainer>
        <MusicInformImg />
        <MusicMetaContainer>
          <MusicTitle>Fix You</MusicTitle>
          <MusicMetaWrapper>
            <GridContainer>
              <MusicMeta>
                <MetaTitle>아티스트</MetaTitle>
                <MetaContents>ColdPlay</MetaContents>
              </MusicMeta>
              <MusicMeta>
                <MetaTitle>작곡</MetaTitle>
                <MetaContents>ColdPlay</MetaContents>
              </MusicMeta>
              <MusicMeta>
                <MetaTitle>앨범</MetaTitle>
                <MetaContents>X&Y</MetaContents>
              </MusicMeta>
              <MusicMeta>
                <MetaTitle>작사</MetaTitle>
                <MetaContents>ColdPlay</MetaContents>
              </MusicMeta>
              <MusicMeta>
                <MetaTitle>발매</MetaTitle>
                <MetaContents>2005.06.06</MetaContents>
              </MusicMeta>
              <MusicMeta>
                <MetaTitle>편곡</MetaTitle>
                <MetaContents>-</MetaContents>
              </MusicMeta>
              <MusicMeta>
                <MetaTitle>장르</MetaTitle>
                <MetaContents>락</MetaContents>
              </MusicMeta>
              <MusicMeta>
                <MetaTitle>난이도</MetaTitle>
                <MetaContents>● ○ ○ ○ ○</MetaContents>
              </MusicMeta>
            </GridContainer>
          </MusicMetaWrapper>
          <ButtonContainer>
            <RecordButton to={match.url + '/cover'}>녹음하기</RecordButton>
            <MakingCoverButton to={match.url + '/cover'}>
              커버룸 만들기
            </MakingCoverButton>
          </ButtonContainer>
        </MusicMetaContainer>
      </MusicInformContainer>
      <Divider />
      <BoardContainer>
        <BoardHeader>
          <BoardTitle>이 곡의 {typeName}커버</BoardTitle>
          <BoardLink to={`/lounge/${type}`}>더보기</BoardLink>
        </BoardHeader>
        <GridContainer templateColumn="250px">{tempCover()}</GridContainer>
      </BoardContainer>
    </PageContainer>
  );
};

const MusicInformContainer = styled.div`
  display: flex;
  flex-direction: row;

  height: 30vh;

  margin-top: 4vh;
  width: 100%;
  position: relative;
  box-sizing: border-box;
`;

const MusicInformImg = styled.div`
  background-image: url('https://media.pitchfork.com/photos/608a33343bbb6032f540a222/2:1/w_2912,h_1456,c_limit/coldplay.jpg');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;

  width: 30vh;
  height: 100%;
  border-radius: 10px;
`;

const MusicMetaWrapper = styled.div`
  height: 45%;
`;

const MusicMetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  padding-left: 5rem;
`;

const MusicTitle = styled.div`
  font-size: 4.5vh;
  font-weight: 800;
  height: 25%;

  color: #222222;
  margin-bottom: 0.5rem;
`;

const MusicMeta = styled.div`
  display: flex;
  flex-direction: row;
  height: 1.6vh;
  font-size: 1.6vh;
`;

const MetaTitle = styled.div`
  width: 30%;
  color: #999999;
`;

const MetaContents = styled.div`
  width: 70%;
  color: #222222;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 30%;
  align-items: flex-end;

  overflow: hidden;

  bottom: 0%;
  position: absolute;
`;

const RecordButton = styled(Link)`
  cursor: pointer;
  min-width: 10em;
  padding: 1vh 0.5vw;
  color: white;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  border-radius: 1vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.8vh;
  font-weight: 700;

  &:hover {
    color: white;
  }
`;

const MakingCoverButton = styled(Link)`
  cursor: pointer;
  min-width: 10em;
  padding: 1vh 0.5vw;
  color: #925fff;
  border: 1px solid #925fff;
  border-radius: 1vh;

  margin-left: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.8vh;
  font-weight: 700;

  &:hover {
    color: #925fff;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 5vh;
  border-bottom: 1px solid #eeeeee;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-top: 4vh;
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
  margin-bottom: 1vh;
  width: 100%;

  box-sizing: border-box;
`;

const BoardTitle = styled.nav`
  font-size: 2vh;
  font-weight: 600;
  width: 100%;
  color: black;
  padding-left: 1.5vh;
`;

const BoardLink = styled(Link)`
  font-size: 1.5vh;
  font-weight: 500;
  color: #bbbbbb;
  position: absolute;
  right: 1%;

  display: flex;
  align-items: center;

  &:hover {
    color: rgb(150, 150, 150);
  }
`;

export default MusicInformation;
