import react, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import RecordPage from '../RecordPage';
import RecordEdit from '../RecordEdit';
import SessionAddPanel from '../../components/SessionAddPanel';
import SessionContents from '../../components/SessionContents';
import InstSelect from '../../components/InstSelect';
import LoadingModal from '../../components/LoadingModal';
import CoverRoomSession from '../../components/CoverRoomSession/CoverRoomSession';
import GridContainer from '../../components/GridContainer';
import { Upload, Collapse, Select } from 'antd';
import { LeftOutlined, PictureOutlined } from '@ant-design/icons';
import { changeSessionNameToKorean } from '../../lib/changeSessionNameToKorean';

import { sessionIconMatch } from '../../lib/sessionIconMatch';
import Grid from 'antd/lib/card/Grid';

const { Dragger } = Upload;
const { Panel } = Collapse;
const { Option } = Select;

const MERGE_AUDIOS = gql`
  mutation MergeAudiosMutation($mergeAudiosInput: MergeAudiosInput!) {
    mergeAudios(input: $mergeAudiosInput)
  }
`;

const ParticipationForm = (props) => {
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
    setInst,
    songData,
    sessionData,
    initBandData,
    setExistingInst,
    setInstDuration,
  } = props;

  const [informError, setInformError] = useState(null);
  const [instError, setInstError] = useState();
  const [modalToggle, setModalToggle] = useState(false);

  const [selectInst, setSelectInst] = useState([]); // 녹음 선택 인스트
  const [selectInstURI, setSelectInstURI] = useState([]);
  const history = useHistory();

  // 반주 병합
  const [mergeAudios, mergeAudiosResult] = useMutation(MERGE_AUDIOS, {
    onCompleted: (data) => {
      const audio = new Audio();
      audio.src = data.mergeAudios;

      audio.onloadedmetadata = () => {
        setInstDuration(audio.duration);
      };

      setInst(audio);
      setExistingInst(audio);
      setModalToggle(false);
      setPage(1);
    },
    onError: (error) => {
      alert('음원 병합에 실패하였습니다.');
      console.log(error);
    },
  });

  const formCheck = () => {
    let check = true;

    if (!bandData.name) {
      setInformError('라이브러리 제목을 입력해주세요');
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

  const onClickSubmitButton = () => {
    if (formCheck()) {
      mergeAudios({
        variables: {
          mergeAudiosInput: {
            audios: selectInstURI,
          },
        },
      });
      setModalToggle(true);
    } else window.scrollTo(0, 0);
  };

  const showCoverRoomSession = () => {
    if (bandData.session)
      return bandData.session.map((v, i) => {
        return (
          <CoverRoomSession
            key={`CoverRoom + ${v.position} + ${i}`}
            sessionTitle={changeSessionNameToKorean(v.position)}
            total={v.maxMember}
            now={v.cover.length}
            session={selectInstURI}
            setSession={setSelectInstURI}
            cover={v.cover}
            creator={bandData.creator.id}
            bandId={bandId}
            songId={bandData.song.songId}
            sessionData={v}
            participation
          />
        );
      });
  };

  return (
    <Container>
      <SongMetaContainer>
        <BannerBackground url={bandData?.backGroundURI} />
        <BackwardButton onClick={() => history.goBack()}>
          <LeftOutlined />
        </BackwardButton>
        <SongTitle>{songData ? `${songData.name}` : null}</SongTitle>
      </SongMetaContainer>
      <FormContainer>
        <InputContainer>
          <CustomTitle>제목</CustomTitle>
          <CustomDescription>
            라이브러리의 제목을 입력해주세요
          </CustomDescription>
          <CustomInput
            onChange={(e) => setBandData({ ...bandData, name: e.target.value })}
            maxLength="14"
            placeholder="라이브러리 제목을 입력해주세요"
          />
          <ErrorContainer>
            {informError ? <ErrorMessage>{informError}</ErrorMessage> : null}
          </ErrorContainer>
        </InputContainer>
        <InputContainer>
          <CustomTitle>녹음 세션</CustomTitle>
          <CustomDescription>
            라이브러리 녹음을 진행 할 세션입니다
          </CustomDescription>
          <SessionContainer>
            <SessionIcon src={sessionIconMatch(selectedSession)} />
            <SessionTitle>
              {changeSessionNameToKorean(selectedSession)}
            </SessionTitle>
          </SessionContainer>
        </InputContainer>
        <InputContainer>
          <CustomTitle>제공 반주</CustomTitle>
          <CustomDescription>녹음에 사용될 반주를 조합합니다</CustomDescription>
          <InstContainer>
            <GridContainer width="90%">{showCoverRoomSession()}</GridContainer>
          </InstContainer>
          <ErrorContainer>
            {instError ? <ErrorMessage>{instError}</ErrorMessage> : null}
          </ErrorContainer>
        </InputContainer>
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

const SessionIcon = styled.img`
  width: 3.5rem;
  margin-top: 0.5rem;
  opacity: 0.3;
  opacity: 0.3;
`;

const SessionTitle = styled.div`
  margin-top: 0.5rem;
  font-weight: 700;
  font-size: 0.9rem;
`;

const SessionSelect = styled(Select)`
  width: 80%;
`;

const InputContainer = styled.div`
  width: 100%;
  margin: 2rem 0 1rem;
`;

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;

  margin: 3.5rem 0;
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
  padding: 1rem 0;

  display: flex;
  justify-content: center;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 16px;
`;

const CustomPictureIcon = styled(PictureOutlined)`
  color: #3d3d3d;
  font-size: 3rem;
  margin-top: 0.5rem;
`;

const UploadText = styled.div`
  margin-top: 0.5rem;
  color: #3d3d3d;
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
  background-color: black;
  margin: 1rem 0;
  width: 100%;
  height: 4rem;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  &:hover {
    background-color: rgb(50, 50, 50);
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

  filter: brightness(50%);

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

export default ParticipationForm;
