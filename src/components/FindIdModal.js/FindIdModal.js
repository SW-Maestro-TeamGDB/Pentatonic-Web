import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { LeftOutlined } from '@ant-design/icons';

const SEND_AUTH_CODE = gql`
  mutation sendAuthCode($phoneNumber: PhoneNumber!) {
    sendAuthCode(input: { isRegistration: false, phoneNumber: $phoneNumber })
  }
`;

const FIND_ID = gql`
  query findId($phoneNumber: PhoneNumber!, $authCode: Int!) {
    findId(phoneNumber: $phoneNumber, authCode: $authCode) {
      id
    }
  }
`;

const FindIdModal = (props) => {
  const { modalToggle, setModalToggle, closeModal, setPageStep } = props;
  const [findResult, setFindResult] = useState(null);
  const [tempNumber, setTempNumber] = useState(null);
  const [numberStatus, setNumberStatus] = useState(0);
  const [numberError, setNumberError] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [authCode, setAuthCode] = useState(null);
  const [auth, authResult] = useMutation(SEND_AUTH_CODE, {
    onError: (error) => {
      setNumberStatus(-1);
      setNumberError(error.message);
    },
  });

  const [findId] = useLazyQuery(FIND_ID, {
    fetchPolicy: 'network-only',
    onError: (error) => {
      setAuthError(error.message);
    },
    onCompleted: (data) => {
      setFindResult(data.findId.id);
    },
  });

  useEffect(() => {
    setTempNumber(null);
    setNumberStatus(0);
    setNumberError(null);
    setAuthError(null);
    setAuthCode(null);
    setFindResult(null);
  }, []);

  const showContent = () => {
    if (findResult) {
      return (
        <>
          <ResultContainer>
            <TextWrapper>회원님의 아이디는</TextWrapper>
            <IdWrapper>{findResult}</IdWrapper>
            <TextWrapper>입니다</TextWrapper>
          </ResultContainer>
          <SubmitButton onClick={() => setPageStep(0)}>로그인하기</SubmitButton>
        </>
      );
    } else {
      return (
        <>
          <CustomTitle>휴대전화 인증</CustomTitle>
          <CustomDescription>
            찾으실 계정의 휴대전화 번호를 입력해주세요
          </CustomDescription>
          <PhoneNumberWrapper>
            <PhoneNumberInput
              placeholder="01012345678"
              maxLength="11"
              value={tempNumber}
              onChange={(e) => setTempNumber(e.target.value)}
              disabled={numberStatus === 1}
            />
            <AuthButton onClick={() => numberCheck()}>인증하기</AuthButton>
          </PhoneNumberWrapper>
          <ErrorContainer>
            {numberStatus === -1 ? (
              <ErrorMessage>{numberError}</ErrorMessage>
            ) : null}
          </ErrorContainer>
          {numberStatus === 1 ? (
            <AuthNumberInput
              value={authCode}
              placeholder="인증번호를 입력해주세요"
              onChange={(e) => setAuthCode(e.target.value)}
              maxLength="6"
            ></AuthNumberInput>
          ) : null}
          <ErrorContainer>
            {authError ? <ErrorMessage>{authError}</ErrorMessage> : null}
          </ErrorContainer>
          <SubmitButton onClick={() => authCodeCheck()}>다음으로</SubmitButton>
        </>
      );
    }
  };

  const frontCheck = () => {
    const accept = ['010', '011', '016', '017', '018', '019'];
    return accept.indexOf(tempNumber.substr(0, 3)) == -1;
  };

  // +82 형식으로 변환
  const changeNumber = (num) => {
    return '+82' + num.substr(1);
  };

  const requestAuth = () => {
    auth({ variables: { phoneNumber: changeNumber(tempNumber) } });
  };

  const numberCheck = () => {
    if (
      !tempNumber ||
      tempNumber.length != 11 ||
      frontCheck() ||
      isNaN(Number(tempNumber))
    ) {
      setNumberError('올바르지 않은 번호형식 입니다');
      return setNumberStatus(-1);
    } else {
      setNumberStatus(1);
      return requestAuth();
    }
  };

  const authCodeCheck = () => {
    if (numberStatus !== 1) {
      setNumberStatus(-1);
      setNumberError('휴대전화 인증을 진행해주세요');
      return;
    } else if (
      Number(authCode).toString().length === 6 &&
      !isNaN(Number(tempNumber))
    ) {
      setAuthError(null);
      findId({
        variables: {
          phoneNumber: changeNumber(tempNumber),
          authCode: Number(authCode),
        },
      });
    } else {
      setAuthError('인증번호가 일치하지 않습니다');
    }
  };

  useEffect(() => {
    setNumberStatus(0);
    setNumberError(null);
  }, [tempNumber]);

  useEffect(() => {
    setAuthError(null);
  }, [authCode]);

  return (
    <FindAccountContainer>
      <ModalHeader>
        <BackwardButton onClick={() => setPageStep(1)}>
          <LeftOutlined />
        </BackwardButton>
        <HeaderTitle>아이디 찾기</HeaderTitle>
      </ModalHeader>
      <ModalContents>{showContent()}</ModalContents>
    </FindAccountContainer>
  );
};

const FindAccountContainer = styled.div`
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const AuthButton = styled.button`
  background-color: black;
  border: none;
  color: white;
  width: 25%;
  height: 4rem;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all ease 0.3s;
  margin-left: 5%;

  &:hover {
    background-color: #3d3d3d;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 65%;
`;

const TextWrapper = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
`;

const IdWrapper = styled.div`
  font-size: 3rem;
  font-weight: 800;
  background-color: #f0f0f0;
  width: 90%;
  text-align: center;
  padding: 1rem 0;
  border-radius: 1rem;
`;

const PhoneNumberWrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ErrorContainer = styled.div`
  height: 1rem;
  width: 100%;
  margin-left: 0.5rem;
`;

const ErrorMessage = styled.span`
  text-align: center;
  color: #cb0000;
`;

const ModalHeader = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5%;
`;

const ModalContents = styled.div`
  position: absolute;
  width: 80%;
  height: 70%;
  bottom: 10%;
`;

const SubmitButton = styled.button`
  border-radius: 0.8rem;
  position: absolute;
  bottom: 2%;
  background-color: black;
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

const Divider = styled.div`
  border-bottom: 1px solid lightgray;
  border-radius: 5px;
`;

const BackwardButton = styled.span`
  position: absolute;
  cursor: pointer;
  z-index: 2;
  font-size: 1.5rem;

  &:hover {
    color: gray;
  }
`;

const SelectDesc = styled.div`
  font-size: 2rem;
  font-weight: 800;
`;

const HeaderTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  position: absolute;
  width: 100%;
`;

const PhoneNumberInput = styled.input`
  width: 70%;
  color: black;
  border: 2px solid lightgray;
  transition: all ease 0.3s;
  outline: none;
  height: 4rem;
  border-radius: 0.8rem;
  margin: 0.5rem 0;
  padding: 0 1rem;
  font-size: 1.2rem;

  &:focus {
    border: 2px solid black;
  }
`;

const AuthNumberInput = styled.input`
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

export default FindIdModal;
