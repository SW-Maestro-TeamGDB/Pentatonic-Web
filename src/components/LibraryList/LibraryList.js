import react, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { DeleteFilled, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Skeleton, notification } from 'antd';
import QuestionModal from '../QuestionModal';
import { changeSessionNameToKorean } from '../../lib/changeSessionNameToKorean';
import { sessionIconMatch } from '../../lib/sessionIconMatch';
import { useMediaQuery } from 'react-responsive';
import { changeDateToString } from '../../lib/changeDateToString';
import { media, Default, Mobile } from '../../lib/Media';
import Favicon from '../../images/Logo/Favicon.png';
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
  const {
    data,
    edit,
    visible,
    libraryData,
    setLibraryData,
    selectedCover,
    setSelectedCover,
    getUserInfo,
    userId,
    selectedAudio,
    setSelectedAudio,
    audioState,
    setAudioState,
    instRef,
  } = props;
  const [coverTitle, setCoverTitle] = useState();
  const [inst, setInst] = useState();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [editTitle, setEditTitle] = useState();
  const [editTitleError, setEditTitleError] = useState();
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  const buttonRef = useRef();

  const selected = !edit && data.coverId === selectedCover;

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
      getUserInfo({
        variables: {
          getUserInfoUserId: userId,
        },
      });

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
    if (coverTitle) setEditTitle(coverTitle);
  }, [editToggle]);

  const onClickStart = () => {
    if (inst) {
      inst.play();
      setAudioState(1);
    }
  };

  const onClickPause = () => {
    if (inst) {
      inst.pause();
      setAudioState(2);
    }
  };

  const onClickIcon = () => {
    if (selectedAudio) {
      if (selectedAudio.src === data.coverURI) {
        if (audioState === 1) {
          selectedAudio.pause();
          setAudioState(2);
        } else {
          selectedAudio.play();
          setAudioState(1);
        }
      } else {
        selectedAudio.pause();
        selectedAudio.removeAttribute('src');
        selectedAudio.load();

        const audio = new Audio();
        audio.src = data.coverURI;
        setSelectedAudio(audio);
        setAudioState(1);
        audio.play();
      }
    } else {
      const audio = new Audio();
      audio.src = data.coverURI;
      setSelectedAudio(audio);
      setAudioState(1);
      audio.play();
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

  const selectedCoverToggle = (e) => {
    if (buttonRef.current && !buttonRef.current.contains(e.target)) {
      if (selectedCover === data.coverId) {
        setSelectedCover();
      } else {
        setSelectedCover(data.coverId);
      }
    }
  };

  useEffect(() => {
    getCover();
  }, []);

  useEffect(() => {
    setEditTitleError();
  }, [editTitle]);

  return (
    <CoverContainer
      edit={edit}
      selected={selected}
      onClick={edit ? null : (e) => selectedCoverToggle(e)}
    >
      {data ? (
        <>
          <ImageContainer edit={edit}>
            <CoverImage src={data.song.songImg ? data.song.songImg : Favicon} />
          </ImageContainer>
          <Spacing width={isMobile ? '3px' : '2%'} />
          <CoverInform edit={edit}>
            {editToggle ? (
              <>
                <CustomInput
                  placeholder="변경 할 제목을 입력해주세요"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  maxLength="14"
                />
                {editTitleError ? (
                  <ErrorMessage>{editTitleError}</ErrorMessage>
                ) : null}
              </>
            ) : (
              <>
                <CoverTitle selected={selected}>
                  {coverTitle ? coverTitle : data.name}
                </CoverTitle>
                <SongInform selected={selected}>
                  {data.song.name} - {data.song.artist}
                </SongInform>
                <CoverTime selected={selected}>
                  {new Date(data.date).toISOString().split('T')[0] +
                    ' ' +
                    new Date(data.date)
                      .toTimeString()
                      .split(' ')[0]
                      .slice(0, -3)}
                </CoverTime>
              </>
            )}
          </CoverInform>
          {edit && data.date ? (
            <>
              <Default>
                <SessionIconContainer>
                  <SessionIcon src={sessionIconMatch(data.position)} />
                  <SessionText>
                    {changeSessionNameToKorean(data.position)} 커버
                  </SessionText>
                </SessionIconContainer>
              </Default>
            </>
          ) : null}
          <Spacing width={isMobile ? '3px' : '3%'} />
          {edit ? (
            <>
              <Default>
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
                <Spacing width={isMobile ? '3px' : '3%'} />
              </Default>
            </>
          ) : null}
          {edit ? (
            <AudioButtonContainer onClick={onClickIcon}>
              {audioState === 1 &&
              selectedAudio &&
              selectedAudio.src === data.coverURI ? (
                <>
                  <LibararyPagePauseIcon src={PauseIcon} color="white" />
                </>
              ) : (
                <>
                  <LibararyPagePlayIcon src={PlayIcon} color="white" />
                  <Spacing width={isMobile ? '5px' : '5%'} />
                  재생
                </>
              )}
            </AudioButtonContainer>
          ) : (
            <IconContainer
              onClick={onClickIcon}
              ref={buttonRef}
              audioState={
                audioState === 1 &&
                selectedAudio &&
                selectedAudio.src === data.coverURI
              }
              selected={selected}
            >
              {audioState === 1 &&
              selectedAudio &&
              selectedAudio.src === data.coverURI ? (
                <CustomPauseIcon src={PauseIcon} />
              ) : (
                <CustomPlayIcon src={PlayIcon} />
              )}
            </IconContainer>
          )}
          <Spacing width={isMobile ? '5px' : '5%'} />
        </>
      ) : (
        <>
          <Skeleton.Button size={'large'} active />
          <Spacing width={isMobile ? '5px' : '5%'} />
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
  padding: 0.5rem 1rem;
  position: relative;

  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.edit
        ? 'rgba(200, 200, 200, 0.1)'
        : props.selected
        ? 'rgba(98, 54, 255, 0.7)'
        : 'rgba(98, 54, 255, 0.12)'};
  }

  cursor: ${(props) => (props.edit ? '' : 'pointer')};
  background-color: ${(props) =>
    props.selected ? 'rgba(98, 54, 255, 0.7)' : 'transparent'};

  ${media.small} {
    padding: 0;
    margin-bottom: 1rem;
  }
`;

const SessionText = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  margin-top: 10px;
`;

const SessionIconContainer = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SessionIcon = styled.img`
  width: 40px;
  height: 40px;
  opacity: 0.3;
`;

const LibararyPagePauseIcon = styled.img`
  width: 1rem;
  height: 1rem;
  filter: invert(100%);

  ${media.small} {
    width: 0.9rem;
    height: 0.9rem;
  }
`;

const LibararyPagePlayIcon = styled.img`
  width: 1rem;
  height: 1rem;
  filter: invert(100%);

  ${media.small} {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

const ErrorMessage = styled.div`
  color: #cb0000;
  padding-left: 1rem;
`;

const CustomPlayIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  filter: invert(27%) sepia(32%) saturate(5932%) hue-rotate(244deg)
    brightness(93%) contrast(120%);
`;

const CustomPauseIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  filter: invert(27%) sepia(32%) saturate(5932%) hue-rotate(244deg)
    brightness(93%) contrast(120%);
`;

const IconContainer = styled.div`
  width: 5rem;
  height: 3.5rem;
  background-color: ${(props) => (props.audioState ? '#6236ff' : 'white')};

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
  border: 1px solid
    ${(props) => (props.selected ? 'rgba(98, 54, 255, 0.75)' : '#6236ff')};
  border-radius: 0.8vw;
  color: #6236ff;

  ${CustomPauseIcon} {
    filter: ${(props) => (props.audioState ? 'invert(100%)' : null)};
  }

  &:hover {
    background-color: #6236ff;

    ${CustomPlayIcon} {
      filter: invert(100%);
    }
  }

  ${media.small} {
    border-radius: 10px;
    width: 4rem;
    height: 3rem;
    position: absolute;
    right: 5%;
  }
`;

const Spacing = styled.div`
  width: ${(props) => props.width};
`;

const CoverTime = styled.div`
  font-size: 0.7rem;
  letter-spacing: -1px;
  margin-top: 6px;
  font-weight: 500;

  color: ${(props) => (props.selected ? '#ddd' : 'trasparent')};
`;

const EditButtonContainer = styled.div`
  width: 20%;
  font-weight: 700;

  display: flex;
  flex-direction: row;
  justify-content: center;
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
  font-size: 0.9rem;
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

  ${media.small} {
    width: 6rem;
    font-size: 0.75rem;
  }
`;

const EditButton = styled.div`
  border-radius: 8px;
  border: solid 1px #9561ff;
  color: #9561ff;
  width: 4.5rem;
  height: 2.5rem;
  font-size: 0.8rem;
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
  font-size: 0.8rem;
  cursor: pointer;
  background-color: white;

  margin: 0 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  margin: 0.5rem;
  display: flex;
  align-items: center;
  width: 7rem;
  height: 6rem;

  ${media.small} {
    width: ${(props) => (props.edit ? '6rem' : '4rem')};
    height: 4rem;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
  height: 100%;

  ${media.small} {
    border-radius: 1rem;
  }
`;

const CoverInform = styled.div`
  width: ${(props) => (props.edit ? '25%' : '50%')};
  color: black;
  padding-left: 0.5rem;
  padding-right: 1rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;

  ${media.small} {
    width: ${(props) => (props.edit ? '70%' : '50%')};
  }
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
  font-size: 1.5rem;
  font-weight: 800;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;

  color: ${(props) => (props.selected ? '#fff' : '000')};

  ${media.small} {
    font-size: 1rem;
  }
`;

const SongInform = styled.div`
  font-size: 0.8rem;
  color: ${(props) => (props.selected ? '#ddd' : 'rgb(100, 100, 100)')};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.small} {
    font-size: 0.7rem;
  }
`;

const CustomInput = styled.input`
  width: 90%;
  color: black;
  border: 2px solid #ddd;
  transition: all ease 0.3s;
  outline: none;
  height: 2.8rem;
  border-radius: 0.8rem;
  margin: 0.2rem 0;
  padding: 0 1rem;
  font-size: 1.1rem;

  &:focus {
    border: 2px solid black;
  }

  ::placeholder {
    font-size: 1rem;
  }
`;

export default LibraryList;
