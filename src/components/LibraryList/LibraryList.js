import react, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { Default } from '../../lib/Media';
import { DeleteFilled, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Skeleton, notification } from 'antd';
import QuestionModal from '../QuestionModal';
import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';

import TameImpala from '../../images/TempData/TameImpala.jpeg';
import Hyukoh from '../../images/TempData/Hyukoh.jpeg';
import Beatles from '../../images/TempData/Beatles.jpeg';
import MenITrust from '../../images/TempData/MenITrust.jpeg';
import NoSurprises from '../../images/TempData/NoSurprises.jpeg';
import TheVolunteers from '../../images/TempData/TheVolunteers.jpeg';
import FixYou from '../../images/TempData/FixYou.png';

import PlayIcon from '../../images/PlayIcon.svg';
import PauseIcon from '../../images/PauseIcon.png';
import SkeletonImage from 'antd/lib/skeleton/Image';
import SkeletonAvatar from 'antd/lib/skeleton/Avatar';

const GET_SONG = gql`
  query Query($getSongSongId: ObjectID!) {
    getSong(songId: $getSongSongId) {
      name
      songImg
      artist
    }
  }
`;

const GET_COVER = gql`
  query Query($getCoverCoverId: ObjectID!) {
    getCover(coverId: $getCoverCoverId) {
      name
    }
  }
`;

const UPDATE_COVER = gql`
  mutation Mutation($updateCoverInput: UpdateCoverInput!) {
    updateCover(input: $updateCoverInput) {
      coverId
      name
    }
  }
`;

const DELETE_COVER = gql`
  mutation DeleteCoverMutation($deleteCoverInput: DeleteCoverInput!) {
    deleteCover(input: $deleteCoverInput)
  }
`;

const LibraryList = (props) => {
  const { data, edit, visible, libraryData, setLibraryData } = props;
  const [songData, setSongData] = useState();
  const [coverTitle, setCoverTitle] = useState();
  const [audioState, setAudioState] = useState(0); // 0:정지 , 1:재생 , 2:일시정지
  const [inst, setInst] = useState();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [editTitle, setEditTitle] = useState();
  const [editTitleError, setEditTitleError] = useState();
  const instRef = useRef();

  const getSong = useQuery(GET_SONG, {
    variables: { getSongSongId: data.songId },
    onCompleted: (data) => {
      setSongData(data.getSong);
    },
  });

  const [getCover] = useLazyQuery(GET_COVER, {
    fetchPolicy: 'network-only',
    variables: { getCoverCoverId: data.coverId },
    onCompleted: (data) => {
      setCoverTitle(data.getCover.name);
    },
  });

  const [updateCover, updateCoverResult] = useMutation(UPDATE_COVER, {
    onCompleted: () => {
      setEditModal(false);
      setEditToggle(!editToggle);
      getCover();
      notification['success']({
        key: 'successEditTitle',
        message: '',
        description: '라이브러리의 제목을 수정했습니다',
        placement: 'bottomRight',
        duration: 3,
      });
    },
  });

  const [deleteCover, deleteCoverResult] = useMutation(DELETE_COVER, {
    onCompleted: () => {
      setDeleteModal(false);
      setLibraryData(libraryData.filter((v) => v.coverId != data.coverId));
      notification['success']({
        key: 'successEditTitle',
        message: '',
        description: '라이브러리를 삭제했습니다',
        placement: 'bottomRight',
        duration: 3,
      });
    },
  });

  useEffect(() => {
    instRef.current = inst;
  }, [inst]);

  useEffect(() => {
    setEditTitle();
  }, [editToggle]);

  const onClickStart = () => {
    inst.play();
    setAudioState(1);
  };

  const onClickPause = () => {
    inst.pause();
    setAudioState(2);
  };

  const onClickIcon = () => {
    if (audioState === 1) {
      inst.pause();
      setAudioState(2);
    } else {
      inst.play();
      setAudioState(1);
    }
  };

  const onClickEditButton = () => {
    updateCover({
      variables: {
        updateCoverInput: {
          cover: {
            coverId: data.coverId,
            name: editTitle,
          },
        },
      },
    });
  };

  const onClickDeleteButton = () => {
    deleteCover({
      variables: {
        deleteCoverInput: {
          cover: {
            coverId: data.coverId,
          },
        },
      },
    });
  };

  const onClickEditToggle = () => {
    if (editToggle == true) {
      if (!editTitle) {
        setEditTitleError('수정할 제목을 입력해주세요');
      } else {
        setEditModal(true);
      }
    } else {
      setEditToggle(!editToggle);
    }
  };

  useEffect(() => {
    getCover();
  }, []);

  useEffect(() => {
    setEditTitleError();
  }, [editTitle]);

  useEffect(() => {
    const audio = new Audio();
    audio.src = data.coverURI;
    setInst(audio);

    return () => {
      instRef.current.pause();
      instRef.current.currentTime = 0;
    };
  }, [data]);

  useEffect(() => {
    if (!visible && instRef.current) {
      setAudioState(0);
      instRef.current.pause();
      instRef.current.currentTime = 0;
    }
  }, [visible]);

  return (
    <CoverContainer>
      {songData && coverTitle ? (
        <>
          <ImageContainer>
            <CoverImage src={songData.songImg} />
          </ImageContainer>
          <Spacing width={'2%'} />
          <CoverInform>
            {editToggle ? (
              <>
                <CustomInput
                  placeholder="변경 할 제목을 입력해주세요"
                  onChange={(e) => setEditTitle(e.target.value)}
                  maxLength="14"
                />
                {editTitleError ? (
                  <ErrorMessage>{editTitleError}</ErrorMessage>
                ) : null}
              </>
            ) : (
              <>
                <CoverTitle>{coverTitle}</CoverTitle>
                <SongInform>
                  {songData.name} - {songData.artist}
                </SongInform>
              </>
            )}
          </CoverInform>
          {edit && data.date ? (
            <CoverTime>{data.date.substr(0, 10)}</CoverTime>
          ) : null}
          <Spacing width={'3%'} />
          {edit ? (
            <>
              <EditButtonContainer>
                {editToggle ? (
                  <>
                    <EditButton onClick={onClickEditToggle}>
                      수정 완료
                    </EditButton>
                    <DeleteButton onClick={() => setEditToggle(false)}>
                      수정 취소
                    </DeleteButton>
                  </>
                ) : (
                  <>
                    <EditButton onClick={onClickEditToggle}>수정</EditButton>
                    <DeleteButton onClick={() => setDeleteModal(true)}>
                      삭제
                    </DeleteButton>
                  </>
                )}
              </EditButtonContainer>
              <Spacing width={'3%'} />
            </>
          ) : null}
          {edit ? (
            <AudioButtonContainer onClick={onClickIcon}>
              {audioState === 1 ? (
                <>
                  <LibararyPagePauseIcon src={PauseIcon} color="white" />
                </>
              ) : (
                <>
                  <LibararyPagePlayIcon src={PlayIcon} color="white" />
                  <Spacing width={'5%'} />
                  재생
                </>
              )}
            </AudioButtonContainer>
          ) : (
            <IconContainer onClick={onClickIcon}>
              {audioState === 1 ? (
                <CustomPauseIcon src={PauseIcon} />
              ) : (
                <CustomPlayIcon src={PlayIcon} />
              )}
            </IconContainer>
          )}
          <Spacing width={'5%'} />
        </>
      ) : (
        <>
          <Skeleton.Button size={'large'} active />
          <Spacing width={'5%'} />
          <Skeleton
            title={{ width: '95%' }}
            paragraph={{ width: '95%', rows: 1 }}
            active
          />
        </>
      )}
      <QuestionModal
        modalToggle={editModal}
        setModalToggle={setEditModal}
        text="커버의 제목을 수정하시겠습니까?"
        afterRequest={onClickEditButton}
      />
      <QuestionModal
        modalToggle={deleteModal}
        setModalToggle={setDeleteModal}
        text="커버를 삭제하시겠습니까?"
        afterRequest={onClickDeleteButton}
      />
    </CoverContainer>
  );
};

const CoverContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: auto;
  margin-bottom: 1vw;
  color: black;
  border-radius: 1rem;
  padding: 0 1rem;
  position: relative;

  &:hover {
    background-color: rgba(200, 200, 200, 0.1);
  }
`;

const LibararyPagePauseIcon = styled.img`
  width: 0.9vw;
  height: 0.9vw;
  filter: invert(100%);
`;

const LibararyPagePlayIcon = styled.img`
  width: 0.9vw;
  height: 0.9vw;
  filter: invert(100%);
`;

const ErrorMessage = styled.div`
  color: #cb0000;
  padding-left: 1rem;
`;

const CustomPlayIcon = styled.img`
  width: 1.2vw;
  height: 1.2vw;
  filter: invert(27%) sepia(32%) saturate(5932%) hue-rotate(244deg)
    brightness(93%) contrast(120%);
`;

const CustomPauseIcon = styled.img`
  width: 1.5vw;
  height: 1.5vw;
  filter: invert(27%) sepia(32%) saturate(5932%) hue-rotate(244deg)
    brightness(93%) contrast(120%);
`;

const IconContainer = styled.div`
  width: 4vw;
  height: 3vw;
  background-color: white;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-user-drag: none;

  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #6236ff;
  border-radius: 0.8vw;
  color: #6236ff;

  &:hover {
    background-color: #6236ff;

    ${CustomPlayIcon} {
      filter: invert(100%);
    }

    ${CustomPauseIcon} {
      filter: invert(100%);
    }
  }
`;

const Spacing = styled.div`
  width: ${(props) => props.width};
`;

const CoverTime = styled.div`
  font-size: 0.8vw;
  width: 20%;
`;

const EditButtonContainer = styled.div`
  width: 23%;
  font-weight: 700;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;

const AudioButtonContainer = styled.div`
  border-radius: 8px;
  color: white;
  width: 8rem;
  height: 2.5rem;
  font-size: 0.8vw;
  cursor: pointer;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;

const EditButton = styled.div`
  border-radius: 8px;
  border: solid 1px #9561ff;
  color: #9561ff;
  width: 4.5rem;
  height: 2.5rem;
  font-size: 0.7vw;
  cursor: pointer;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.div`
  border-radius: 8px;
  border: solid 1px #222;
  color: #222;
  width: 4.5rem;
  height: 2.5rem;
  font-size: 0.7vw;
  cursor: pointer;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  margin: 1vh 1vw;
  display: flex;
  align-items: center;
  width: 6vw;
  height: 4vw;
`;

const CoverImage = styled.img`
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
  height: 100%;
`;

const CoverInform = styled.div`
  width: 50%;
  color: black;
  padding-left: 0.5vw;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;

  padding-right: 2vw;
`;

const CoverMeta = styled.div`
  width: 20%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CustomIcon = styled.img`
  width: 1vw;
`;

const CoverTitle = styled.div`
  font-size: 1.3vw;
  font-weight: bold;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SongInform = styled.div`
  font-size: 0.9vw;
  color: rgb(100, 100, 100);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CustomInput = styled.input`
  width: 90%;
  color: black;
  border: 2px solid lightgray;
  transition: all ease 0.3s;
  outline: none;
  height: 2.8rem;
  border-radius: 0.8rem;
  margin: 0.2rem 0;
  padding: 0 1rem;
  font-size: 1.2rem;

  &:focus {
    border: 2px solid black;
  }

  ::placeholder {
    font-size: 1rem;
  }
`;

export default LibraryList;
