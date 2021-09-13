import react, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import GridContainer from '../../components/GridContainer/GridContainer';
import CoverRoomSession from '../../components/CoverRoomSession/CoverRoomSession';
import LibraryDrawer from '../../components/LibraryDrawer/LibraryDrawer';
import { Drawer } from 'antd';
import NotFoundPage from '../NotFoundPage';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';

import { changeSessionNameToKorean } from '../../lib/changeSessionNameToKorean';
import { gql, useQuery, useMutation } from '@apollo/client';
import {
  currentUserVar,
  isLoggedInVar,
  IS_LOGGED_IN,
  GET_CURRENT_USER,
} from '../../apollo/cache';

import TameImpala from '../../images/TempData//TameImpala.jpeg';
import Hyukoh from '../../images/TempData//Hyukoh.jpeg';
import Beatles from '../../images/TempData//Beatles.jpeg';
import MenITrust from '../../images/TempData//MenITrust.jpeg';
import NoSurprises from '../../images/TempData//NoSurprises.jpeg';
import TheVolunteers from '../../images/TempData//TheVolunteers.jpeg';
import FixYou from '../../images/TempData/FixYou.png';

import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';
import UserAvatar from '../../images/UserAvatar.svg';

import '../../styles/AudioPlayer.css';

const GET_BAND = gql`
  query Query($getBandBandId: ObjectID!) {
    getBand(bandId: $getBandBandId) {
      backGroundURI
      creator {
        id
      }
      createDate
      session {
        position
        maxMember
        cover {
          coverBy
          coverURI
        }
      }
      likeCount
      introduce
      name
      song {
        name
      }
    }
  }
`;

const MERGE_AUDIOS = gql`
  mutation MergeAudiosMutation($mergeAudiosInput: MergeAudiosInput!) {
    mergeAudios(input: $mergeAudiosInput)
  }
`;

const CoverRoom = ({ match }) => {
  const bandId = match.params.id;
  const [session, setSession] = useState([]);
  const [audio, setAudio] = useState(null);
  const { data } = useQuery(GET_CURRENT_USER);
  const [coverData, setCoverData] = useState();
  const [mode, setMode] = useState(0); // 0: select , 1: audio

  const { loading, error, getBand } = useQuery(GET_BAND, {
    fetchPolicy: 'network-only',
    variables: {
      getBandBandId: bandId,
    },
    onCompleted: (data) => {
      setCoverData(data.getBand);
    },
  });

  const [mergeAudios, mergeAudiosResult] = useMutation(MERGE_AUDIOS, {
    onCompleted: (data) => {
      setAudio(data.mergeAudios);
    },
    onError: (error) => {
      alert('음원 병합에 실패하였습니다.');
      setMode(0);
    },
  });

  // drawer
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const onClose = () => {
    setVisibleDrawer(false);
  };

  const onClickToSelect = () => {
    setSession([]);
    setMode(0);
  };

  const showCoverRoomSession = () => {
    return coverData.session.map((v, i) => {
      return (
        <CoverRoomSession
          key={`CoverRoom + ${v.position} + ${i}`}
          sessionTitle={changeSessionNameToKorean(v.position)}
          total={v.maxMember}
          now={v.cover.length}
          session={session}
          setSession={setSession}
          setVisibleDrawer={setVisibleDrawer}
          cover={v.cover}
        />
      );
    });
  };

  const onClickSubmit = () => {
    if (session.length === 0) {
      alert('하나 이상의 세션을 선택해주세요');
    } else {
      setMode(1);
      mergeAudios({
        variables: {
          mergeAudiosInput: {
            audios: session,
          },
        },
      });
    }
  };

  useEffect(() => {
    console.log(!audio);
  }, [audio]);

  return (
    <PageContainer>
      {!loading && coverData ? (
        <>
          <CoverBannerContainer mode={mode}>
            <CoverBackground url={coverData.backGroundURI} />
            <BackwardButton onClick={() => onClickToSelect()} mode={mode}>
              <CustomReloadIcon />
              다시 조합하기
            </BackwardButton>
            <BannerContents mode={mode}>
              <CoverTitle>{coverData.name}</CoverTitle>
              <CoverDesc>{coverData.introduce}</CoverDesc>
              <CoverMetaContainer>
                <LikeCount>
                  <CustomIcon src={ViewIcon} />{' '}
                  {parseInt(Math.random() * 300 + 200)}
                </LikeCount>
                <SpacingSpan />
                <ViewCount>
                  <CustomIcon src={ThumbIcon} /> {coverData.likeCount}
                </ViewCount>
                <SpacingSpan />
              </CoverMetaContainer>
            </BannerContents>
            {mode === 1 ? (
              audio ? (
                <AudioPlayerContainer>
                  <AudioPlayerWrapper>
                    <AudioPlayer
                      src={audio ? audio : null}
                      customAdditionalControls={[]}
                      customVolumeControls={[]}
                      autoPlay={false}
                      customProgressBarSection={[
                        RHAP_UI.CURRENT_TIME,
                        RHAP_UI.PROGRESS_BAR,
                        <span className="dash">-</span>,
                        RHAP_UI.CURRENT_LEFT_TIME,
                      ]}
                    />
                  </AudioPlayerWrapper>
                </AudioPlayerContainer>
              ) : (
                <LoadingIconContainer>
                  <CustomLoadingIcon />
                </LoadingIconContainer>
              )
            ) : (
              <SubmitButton onClick={() => onClickSubmit()}>
                감상하기
              </SubmitButton>
            )}
          </CoverBannerContainer>
          {mode === 1 ? null : (
            <SessionContainer>
              <GridContainer>{showCoverRoomSession()}</GridContainer>
            </SessionContainer>
          )}
          <CommentContainer>
            <CommentHeader>
              댓글
              <CurrentComment>{parseInt(Math.random() * 30)}</CurrentComment>
            </CommentHeader>
            <CommentForm>
              {data.user ? (
                <>
                  <MyProfileImg
                    src={
                      data.user.profileURI ? data.user.profileURI : UserAvatar
                    }
                  />
                  <CustomInput placeholder="게시물의 저작권 등 분쟁, 개인정보 노출로 인한 책임은 작성자 또는 게시자에게 있음을 유의해주세요" />
                  <CommentButton>등록</CommentButton>
                </>
              ) : (
                <>
                  <MyProfileImg src={UserAvatar} />
                  <CustomInput
                    placeholder="댓글을 작성하시려면 로그인이 필요합니다"
                    disabled
                  />
                  <CommentButton disabled>등록</CommentButton>
                </>
              )}
            </CommentForm>
          </CommentContainer>
          <Drawer
            placement="right"
            closable={true}
            onClose={onClose}
            visible={visibleDrawer}
            width="35%"
          >
            <LibraryDrawer visible={visibleDrawer} />
          </Drawer>
        </>
      ) : error ? (
        <NotFoundPage desc="올바르지 않은 커버 주소입니다" />
      ) : null}
    </PageContainer>
  );
};

const SessionContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 2rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #eee;
`;

const MyProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10rem;
`;

const BackwardButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 8%;
  left: 3%;
  color: #fff;

  font-size: 18px;
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;

  visibility: ${(props) => (props.mode === 1 ? 'visible' : 'hidden')};
  filter: ${(props) => (props.mode === 1 ? 'opacity(100%)' : 'opacity(0%)')};
  transition: filter 0.5s ease-in-out;
`;

const CustomInput = styled.input`
  width: 80%;
  color: black;
  border: 2px solid lightgray;
  transition: all ease 0.3s;
  outline: none;
  height: 100%;
  border-radius: 0.8rem;
  margin: 0.5rem 2rem;
  padding: 0 1rem;
  font-size: 1rem;

  ::placeholder {
    color: #bbbbbb;
    font-size: 16px;
  }

  &:focus {
    border: 2px solid black;
  }
`;

const CommentForm = styled.div`
  width: 100%;
  height: 3rem;
  position: relative;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 1rem 0;
`;

const CustomReloadIcon = styled(ReloadOutlined)`
  padding-right: 8px;
  line-height: 1;
`;

const AudioPlayerContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 5%;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AudioPlayerWrapper = styled.div`
  width: 80%;
  height: 100%;
`;

const CommentHeader = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  font-weight: 700;
  align-items: center;
  width: 100%;
`;

const CurrentComment = styled.div`
  margin-left: 0.5rem;
  color: #bbbbbb;
  font-size: 16px;
`;

const CoverBackground = styled.div`
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 15px;
`;

const CoverBannerContainer = styled.div`
  width: 100%;
  height: ${(props) => (props.mode === 1 ? '40rem' : '25rem')};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  transition: height 0.3s ease-in-out;

  ${CoverBackground} {
    filter: brightness(40%);
  }
`;

const BannerContents = styled.div`
  position: absolute;
  top: ${(props) => (props.mode === 1 ? '5%' : '30%')};
  display: flex;
  flex-direction: column;
  right: 3%;

  transition: top 0.3s ease-in-out;
`;

const CoverTitle = styled.span`
  font-weight: 900;
  font-size: 60px;
  color: white;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  line-height: 1.5;
  letter-spacing: 2px;
`;

const CoverDesc = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: white;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  line-height: 1;
`;

const CoverMetaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 5%;
  color: white;
`;

const LikeCount = styled.span`
  font-size: 16px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ViewCount = styled.span`
  font-size: 16px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SpacingSpan = styled.span`
  margin: 0 5px;
`;

const CustomIcon = styled.img`
  width: 16px;
  height: 16px;
  filter: invert(100%);
  margin-right: 10px;
`;

const SubmitButton = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 10%;
  right: 3%;
  width: 200px;
  height: 52px;
  color: white;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 700;
`;

const CommentButton = styled.button`
  border-radius: 10px;
  background-color: black;
  width: 6rem;
  height: 100%;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  &:hover {
    background-color: rgb(50, 50, 50);
  }
`;

const LoadingIconContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 20%;
  text-align: center;
`;

const CustomLoadingIcon = styled(LoadingOutlined)`
  font-size: 16rem;
  color: #fff;
`;

export default CoverRoom;
