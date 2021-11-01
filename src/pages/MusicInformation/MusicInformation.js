import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
import CoverGrid from '../../components/CoverGrid/CoverGrid';
import PageContainer from '../../components/PageContainer';
import GridContainer from '../../components/GridContainer';
import DifficultyIcon from '../../components/DifficultyIcon';
import { Popover } from 'antd';
import {
  StopOutlined,
  CustomerServiceOutlined,
  QuestionCircleFilled,
} from '@ant-design/icons';
import { changeGenreToKorean } from '../../lib/changeGenreToKorean';
import { useMediaQuery } from 'react-responsive';
import { media, Default, Mobile, mobileCheck } from '../../lib/Media';

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
        viewCount
      }
    }
  }
`;

const MusicInformation = ({ match }) => {
  const type = match.path.indexOf('band') === -1 ? 'solo' : 'band';
  const songId = match.params.id;
  const typeName = type === 'band' ? '밴드' : '솔로';
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });
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
        return (
          <GridContainer templateColumn="250px" autoFill>
            {musicData.band.map((v) => {
              return (
                <CoverGrid
                  key={v.bandId}
                  data={v}
                  title={musicData.name}
                  artist={musicData.artist}
                />
              );
            })}
          </GridContainer>
        );
      else {
        return <NoCover>등록된 커버가 없습니다</NoCover>;
      }
    }
  };

  const HelpContent = (
    <HelpContainer>
      <HelpWrapper>
        <HelpTitle>라이브러리 녹음하기?</HelpTitle>
        <HelpDesc>
          라운지의 다양한 커버에 참여하기 위해 내{' '}
          <b>라이브러리에 녹음본을 저장</b>합니다.
        </HelpDesc>
      </HelpWrapper>
      <HelpWrapper>
        <HelpTitle>커버 만들기?</HelpTitle>
        <HelpDesc>
          라운지에 올라가는 <b>사용자들이 참여할 수 있는 커버</b>를 만듭니다.
          (녹음본은 라이브러리에 저장됩니다)
        </HelpDesc>
      </HelpWrapper>
    </HelpContainer>
  );

  return (
    <PageContainer>
      {musicData ? (
        <>
          <MusicInformContainer>
            <MusicInformImg img={musicData.songImg} />
            <Background src={musicData.songImg} />
            {isMobile ? (
              <>
                <MusicTitle>{musicData.name}</MusicTitle>
                <ArtistText>{musicData.artist}</ArtistText>
                <MetaContents>
                  <CustomerServiceOutlined style={{ marginRight: '8px' }} />
                  {musicData.album}
                </MetaContents>
              </>
            ) : (
              <MusicMetaContainer>
                <MusicTitle>{musicData.name}</MusicTitle>
                <MusicMetaWrapper isDesktop={isDesktop}>
                  <GridContainer>
                    <MusicMeta>
                      <MetaTitle>아티스트</MetaTitle>
                      <MetaContents>{musicData.artist}</MetaContents>
                    </MusicMeta>
                    <MusicMeta>
                      <MetaTitle>앨범</MetaTitle>
                      <MetaContents>{musicData.album}</MetaContents>
                    </MusicMeta>
                    <MusicMeta>
                      <MetaTitle>발매</MetaTitle>
                      <MetaContents>{musicData.releaseDate}</MetaContents>
                    </MusicMeta>
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
                {isDesktop && !mobileCheck() ? (
                  <ButtonContainer>
                    <RecordButton to={match.url + '/record'}>
                      라이브러리 녹음하기
                    </RecordButton>
                    <MakingCoverButton to={match.url + '/cover'}>
                      커버 만들기
                    </MakingCoverButton>
                    <CustomPopover placement="rightTop" content={HelpContent}>
                      <QuestionCircleFilled />
                    </CustomPopover>
                  </ButtonContainer>
                ) : (
                  <RecordNoticeContainer>
                    <RecordNoticeText>
                      커버 녹음은 데스크탑에서만 가능합니다
                    </RecordNoticeText>
                  </RecordNoticeContainer>
                )}
              </MusicMetaContainer>
            )}
          </MusicInformContainer>
          {isMobile ? (
            <RecordNoticeContainer>
              <RecordNoticeText>
                <StopOutlined style={{ marginRight: '8px' }} />
                커버 녹음은 데스크탑에서만 가능합니다
              </RecordNoticeText>
            </RecordNoticeContainer>
          ) : (
            <Divider />
          )}
          <BoardContainer>
            <BoardHeader>
              <BoardTitle>이 곡의 다른 커버</BoardTitle>
              <BoardLink
                to={
                  musicData.weeklyChallenge
                    ? '/lounge/weekly'
                    : `/lounge/song/${songId}`
                }
              >
                더보기
              </BoardLink>
            </BoardHeader>

            {showCover()}
          </BoardContainer>
        </>
      ) : null}
    </PageContainer>
  );
};

const HelpContainer = styled.div`
  width: 20rem;
  height: auto;
  padding: 1rem;
`;

const HelpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 1.5rem;
`;

const HelpTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 800;
  background-color: rgba(100, 100, 100, 0.1);
  border-radius: 10px;
  padding: 0.3rem 0.7rem;
  letter-spacing: -1px;
`;

const HelpDesc = styled.div`
  font-size: 0.8rem;
  margin-top: 1rem;
`;

const MusicInformContainer = styled.div`
  display: flex;
  flex-direction: row;

  height: 18rem;

  margin-top: 2rem;
  width: 100%;
  position: relative;
  box-sizing: border-box;

  ${media.small} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0rem;
    padding: 3rem 0 2rem;
    height: auto;
    z-index: 2;
    overflow: hidden;
  }
`;

const CustomPopover = styled(Popover)`
  margin-left: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  font-size: 1rem;
  color: #444;
`;

const Background = styled.img`
  display: none;

  ${media.small} {
    position: absolute;
    width: 140%;
    height: 140%;
    display: block;
    z-index: 1;
    top: -20%;

    filter: blur(20px) brightness(70%);
  }
`;

const MusicInformImg = styled.div`
  background-image: ${(props) => `url(${props.img})`};
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;

  min-width: 18rem;
  height: 100%;
  border-radius: 10px;

  ${media.small} {
    height: 15rem;
    min-width: 15rem;
    z-index: 2;
  }
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
  font-size: 2.8rem;
  font-weight: 800;
  height: 33%;

  color: #222222;
  margin-bottom: 0.5rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.small} {
    color: #eee;
    margin-top: 1.2rem;
    z-index: 2;
    letter-spacing: -1px;
    font-size: 2rem;
    height: auto;
    margin-bottom: 0;
    line-height: 1.2;
    text-align: center;
  }
`;

const MusicMeta = styled.div`
  display: flex;
  flex-direction: row;
  height: 1rem;
  font-size: 0.9rem;
  font-weight: 700;

  display: flex;
  align-items: center;
`;

const MetaTitle = styled.div`
  width: 30%;
  color: #999999;
  padding-right: 1rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.medium} {
    width: 40%;
  }

  ${media.small} {
    z-index: 2;
    line-height: 1;
  }
`;

const ArtistText = styled.div`
  z-index: 2;
  color: #ddd;
  font-size: 1.1rem;
  font-weight: 600;
  width: auto;
  letter-spacing: -1px;
  text-align: center;

  margin-bottom: 1.5rem;
`;

const MetaContents = styled.div`
  width: 70%;
  color: #222222;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.medium} {
    width: 60%;
  }

  ${media.small} {
    z-index: 2;
    color: #ddd;
    font-size: 0.75rem;
    width: auto;
    letter-spacing: -0.5px;
  }
`;

const DifficultyContents = styled.div`
  width: 30%;
  transform: translateX(-3%);
`;

const RecordNoticeContainer = styled.div`
  height: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const RecordNoticeText = styled.div`
  background-color: #bbb;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.5rem 1.2rem;
  border-radius: 1rem;

  ${media.small} {
    margin-top: 1.5rem;
    padding: 0.5rem 2rem;
  }
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
  padding: 0.5rem 1.2rem;
  color: white;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.1rem;
  font-weight: 700;

  &:hover {
    color: white;
  }
`;

const MakingCoverButton = styled(Link)`
  cursor: pointer;
  min-width: 10em;
  padding: 0.45rem 1rem;
  color: #925fff;
  border: 1px solid #925fff;
  border-radius: 10px;

  margin-left: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.1rem;
  font-weight: 700;

  &:hover {
    color: #925fff;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid #eeeeee;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;

  ${media.small} {
    width: 95%;
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
`;

const BoardHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  width: 100%;

  box-sizing: border-box;

  ${media.small} {
    width: 95%;
    margin-bottom: 1rem;
  }
`;

const BoardTitle = styled.nav`
  font-size: 20px;
  font-weight: 700;
  width: 100%;
  color: black;
  padding-left: 0.6rem;
  letter-spacing: -1px;
  margin-bottom: 6px;

  ${media.small} {
    font-size: 16px;
    letter-spacing: -1px;
    font-weight: 800;
    padding-left: 0;
  }
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

  ${media.small} {
    font-size: 12px;
    letter-spacing: -1px;
    font-weight: 500;
    right: 0;
  }
`;

const NoCover = styled.div`
  font-size: 1.2rem;
  color: #9b94b3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  height: 8rem;
  letter-spacing: -0.5px;
  font-weight: 800;

  ${media.small} {
    font-size: 1rem;
  }
`;

export default MusicInformation;
