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
} from '@ant-design/icons';
import QuestionModal from '../../components/QuestionModal';
import { LikeFilled, ShareAltOutlined, LikeOutlined } from '@ant-design/icons';
import { changeSessionNameToKorean } from '../../lib/changeSessionNameToKorean';
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client';
import {
  currentUserVar,
  isLoggedInVar,
  IS_LOGGED_IN,
  GET_CURRENT_USER,
} from '../../apollo/cache';

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
          user {
            username
            profileURI
            id
          }
          content
          createdAt
          commentId
        }
      }
    }
  }
`;

const QUERY_COMMENTS = gql`
  query Query($queryCommentsBandId: ObjectID!, $queryCommentsFirst: Int!) {
    queryComments(bandId: $queryCommentsBandId, first: $queryCommentsFirst) {
      comments {
        user {
          username
          profileURI
          id
        }
        content
        createdAt
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
  const [mode, setMode] = useState(0); // 0: select , 1: audio
  const [comment, setComment] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [libraryFilter, setLibraryFilter] = useState();

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
    variables: {
      getBandBandId: bandId,
      commentFirst: 10,
    },
    onCompleted: (data) => {
      setCoverData(data.getBand);
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

  const [queryComments, queryCommentsResult] = useLazyQuery(QUERY_COMMENTS, {
    fetchPolicy: 'network-only',
    variables: {
      queryCommentsBandId: bandId,
      queryCommentsFirst: 10,
    },
    onCompleted: (data) => {
      setCoverData({
        ...coverData,
        comment: {
          comments: data.queryComments.comments,
        },
      });
    },
  });

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

  const [createComment, createCommentResult] = useMutation(CREATE_COMMENT, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setComment('');
      queryComments();
    },
    onError: (error) => {
      alert(error);
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
        />
      );
    });
  };

  const showComment = () => {
    if (coverData.comment.comments.length === 0) {
      return;
    } else {
      return coverData.comment.comments.map((v, i) => {
        return (
          <CommentList
            data={v}
            key={`${bandId}+comment+${i}`}
            edit={data?.user?.id && v.user.id === data.user.id}
            queryComments={queryComments}
          />
        );
      });
    }
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

  const onClickCommentButton = () => {
    if (comment.length > 0) {
      createComment({
        variables: {
          createCommentInput: {
            comment: {
              content: comment,
              bandId: bandId,
            },
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

  return (
    <PageContainer>
      {!loading && coverData ? (
        <>
          <CoverBannerContainer mode={mode}>
            <CoverBackground url={coverData.backGroundURI} />
            {coverData &&
            data?.user &&
            coverData.creator.id === data.user.id ? (
              <DeleteButton mode={mode} onClick={() => setDeleteModal(true)}>
                <CustomDeleteIcon />
                밴드 삭제하기
              </DeleteButton>
            ) : null}
            <BackwardButton onClick={() => onClickToSelect()} mode={mode}>
              <CustomReloadIcon />
              다시 조합하기
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
                        sessionData={coverData.song.instrument.filter(
                          (v) => v.position !== coverData.session[0].position,
                        )}
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
            </SessionContainer>
          ) : (
            <SessionContainer>
              <GridContainer>{showCoverRoomSession()}</GridContainer>
            </SessionContainer>
          )}
          <CommentContainer>
            <CommentHeader>
              댓글
              <CurrentComment>
                {coverData.comment.comments.length}
              </CurrentComment>
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
                    placeholder="게시물의 저작권 등 분쟁, 개인정보 노출로 인한 책임은 작성자 또는 게시자에게 있음을 유의해주세요"
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
            <CommentWrapper>{showComment()}</CommentWrapper>
          </CommentContainer>
          <Drawer
            placement="right"
            closable={true}
            onClose={onClose}
            visible={visibleDrawer}
            width="35%"
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
        <NotFoundPage desc="올바르지 않은 커버 주소입니다" />
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
`;

const CoverRoomSessionContainer = styled.div`
  width: 100%;
  position: relative;
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

const InstContainer = styled.div``;

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

  transition: background-color 0.3s ease-in-out;

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
`;

const MyProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10rem;
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
`;

const CustomInput = styled.input`
  width: 80%;
  color: black;
  border: 2px solid #ddd;
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

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
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

const CustomDeleteIcon = styled(DeleteOutlined)`
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
  top: ${(props) => (props.mode === 1 ? '30px' : '30%')};
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
  margin: 0 7px;
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

  &:disabled {
    background-color: #666;
    color: #eee;
    cursor: not-allowed;
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

const NoInst = styled.div`
  font-size: 1.2rem;
  color: #9b94b3;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 10rem;
  letter-spacing: -0.5px;
  font-weight: 800;
`;

export default CoverRoom;
