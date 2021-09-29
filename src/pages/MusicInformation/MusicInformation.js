import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
import CoverGrid from '../../components/CoverGrid/CoverGrid';
import PageContainer from '../../components/PageContainer';
import GridContainer from '../../components/GridContainer';
import DifficultyIcon from '../../components/DifficultyIcon';
import { changeGenreToKorean } from '../../lib/changeGenreToKorean';

import tempData from '../../data/songs/tempData.json';

const GET_SONG = gql`
  query Query($getSongSongId: ObjectID!) {
    getSong(songId: $getSongSongId) {
      name
      songImg
      genre
      artist
      album
      weeklyChallenge
      duration
      level
      instrument {
        position
      }
      releaseDate
      band {
        bandId
        backGroundURI
        name
        session {
          position
        }
        likeCount
      }
    }
  }
`;

const MusicInformation = ({ match }) => {
  const type = match.path.indexOf('band') === -1 ? 'solo' : 'band';
  const songId = match.params.id;
  const typeName = type === 'band' ? '밴드' : '솔로';
  const [musicData, setMusicData] = useState();

  const { data } = useQuery(GET_SONG, {
    variables: {
      getSongSongId: songId,
    },
    onCompleted: (data) => {
      setMusicData(data.getSong);
    },
  });

  const durationToKorean = () => {
    const time = musicData.duration;

    var min = parseInt((time % 3600) / 60);
    var sec = parseInt(time % 60);

    if (min > 0) return `${min}분 ${sec}초`;
    else return `00분 ${sec}초`;
  };

  const showCover = () => {
    if (musicData) {
      if (musicData.band.length > 0)
        return musicData.band.map((v) => {
          return <CoverGrid key={v.bandId} data={v} />;
        });
      else {
        return <NoCover>등록된 커버가 없습니다</NoCover>;
      }
    }
  };

  return (
    <PageContainer>
      {musicData ? (
        <>
          <MusicInformContainer>
            <MusicInformImg img={musicData.songImg} />
            <MusicMetaContainer>
              <MusicTitle>{musicData.name}</MusicTitle>
              <MusicMetaWrapper>
                <GridContainer>
                  <MusicMeta>
                    <MetaTitle>아티스트</MetaTitle>
                    <MetaContents>{musicData.artist}</MetaContents>
                  </MusicMeta>
                  {/* <MusicMeta>
                    <MetaTitle>작곡</MetaTitle>
                    <MetaContents>없음</MetaContents>
                  </MusicMeta> */}
                  <MusicMeta>
                    <MetaTitle>앨범</MetaTitle>
                    <MetaContents>{musicData.album}</MetaContents>
                  </MusicMeta>
                  {/* <MusicMeta>
                    <MetaTitle>작사</MetaTitle>
                    <MetaContents>없음</MetaContents>
                  </MusicMeta> */}
                  <MusicMeta>
                    <MetaTitle>발매</MetaTitle>
                    <MetaContents>{musicData.releaseDate}</MetaContents>
                  </MusicMeta>
                  {/* <MusicMeta>
                    <MetaTitle>편곡</MetaTitle>
                    <MetaContents>없음</MetaContents>
                  </MusicMeta> */}
                  <MusicMeta>
                    <MetaTitle>장르</MetaTitle>
                    <MetaContents>
                      {changeGenreToKorean(musicData.genre)}
                    </MetaContents>
                  </MusicMeta>
                  <MusicMeta>
                    <MetaTitle>길이</MetaTitle>
                    <MetaContents>{durationToKorean()}</MetaContents>
                  </MusicMeta>
                  <MusicMeta>
                    <MetaTitle>난이도</MetaTitle>
                    <DifficultyContents>
                      <DifficultyIcon value={musicData.level} />
                    </DifficultyContents>
                  </MusicMeta>
                </GridContainer>
              </MusicMetaWrapper>
              <ButtonContainer>
                <RecordButton to={match.url + '/record'}>
                  라이브러리 녹음하기
                </RecordButton>
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
              <BoardLink
                to={
                  musicData.weeklyChallenge
                    ? '/lounge/weekly'
                    : `/lounge/${type}`
                }
              >
                더보기
              </BoardLink>
            </BoardHeader>
            <GridContainer templateColumn="250px" autoFill>
              {showCover()}
            </GridContainer>
          </BoardContainer>
        </>
      ) : null}
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
  background-image: ${(props) => `url(${props.img})`};
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;

  width: 30vh;
  height: 100%;
  border-radius: 10px;
`;

const MusicMetaWrapper = styled.div`
  height: 35%;
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
  height: 33%;

  color: #222222;
  margin-bottom: 0.5rem;
`;

const MusicMeta = styled.div`
  display: flex;
  flex-direction: row;
  height: 1.6vh;
  font-size: 1.6vh;

  display: flex;
  align-items: center;
`;

const MetaTitle = styled.div`
  width: 20%;
  color: #999999;
`;

const MetaContents = styled.div`
  width: 80%;
  color: #222222;
`;

const DifficultyContents = styled.div`
  width: 30%;
  transform: translateX(-3%);
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

const NoCover = styled.div`
  font-size: 1.4rem;
  color: #9b94b3;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 8rem;
  letter-spacing: -0.5px;
  font-weight: 800;
`;

export default MusicInformation;
