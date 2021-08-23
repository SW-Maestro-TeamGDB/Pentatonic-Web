import react, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import RecordPage from '../RecordPage';
import RecordEdit from '../RecordEdit';
import SessionAddPanel from '../../components/SessionAddPanel';
import SessionContents from '../../components/SessionContents';
import InstSelect from '../../components/InstSelect';
import { Upload } from 'antd';
import { LeftOutlined, PictureOutlined } from '@ant-design/icons';

import tempData from '../../data/songs/tempData.json';

const { Dragger } = Upload;

const RecordForm = (props) => {
  const { setPage, audioDuration, pageUrl } = props;
  const [bandData, setBandData] = useState({
    name: null,
    introduce: null,
    backgroundURI: null,
    songId: null,
  });
  const [informError, setInformError] = useState(null);
  const [sessionError, setSessionError] = useState(null);
  const [instError, setInstError] = useState();
  const [session, setSession] = useState([]); // 세션
  const [selectInst, setSelectInst] = useState([]); // 녹음 선택 인스트
  const history = useHistory();

  const tempInst = ['기타', '보컬', '베이스', '드럼', '키보드'];

  const formCheck = () => {
    let check = true;

    if (!bandData.name) {
      setInformError('커버 제목을 입력해주세요');
      check = false;
    } else if (!bandData.introduce) {
      setInformError('커버 소개를 입력해주세요');
      check = false;
    }

    if (!session) {
      setSessionError('커버를 구성할 세션을 선택해주세요');
      check = false;
    }

    if (selectInst.length === 0) {
      setInstError('녹음에 사용될 반주를 하나 이상 골라주세요');
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
  }, [session]);

  const onClickSubmitButton = () => {
    if (formCheck()) setPage(1);
    else window.scrollTo(0, 0);
  };

  return (
    <Container>
      <SongMetaContainer>
        <BannerBackground />
        <BackwardButton onClick={() => history.goBack()}>
          <LeftOutlined />
        </BackwardButton>
        <SongTitle>Fix You - Coldplay</SongTitle>
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
            placeholder="커버 제목을 입력해주세요"
          />
          <ErrorContainer>
            {informError ? <ErrorMessage>{informError}</ErrorMessage> : null}
          </ErrorContainer>
        </InputContainer>
        <InputContainer>
          <CustomTitle>세션 선택</CustomTitle>
          <CustomDescription>
            커버 녹음을 진행 할 세션을 선택합니다
          </CustomDescription>
          {/* 세션 선택 컴포넌트 추가 */}
          <ErrorContainer>
            {sessionError ? <ErrorMessage>{sessionError}</ErrorMessage> : null}
          </ErrorContainer>
        </InputContainer>
        <InputContainer>
          <CustomTitle>제공 반주</CustomTitle>
          <CustomDescription>녹음에 사용될 반주를 조합합니다</CustomDescription>
          <InstContainer>
            <InstSelect
              inst={tempInst}
              setSelectInst={setSelectInst}
              selectInst={selectInst}
            />
          </InstContainer>
          <ErrorContainer>
            {instError ? <ErrorMessage>{instError}</ErrorMessage> : null}
          </ErrorContainer>
        </InputContainer>
        <SubmitButton onClick={() => onClickSubmitButton()}>
          다음으로
        </SubmitButton>
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
  padding-bottom: 3vh;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  margin-top: 4%;
`;

const InputContainer = styled.div`
  width: 100%;
  margin: 2rem 0 1rem;
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
    url('https://media.pitchfork.com/photos/608a33343bbb6032f540a222/2:1/w_2912,h_1456,c_limit/coldplay.jpg');
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

const CustomDescription = styled.div`
  font-size: 1rem;
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

export default RecordForm;