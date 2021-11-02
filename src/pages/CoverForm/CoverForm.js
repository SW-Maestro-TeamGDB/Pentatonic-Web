import react, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import RecordPage from '../RecordPage';
import RecordEdit from '../RecordEdit';
import SessionAddPanel from '../../components/SessionAddPanel';
import SessionContents from '../../components/SessionContents';
import InstSelect from '../../components/InstSelect';
import LoadingModal from '../../components/LoadingModal';
import { Upload, notification, Collapse, Select, Popover } from 'antd';
import {
  LeftOutlined,
  PictureOutlined,
  QuestionCircleFilled,
} from '@ant-design/icons';
import { changeSessionNameToKorean } from '../../lib/changeSessionNameToKorean';

import sessionType from '../../data/sessionType.json';

const UPLOAD_IMAGE_FILE = gql`
  mutation Mutation($uploadImageFileInput: UploadImageInput!) {
    uploadImageFile(input: $uploadImageFileInput)
  }
`;

const MERGE_AUDIOS = gql`
  mutation MergeAudiosMutation($mergeAudiosInput: MergeAudiosInput!) {
    mergeAudios(input: $mergeAudiosInput)
  }
`;

const { Panel } = Collapse;
const { Option } = Select;
const { Dragger } = Upload;

const CoverForm = (props) => {
  const {
    setPage,
    audioDuration,
    pageUrl,
    bandData,
    setBandData,
    bandId,
    setBandId,
    selectedSession,
    setSelectedSession,
    setSession,
    session,
    setInst,
    songData,
    sessionData,
    initBandData,
    isFreeCover,
    isSolo,
    setSongData,
  } = props;
  const [songError, setSongError] = useState();
  const [informError, setInformError] = useState(null);
  const [sessionError, setSessionError] = useState(null);
  const [instError, setInstError] = useState();
  const [sessionSet, setSessionSet] = useState(new Set([])); // 세션 종류 저장
  const [sessionAddToggle, setSessionAddToggle] = useState(1); // 세션 추가 토글
  const [modalToggle, setModalToggle] = useState(false);

  const [selectInst, setSelectInst] = useState([]); // 녹음 선택 인스트
  const [selectInstURI, setSelectInstURI] = useState([]);
  const history = useHistory();

  // 반주 병합
  const [mergeAudios, mergeAudiosResult] = useMutation(MERGE_AUDIOS, {
    onCompleted: (data) => {
      const audio = new Audio();
      audio.src = data.mergeAudios;

      setInst(audio);
      setModalToggle(false);
      setPage(1);
    },
    onError: (error) => {
      alert('음원 병합에 실패하였습니다.');
      console.log(error);
    },
  });

  const [uploadImage, uploadImageResult] = useMutation(UPLOAD_IMAGE_FILE, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      // console.log(error);
    },
    onCompleted: (data) => {
      setBandData({ ...bandData, backGroundURI: data.uploadImageFile });
    },
  });

  const formCheck = () => {
    let check = true;

    if (!bandData.name) {
      setInformError('커버 제목을 입력해주세요');
      check = false;
    } else if (!bandData.introduce) {
      setInformError('커버 소개를 입력해주세요');
      check = false;
    }

    if (!isSolo && session.length === 0) {
      setSessionError('커버를 구성할 세션을 하나 이상 추가해주세요');
      check = false;
    } else if (!selectedSession) {
      setSessionError('녹음에 참여할 세션을 골라주세요');
      check = false;
    }

    if (!isFreeCover && selectInst.length === 0) {
      setInstError('녹음에 사용될 반주를 하나 이상 골라주세요');
      check = false;
    }

    if (isFreeCover && (!songData.name || !songData.artist)) {
      setSongError('곡 정보를 입력해주세요');
      check = false;
    }

    return check;
  };

  useEffect(() => {
    setInstError();
  }, [selectInst]);

  useEffect(() => {
    setInformError(null);
  }, [bandData.name, bandData.introduce]);

  useEffect(() => {
    setSessionError(null);
  }, [session, selectedSession]);

  const onClickSubmitButton = () => {
    if (formCheck()) {
      if (isFreeCover) {
        setPage(1);
      } else {
        // 배경사진 등록하지 않은 경우
        if (bandData.backGroundURI === null) {
          setBandData({
            ...bandData,
            backGroundURI: songData.songImg,
          });
        }
        mergeAudios({
          variables: {
            mergeAudiosInput: {
              audios: selectInstURI,
            },
          },
        });
        setModalToggle(true);
      }
    } else window.scrollTo(0, 0);
  };

  const imageFileCheck = (file) => {
    const acceptType = ['image/png', 'image/jpeg', 'image/bmp'];

    if (acceptType.indexOf(file.type) == -1) {
      notification['warning']({
        key: 'imagFilyTypeNotification',
        message: '이미지 파일 형식 오류',
        description: `png , jpeg , bmp 형식의 파일만 업로드 할 수 있습니다`,
        placement: 'bottomRight',
        duration: 5,
        style: {
          width: '30rem',
        },
      });
      return false;
    }
    return true;
  };

  const submitImageFile = (data) => {
    if (imageFileCheck(data.file)) {
      uploadImage({
        variables: {
          uploadImageFileInput: { file: data.file },
        },
      });
    }
  };

  const showSessionType = () => {
    return sessionType.map((v, i) => {
      return (
        <Option key={v.session}>
          <Centered>{changeSessionNameToKorean(v.session)}</Centered>
        </Option>
      );
    });
  };

  const HelpContent = (
    <HelpContainer>
      <HelpWrapper>
        <HelpTitle>제공 반주가 무엇인가요?</HelpTitle>
        <HelpDesc>
          펜타토닉에서 제공하는 반주로, 음원 녹음을 하면서 들을 악기를
          조합합니다.
        </HelpDesc>
      </HelpWrapper>
      <HelpWrapper>
        <HelpTitle>반주를 선택했는데 들리지 않아요!</HelpTitle>
        <HelpDesc>
          반주에 따라 부분적으로 녹음된 반주가 있을 수 있습니다. 들리지 않는
          부분은 선택한 세션이 연주하지 않는 부분입니다.
        </HelpDesc>
      </HelpWrapper>
    </HelpContainer>
  );

  // 페이지 렌더마다 데이터 초기화
  useEffect(() => {
    initBandData();
    setSession([]);
    setSelectInstURI([]);
    setSessionSet(new Set([]));
    setSelectedSession();
  }, []);

  return (
    <Container>
      <SongMetaContainer>
        <BannerBackground
          url={
            isFreeCover
              ? 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80'
              : songData?.songImg
          }
        />
        <BackwardButton onClick={() => history.goBack()}>
          <LeftOutlined />
        </BackwardButton>
        <SongTitle>
          {isFreeCover
            ? `자유곡 ${isSolo ? '솔로' : '밴드'}커버`
            : songData
            ? `${songData.name} - ${songData.artist}`
            : null}
        </SongTitle>
      </SongMetaContainer>
      <FormContainer>
        {isFreeCover ? (
          <InputContainer>
            <CustomTitle>자유곡 정보</CustomTitle>
            <CustomDescription>
              자유곡의 제목과 아티스트를 입력해주세요
            </CustomDescription>
            <CustomInput
              onChange={(e) =>
                setSongData({ ...songData, name: e.target.value })
              }
              maxLength="14"
              placeholder="제목을 입력해주세요"
            />
            <CustomInput
              onChange={(e) =>
                setSongData({ ...songData, artist: e.target.value })
              }
              placeholder="아티스트를 입력해주세요"
            />
            <ErrorContainer>
              {songError ? <ErrorMessage>{songError}</ErrorMessage> : null}
            </ErrorContainer>
          </InputContainer>
        ) : null}
        <InputContainer>
          <CustomTitle>커버 제목/소개</CustomTitle>
          <CustomDescription>
            커버의 제목과 소개를 입력해주세요
          </CustomDescription>
          <CustomInput
            onChange={(e) => setBandData({ ...bandData, name: e.target.value })}
            maxLength="14"
            placeholder="커버 제목을 입력해주세요"
          />
          <CustomTextArea
            onChange={(e) =>
              setBandData({ ...bandData, introduce: e.target.value })
            }
            placeholder="커버 소개를 입력해주세요"
          />
          <ErrorContainer>
            {informError ? <ErrorMessage>{informError}</ErrorMessage> : null}
          </ErrorContainer>
        </InputContainer>
        <InputContainer>
          <CustomTitle>커버 이미지</CustomTitle>
          <CustomDescription>
            커버를 나타낼 대표 이미지를 설정합니다
          </CustomDescription>
          <CustomDragger
            customRequest={(data) => submitImageFile(data)}
            maxCount={1}
            showUploadList={false}
          >
            {bandData.backGroundURI ? (
              <CoverImage src={bandData.backGroundURI} />
            ) : (
              <>
                <CustomPictureIcon />
                <UploadText>
                  업로드하지 않을 시,{' '}
                  {isFreeCover
                    ? '기본 제공 이미지로 설정됩니다.'
                    : '기본 음원커버 이미지로 설정됩니다.'}
                </UploadText>
              </>
            )}
          </CustomDragger>
          {bandData.backGroundURI ? (
            <UploadText>
              사진 변경을 원한다면 클릭하거나 파일을 드래그 해주세요.
            </UploadText>
          ) : null}
        </InputContainer>
        {isSolo ? (
          <InputContainer>
            <CustomTitle>세션 선택</CustomTitle>
            <CustomDescription>
              커버 녹음을 진행 할 세션을 선택합니다
            </CustomDescription>
            <SessionContainer>
              <SessionSelect
                defaultValue="세션 선택"
                value={selectedSession}
                dropdownMatchSelectWidth="100%"
                onChange={(value) => {
                  setSession({ session: value, maxMember: 1 });
                  setSelectedSession(value);
                }}
              >
                {showSessionType()}
              </SessionSelect>
            </SessionContainer>
            <ErrorContainer>
              {sessionError ? (
                <ErrorMessage>{sessionError}</ErrorMessage>
              ) : null}
            </ErrorContainer>
          </InputContainer>
        ) : (
          <InputContainer>
            <CustomTitle>밴드 구성</CustomTitle>
            <CustomDescription>
              밴드에 필요한 세션을 구성하고, 참여할 세션을 클릭해 고릅니다
            </CustomDescription>
            <SessionContainer>
              {session.length > 0 ? (
                <SessionContents
                  session={session}
                  setSession={setSession}
                  sessionSet={sessionSet}
                  setSessionSet={setSessionSet}
                  selectedSession={selectedSession}
                  setSelectedSession={setSelectedSession}
                />
              ) : (
                <NoSession>등록된 세션이 없습니다</NoSession>
              )}
            </SessionContainer>
            <SessionAddButtonContainer>
              <SessionAddPanel
                session={session}
                setSession={setSession}
                sessionSet={sessionSet}
                setSessionSet={setSessionSet}
              />
            </SessionAddButtonContainer>
            <ErrorContainer>
              {sessionError ? (
                <ErrorMessage>{sessionError}</ErrorMessage>
              ) : null}
            </ErrorContainer>
          </InputContainer>
        )}

        {isFreeCover ? null : (
          <InputContainer>
            <CustomTitle>제공 반주</CustomTitle>
            <CustomDescription>
              녹음에 사용될 반주를 조합합니다{' '}
              <CustomPopover placement="rightTop" content={HelpContent}>
                <QuestionCircleFilled />
              </CustomPopover>
            </CustomDescription>
            <InstContainer>
              <InstSelect
                sessionData={sessionData}
                setSelectInst={setSelectInst}
                selectInst={selectInst}
                selectInstURI={selectInstURI}
                setSelectInstURI={setSelectInstURI}
              />
            </InstContainer>
            <ErrorContainer>
              {instError ? <ErrorMessage>{instError}</ErrorMessage> : null}
            </ErrorContainer>
          </InputContainer>
        )}
        <SubmitButton onClick={() => onClickSubmitButton()}>
          다음으로
        </SubmitButton>
      </FormContainer>
      <LoadingModal
        setModalToggle={setModalToggle}
        modalToggle={modalToggle}
        text="반주를 불러오는 중입니다"
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding-bottom: 3vh;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  margin-top: 4%;
`;

const CustomPopover = styled(Popover)`
  color: #444;
  font-size: 0.9rem;
  margin-left: 1rem;
`;

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

const SessionSelect = styled(Select)`
  width: 80%;
`;

const CustomPictureIcon = styled(PictureOutlined)`
  font-size: 4rem;
  margin-top: 0.5rem;
  color: gray;
  transition: all 0.3s ease-in-out !important;
`;

const UploadText = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: gray;
  text-align: center;
  transition: all 0.3s ease-in-out !important;
`;

const CustomDragger = styled(Dragger)`
  background-color: transparent !important;
  border: 2px solid lightgray !important;
  border-radius: 0.8rem !important;
  padding: 1rem 0 !important;

  &:hover {
    ${CustomPictureIcon} {
      color: #444444;
    }

    ${UploadText} {
      color: #444444;
    }

    border: 2px solid gray !important;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  margin: 2rem 0 1rem;
`;

const SessionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 3rem 0;
`;

const SessionAddButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SongMetaContainer = styled.div`
  height: 15rem;
  width: 100%;
  position: relative;
`;

const InstContainer = styled.div`
  margin: 2.5rem 0;
`;

const CoverImage = styled.img`
  height: 15vw;
  max-width: 80%;
  border-radius: 10px;
`;

const BackwardButton = styled.div`
  position: absolute;
  cursor: pointer;
  z-index: 2;
  font-size: 2rem;
  top: 50%;
  left: 3%;
  transform: translateY(-50%);
  color: #ffffff;

  &:hover {
    color: #c0c0c0;
  }
`;

const NoSession = styled.div`
  font-size: 1rem;
  color: gray;
  text-align: center;
`;

const SubmitButton = styled.button`
  border-radius: 0.8rem;
  background-color: rgba(98, 54, 255, 0.9);
  margin: 1rem 0;
  width: 100%;
  height: 4rem;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  font-weight: 700;
  &:hover {
    background-color: rgba(98, 54, 255, 1);
  }
`;

const BannerBackground = styled.div`
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 10%,
      rgba(255, 255, 255, 0.25) 35%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0.75) 85%,
      rgba(255, 255, 255, 1) 100%
    ),
    url(${(props) => (props.url ? props.url : null)});

  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100%;

  filter: brightness(70%);

  height: 15rem;
  width: 100%;

  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 70%;
  margin: 2rem 0;
`;

const SongTitle = styled.div`
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: -1px;
  color: white;

  text-align: center;
  position: absolute;
  z-index: 2;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CustomTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
`;

const ExtraDesc = styled.span`
  font-size: 0.8rem;
`;

const CustomDescription = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin: 0.2rem 0 1rem;
  color: #3d3d3d;
`;

const CustomInput = styled.input`
  width: 100%;
  color: black;
  border: 2px solid #ddd;
  transition: all ease 0.3s;
  outline: none;
  height: 4rem;
  border-radius: 0.8rem;
  margin: 0.2rem 0;
  padding: 0 1rem;
  font-size: 1.2rem;

  &:focus {
    border: 2px solid black;
  }
`;

const CustomTextArea = styled.textarea`
  width: 100%;
  color: black;
  border: 2px solid lightgray;
  transition: all ease 0.3s;
  outline: none;
  height: 8rem;
  border-radius: 0.8rem;
  padding: 1rem 1rem;
  font-size: 1.2rem;
  resize: none;
  margin-top: 0.5rem;

  &:focus {
    border: 2px solid black;
  }
`;

const ErrorContainer = styled.div`
  height: auto;
  width: 100%;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const ErrorMessage = styled.span`
  text-align: center;
  color: #cb0000;
`;

const Centered = styled.span`
  display: flex;
  justify-content: center;
`;

export default CoverForm;
