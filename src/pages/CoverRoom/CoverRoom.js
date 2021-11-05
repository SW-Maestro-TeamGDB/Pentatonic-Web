import react, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import GridContainer from '../../components/GridContainer/GridContainer';
import CoverRoomSession from '../../components/CoverRoomSession/CoverRoomSession';
import LibraryDrawer from '../../components/LibraryDrawer/LibraryDrawer';
import CommentList from '../../components/CommentList/CommentList';
import SessionSelectModal from '../../components/SessionSelectModal';
import CoverBy from '../../components/CoverBy';
import { useHistory } from 'react-router-dom';
import { Drawer, notification } from 'antd';
import NotFoundPage from '../NotFoundPage';
import AuthModal from '../../components/AuthModal';
import InstSelect from '../../components/InstSelect';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import {
  LoadingOutlined,
  ReloadOutlined,
  DeleteOutlined,
  LeftOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
import QuestionModal from '../../components/QuestionModal';
import InfiniteScrollComment from '../../components/InfiniteScrollComment/InfiniteScrollComment';
import { LikeFilled, ShareAltOutlined, LikeOutlined } from '@ant-design/icons';
import { changeSessionNameToKorean } from '../../lib/changeSessionNameToKorean';
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client';
import {
  currentUserVar,
  isLoggedInVar,
  IS_LOGGED_IN,
  GET_CURRENT_USER,
} from '../../apollo/cache';
import { useMediaQuery } from 'react-responsive';
import { media, Default, Mobile } from '../../lib/Media';

import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';
import UserAvatar from '../../images/UserAvatar.svg';

import '../../styles/AudioPlayer.css';

const GET_BAND = gql`
  query Query($getBandBandId: ObjectID!, $commentFirst: Int!) {
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
          coverBy {
            id
            username
            profileURI
          }
          coverURI
          coverId
          name
          position
        }
      }
      isSoloBand
      isFreeBand
      likeCount
      likeStatus
      introduce
      viewCount
      name
      song {
        name
        songId
        artist
        instrument {
          instURI
          position
        }
      }
      comment(first: $commentFirst) {
        comments {
          commentId
        }
      }
    }
  }
`;

const QUERY_COMMENTS = gql`
  query Query($bandId: ObjectID!, $first: Int!, $after: ObjectID) {
    queryComments(bandId: $bandId, first: $first, after: $after) {
      comments {
        commentId
      }
    }
  }
`;

const GET_SESSION = gql`
  query Query($getBandBandId: ObjectID!) {
    getBand(bandId: $getBandBandId) {
      session {
        position
        maxMember
        cover {
          coverBy {
            id
            username
            profileURI
          }
          coverURI
          coverId
          name
        }
      }
    }
  }
`;

const GET_LIKE = gql`
  query Query($getBandBandId: ObjectID!) {
    getBand(bandId: $getBandBandId) {
      likeCount
      viewCount
      likeStatus
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation CreateCommentMutation($createCommentInput: CreateCommentInput!) {
    createComment(input: $createCommentInput) {
      createdAt
    }
  }
`;

const DELETE_BAND = gql`
  mutation DeleteBandMutation($deleteBandInput: DeleteBandInput!) {
    deleteBand(input: $deleteBandInput)
  }
`;

const MERGE_AUDIOS = gql`
  mutation MergeAudiosMutation($mergeAudiosInput: MergeAudiosInput!) {
    mergeAudios(input: $mergeAudiosInput)
  }
`;

const LIKE_COVER = gql`
  mutation JoinBandMutation($likeInput: LikeInput!) {
    like(input: $likeInput)
  }
`;

const CoverRoom = ({ match }) => {
  const bandId = match.params.id;
  const history = useHistory();
  const [session, setSession] = useState([]);
  const [selectInst, setSelectInst] = useState([]);
  const [audio, setAudio] = useState(null);
  const [coverData, setCoverData] = useState();
  const [commentLength, setCommentLength] = useState(0);

  const [mode, setMode] = useState(0); // 0: select , 1: audio

  const [deleteModal, setDeleteModal] = useState(false);
  const [libraryFilter, setLibraryFilter] = useState();

  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  // session select guide modal
  const [sessionModal, setSessionModal] = useState(false);

  // authmodal for cover like
  const [modalToggle, setModalToggle] = useState(false);

  // drawer
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const onClose = () => {
    setVisibleDrawer(false);
    setLibraryFilter();
  };

  const onClickToSelect = () => {
    setSession([]);
    setSelectInst([]);
    setMode(0);
  };

  const { data } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'network-only' });

  const { loading, error, getBand } = useQuery(GET_BAND, {
    fetchPolicy: 'network-only',
    variables: {
      getBandBandId: bandId,
      commentFirst: 1000,
    },
    onCompleted: (data) => {
      setCoverData(data.getBand);
      setCommentLength(data.getBand?.comment.comments.length);
    },
  });

  const [getSession, getSessionResult] = useLazyQuery(GET_SESSION, {
    fetchPolicy: 'network-only',
    variables: {
      getBandBandId: bandId,
    },
    onCompleted: (data) => {
      setCoverData({ ...coverData, session: data.getBand.session });
    },
  });

  const [getCommentLength, getCommentLengthResult] = useLazyQuery(
    QUERY_COMMENTS,
    {
      fetchPolicy: 'network-only',
      variables: {
        bandId: bandId,
        first: 1000,
      },
      onCompleted: (data) => {
        setCommentLength(data.queryComments.comments.length);
      },
    },
  );

  const [getLike, getLikeResult] = useLazyQuery(GET_LIKE, {
    fetchPolicy: 'network-only',
    variables: {
      getBandBandId: bandId,
    },
    onCompleted: (data) => {
      setCoverData({
        ...coverData,
        likeCount: data.getBand.likeCount,
        likeStatus: data.getBand.likeStatus,
      });
    },
  });

  const [mergeAudios, mergeAudiosResult] = useMutation(MERGE_AUDIOS, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setAudio(data.mergeAudios);
    },
    onError: (error) => {
      alert('음원 병합에 실패하였습니다.');
      setMode(0);
    },
  });

  const [deleteBand, deleteBandResult] = useMutation(DELETE_BAND, {
    variables: {
      deleteBandInput: {
        band: {
          bandId: bandId,
        },
      },
    },
    onCompleted: (data) => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        history.push('/');
      }
      notification['success']({
        key: 'successEditTitle',
        message: '',
        description: '밴드를 삭제했습니다',
        placement: 'bottomRight',
        duration: 3,
      });
    },
  });

  const [likeCover, likeCoverResult] = useMutation(LIKE_COVER, {
    variables: {
      likeInput: {
        band: {
          bandId: bandId,
        },
      },
    },
    onCompleted: (data) => {
      notification[`${coverData.likeStatus ? 'warning' : 'success'}`]({
        key: 'successEditTitle',
        message: '',
        description: `${
          coverData.likeStatus
            ? '좋아요를 취소했습니다'
            : '커버에 좋아요를 눌렀습니다'
        }`,
        placement: 'bottomRight',
        duration: 3,
      });
      getLike();
    },
    onError: (error) => {
      alert(error);
    },
  });

  const onClickDonate = () => {
    notification['warning']({
      key: 'errorDonateTitle',
      message: '',
      description: '현재는 커버 후원이 불가능 합니다',
      placement: 'bottomRight',
      duration: 3,
    });
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
          creator={coverData.creator.id}
          userId={data?.user?.id}
          bandId={bandId}
          songId={coverData.song.songId}
          getSession={getSession}
          setLibraryFilter={setLibraryFilter}
          sessionData={v}
          history={history}
          match={match}
        />
      );
    });
  };

  const onClickSubmit = () => {
    if (session.length === 0 && !coverData.isSoloBand) {
      setSessionModal(true);
    } else {
      setMode(1);
      mergeAudios({
        variables: {
          mergeAudiosInput: {
            audios: coverData.isSoloBand
              ? [...session, coverData.session[0].cover[0].coverURI]
              : session,
          },
        },
      });
    }
  };

  const onClickLike = () => {
    if (data?.user) {
      likeCover();
    } else {
      setModalToggle(true);
    }
  };

  const onClickShareButton = () => {
    let dummy = document.createElement('input');
    let text = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    notification['success']({
      key: 'successEditTitle',
      message: '',
      description: '밴드 URL을 복사했습니다',
      placement: 'bottomRight',
      duration: 3,
    });
  };

  useEffect(() => {
    console.log(coverData);
  }, [coverData]);

  return (
    <PageContainer>
      {!loading && coverData ? (
        <>
          <CoverBannerContainer mode={mode}>
            <CoverBackground url={coverData.backGroundURI} />
            <SongData mode={mode}>
              <SongArtist>{coverData.song.artist}</SongArtist>
              <SongName>{coverData.song.name}</SongName>
            </SongData>
            {coverData &&
            data?.user &&
            coverData.creator.id === data.user.id ? (
              <DeleteButton mode={mode} onClick={() => setDeleteModal(true)}>
                <CustomDeleteIcon />
                밴드 삭제하기
              </DeleteButton>
            ) : null}
            <BackwardButton onClick={() => onClickToSelect()} mode={mode}>
              {coverData.isFreeBand === true &&
              coverData.isSoloBand === true ? (
                <>
                  <CustomLeftOutlinedIcon />
                  뒤로가기
                </>
              ) : (
                <>
                  <CustomReloadIcon />
                  다시 조합하기
                </>
              )}
            </BackwardButton>
            <BannerContents mode={mode}>
              <CoverTitle>{coverData.name}</CoverTitle>
              <CoverDesc>{coverData.introduce}</CoverDesc>
              <CoverMetaContainer>
                <ViewCount>
                  <CustomIcon src={ThumbIcon} /> {coverData.likeCount}
                </ViewCount>
                <SpacingSpan />
                <LikeCount>
                  <CustomIcon src={ViewIcon} />
                  {coverData.viewCount}
                </LikeCount>
                <SpacingSpan />
              </CoverMetaContainer>
            </BannerContents>
            {mode === 1 ? (
              audio ? (
                <AudioPlayerContainer>
                  <ButtonContainer>
                    <LikeButton>
                      <DollarCircleOutlined onClick={onClickDonate} />
                    </LikeButton>
                    <LikeButton onClick={onClickLike}>
                      {data?.user && coverData.likeStatus ? (
                        <CustomLikeFilledIcon />
                      ) : (
                        <CustomLikeOutlinedIcon />
                      )}
                    </LikeButton>
                    <CopyButton>
                      <CustomShareIcon onClick={onClickShareButton} />
                    </CopyButton>
                  </ButtonContainer>
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
          {mode === 1 ? null : coverData.isSoloBand ? (
            <SessionContainer>
              <Default>
                <GridContainer>
                  <CoverBy data={coverData.session[0]} width="20rem" />
                  <CoverRoomSessionContainer>
                    <Header>
                      <BoardTitle>
                        <SessionTitle>제공 반주</SessionTitle>
                      </BoardTitle>
                    </Header>
                    <InstContainer>
                      {coverData.isFreeBand ? (
                        <NoInst>자유곡 커버는 반주가 제공되지 않습니다</NoInst>
                      ) : (
                        <InstSelect
                          sessionData={coverData.song.instrument}
                          setSelectInst={setSelectInst}
                          selectInst={selectInst}
                          selectInstURI={session}
                          setSelectInstURI={setSession}
                          icon
                        />
                      )}
                    </InstContainer>
                  </CoverRoomSessionContainer>
                </GridContainer>
              </Default>
              <Mobile>
                <CoverBy data={coverData.session[0]} width="20rem" />
                <CoverRoomSessionContainer>
                  <Header>
                    <BoardTitle>
                      <SessionTitle>제공 반주</SessionTitle>
                    </BoardTitle>
                  </Header>
                  <InstContainer>
                    {coverData.isFreeBand ? (
                      <NoInst>자유곡 커버는 반주가 제공되지 않습니다</NoInst>
                    ) : (
                      <InstSelect
                        sessionData={coverData.song.instrument}
                        setSelectInst={setSelectInst}
                        selectInst={selectInst}
                        selectInstURI={session}
                        setSelectInstURI={setSession}
                        icon
                      />
                    )}
                  </InstContainer>
                </CoverRoomSessionContainer>
              </Mobile>
            </SessionContainer>
          ) : (
            <SessionContainer>
              <Default>
                <GridContainer>{showCoverRoomSession()}</GridContainer>
              </Default>
              <Mobile>{showCoverRoomSession()}</Mobile>
            </SessionContainer>
          )}
          {/* <CommentContainer>
            <CommentHeader>
              댓글
              <CurrentComment>{commentData.length}</CurrentComment>
            </CommentHeader>
            <CommentForm>
              {data?.user ? (
                <>
                  <MyProfileImg
                    src={
                      data.user.profileURI ? data.user.profileURI : UserAvatar
                    }
                  />
                  <CustomInput
                    placeholder={
                      isMobile
                        ? '댓글 입력'
                        : '게시물의 저작권 등 분쟁, 개인정보 노출로 인한 책임은 작성자 또는 게시자에게 있음을 유의해주세요'
                    }
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                  <CommentButton
                    onClick={() => onClickCommentButton()}
                    disabled={comment.length === 0}
                  >
                    등록
                  </CommentButton>
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
            <CommentWrapper>
              <InfiniteScrollComment
                bandId={bandId}
                currentUser={data?.user?.id}
              />
            </CommentWrapper>
          </CommentContainer> */}
          <InfiniteScrollComment
            bandId={bandId}
            currentUser={data?.user}
            length={commentLength}
          />
          <Drawer
            placement="right"
            closable={true}
            onClose={onClose}
            visible={visibleDrawer}
            placement={isMobile ? 'bottom' : 'right'}
            width={isMobile ? '100%' : '30rem'}
            height={isMobile ? '70%' : '100%'}
          >
            <LibraryDrawer
              visible={visibleDrawer}
              filter={libraryFilter}
              setFilter={setLibraryFilter}
              onClose={onClose}
              getSession={getSession}
              bandId={bandId}
            />
          </Drawer>
        </>
      ) : error || coverData === null ? (
        <NotFoundPage desc="삭제된 커버 혹은 올바르지 않은 주소입니다" />
      ) : null}
      <QuestionModal
        modalToggle={deleteModal}
        setModalToggle={setDeleteModal}
        text="밴드를 삭제하시겠습니까?"
        desc="참여한 모든 세션이 삭제되며 삭제 이후에는 되돌릴 수 없습니다"
        afterRequest={deleteBand}
      />
      <AuthModal
        modalToggle={modalToggle}
        setModalToggle={setModalToggle}
        action={() => likeCover()}
      />
      <SessionSelectModal
        modalToggle={sessionModal}
        setModalToggle={setSessionModal}
      />
    </PageContainer>
  );
};

const SessionContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 2rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #eee;

  ${media.small} {
    padding: 0 1rem 1rem;
  }
`;

const SongArtist = styled.div`
  min-width: 125px; // 250/2 px
  height: 100%;
  color: white;
  position: relative;

  padding: 0 1rem;

  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.small} {
    width: 6rem;
  }
`;

const SongName = styled.div`
  min-width: 125px; // 250/2 px
  height: 100%;
  color: black;
  position: relative;

  padding: 0 1rem;

  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.small} {
    width: 6rem;
  }
`;

const SongData = styled.div`
  position: absolute;
  top: 40px;
  right: 3%;
  min-width: 250px;
  height: 35px;
  color: black;
  border-radius: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.5px;

  visibility: ${(props) => (props.mode === 0 ? 'visible' : 'hidden')};
  filter: ${(props) => (props.mode === 0 ? 'opacity(100%)' : 'opacity(0%)')};
  transition: filter 0.5s ease-in-out;

  ${media.small} {
    top: 20px;
    width: 15rem;
  }
`;

const CoverRoomSessionContainer = styled.div`
  width: 100%;
  position: relative;

  margin-top: 2rem;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 90%;
`;

const SessionTitle = styled.div`
  font-size: 24px;
  color: black;
  flex-direction: row;
  letter-spacing: -2px;

  font-weight: 900;
  padding-left: 5px;

  ${media.small} {
    font-size: 1.2rem;
  }
`;

const BoardTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const InstContainer = styled.div`
  ${media.small} {
    margin-bottom: 2rem;
  }
`;

const CustomLikeOutlinedIcon = styled(LikeOutlined)`
  color: #ffffff;
  font-size: 24px;
`;

const CustomLikeFilledIcon = styled(LikeFilled)`
  color: #ffffff;
  font-size: 24px;
`;

const CustomShareIcon = styled(ShareAltOutlined)`
  color: #ddd;
  font-size: 24px;
`;

const LikeButton = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;

  margin-right: 10px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #ffffff;
  font-size: 24px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const CopyButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;

  background-color: rgba(255, 255, 255, 0.2);

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 10%;
  top: -60px;
  width: auto;
  color: white;

  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${media.small} {
    right: 3%;
  }
`;

const DeleteButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 40px;
  left: 3%;
  color: #fff;

  font-size: 18px;
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;

  visibility: ${(props) => (props.mode === 0 ? 'visible' : 'hidden')};
  filter: ${(props) => (props.mode === 0 ? 'opacity(100%)' : 'opacity(0%)')};
  transition: filter 0.5s ease-in-out;

  ${media.small} {
    font-size: 14px;
    top: 20px;
  }
`;

const BackwardButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 40px;
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

  ${media.small} {
    font-size: 14px;
    top: 20px;
  }
`;

const CustomDeleteIcon = styled(DeleteOutlined)`
  padding-right: 8px;
  line-height: 1;
`;

const CustomLeftOutlinedIcon = styled(LeftOutlined)`
  padding-right: 8px;
  line-height: 1;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.small} {
    bottom: 3%;
  }
`;

const AudioPlayerWrapper = styled.div`
  width: 80%;
  height: 100%;

  ${media.small} {
    width: 95%;
  }
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

  ${media.small} {
    border-radius: 0px;
  }
`;

const CoverBannerContainer = styled.div`
  width: 100%;
  height: ${(props) => (props.mode === 1 ? '33rem' : '25rem')};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  transition: height 0.3s ease-in-out;

  ${CoverBackground} {
    filter: brightness(40%);
  }

  ${media.small} {
    height: ${(props) => (props.mode === 1 ? '30rem' : '24rem')};
  }
`;

const BannerContents = styled.div`
  position: absolute;
  top: ${(props) => (props.mode === 1 ? '30px' : '30%')};
  display: flex;
  flex-direction: column;
  right: 3%;

  ${media.small} {
    top: ${(props) => (props.mode === 1 ? '12%' : '40%')};
  }

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

  ${media.small} {
    font-size: 2.5rem;
    letter-spacing: 0px;
  }
`;

const CoverDesc = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: white;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  line-height: 1;

  ${media.small} {
    font-size: 1rem;
  }
`;

const CoverMetaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 5%;
  color: white;

  ${media.small} {
    margin-top: 16px;
  }
`;

const LikeCount = styled.span`
  font-size: 16px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${media.small} {
    font-size: 14px;
  }
`;
const ViewCount = styled.span`
  font-size: 16px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${media.small} {
    font-size: 14px;
  }
`;

const SpacingSpan = styled.span`
  margin: 0 7px;
`;

const CustomIcon = styled.img`
  width: 16px;
  height: 16px;
  filter: invert(100%);
  margin-right: 10px;

  ${media.small} {
    width: 14px;
    height: 14px;
  }
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

  ${media.small} {
    right: 50%;
    transform: translateX(50%);
    width: 90%;
    bottom: 10%;
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

  ${media.small} {
    font-size: 10rem;
  }
`;

const NoInst = styled.div`
  font-size: 1.2rem;
  color: #9b94b3;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 10rem;
  letter-spacing: -0.5px;
  font-weight: 800;

  ${media.small} {
    font-size: 0.9rem;
    height: 8rem;
  }
`;

export default CoverRoom;
