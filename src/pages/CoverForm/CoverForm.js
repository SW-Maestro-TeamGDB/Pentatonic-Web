import react, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import RecordPage from '../RecordPage';
import RecordEdit from '../RecordEdit';
import SessionAddPanel from '../../components/SessionAddPanel';
import GridContainer from '../../components/GridContainer/GridContainer';
import SessionContents from '../../components/SessionContents';
import InstSelect from '../../components/InstSelect';
import { Upload } from 'antd';
import { LeftOutlined, PictureOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const CoverMaking = (props) => {
  const { setPage, audioDuration, pageUrl } = props;
  const [titleError, setTitleError] = useState(null);
  const [sessionError, setSessionError] = useState(null);
  const [session, setSession] = useState([]); // 세션
  const [sessionSet, setSessionSet] = useState(new Set([])); // 세션 종류 저장
  const [sessionAddToggle, setSessionAddToggle] = useState(1); // 세션 추가 토글
  const [selectedSession, setSelectedSession] = useState(null); // 녹음 참여 세션
  const [selectInst, setSelectInst] = useState([]); // 녹음 선택 인스트
  const backToMusicInfo = () => {
    return pageUrl.substr(0, pageUrl.length - 6);
  };

  const tempInst = ['기타', '보컬', '베이스', '드럼', '키보드'];

  useEffect(() => {
    console.log(selectedSession);
  }, [selectedSession]);

  return (
    <Container>
      <SongMetaContainer>
        <BannerBackground />
        <BackwardButton to={backToMusicInfo()}>
          <LeftOutlined />
        </BackwardButton>
        <SongTitle>Fix You - Coldplay</SongTitle>
      </SongMetaContainer>
      <FormContainer>
        <InputContainer>
          <CustomTitle>제목/소개</CustomTitle>
          <CustomDescription>
            커버의 제목과 소개를 입력해주세요
          </CustomDescription>
          <CustomInput
            onChange={(e) => console.log(e.target.value)}
            maxLength="14"
            placeholder="커버 제목을 입력해주세요"
          />
          <ErrorContainer>
            {titleError ? <ErrorMessage>{titleError}</ErrorMessage> : null}
          </ErrorContainer>
          <CustomTextArea
            onChange={(e) => console.log(e.target.value)}
            placeholder="커버 소개를 입력해주세요"
          />
        </InputContainer>
        <InputContainer>
          <CustomTitle>커버 이미지</CustomTitle>
          <CustomDescription>
            커버를 나타낼 대표 이미지를 설정합니다
          </CustomDescription>
          <Dragger
            style={{
              backgroundColor: 'transparent',
              border: '2px solid lightgray',
              borderRadius: '0.8rem',
              padding: '1rem 0',
            }}
          >
            <CustomPictureIcon />
            <UploadText>
              업로드하지 않을 시, 기본 음원커버 이미지가 설정됩니다.
            </UploadText>
          </Dragger>
        </InputContainer>
        <InputContainer>
          <CustomTitle>세션 프리셋</CustomTitle>
          <CustomDescription>
            커버에 필요한 세션을 추가하고 녹음에 참여할 세션을 고릅니다
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
            {sessionError ? <ErrorMessage>{sessionError}</ErrorMessage> : null}
          </ErrorContainer>
        </InputContainer>
        <InputContainer>
          <CustomTitle>제공 반주</CustomTitle>
          <CustomDescription>녹음에 사용될 반주를 선택합니다</CustomDescription>
          <InstContainer>
            <InstSelect
              inst={tempInst}
              setSelectInst={setSelectInst}
              selectInst={selectInst}
            />
          </InstContainer>
        </InputContainer>
        <SubmitButton onClick={() => setPage(1)}>다음으로</SubmitButton>
      </FormContainer>
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
`;

const InputContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const SessionContainer = styled.div`
  margin: 2.5rem 0 2rem;
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

const CustomPictureIcon = styled(PictureOutlined)`
  color: #3d3d3d;
  font-size: 3rem;
  margin-top: 0.5rem;
`;

const UploadText = styled.div`
  margin-top: 0.5rem;
  color: #3d3d3d;
`;

const BackwardButton = styled(Link)`
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
    url('https://w.namu.la/s/8f16d9ad8ac378b6d2339ce927bbc9d6431dbf5277b241bf363ffa61cf5496caf1611f471aca282ff14bd8e544135b8f5edbbfebb6f942603cc9563f130a548cf40005956d405598ed3f6067522ad7b6aaf067e05dbc1e79085d5b90fb90ab5f9947a0cd3108efda6f8008666a1627cc');
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
  font-size: 1.5rem;
  font-weight: 900;
`;

const CustomDescription = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0.2rem 0 1rem;
  color: #3d3d3d;
`;

const CustomInput = styled.input`
  width: 100%;
  color: black;
  border: 2px solid lightgray;
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

export default CoverMaking;
